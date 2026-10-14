/**
 * 把入口按钮"传送"进 `dsh-zenith-shell` 的头部扩展挂载点。
 *
 * ## 为什么必须这么做（2026-09-11 实测回归）
 *
 * shell 的窗口控件**不是** DSH 头部流式布局的一部分，而是一层固定浮层：
 *
 *   .git-studio-header{position:fixed;top:4px;right:8px;gap:6px;z-index:21}
 *   header:has(.git-studio-header){padding-right:280px !important}
 *
 * 它自带 `padding-right:280px` 把 DSH 头部工具区往左推，所以"按钮被压住"不是
 * 简单的遮挡，而是**两套右上角体系互相打架**：native `header.utilities`
 * 与 shell 固定簇在同一个视觉角落争夺落位，右栏一展开（工具区重新排版 + 收起
 * 按钮出现）错位就会显形。
 *
 * shell 为此留了正当入口，注释写得很明确：
 *
 *   // 扩展挂载点（zenith-header-extra）：同族插件经 DOM 传送入口芯片，
 *   // 落位=状态胶囊右侧、窗口控件左侧（用户指定，2026-08-30）
 *
 * 旧版工作台用的就是这个挂载点；本次迁移重写入口时丢掉了它，是本文件存在的
 * 唯一原因。**恢复它，不要退回 `header.utilities`。**
 *
 * ## 两个挂载点
 *
 *   #zenith-header-extra            会话态（HeaderControls 内）
 *   #zenith-header-extra-fallback   空态 hero（FallbackBar 内）
 *
 * 过渡期两簇可能同时存在，只认**实际可见**的那个：`display:contents` 的挂载点
 * 自身没有盒子，可见性按所属簇（`.git-studio-header` / `.git-studio-fallback`）判定。
 * hideChrome 把整簇 `display:none` 时，portal 进去等于按钮消失 —— 所以必须判可见性。
 *
 * ## 为什么要常驻观测（旧版踩过的坑，逐条保留）
 *
 * `#zenith-header-extra` 活在 shell 的 HeaderControls 子树里，而 HeaderControls
 * 经 `conversation.session.header.utilities` 挂载 —— **DSH 切会话会卸载并重建
 * 整个会话头部**，旧挂载点 DOM 被销毁、新节点取而代之。旧逻辑"找到一次就停"
 * 会让 portalTarget 永远指向已脱离文档的旧节点：按钮偶发消失、切会话后必现。
 *
 * 观测只听 body 直系 childList：开 subtree 会在 DSH 流式输出时每个 token 都触发
 * `check()`（内含 getBoundingClientRect），是 WebView 主线程卡顿源之一。
 */
import { useEffect, useState } from "react";

/** 会话态 + 空态两个挂载点，按优先级排列。 */
const MOUNT_IDS: string[] = [];

/** 挂载点自身 display:contents 无盒子，可见性看它所属的那一簇。 */
function mountShown(el: Element): boolean {
  const cluster = el.closest(".git-studio-header,.git-studio-fallback") ?? el;
  try {
    const cs = getComputedStyle(cluster);
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    const r = (cluster as HTMLElement).getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  } catch {
    return true; // 探测失败偏向可见（安全侧：宁可 portal，不要回退到视口悬浮）
  }
}

/** 找当前**可见**的挂载点；都没有则 null（调用方回退到原生 utilities 渲染）。 */
export function findMountPoint(): Element | null {
  if (typeof document === "undefined") return null;
  for (const id of MOUNT_IDS) {
    const el = document.getElementById(id);
    if (el?.isConnected && mountShown(el)) return el;
  }
  return null;
}

/**
 * 常驻跟随 shell 挂载点。首帧用惰性初始化**同步**查找（shell 的 HeaderControls
 * 先于本入口挂载，首 render 时通常已在 DOM），随后 MutationObserver + 慢轮询兜底
 * 切会话 / 簇切换导致的重建。
 *
 * @returns 当前应 portal 进去的节点；null 表示 shell 不可用，调用方自行回退。
 */
export function useShellMount(): Element | null {
  const [target, setTarget] = useState<Element | null>(() => findMountPoint());

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    let observer: MutationObserver | undefined;

    function check(): void {
      const el = findMountPoint();
      setTarget((prev) => {
        if (!prev) return el ?? prev; // 均空 → 返回原值，避免无意义重渲染
        if (!prev.isConnected || !mountShown(prev)) return el; // 旧节点销毁/被隐藏 → 跟随可见者
        if (el && el !== prev) return el; // 换到另一簇的新节点 → 跟进
        return prev;
      });
    }

    check();
    try {
      observer = new MutationObserver(check);
      observer.observe(document.body, { childList: true });
    } catch {
      /* 观测失败仍有轮询兜底 */
    }
    timer = setInterval(check, 2000);

    return () => {
      if (timer) clearInterval(timer);
      try {
        observer?.disconnect();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return target;
}
