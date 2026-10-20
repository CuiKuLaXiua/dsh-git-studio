// src/shared/protocol.ts
var PLUGIN_ID = "dsh-git-studio";
var API_PREFIX = "/git-studio/api";
var HERO_SESSION_KEY = "__git-studio-hero__";
function ok(value) {
  return { ok: true, value };
}
function fail(code, message) {
  return { ok: false, error: { code, message } };
}
var ErrorCode = {
  BadRequest: "bad-request",
  NotFound: "not-found",
  Forbidden: "forbidden",
  Internal: "internal",
  FsError: "fs-error",
  TooLarge: "too-large",
  PtyError: "pty-error"
};

// src/host/trust-fence.ts
function isTrustedApiRequest(req, trustedHosts) {
  const host = String(req?.headers?.host ?? "").toLowerCase();
  if (!host) return false;
  const { hostname, isLoopback } = classifyHost(host);
  if (!isLoopback && !(trustedHosts ?? []).some((h) => String(h).toLowerCase() === host)) {
    return false;
  }
  const site = String(req?.headers?.["sec-fetch-site"] ?? "").toLowerCase();
  if (site === "cross-site") return false;
  const origin = req?.headers?.origin;
  if (origin) {
    let originHostname = "";
    try {
      originHostname = new URL(String(origin)).hostname.toLowerCase();
    } catch {
      return false;
    }
    if (originHostname !== hostname) return false;
  }
  return true;
}
function classifyHost(host) {
  let hostname = host;
  const bracket = host.indexOf("]");
  if (bracket !== -1) {
    hostname = host.slice(0, bracket + 1);
  } else {
    const colon = host.lastIndexOf(":");
    if (colon !== -1 && host.indexOf(":") === colon) hostname = host.slice(0, colon);
  }
  hostname = hostname.replace(/^\[/, "").replace(/\]$/, "");
  const isLoopback = hostname === "127.0.0.1" || hostname === "::1" || hostname === "localhost";
  return { hostname, isLoopback };
}

// src/host/path-security.ts
var PathError = class extends Error {
};

// src/host/fs-error.ts
var FsError = class extends Error {
  constructor(message, wireCode = ErrorCode.FsError, status = 400) {
    super(message);
    this.wireCode = wireCode;
    this.status = status;
    this.name = "FsError";
  }
};

// src/host/git-api.ts
import { spawn } from "node:child_process";

// src/host/session-cwd.ts
async function sessionCwdOf(ctx, sessionId, clientCwd) {
  const realId = sessionId && sessionId !== HERO_SESSION_KEY ? sessionId : void 0;
  if (realId) {
    try {
      const s = await ctx.sessions?.get?.(realId);
      const c = s?.header?.cwd;
      if (typeof c === "string" && c) return c;
    } catch {
    }
    if (typeof clientCwd === "string" && clientCwd) return clientCwd;
    try {
      const info = await ctx.get?.("sessionPersistence")?.inspect?.(realId);
      const c = info?.meta?.cwd;
      if (typeof c === "string" && c) return c;
    } catch {
    }
  } else if (typeof clientCwd === "string" && clientCwd) {
    return clientCwd;
  }
  return process.cwd();
}

