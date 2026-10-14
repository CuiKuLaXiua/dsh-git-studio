/**
 * Git 标签正文（原生右侧栏标签类型）。
 *
 * 自旧 `builtins/git.tsx` 的 `GitViewInner` 迁移，**UI 与请求治理逻辑原样保留**，
 * 仅两处适配：
 *   1. 会话来源：`svc.getSessionId()` → 框架注入的 `sessionId`
 *      （原生正文由 slot 运行时按会话派发，比自持 store 更准）
 *   2. 组件位置：由描述符 `render()` 改为主体组件，由 keyed slot 直接渲染
 *
 * 保留的纪律（迁移中不可丢）：
 *   - 在途请求按「类别」治理：同类新请求掐断旧的，跨类互不影响，卸载整批掐断
 *     （2026-09-09 卡死修复：裸调无 abort 会让旧回包盖新状态并钉住组件树）
 *   - 破坏性操作（discard）先 confirm
 *   - diff 渲染 500 行上限；测试/锁文件默认折叠
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiCall } from "./api";

interface StatusEntry {
  path: string;
  xy: string;
}
interface StatusResult {
  isRepo: boolean;
  root?: string;
  branch?: string;
  entries?: StatusEntry[];
  truncated?: boolean;
}
interface LogEntry {
  hash: string;
  subject: string;
  author: string;
  date: string;
  refs: string;
}

const PATCH_RENDER_LIMIT = 500;
const LOG_PAGE = 30;

/** 测试与锁文件默认折叠（变更量巨大且几乎从不逐行审） */
function collapseDefaultFor(path: string): boolean {
  return (
    /(^|\/)(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb|Cargo\.lock|Cargo\.lock\.orig|poetry\.lock|composer\.lock|Gemfile\.lock|go\.sum)$/i.test(
      path,
    ) ||
    /(^|\/)(__tests__|tests|test|spec|snapshots)\//i.test(path) ||
    /\.(test|spec|snap)\.[^./]+$/i.test(path)
  );
}

function baseName(p: string): string {
  const i = p.lastIndexOf("/");
  return i >= 0 ? p.slice(i + 1) : p;
}

function badgeOf(xy: string, side: 0 | 1): string {
  if (xy === "??") return "??";
  return side === 0 ? xy[0] : xy[1];
}

function lineKind(line: string): "meta" | "hunk" | "add" | "del" | "ctx" {
  if (
    line.startsWith("diff ") ||
    line.startsWith("index ") ||
    line.startsWith("---") ||
    line.startsWith("+++") ||
    line.startsWith("new file") ||
    line.startsWith("deleted file") ||
    line.startsWith("rename ") ||
    line.startsWith("similarity ") ||
    line.startsWith("Binary files") ||
    line.startsWith("\\ No newline")
  )
    return "meta";
  if (line.startsWith("@@")) return "hunk";
  if (line.startsWith("+")) return "add";
  if (line.startsWith("-")) return "del";
  return "ctx";
}

interface RowSpec {
  path: string;
  badge: string;
  staged: boolean;
  untracked: boolean;
}

