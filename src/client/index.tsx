/**
 * zenith-workbench 客户端 —— 独立 Git 浮窗（方案 A）。
 *
 * ## 为什么不走 `sidebarRight.openTab → float`
 *
 * `openTab` 在 store 里固定 `planSetExpanded(true)`，与建标签同一次 state 更新，
 * 拆不开；`float(tabId)` 又必须先拿到正文挂载后的 tabId。时序上必然
 * 「右栏展开 → 收起」，且必须 hack layout grid 才能消 reflow —— 2026-09-11
 * 试过用空白 split 改写 `grid-template-columns`，把 `minmax(0, 1fr)` 写坏，
 * 中栏塌掉导致会话区纯白。故彻底脱离 sidebar-right。
 *
 * ## 形态
 *
 * - 入口：会话头 `utilities`（优先 portal 进 shell 的 `#zenith-header-extra`）
 * - 面板：自建 `position:fixed` 浮层，portal 到 `document.body`
 * - 正文：复用 `GitBody`（host 仍是 `git.*`，只传 sessionId）
 * - 交互：标题栏拖动、右下角缩放、× 关闭；不依赖 dockkit
 */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconBranchOutlineRegular, Tooltip } from "@deepseek-ai/dsh-client-ui-primitives";
import { ensureWorkbenchStyles } from "./styles";
import { useShellMount } from "./shell-mount";
import { GitBody } from "./git-body";

/** 默认浮窗几何（视口坐标）。 */
const FLOAT_W = 440;
const FLOAT_H = 620;
const FLOAT_TOP = 72;
const FLOAT_RIGHT = 24;
const MIN_W = 280;
const MIN_H = 320;

export const inject = ["slots"];

// ── 开合状态（按会话；模块级，切会话不误关其他会话的面板）──
const openSessions = new Set<string>();
const openListeners = new Set<() => void>();

function notifyOpen(): void {
  for (const fn of openListeners) fn();
}
function subscribeOpen(fn: () => void): () => void {
  openListeners.add(fn);
  return () => openListeners.delete(fn);
}
function openPanel(sessionId: string): void {
  if (openSessions.has(sessionId)) return;
  openSessions.add(sessionId);
  notifyOpen();
}
function closePanel(sessionId: string): void {
  if (!openSessions.delete(sessionId)) return;
  notifyOpen();
}

function defaultRect() {
  const vw = typeof window === "undefined" ? 1280 : window.innerWidth;
  const vh = typeof window === "undefined" ? 800 : window.innerHeight;
  const width = Math.min(FLOAT_W, Math.max(MIN_W, vw - FLOAT_RIGHT * 2));
  const height = Math.min(FLOAT_H, Math.max(MIN_H, vh - FLOAT_TOP - 16));
  return {
    x: Math.max(8, vw - width - FLOAT_RIGHT),
    y: FLOAT_TOP,
    width,
    height,
  };
}

function sessionOf(props: any): string | undefined {
  return typeof props?.sessionId === "string" && props.sessionId ? props.sessionId : undefined;
}

export function apply(ctx: any): void {
  ensureWorkbenchStyles();

  ctx.effect(
    () =>
      ctx.slots.inject("conversation.session.header.utilities", () =>
        ctx.slots.register(
          { name: "conversation.session.header.utilities", id: "git-studio-toggle", order: 40 },
          (props: any) => HeaderButton(props),
        ),
      ),
    "git-studio: header git toggle",
  );

  // 空态入口（root 作用域）：
  // DSH 0.2 起，空白会话的 header 走 hideChrome 分支——只渲染
  // conversation.session.header.lineage，`header.utilities` 槽位整体跳过，
  // 会话态入口 HeaderButton 在空白态无从挂载，兜底条里的 git 按钮随之消失
  // （0.1.5 时 utilities 槽位在空白态也渲染，portal 进兜底条挂载点）。
  // 本组件常驻 shell.overlay，用 sessions.list 的 current（当前选中会话）补上
  // 入口；仅当 fallback 挂载点可见（空白态）时渲染，会话态交由原入口负责。
  ctx.effect(
    () =>
      ctx.slots.inject("shell.overlay", () =>
        ctx.slots.register(
          { name: "shell.overlay", id: "git-studio-fallback-toggle", order: 1, label: "Git 入口（空态）" },
          () => {
            let sessions: any = undefined;
            try {
              sessions = ctx.get("sessions");
            } catch {
              /* sessions 服务未就绪时按无会话处理，不渲染 */
            }
            return <RootGitToggle sessions={sessions} />;
          },
        ),
      ),
    "git-studio: fallback git toggle",
  );
}

/**
 * 空态 Git 入口（root 作用域）。
 *
 * 仅在兜底条挂载点（#zenith-header-extra-fallback）可见时渲染，否则返回 null
 * （非空白态由 header.utilities 里的 HeaderButton 负责，避免双按钮）。
 */
