// W4.1 — host git API（git.status / git.diff / git.stage / git.unstage /
// git.commit / git.branch / git.log / git.discard）
// 每请求直接 spawn 系统 git（字面量命令 + argv 数组，无库无状态）；
// porcelain 机器可读输出（status 用 -z NUL 帧、log 用 \x1f 单元分隔），
// 解析与 locale/配色无关；-c core.quotepath=false 保中文路径原样（W4.3 不乱码）。
// 全部 windowsHide + 超时击杀 + stdout 字节上限；只读语义经 GIT_OPTIONAL_LOCKS=0
// 避免 status 顺手写 index。
// 身份纪律：绝不读写 user.name/user.email（不生成任何 git config 调用）——
// 提交用用户既有身份，未配置时把 git 的指引原文透给客户端。
import { spawn } from "node:child_process";
import { ErrorCode } from "../shared/protocol";
import { FsError } from "./fs-error";
import { sessionCwdOf } from "./session-cwd";

// ── 预算 ──
const GIT_TIMEOUT_MS = 30_000;
const REPO_PROBE_TIMEOUT_MS = 5_000;
const STATUS_LIMIT = 2_000; // 计划批定：大仓库 2000 条截断
const LOG_PAGE = 30; // 计划批定：30 条懒分页
const DIFF_MAX_BYTES = 512 * 1024; // 单文件 patch 字节上限
const COMMIT_MSG_MAX = 4_000;

type RunOptions = { timeoutMs?: number; allowExit1?: boolean; maxBytes?: number };

/** 跑一条 git；resolve stdout（utf8），reject FsError(git-error)。 */
function runGit(cwd: string, args: string[], opts: RunOptions = {}): Promise<string> {
  const timeoutMs = opts.timeoutMs ?? GIT_TIMEOUT_MS;
  const maxBytes = opts.maxBytes ?? 16 * 1024 * 1024;
  const full = ["-C", cwd, "--no-pager", "-c", "color.ui=false", "-c", "core.quotepath=false", ...args];
  return new Promise((resolveP, reject) => {
    const child = spawn("git", full, {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
      env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },
    });
    let stdout = "";
    let stdoutBytes = 0;
    let over = false;
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new FsError("git " + (args[0] ?? "") + " 超时（" + timeoutMs + "ms）", "git-error"));
    }, timeoutMs);
    child.stdout!.on("data", (chunk: Buffer) => {
      stdoutBytes += chunk.length;
      if (stdoutBytes > maxBytes) {
        over = true;
        return;
      }
      stdout += chunk.toString("utf8");
    });
    child.stderr!.on("data", (chunk: Buffer) => {
      if (stderr.length < 8192) stderr += chunk.toString("utf8");
    });
    child.on("error", (e) => {
      clearTimeout(timer);
      reject(new FsError("无法运行 git：" + e.message + "（请确认本机已安装 git）", "git-error"));
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0 || (opts.allowExit1 === true && code === 1)) {
        resolveP(over ? stdout + "\n… [输出超限截断]" : stdout);
      } else {
        reject(new FsError(stderr.trim() || "git 退出码 " + String(code), "git-error"));
      }
    });
  });
}

// ── porcelain 解析（smoke 直测）──

export interface GitStatusEntry {
  /** 仓库相对路径，'/' 分隔（git 原生输出） */
  path: string;
  /** 两位 X(index)/Y(worktree) 状态，如 'M '、' M'、'A '、'??'、'R ' */
  xy: string;
}

/** `git status --porcelain=v1 -z`：NUL 帧切分；rename/copy 的 origin 路径占下一个 NUL 位，跳过 */
export function parseStatusZ(out: string): GitStatusEntry[] {
  const tokens = out.split("\0");
  const entries: GitStatusEntry[] = [];
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i]!;
    i += 1;
    if (token === "") continue;
    const xy = token.slice(0, 2);
    const path = token.slice(3);
    entries.push({ path, xy });
    if ((xy[0] === "R" || xy[0] === "C") && tokens[i] !== undefined && tokens[i] !== "") i += 1;
  }
  return entries;
}

export interface GitLogEntry {
  hash: string;
  hashFull: string;
  subject: string;
  author: string;
  date: string;
  refs: string;
}

/** `git log --pretty=format:%h%x1f%s%x1f%an%x1f%ai%x1f%H%x1f%D` */
export function parseLogLines(out: string): GitLogEntry[] {
  const rows: GitLogEntry[] = [];
  for (const line of out.split("\n")) {
    if (line === "") continue;
    const [hash, subject, author, date, hashFull, refs] = line.split("\x1f");
    if (hash === undefined || subject === undefined) continue;
    rows.push({ hash, subject, author: author ?? "", date: date ?? "", hashFull: hashFull ?? hash, refs: refs ?? "" });
  }
  return rows;
}

// ── 仓库定位与路径纪律 ──

/** 会话 cwd 所在仓库的顶层；非 git 目录返回 null（客户端空态），git 缺失/超时照抛 */
async function repoRootOf(ctx: any, payload: any): Promise<string | null> {
  const sessionId = typeof payload?.sessionId === "string" && payload.sessionId ? payload.sessionId : undefined;
  const cwdHint = typeof payload?.cwd === "string" ? payload.cwd : undefined;
  const cwd = await sessionCwdOf(ctx, sessionId, cwdHint);
  try {
    const out = await runGit(cwd, ["rev-parse", "--show-toplevel"], { timeoutMs: REPO_PROBE_TIMEOUT_MS });
    return out.trim() || null;
  } catch (e: any) {
    // git 不可执行/超时照抛；「not a git repository」→ 非仓库空态
    const msg = String(e?.message ?? e);
    if (msg.includes("无法运行 git") || msg.includes("超时")) throw e;
    return null;
  }
}