// src/host/git-api.ts
var GIT_TIMEOUT_MS = 3e4;
var REPO_PROBE_TIMEOUT_MS = 5e3;
var STATUS_LIMIT = 2e3;
var LOG_PAGE = 30;
var DIFF_MAX_BYTES = 512 * 1024;
var COMMIT_MSG_MAX = 4e3;
function runGit(cwd, args, opts = {}) {
  const timeoutMs = opts.timeoutMs ?? GIT_TIMEOUT_MS;
  const maxBytes = opts.maxBytes ?? 16 * 1024 * 1024;
  const full = ["-C", cwd, "--no-pager", "-c", "color.ui=false", "-c", "core.quotepath=false", ...args];
  return new Promise((resolveP, reject) => {
    const child = spawn("git", full, {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
      env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" }
    });
    let stdout = "";
    let stdoutBytes = 0;
    let over = false;
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new FsError("git " + (args[0] ?? "") + " \u8D85\u65F6\uFF08" + timeoutMs + "ms\uFF09", "git-error"));
    }, timeoutMs);
    child.stdout.on("data", (chunk) => {
      stdoutBytes += chunk.length;
      if (stdoutBytes > maxBytes) {
        over = true;
        return;
      }
      stdout += chunk.toString("utf8");
    });
    child.stderr.on("data", (chunk) => {
      if (stderr.length < 8192) stderr += chunk.toString("utf8");
    });
    child.on("error", (e) => {
      clearTimeout(timer);
      reject(new FsError("\u65E0\u6CD5\u8FD0\u884C git\uFF1A" + e.message + "\uFF08\u8BF7\u786E\u8BA4\u672C\u673A\u5DF2\u5B89\u88C5 git\uFF09", "git-error"));
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0 || opts.allowExit1 === true && code === 1) {
        resolveP(over ? stdout + "\n\u2026 [\u8F93\u51FA\u8D85\u9650\u622A\u65AD]" : stdout);
      } else {
        reject(new FsError(stderr.trim() || "git \u9000\u51FA\u7801 " + String(code), "git-error"));
      }
    });
  });
}
function parseStatusZ(out) {
  const tokens = out.split("\0");
  const entries = [];
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    i += 1;
    if (token === "") continue;
    const xy = token.slice(0, 2);
    const path = token.slice(3);
    entries.push({ path, xy });
    if ((xy[0] === "R" || xy[0] === "C") && tokens[i] !== void 0 && tokens[i] !== "") i += 1;
  }
  return entries;
}
function parseLogLines(out) {
  const rows = [];
  for (const line of out.split("\n")) {
    if (line === "") continue;
    const [hash, subject, author, date, hashFull, refs] = line.split("");
    if (hash === void 0 || subject === void 0) continue;
    rows.push({ hash, subject, author: author ?? "", date: date ?? "", hashFull: hashFull ?? hash, refs: refs ?? "" });
  }
  return rows;
}
async function repoRootOf(ctx, payload) {
  const sessionId = typeof payload?.sessionId === "string" && payload.sessionId ? payload.sessionId : void 0;
  const cwdHint = typeof payload?.cwd === "string" ? payload.cwd : void 0;
  const cwd = await sessionCwdOf(ctx, sessionId, cwdHint);
  try {
    const out = await runGit(cwd, ["rev-parse", "--show-toplevel"], { timeoutMs: REPO_PROBE_TIMEOUT_MS });
    return out.trim() || null;
  } catch (e) {
    const msg = String(e?.message ?? e);
    if (msg.includes("\u65E0\u6CD5\u8FD0\u884C git") || msg.includes("\u8D85\u65F6")) throw e;
    return null;
  }
}
function guardRepoPath(v, name) {
  if (typeof v !== "string" || v === "") throw new FsError("missing field: " + name, ErrorCode.BadRequest);
  if (/^[a-zA-Z]:/.test(v) || v.startsWith("/") || v.startsWith("\\") || v.split(/[\\/]/).includes("..")) {
    throw new FsError("\u975E\u6CD5\u4ED3\u5E93\u8DEF\u5F84: " + v, ErrorCode.Forbidden, 403);
  }
  return v;
}
function guardRepoPaths(v, name) {
  if (!Array.isArray(v) || v.length === 0) throw new FsError("missing field: " + name, ErrorCode.BadRequest);
  if (v.length > 500) throw new FsError("\u8DEF\u5F84\u6570\u91CF\u8D85\u4E0A\u9650\uFF08500\uFF09", ErrorCode.BadRequest);
  return v.map((p) => guardRepoPath(p, name));
}
function currentBranch(root) {
  return runGit(root, ["symbolic-ref", "--short", "HEAD"]).then((s) => s.trim()).catch(() => runGit(root, ["rev-parse", "--abbrev-ref", "HEAD"]).then((s) => s.trim()).catch(() => "HEAD"));
}
var GIT_METHODS = {
  "git.status": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const [branch, raw] = await Promise.all([
      currentBranch(root),
      runGit(root, ["status", "--porcelain=v1", "-z", "--untracked-files=all"])
    ]);
    const parsed = parseStatusZ(raw);
    const truncated = parsed.length > STATUS_LIMIT;
    return {
      isRepo: true,
      root,
      branch,
      entries: truncated ? parsed.slice(0, STATUS_LIMIT) : parsed,
      truncated
    };
  },
  "git.diff": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const path = guardRepoPath(payload?.path, "path");
    const staged = payload?.staged === true;
    const untracked = payload?.untracked === true;
    if (untracked) {
      const patch2 = await runGit(
        root,
        ["diff", "--no-ext-diff", "--no-color", "--no-index", "-U3", "--", "/dev/null", path],
        { allowExit1: true, maxBytes: DIFF_MAX_BYTES }
      );
      return { patch: patch2 };
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
    if (message.length > COMMIT_MSG_MAX) throw new FsError("\u63D0\u4EA4\u4FE1\u606F\u8FC7\u957F\uFF08>" + COMMIT_MSG_MAX + "\uFF09", ErrorCode.BadRequest);
    await runGit(root, ["commit", "-m", message]);
    return { ok: true };
  },
  "git.branch": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const [current, raw] = await Promise.all([
      currentBranch(root),
      runGit(root, ["for-each-ref", "--format=%(refname:short)", "refs/heads"])
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
      "--pretty=format:%h%x1f%s%x1f%an%x1f%ai%x1f%H%x1f%D"
    ]);
    return { entries: parseLogLines(raw), page: LOG_PAGE };
  },
  "git.discard": async (ctx, payload) => {
    const root = await repoRootOf(ctx, payload);
    if (root === null) return { isRepo: false };
    const paths = guardRepoPaths(payload?.paths, "paths");
    if (payload?.untracked === true) {
      await runGit(root, ["clean", "-q", "-f", "--", ...paths]);
    } else {
      await runGit(root, ["checkout", "-q", "HEAD", "--", ...paths]);
    }
    return { ok: true };
  }
};

