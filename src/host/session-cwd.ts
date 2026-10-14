// 权威会话 cwd 四级回退（照生态 sessionCwdOf 语义）：
//   1) live 会话 header.cwd（ctx.sessions.get）
//   2) 客户端随请求携带的 cwd 提示（会话摘要里的 cwd）
//   3) sessionPersistence.inspect().meta.cwd（冷会话回退）
//   4) process.cwd()
// 任何一级失败静默落到下一级；无 sessionId 时直接走提示/process.cwd。
//
// 保命纪律（2026-09-09）：sessionPersistence.inspect 是异步的——
// 不 await 直接读 .meta 只会拿到 undefined，更致命的是悬空的 rejected
// Promise 会变成 dsh 宿主进程的 unhandledRejection（dsh 的 installFailLoud
// 直接打印 "dsh: fatal load failure" 并 exit(1)，整个 dsh 被杀掉）。
// 所以 inspect 必须 await 进 try/catch，绝不悬空。
// 另：hero 首屏伪会话键（HERO_SESSION_KEY）不是真实会话，根本不进 dsh 查询。
import { HERO_SESSION_KEY } from "../shared/protocol";

export async function sessionCwdOf(
  ctx: any,
  sessionId: string | undefined,
  clientCwd: string | undefined,
): Promise<string> {
  const realId = sessionId && sessionId !== HERO_SESSION_KEY ? sessionId : undefined;
  if (realId) {
    try {
      const s = await ctx.sessions?.get?.(realId);
      const c = s?.header?.cwd;
      if (typeof c === "string" && c) return c;
    } catch {
      /* live 会话不可用 → 下一级 */
    }
    if (typeof clientCwd === "string" && clientCwd) return clientCwd;
    try {
      const info = await ctx.get?.("sessionPersistence")?.inspect?.(realId);
      const c = (info as any)?.meta?.cwd;
      if (typeof c === "string" && c) return c;
    } catch {
      /* persistence 缺失/未知会话 → 下一级（已 await，不悬空） */
    }
  } else if (typeof clientCwd === "string" && clientCwd) {
    return clientCwd;
  }
  return process.cwd();
}