/** 客户端只允许传 git status 原样吐回的仓库相对路径：拒绝绝对盘符、根分隔与 .. 上跳 */
function guardRepoPath(v: unknown, name: string): string {
  if (typeof v !== "string" || v === "") throw new FsError("missing field: " + name, ErrorCode.BadRequest);
  if (/^[a-zA-Z]:/.test(v) || v.startsWith("/") || v.startsWith("\\") || v.split(/[\\/]/).includes("..")) {
    throw new FsError("非法仓库路径: " + v, ErrorCode.Forbidden, 403);
  }
  return v;
}

function guardRepoPaths(v: unknown, name: string): string[] {
  if (!Array.isArray(v) || v.length === 0) throw new FsError("missing field: " + name, ErrorCode.BadRequest);
  if (v.length > 500) throw new FsError("路径数量超上限（500）", ErrorCode.BadRequest);
  return v.map((p) => guardRepoPath(p, name));
}

// ── 方法表（与 FS_METHODS 同签名，index 合并分发）──

type GitMethodHandler = (ctx: any, payload: any) => Promise<unknown>;

/** 当前分支名：symbolic-ref 对「未出生分支」（空仓库无首提交）也能拿到名字；分离头 → "HEAD" */
function currentBranch(root: string): Promise<string> {
  return runGit(root, ["symbolic-ref", "--short", "HEAD"])
    .then((s) => s.trim())
    .catch(() => runGit(root, ["rev-parse", "--abbrev-ref", "HEAD"]).then((s) => s.trim()).catch(() => "HEAD"));
}

export const GIT_METHODS: Record<string, GitMethodHandler> = {
  "git.status": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const [branch, raw] = await Promise.all([
      currentBranch(root),
      runGit(root, ["status", "--porcelain=v1", "-z", "--untracked-files=all"]),
    ]);
    const parsed = parseStatusZ(raw);
    const truncated = parsed.length > STATUS_LIMIT;
    return {
      isRepo: true,
      root,
      branch,
      entries: truncated ? parsed.slice(0, STATUS_LIMIT) : parsed,
      truncated,
    };
  },

  "git.diff": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const path = guardRepoPath(payload?.path, "path");
    const staged = payload?.staged === true;
    const untracked = payload?.untracked === true;
    if (untracked) {
      // 未跟踪文件 HEAD 侧不存在：与 /dev/null 比对合成全 + patch；git 约定 exit 1 = 有差异
      const patch = await runGit(
        root,
        ["diff", "--no-ext-diff", "--no-color", "--no-index", "-U3", "--", "/dev/null", path],
        { allowExit1: true, maxBytes: DIFF_MAX_BYTES },
      );
      return { patch };
    }
    const args = ["diff", "--no-ext-diff", "--no-color", "-U3"];
    if (staged) args.push("--cached");
    args.push("--", path);
    const patch = await runGit(root, args, { maxBytes: DIFF_MAX_BYTES });
    return { patch };
  },

  "git.stage": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const paths = guardRepoPaths(payload?.paths, "paths");
    await runGit(root, ["add", "-A", "--", ...paths]);
    return { ok: true };
  },

  "git.unstage": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const paths = guardRepoPaths(payload?.paths, "paths");
    await runGit(root, ["reset", "-q", "HEAD", "--", ...paths]);
    return { ok: true };
  },

  "git.commit": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const message = payload?.message;
    if (typeof message !== "string" || message.trim() === "")
      throw new FsError("missing field: message", ErrorCode.BadRequest);
    if (message.length > COMMIT_MSG_MAX) throw new FsError("提交信息过长（>" + COMMIT_MSG_MAX + "）", ErrorCode.BadRequest);
    // 身份纪律：不传 -c user.*、不碰 config；未配置身份时 git 自行报错，stderr 原文透出
    await runGit(root, ["commit", "-m", message]);
    return { ok: true };
  },

  "git.branch": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const [current, raw] = await Promise.all([
      currentBranch(root),
      runGit(root, ["for-each-ref", "--format=%(refname:short)", "refs/heads"]),
    ]);
    const names = raw.split("\n").filter((l) => l !== "");
    return { current, names: names.includes(current) ? names : [current, ...names] };
  },

  "git.log": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const skip = Math.max(0, Math.floor(Number(payload?.skip ?? 0)) || 0);
    const raw = await runGit(root, [
      "log",
      "-n",
      String(LOG_PAGE),
      "--skip",
      String(skip),
      "--decorate=short",
      "--pretty=format:%h%x1f%s%x1f%an%x1f%ai%x1f%H%x1f%D",
    ]);
    return { entries: parseLogLines(raw), page: LOG_PAGE };
  },

  "git.discard": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const paths = guardRepoPaths(payload?.paths, "paths");
    if (payload?.untracked === true) {
      // 未跟踪 = 客户端确认后的删除（clean 只对显式列出的路径，绝不裸跑）
      await runGit(root, ["clean", "-q", "-f", "--", ...paths]);
    } else {
      // 已跟踪：worktree 恢复到 HEAD（index 不动——已暂存部分交给 unstage）
      await runGit(root, ["checkout", "-q", "HEAD", "--", ...paths]);
    }
    return { ok: true };
  },
};