function RootGitToggle({ sessions }: { sessions?: any }) {
  const mount = useShellMount();
  // DSH 0.2 的 sessions.list 快照不再暴露 `current` 字段（官方插件统一用
  // retainedBy.mainView 推导当前会话）。0.1.x 的 snapshot.current 恒为
  // undefined，直接读会导致空态 Git 入口永不渲染。
  const currentId = (snapshot: any): string | undefined => {
    const byId = snapshot?.byId
    if (!byId) return undefined
    for (const id of Object.keys(byId)) {
      const row = byId[id]
      if (row && (row.retainedBy?.mainView ?? 0) > 0) return row.id
    }
    return undefined
  }
  const [current, setCurrent] = useState<string | undefined>(() =>
    sessions?.list ? currentId(sessions.list.getSnapshot()) : undefined,
  )

  useEffect(() => {
    if (!sessions?.list?.subscribe) return
    return sessions.list.subscribe(() => {
      setCurrent(currentId(sessions.list.getSnapshot()))
    })
  }, [sessions])

  if (!mount || mount.id !== "zenith-header-extra-fallback") return null;
  if (!current) return null;
  return <HeaderButton sessionId={current} />;
}

/** 拦双击：shell 用 e.detail===2 判标题栏双击最大化。 */
function guardShellDoubleClick(e: any): void {
  if (e?.detail === 2) e?.stopPropagation?.();
}

function HeaderButton(props: any) {
  const sessionId = sessionOf(props);
  const [open, setOpen] = useState(() => !!sessionId && openSessions.has(sessionId));
  const mount = useShellMount();
  // 浮窗挂到 body，不跟按钮一起 portal 进 shell：避免按钮重挂时面板闪断
  const [showPanel, setShowPanel] = useState(() => !!sessionId && openSessions.has(sessionId));

  useEffect(
    () =>
      subscribeOpen(() => {
        setOpen(!!sessionId && openSessions.has(sessionId));
        setShowPanel(!!sessionId && openSessions.has(sessionId));
      }),
    [sessionId],
  );

  function toggle(e: any) {
    e?.stopPropagation?.();
    if (!sessionId) return;
    if (openSessions.has(sessionId)) closePanel(sessionId);
    else openPanel(sessionId);
  }

  const button = (
    <Tooltip label={open ? "关闭 Git 面板" : "打开 Git 面板"} side="bottom" delayMs={500}>
      <button
        type="button"
        className={"zenwb-githead" + (open ? " zenwb-on" : "")}
        aria-label={open ? "关闭 Git 面板" : "打开 Git 面板"}
        aria-pressed={open}
        data-git-studio-panel=""
        onMouseDown={guardShellDoubleClick}
        onDoubleClick={(e: any) => e.stopPropagation()}
        onClick={toggle}
      >
        <IconBranchOutlineRegular />
      </button>
    </Tooltip>
  );

  return (
    <>
      {mount ? createPortal(button, mount) : <span className="zenwb-githead-host">{button}</span>}
      {showPanel && sessionId ? (
        <GitFloatPanel
          sessionId={sessionId}
          onClose={() => {
            closePanel(sessionId);
          }}
        />
      ) : null}
    </>
  );
}

/**
 * 独立浮窗：fixed + 标题栏拖动 + 右下缩放。
 * 不经 sidebar-right / openTab，零侧栏动画。
 */
function GitFloatPanel({ sessionId, onClose }: { sessionId: string; onClose: () => void }) {
  const [rect, setRect] = useState(defaultRect);
  const drag = useRef<{ mode: "move" | "resize"; x: number; y: number; r: typeof rect } | null>(
    null,
  );

  useEffect(() => {
    function onMove(ev: MouseEvent) {
      const d = drag.current;
      if (!d) return;
      ev.preventDefault();
      const dx = ev.clientX - d.x;
      const dy = ev.clientY - d.y;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (d.mode === "move") {
        const x = Math.min(Math.max(0, d.r.x + dx), Math.max(0, vw - 80));
        const y = Math.min(Math.max(0, d.r.y + dy), Math.max(0, vh - 40));
        setRect({ ...d.r, x, y });
      } else {
        const width = Math.min(Math.max(MIN_W, d.r.width + dx), vw - 8);
        const height = Math.min(Math.max(MIN_H, d.r.height + dy), vh - 8);
        setRect({ ...d.r, width, height });
      }
    }
    function onUp() {
      if (drag.current) {
        drag.current = null;
        document.body.removeAttribute("data-zenwb-float-drag");
      }
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  function startDrag(e: any, mode: "move" | "resize") {
    if (e.button !== 0) return;
    // 关闭钮等交互元素：绝不能 preventDefault/起拖，否则 WebView2 下 click 不触发
    const t = e.target as HTMLElement | null;
    if (mode === "move" && t?.closest?.("button,a,input,textarea,select")) return;
    e.preventDefault();
    e.stopPropagation();
    drag.current = { mode, x: e.clientX, y: e.clientY, r: rect };
    document.body.setAttribute("data-zenwb-float-drag", mode);
  }

  const panel = (
    <div
      className="zenwb-float"
      data-zenwb-float=""
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
      }}
      role="dialog"
      aria-label="Git 面板"
    >
      <div
        className="zenwb-float-bar"
        onMouseDown={(e: any) => startDrag(e, "move")}
        onDoubleClick={(e: any) => e.stopPropagation()}
      >
        <span className="zenwb-float-title">Git</span>
        <button
          type="button"
          className="zenwb-float-close"
          aria-label="关闭"
          onMouseDown={(e: any) => e.stopPropagation()}
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
        >
          ×
        </button>
      </div>
      <div className="zenwb-float-body">
        <GitBody sessionId={sessionId} />
      </div>
      <div
        className="zenwb-float-resize"
        aria-hidden="true"
        onMouseDown={(e: any) => startDrag(e, "resize")}
      />
    </div>
  );

  return createPortal(panel, document.body);
}
