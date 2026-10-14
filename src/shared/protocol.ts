// host/client 共享协议词汇（一期·阶段 1 骨架；W1.3 将扩展完整错误码与请求解析）
export const PLUGIN_ID = "dsh-git-studio";
export const API_PREFIX = "/git-studio/api";

// hero 首屏伪会话键：空白新会话未真正入列、sessions.list.current 为空时，
// client 用它给 WorkbenchStore 占位（store 以此分键存面板状态）。它不是真实
// 会话 id——host 收到后必须视同 undefined，绝不传给 dsh 的 sessions /
// sessionPersistence（后者会对未知 id 抛 SessionPersistenceNotFoundError）。
export const HERO_SESSION_KEY = "__git-studio-hero__";

export type Envelope<T> =
  | { ok: true; value: T }
  | { ok: false; error: { code: string; message: string } };

export function ok<T>(value: T): Envelope<T> {
  return { ok: true, value };
}

export function fail(code: string, message: string): Envelope<never> {
  return { ok: false, error: { code, message } };
}

// 机器可读错误码（对齐生态信封；W2.1 扩展 fs 域；W3 扩展 pty 域）
export const ErrorCode = {
  BadRequest: "bad-request",
  NotFound: "not-found",
  Forbidden: "forbidden",
  Internal: "internal",
  FsError: "fs-error",
  TooLarge: "too-large",
  PtyError: "pty-error",
} as const;
