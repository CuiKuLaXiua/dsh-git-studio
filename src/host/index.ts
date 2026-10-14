// dsh-git-studio — Host 半端
// 契约：export const inject = [...]; export function apply(ctx)
//
// 路由面（全部过信任围栏）：
//   POST /git-studio/api/<method>  — 统一信封 + body 1MB 限额
//     git.status / git.diff / git.stage / git.unstage / git.commit / git.branch / git.log / git.discard
//   （定根不单独暴露：git-api 内部经 sessionCwdOf 完成）
// 安全层（trust-fence / path-security）对路由原样复用。

import { API_PREFIX, ErrorCode, PLUGIN_ID, fail, ok } from "../shared/protocol";
import type { Envelope } from "../shared/protocol";
import { isTrustedApiRequest } from "./trust-fence";
import { PathError } from "./path-security";
import { FsError } from "./fs-error";
import { GIT_METHODS } from "./git-api";

export { GIT_METHODS, parseStatusZ, parseLogLines } from "./git-api";

// webRuntime 保留：它承载 web 启动选项（`trustedHosts` 即来自 dsh-web-app 启动
// 时的 options.trustedHost），信任围栏据此放行额外主机。
// ⚠ 不可因"看起来没用到"就摘掉 —— cordis 对**未注入属性**的读取是直接抛错的
// （`cannot get property "webRuntime" without inject`），apply 里一解构即启动失败。
export const inject = ["webServer", "sessions", "webRuntime"];

const MAX_BODY = 1024 * 1024; // 1MB（对齐生态 readJsonBody 上限）

function sendJson(res: any, status: number, body: Envelope<unknown>): void {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

// JSON body 读取：1MB 上限防无限读；兼容 BOM（fetch-runtime 同款容错）
function readJsonBody(req: any): Promise<any> {
  return new Promise((resolveBody, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;
    req.on("data", (c: Buffer) => {
      total += c.length;
      if (total > MAX_BODY) {
        reject(new Error("too-large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => {
      if (!chunks.length) {
        resolveBody({});
        return;
      }
      let text = Buffer.concat(chunks).toString("utf8");
      if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
      try {
        resolveBody(text ? JSON.parse(text) : {});
      } catch {
        reject(new Error("bad-json"));
      }
    });
    req.on("error", reject);
  });
}

type MethodHandler = (ctx: any, payload: any) => Promise<unknown>;

// 只有 Git：定根由 git-api 内部的 sessionCwdOf 完成，不再单独暴露 session.cwd
// （旧版文件树靠它定根，文件树下线后该方法已无调用者）。
const METHODS: Record<string, MethodHandler> = {
  ...GIT_METHODS,
};

/** 业务错误 → HTTP status + 信封 code 的统一映射；不认识的一律 500 */
function wireErrorOf(e: any): { status: number; code: string; message: string } | undefined {
  if (e instanceof FsError) return { status: e.status, code: e.wireCode, message: e.message };
  // 越界/软链出界：路径安全层语义，403 forbidden
  if (e instanceof PathError) return { status: 403, code: ErrorCode.Forbidden, message: e.message };
  const msg = String(e?.message ?? e);
  const sepIdx = msg.indexOf(":");
  const maybeCode = sepIdx > 0 ? msg.slice(0, sepIdx) : "";
  if (maybeCode === "bad-request") {
    return { status: 400, code: ErrorCode.BadRequest, message: msg.slice(sepIdx + 1) || "bad request" };
  }
  return undefined;
}

export function apply(ctx: any): void {
  const { webServer, webRuntime, logger } = ctx;

  // 业务错误 → 信封响应；不认识的记日志后 500
  function failScope(res: any, e: any, scope: string): void {
    const wired = wireErrorOf(e);
    if (wired) {
      sendJson(res, wired.status, fail(wired.code, wired.message));
      return;
    }
    logger?.error?.(PLUGIN_ID + ": " + scope + " failed: " + (e?.stack ?? String(e?.message ?? e)));
    sendJson(res, 500, fail(ErrorCode.Internal, "internal error"));
  }

  webServer.register({
    kind: "prefix",
    path: API_PREFIX,
    handler: async (req: any, res: any) => {
      // 信任围栏：Host 回环/信任列表 + sec-fetch-site + Origin hostname（Edge 151 兼容）
      if (!isTrustedApiRequest(req, webRuntime?.trustedHosts)) {
        sendJson(res, 403, fail(ErrorCode.Forbidden, "untrusted request"));
        return;
      }
      const method = decodeURIComponent(
        new URL(req.url ?? "/", "http://x").pathname.replace(API_PREFIX + "/", ""),
      );
      if (req.method !== "POST" || !method || method.includes("/")) {
        sendJson(res, 400, fail(ErrorCode.BadRequest, "expect POST " + API_PREFIX + "/<method>"));
        return;
      }
      const handler = METHODS[method];
      if (!handler) {
        sendJson(res, 404, fail(ErrorCode.NotFound, "unknown method: " + method));
        return;
      }
      let payload: any;
      try {
        payload = await readJsonBody(req);
      } catch (e: any) {
        if (String(e?.message) === "too-large") {
          sendJson(res, 413, fail(ErrorCode.TooLarge, "body exceeds 1MB"));
          return;
        }
        sendJson(res, 400, fail(ErrorCode.BadRequest, "invalid JSON body"));
        return;
      }
      try {
        const value = await handler(ctx, payload);
        sendJson(res, 200, ok(value));
      } catch (e: any) {
        failScope(res, e, method);
      }
    },
  });

  logger?.info?.(
    PLUGIN_ID + ": route ready — " + API_PREFIX + " (" + Object.keys(METHODS).length + " methods)",
  );
}
