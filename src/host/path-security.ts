// 工作区路径安全（照生态 path-security 语义重写）
// 规则：
//   - 相对路径一律相对会话 cwd 解析；绝对路径也必须最终落在 cwd 真实路径内
//   - 现存路径经 realpath 解析软链后做包含性校验（软链指到工作区外即拒绝）
//   - 写路径对不存在目标回溯最近存在祖先再重建——符号链接永不残留在写路径里
// 异步纪律（2026-09 卡死修复）：此前 existsSync/realpathSync 在请求路径上同步
// 阻塞 DSH Node 事件循环——慢盘/杀软扫描下每次 fs.* 可卡数十至数百 ms，
// 并级联冻结全部插件与 iframe。现全部迁 fs.promises。
import { realpath, stat } from "node:fs/promises";
import { basename, dirname, isAbsolute, join, resolve, sep } from "node:path";

export class PathError extends Error {}

async function pathExists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function realpathDeepestExisting(p: string): Promise<{ real: string; trailing: string[] }> {
  let cur = resolve(p);
  const trailing: string[] = [];
  for (;;) {
    if (await pathExists(cur)) return { real: await realpath(cur), trailing };
    const parent = dirname(cur);
    if (parent === cur) throw new PathError("unresolvable path: " + p);
    trailing.unshift(basename(cur));
    cur = parent;
  }
}

async function ensureWithin(cwd: string, target: string): Promise<string> {
  if (typeof cwd !== "string" || !cwd) throw new PathError("missing workspace cwd");
  if (typeof target !== "string" || !target) throw new PathError("missing path");
  let rootReal: string;
  try {
    rootReal = await realpath(cwd);
  } catch {
    throw new PathError("workspace cwd does not exist: " + cwd);
  }
  const abs = resolve(isAbsolute(target) ? target : join(cwd, target));
  const { real, trailing } = await realpathDeepestExisting(abs);
  const within = real === rootReal || real.startsWith(rootReal + sep);
  if (!within) throw new PathError("path escapes workspace: " + target);
  // trailing 段全部为本次解析新建的名字，不含软链
  return trailing.length ? join(real, ...trailing) : real;
}

/** 读路径：解析为 cwd 内真实绝对路径（存在性由调用方 stat 校验） */
export async function ensureWorkspaceReadPath(cwd: string, target: string): Promise<string> {
  return ensureWithin(cwd, target);
}

/** 写路径：不存在目标自最近存在祖先重建，杜绝经软链逃逸 */
export async function ensureWorkspaceWritePath(cwd: string, target: string): Promise<string> {
  return ensureWithin(cwd, target);
}