// ── 行前文件分型图标（沿用文件管理器 5 色，14px 描边）──
const GitFiFile = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.2 2h4.6l3.6 3.6v7.8c0 .9-.7 1.6-1.6 1.6H4.2c-.9 0-1.6-.7-1.6-1.6V3.6c0-.9.7-1.6 1.6-1.6z" /><path d="M8.6 2.2v3.6h3.6" /></svg>
);
const GitFiImg = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="3" width="12" height="10" rx="1.6" /><circle cx="5.7" cy="6.4" r="1.1" /><path d="M2.9 11.5l3.3-3.5 2.5 2.6 1.9-1.8 2.5 2.6" /></svg>
);
const GitFiDoc = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.2 2h4.6l3.6 3.6v7.8c0 .9-.7 1.6-1.6 1.6H4.2c-.9 0-1.6-.7-1.6-1.6V3.6c0-.9.7-1.6 1.6-1.6z" /><path d="M5.6 8h4.8M5.6 10.6h4.8" /></svg>
);
const GitFiCode = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5.8 4.2 2.4 8l3.4 3.8" /><path d="M10.2 4.2 13.6 8l-3.4 3.8" /></svg>
);
const GitFiZip = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.2 2h4.6l3.6 3.6v7.8c0 .9-.7 1.6-1.6 1.6H4.2c-.9 0-1.6-.7-1.6-1.6V3.6c0-.9.7-1.6 1.6-1.6z" /><path d="M7.4 2.2v1.6M7.4 5v1.6M7.4 7.8v1.6" /></svg>
);
const GitActPlus = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3.2v9.6M3.2 8h9.6" /></svg>
);
const GitActMinus = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.2 8h9.6" /></svg>
);
const GitActUndo = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M7 3.5H4.2c-.9 0-1.6.7-1.6 1.6v1.2c0 .9.7 1.6 1.6 1.6H9.8" />
    <path d="M6.2 2.2 3.6 4.8l2.6 2.6" />
  </svg>
);
const GitBranchIco = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="5" cy="4" r="1.8" />
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="11" cy="8" r="1.8" />
    <path d="M5 5.8v4.4M5 8c0-2 2.4-1.6 4.2-2.2" />
  </svg>
);
const GitRefreshIco = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13.2 8A5.2 5.2 0 1 1 8 2.8c2 0 3.7 1.1 4.6 2.8" />
    <path d="M12.9 1.8v3.8h-3.8" />
  </svg>
);
const GitCheckHeroIco = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11" /></svg>
);
const GitCopyIco = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="5.2" y="5.2" width="7.6" height="7.6" rx="1.4" />
    <path d="M3.4 10.2V4.6c0-.8.6-1.4 1.4-1.4h5.6" />
  </svg>
);
const GitCheckIco = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.2 8.4l3.2 3.2 6.4-7.2" /></svg>
);
const GitBackIco = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M9.6 3.6 5.2 8l4.4 4.4" /></svg>
);

const IMG_EXT2 = new Set(["png","jpg","jpeg","gif","webp","bmp","ico","svg","avif"]);
const DOC_EXT2 = new Set(["md","markdown","txt","pdf","doc","docx"]);
const CODE_EXT2 = new Set(["ts","tsx","js","jsx","mjs","cjs","py","rs","go","c","h","cpp","hpp","java","kt","swift","rb","php","cs","vue","svelte","json","jsonc","yaml","yml","toml","ini","cfg","sh","bat","ps1","sql","html","css","scss","less","xml","lua","dart"]);
const ZIP_EXT2 = new Set(["zip","gz","tar","rar","7z","bz2","xz","zst"]);

function gitFileIcon(name: string): any {
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".") + 1).toLowerCase() : "";
  if (IMG_EXT2.has(ext)) return <span className="zenwb-fi zenwb-fi-img"><GitFiImg /></span>;
  if (DOC_EXT2.has(ext)) return <span className="zenwb-fi zenwb-fi-doc"><GitFiDoc /></span>;
  if (CODE_EXT2.has(ext)) return <span className="zenwb-fi zenwb-fi-code"><GitFiCode /></span>;
  if (ZIP_EXT2.has(ext)) return <span className="zenwb-fi zenwb-fi-zip"><GitFiZip /></span>;
  return <span className="zenwb-fi zenwb-fi-file"><GitFiFile /></span>;
}

function actIcon(label: string): any {
  if (label === "＋" || label === "stage") return <GitActPlus />;
  if (label === "−" || label === "unstage") return <GitActMinus />;
  if (label === "↩" || label === "discard") return <GitActUndo />;
  return label;
}

