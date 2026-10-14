// host API 薄封装：统一信封解析；网络/信封错误抛出可读 Error
//
// 超时纪律（2026-09-09 卡死修复）：此前 fetch 既无 timeout 也无 abort——
// host 侧 git 命令超时上限 30s（GIT_TIMEOUT_MS），大仓库 status/diff 挂到
// 数十秒是常态。多个挂死请求叠加 + 面板反复重挂载，请求永不 settle，Promise
// 链与闭包（含整个组件树引用）全部悬挂无法回收，是"越用越卡"的放大器。
// 现默认 20s 主动 abort，调用方亦可传 signal 自行取消（组件卸载即取消）。
import type { Envelope } from "../shared/protocol";

/** 默认请求超时（略小于 host git 30s 上限，让客户端先给出可读错误） */
export const API_TIMEOUT_MS = 20_000;

export interface ApiCallOptions {
  /** 外部取消信号（组件卸载 / 会话切换时中止在途请求） */
  signal?: AbortSignal;
  /** 覆盖默认超时；0 = 不超时 */
  timeoutMs?: number;
}

export async function apiCall<T = any>(
  method: string,
  payload?: unknown,
  opts?: ApiCallOptions,
): Promise<T> {
  const timeoutMs = opts?.timeoutMs ?? API_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = timeoutMs > 0 ? setTimeout(() => controller.abort(), timeoutMs) : undefined;
  // 外部 signal 透传：任一取消源触发即中止
  const onOuterAbort = () => controller.abort();
  if (opts?.signal) {
    if (opts.signal.aborted) controller.abort();
    else opts.signal.addEventListener("abort", onOuterAbort, { once: true });
  }
  try {
    const res = await fetch("/git-studio/api/" + method, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload ?? {}),
      signal: controller.signal,
    });
    let body: Envelope<T> | null = null;
    try {
      body = await res.json();
    } catch {
      /* 非 JSON 响应 */
    }
    if (!body) throw new Error("HTTP " + res.status);
    if (!body.ok) throw new Error(body.error?.message || body.error?.code || "HTTP " + res.status);
    return body.value;
  } catch (e: any) {
    // 超时/取消统一成可读文案（DOMException AbortError 直接抛会很晦涩）
    if (e?.name === "AbortError") {
      if (opts?.signal?.aborted) throw new Error("请求已取消");
      throw new Error("请求超时（" + Math.round(timeoutMs / 1000) + "s）：" + method);
    }
    throw e;
  } finally {
    if (timer) clearTimeout(timer);
    opts?.signal?.removeEventListener("abort", onOuterAbort);
  }
}