// src/host/index.ts
var inject = ["webServer", "sessions"];
function readWebStartup(ctx) {
  for (const name of ["webStartup", "webRuntime"]) {
    try {
      const svc = ctx.get?.(name);
      if (svc) return svc;
    } catch {
    }
  }
  return void 0;
}
var MAX_BODY = 1024 * 1024;
function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}
function readJsonBody(req) {
  return new Promise((resolveBody, reject) => {
    const chunks = [];
    let total = 0;
    req.on("data", (c) => {
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
      if (text.charCodeAt(0) === 65279) text = text.slice(1);
      try {
        resolveBody(text ? JSON.parse(text) : {});
      } catch {
        reject(new Error("bad-json"));
      }
    });
    req.on("error", reject);
  });
}
var METHODS = {
  ...GIT_METHODS
};
function wireErrorOf(e) {
  if (e instanceof FsError) return { status: e.status, code: e.wireCode, message: e.message };
  if (e instanceof PathError) return { status: 403, code: ErrorCode.Forbidden, message: e.message };
  const msg = String(e?.message ?? e);
  const sepIdx = msg.indexOf(":");
  const maybeCode = sepIdx > 0 ? msg.slice(0, sepIdx) : "";
  if (maybeCode === "bad-request") {
    return { status: 400, code: ErrorCode.BadRequest, message: msg.slice(sepIdx + 1) || "bad request" };
  }
  return void 0;
}
function apply(ctx) {
  const { webServer, logger } = ctx;
  const webStartup = readWebStartup(ctx);
  function failScope(res, e, scope) {
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
    handler: async (req, res) => {
      if (!isTrustedApiRequest(req, webStartup?.trustedHosts)) {
        sendJson(res, 403, fail(ErrorCode.Forbidden, "untrusted request"));
        return;
      }
      const method = decodeURIComponent(
        new URL(req.url ?? "/", "http://x").pathname.replace(API_PREFIX + "/", "")
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
      let payload;
      try {
        payload = await readJsonBody(req);
      } catch (e) {
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
      } catch (e) {
        failScope(res, e, method);
      }
    }
  });
  logger?.info?.(
    PLUGIN_ID + ": route ready \u2014 " + API_PREFIX + " (" + Object.keys(METHODS).length + " methods)"
  );
}
export {
  GIT_METHODS,
  apply,
  inject,
  parseLogLines,
  parseStatusZ
};