function GitSkeleton() {
  const rows = ["96%", "78%", "88%", "64%", "91%", "73%"];
  return (
    <div className="zenwb-git-sk" aria-busy="true" aria-label="正在加载 Git 状态">
      <div className="zenwb-sk zenwb-git-sk-head" />
      <div className="zenwb-sk zenwb-git-sk-sec" />
      {rows.slice(0, 3).map((w, i) => (
        <div key={i} className="zenwb-sk zenwb-git-sk-row" style={{ width: w }} />
      ))}
      <div className="zenwb-sk zenwb-git-sk-sec" />
      {rows.slice(3).map((w, i) => (
        <div key={i} className="zenwb-sk zenwb-git-sk-row" style={{ width: w }} />
      ))}
    </div>
  );
}

function DiffSkeleton() {
  const rows: { w: string; k: "" | "zenwb-git-sk-add" | "zenwb-git-sk-del" }[] = [
    { w: "92%", k: "" },
    { w: "78%", k: "zenwb-git-sk-add" },
    { w: "85%", k: "" },
    { w: "64%", k: "zenwb-git-sk-del" },
    { w: "88%", k: "" },
    { w: "72%", k: "zenwb-git-sk-add" },
    { w: "81%", k: "" },
    { w: "58%", k: "" },
  ];
  return (
    <div className="zenwb-git-patch" aria-busy="true" aria-label="正在拉取 diff">
      {rows.map((r, i) => (
        <div key={i} className="zenwb-git-l">
          <span className="zenwb-git-lnum"> </span>
          <span className={"zenwb-sk zenwb-git-sk-patch" + (r.k ? " " + r.k : "")} style={{ width: r.w }} />
        </div>
      ))}
    </div>
  );
}

function FileRow({
  row,
  active,
  actions,
  onOpen,
  busy,
}: {
  row: RowSpec;
  active: boolean;
  actions: { label: string; title: string; danger?: boolean; run: () => void }[];
  onOpen: () => void;
  busy: boolean;
}) {
  return (
    <div className={"zenwb-git-row" + (active ? " zenwb-on" : "")}>
      <span className={"zenwb-git-badge zenwb-git-b-" + (row.badge === "??" ? "U" : row.badge)}>{row.badge}</span>
      {gitFileIcon(baseName(row.path))}
      <span className="zenwb-git-row-name" title={row.path} onClick={onOpen}>
        {baseName(row.path)}
        {row.path.includes("/") ? <span className="zenwb-git-row-dir"> {row.path.slice(0, row.path.lastIndexOf("/"))}</span> : null}
      </span>
      <span className="zenwb-git-row-actions">
        {actions.map((a) => (
          <button
            key={a.label}
            className={"zenwb-git-act" + (a.danger ? " zenwb-git-act-danger" : "")}
            title={a.title}
            disabled={busy}
            onClick={(e) => {
              e.stopPropagation();
              a.run();
            }}
          >
            {actIcon(a.label)}
          </button>
        ))}
      </span>
    </div>
  );
}

function DiffView({
  sel,
  patch,
  onBack,
}: {
  sel: { path: string; staged: boolean; untracked: boolean };
  patch: string | null;
  onBack: () => void;
}) {
  const [expanded, setExpanded] = useState(!collapseDefaultFor(sel.path));
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setExpanded(!collapseDefaultFor(sel.path));
  }, [sel.path]);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);
  const allLines = patch === null ? [] : patch.split("\n");
  const collapsedNote = collapseDefaultFor(sel.path)
    ? "测试/锁文件：默认折叠"
    : allLines.length > PATCH_RENDER_LIMIT
      ? "diff 过长：仅渲染前 " + PATCH_RENDER_LIMIT + " 行（共 " + allLines.length + " 行）"
      : null;
  const lines = expanded ? allLines.slice(0, PATCH_RENDER_LIMIT) : [];
  async function copyPatch() {
    const txt = patch ?? "";
    try {
      await navigator.clipboard.writeText(txt);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
  }
  return (
    <div className="zenwb-git-diff">
      <div className="zenwb-git-diff-head">
        <button className="zenwb-git-back" onClick={onBack}>
          <GitBackIco />
          返回
        </button>
        <span className="zenwb-git-diff-path" title={sel.path}>
          {sel.path}
        </span>
        <span className="zenwb-git-side-tag">{sel.untracked ? "新文件" : sel.staged ? "已暂存" : "工作区"}</span>
        <button
          className={"zenwb-iconbtn zenwb-git-copy" + (copied ? " zenwb-on" : "")}
          title={copied ? "已复制" : "复制 diff"}
          onClick={copyPatch}
        >
          {copied ? <GitCheckIco /> : <GitCopyIco />}
        </button>
      </div>
      {patch === null ? (
        <DiffSkeleton />
      ) : collapsedNote && !expanded ? (
        <button className="zenwb-git-collapse-bar" onClick={() => setExpanded(true)}>
          {collapsedNote} · 点击展开（{allLines.length} 行）
        </button>
      ) : (
        <>
          {collapsedNote ? (
            <button className="zenwb-git-collapse-bar" onClick={() => setExpanded(false)}>
              折叠
            </button>
          ) : null}
          <div className="zenwb-git-patch">
            {lines.map((l, i) => {
              const k = lineKind(l);
              return (
                <div key={i} className={"zenwb-git-l zenwb-git-l-" + k}>
                  <span className="zenwb-git-lnum">{i + 1}</span>
                  <span className="zenwb-git-ltxt">{l === "" ? " " : l}</span>
                </div>
              );
            })}
            {expanded && allLines.length > PATCH_RENDER_LIMIT ? (
              <div className="zenwb-git-trunc">… 已截断（共 {allLines.length} 行，仅渲染前 {PATCH_RENDER_LIMIT} 行）</div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * 原生标签正文。
 *
 * 框架按 `sidebar.right.pane.tab` 的注入把 `sessionId` 与 `useTabInfo` 交给正文
 * （对照官方 `FilesBody({ useTabInfo, sessionId, … })`）。本组件只消费 sessionId。
 */
export function GitBody(props: any) {
  const sessionId: string | undefined = props?.sessionId;
  const [status, setStatus] = useState<StatusResult | null>(null);
  const [fatal, setFatal] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [view, setView] = useState<"changes" | "history">("changes");
  const [sel, setSel] = useState<{ path: string; staged: boolean; untracked: boolean } | null>(null);
  const [patch, setPatch] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [commitErr, setCommitErr] = useState<string | null>(null);
  const [hist, setHist] = useState<LogEntry[]>([]);
  const [histDone, setHistDone] = useState(false);

  // ── 在途请求治理（2026-09-09 卡死修复，迁移中保留）──
  const inflightRef = useRef<Map<string, AbortController>>(new Map());
  const aliveRef = useRef(true);

  function begin(kind: string): AbortController {
    inflightRef.current.get(kind)?.abort();
    const ac = new AbortController();
    inflightRef.current.set(kind, ac);
    return ac;
  }

  function readable(e: any): string | null {
    if (e?.name === "AbortError") return null;
    return String(e?.message ?? e);
  }

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      for (const ac of inflightRef.current.values()) ac.abort();
      inflightRef.current.clear();
    };
  }, [sessionId]);

  const refresh = useCallback((): void => {
    const ac = begin("status");
    setBusy(true);
    apiCall<StatusResult>("git.status", { sessionId }, { signal: ac.signal })
      .then((s) => {
        if (!aliveRef.current) return;
        setStatus(s);
        setFatal(null);
      })
      .catch((e) => {
        const m = readable(e);
        if (m !== null && aliveRef.current) setFatal(m);
      })
      .finally(() => {
        if (aliveRef.current) setBusy(false);
      });
  }, [sessionId]);

  useEffect(() => {
    setStatus(null);
    setFatal(null);
    setSel(null);
    setPatch(null);
    setHist([]);
    setHistDone(false);
    if (sessionId) refresh();
    else setBusy(false);
  }, [sessionId, refresh]);

  const loadHistory = useCallback(
    (reset: boolean): void => {
      const ac = begin("log");
      setBusy(true);
      const skip = reset ? 0 : hist.length;
      apiCall<{ entries: LogEntry[]; page: number }>("git.log", { sessionId, skip }, { signal: ac.signal })
        .then((d) => {
          if (!aliveRef.current) return;
          setHist((h) => (reset ? d.entries : [...h, ...d.entries]));
          setHistDone(d.entries.length < d.page);
        })
        .catch((e) => {
          const m = readable(e);
          if (m !== null && aliveRef.current) setFatal(m);
        })
        .finally(() => {
          if (aliveRef.current) setBusy(false);
        });
    },
    [sessionId, hist.length],
  );

  useEffect(() => {
    if (view === "history" && hist.length === 0) loadHistory(true);
  }, [view, hist.length, loadHistory]);

  function mutate(method: string, payload: Record<string, unknown>, after?: () => void): void {
    const ac = begin("mutate");
    setBusy(true);
    apiCall(method, { sessionId, ...payload }, { signal: ac.signal })
      .then(() => {
        if (!aliveRef.current) return;
        setSel(null);
        setPatch(null);
        if (after) after();
        refresh();
      })
      .catch((e) => {
        const m = readable(e);
        if (m !== null && aliveRef.current) setFatal(m);
      })
      .finally(() => {
        if (aliveRef.current) setBusy(false);
      });
  }

  function discard(row: RowSpec): void {
    const what = row.untracked ? "删除未跟踪文件（不可恢复）" : "丢弃此文件的全部未暂存修改";
    if (!window.confirm(what + "：\n" + row.path + "\n\n确定？")) return;
    mutate("git.discard", { paths: [row.path], untracked: row.untracked });
  }

  function openDiff(row: RowSpec): void {
    setSel(row);
    setPatch(null);
    const ac = begin("diff");
    apiCall<{ patch: string }>(
      "git.diff",
      { sessionId, path: row.path, staged: row.staged, untracked: row.untracked },
      { signal: ac.signal },
    )
      .then((d) => {
        if (aliveRef.current) setPatch(d.patch);
      })
      .catch((e) => {
        const m = readable(e);
        if (m !== null && aliveRef.current) setPatch("加载 diff 失败：" + m);
      });
  }

  function commit(): void {
    if (msg.trim() === "") return;
    const ac = begin("commit");
    setBusy(true);
    setCommitErr(null);
    apiCall("git.commit", { sessionId, message: msg }, { signal: ac.signal })
      .then(() => {
        if (!aliveRef.current) return;
        setMsg("");
        setHist([]);
        if (view === "history") loadHistory(true);
        refresh();
      })
      .catch((e) => {
        const m = readable(e);
        if (m !== null && aliveRef.current) setCommitErr(m);
      })
      .finally(() => {
        if (aliveRef.current) setBusy(false);
      });
  }

  const { stagedRows, unstagedRows, untrackedRows } = useMemo(() => {
    const stagedRows: RowSpec[] = [];
    const unstagedRows: RowSpec[] = [];
    const untrackedRows: RowSpec[] = [];
    for (const e of status?.entries ?? []) {
      if (e.xy === "??") {
        untrackedRows.push({ path: e.path, badge: "??", staged: false, untracked: true });
        continue;
      }
      if (e.xy[0] !== " " && e.xy[0] !== "?")
        stagedRows.push({ path: e.path, badge: badgeOf(e.xy, 0), staged: true, untracked: false });
      if (e.xy[1] !== " " && e.xy[1] !== "?")
        unstagedRows.push({ path: e.path, badge: badgeOf(e.xy, 1), staged: false, untracked: false });
    }
    return { stagedRows, unstagedRows, untrackedRows };
  }, [status]);

  if (!sessionId || sessionId === "__git-studio-hero__") {
    return (
      <div className="zenwb-git">
        <div className="zenwb-git-empty">请先打开一个对话</div>
      </div>
    );
  }
  if (fatal !== null) {
    return (
      <div className="zenwb-git">
        <div className="zenwb-git-empty">Git 面板出错：{fatal}</div>
        <div className="zenwb-git-actions">
          <button className="zenwb-btn" onClick={refresh}>
            重试
          </button>
        </div>
      </div>
    );
  }
  if (status === null)
    return (
      <div className="zenwb-git">
        <GitSkeleton />
      </div>
    );
  if (!status.isRepo) {
    return (
      <div className="zenwb-git">
        <div className="zenwb-git-empty">此工作区不是 Git 仓库</div>
      </div>
    );
  }

  return (
    <div className="zenwb-git">
      <div className="zenwb-git-head">
        <span className="zenwb-git-branch" title={status.root ?? status.branch}>
          <GitBranchIco />
          <span className="zenwb-git-branch-name">{status.branch}</span>
        </span>
        <span className="zenwb-git-head-actions">
          <div className="zenwb-git-seg" role="tablist" aria-label="Git 视图">
            <button
              type="button"
              role="tab"
              aria-selected={view === "changes"}
              className={"zenwb-git-vw" + (view === "changes" ? " zenwb-on" : "")}
              onClick={() => setView("changes")}
            >
              变更
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "history"}
              className={"zenwb-git-vw" + (view === "history" ? " zenwb-on" : "")}
              onClick={() => setView("history")}
            >
              历史
            </button>
          </div>
          <button
            type="button"
            className={"zenwb-iconbtn zenwb-git-refresh" + (busy ? " zenwb-busy" : "")}
            title={busy ? "刷新中…" : "刷新状态"}
            aria-label="刷新 Git 状态"
            disabled={busy}
            onClick={() => (view === "history" ? (setHist([]), loadHistory(true)) : refresh())}
          >
            <GitRefreshIco />
          </button>
        </span>
      </div>
      {status.truncated ? <div className="zenwb-git-note">变更超过 2000 条：仅显示前 2000 条</div> : null}

      {view === "history" ? (
        <div className="zenwb-git-hist">
          {hist.map((h) => (
            <div key={h.hash} className="zenwb-git-commit">
              <div className="zenwb-git-commit-top">
                <span className="zenwb-git-commit-hash">{h.hash}</span>
                {h.refs
                  ? h.refs
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((r) => (
                        <span key={r} className="zenwb-git-ref">
                          {r}
                        </span>
                      ))
                  : null}
              </div>
              <span className="zenwb-git-commit-subj" title={h.subject}>
                {h.subject}
              </span>
              <span className="zenwb-git-commit-meta">
                {h.author} · {h.date.slice(0, 10)}
              </span>
            </div>
          ))}
          {!histDone ? (
            <button className="zenwb-git-more" disabled={busy} onClick={() => loadHistory(false)}>
              {busy ? "加载中…" : "加载更多"}
            </button>
          ) : (
            <div className="zenwb-git-more zenwb-git-end">没有更早的提交了</div>
          )}
        </div>
      ) : sel !== null ? (
        <DiffView sel={sel} patch={patch} onBack={() => setSel(null)} />
      ) : (
        (() => {
          const unstagedTotal = unstagedRows.length + untrackedRows.length;
          const isClean = stagedRows.length === 0 && unstagedTotal === 0;
          const hasStaged = stagedRows.length > 0;
          if (isClean) {
            return (
              <div className="zenwb-git-clean-hero">
                <span className="zenwb-git-clean-hero-ico">
                  <GitCheckHeroIco />
                </span>
                <div className="zenwb-git-clean-hero-title">工作区干净</div>
                <div className="zenwb-git-clean-hero-sub">
                  没有可提交的更改
                  <br />
                  暂存新的修改后，这里会出现提交框
                </div>
                <button className="zenwb-btn" onClick={() => setView("history")}>
                  查看提交历史
                </button>
              </div>
            );
          }
          return (
            <div className="zenwb-git-changes">
              <div className="zenwb-git-sec">
                <div className="zenwb-git-sec-title">
                  <span>暂存的更改 · {stagedRows.length}</span>
                  {stagedRows.length > 0 ? (
                    <button
                      type="button"
                      className="zenwb-git-sec-act"
                      disabled={busy}
                      onClick={() => mutate("git.unstage", { paths: stagedRows.map((r) => r.path) })}
                    >
                      全部取消暂存
                    </button>
                  ) : null}
                </div>
                {stagedRows.length === 0 ? (
                  <div className="zenwb-git-sec-empty">暂无暂存 — 在下方文件行点「+」或「全部暂存」</div>
                ) : null}
                {stagedRows.map((r) => (
                  <FileRow
                    key={"s " + r.path}
                    row={r}
                    active={sel?.path === r.path && sel.staged}
                    busy={busy}
                    onOpen={() => openDiff(r)}
                    actions={[{ label: "unstage", title: "取消暂存", run: () => mutate("git.unstage", { paths: [r.path] }) }]}
                  />
                ))}
              </div>
              <div className="zenwb-git-sec">
                <div className="zenwb-git-sec-title">
                  <span>更改 · {unstagedTotal}</span>
                  {unstagedTotal > 0 ? (
                    <button
                      type="button"
                      className="zenwb-git-sec-act"
                      disabled={busy}
                      onClick={() => mutate("git.stage", { paths: [...unstagedRows, ...untrackedRows].map((r) => r.path) })}
                    >
                      全部暂存
                    </button>
                  ) : null}
                </div>
                {unstagedRows.map((r) => (
                  <FileRow
                    key={"w " + r.path}
                    row={r}
                    active={sel?.path === r.path && !sel.staged}
                    busy={busy}
                    onOpen={() => openDiff(r)}
                    actions={[
                      { label: "stage", title: "暂存", run: () => mutate("git.stage", { paths: [r.path] }) },
                      { label: "discard", title: "丢弃修改", danger: true, run: () => discard(r) },
                    ]}
                  />
                ))}
                {untrackedRows.map((r) => (
                  <FileRow
                    key={"u " + r.path}
                    row={r}
                    active={sel?.path === r.path && !sel.staged}
                    busy={busy}
                    onOpen={() => openDiff(r)}
                    actions={[
                      { label: "stage", title: "暂存", run: () => mutate("git.stage", { paths: [r.path] }) },
                      { label: "discard", title: "删除未跟踪文件", danger: true, run: () => discard(r) },
                    ]}
                  />
                ))}
              </div>
              <div className="zenwb-git-commitbox">
                <div className="zenwb-git-commitbox-head">
                  <span>提交</span>
                  <span className="zenwb-git-commitbox-count">
                    {hasStaged ? "将提交 " + stagedRows.length + " 个文件" : "暂存后可提交"}
                  </span>
                </div>
                {!hasStaged ? (
                  <div className="zenwb-git-stage-hint">提交前需先暂存文件 — 点文件行「+」，或「全部暂存」。</div>
                ) : null}
                <textarea
                  className="zenwb-git-msg"
                  placeholder={hasStaged ? "提交信息（Ctrl+Enter 提交）" : "暂存文件后在此输入提交信息…"}
                  value={msg}
                  rows={2}
                  disabled={!hasStaged}
                  onChange={(e: any) => setMsg(e.target.value)}
                  onKeyDown={(e: any) => {
                    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                      e.preventDefault();
                      commit();
                    }
                  }}
                />
                {commitErr ? <div className="zenwb-git-commit-err">{commitErr}</div> : null}
                <button
                  className="zenwb-btn zenwb-git-commit-btn"
                  disabled={busy || msg.trim() === "" || !hasStaged}
                  title={
                    busy
                      ? "执行中…"
                      : !hasStaged
                        ? "需先暂存文件"
                        : msg.trim() === ""
                          ? "请输入提交信息"
                          : "提交 " + stagedRows.length + " 个文件"
                  }
                  onClick={commit}
                >
                  {busy ? "提交中…" : hasStaged ? "提交（" + stagedRows.length + "）" : "提交"}
                </button>
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
