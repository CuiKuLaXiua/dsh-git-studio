// 最低限度环境类型（esbuild 不做类型检查，本文件仅为编辑器体验）。
//
// 0.1.5 迁移后收窄：面板/编辑器/终端下线，实际只用到下面这些 hook 与 jsx-runtime；
// `react-dom`(createPortal) 与 `@xterm/xterm/css/xterm.css` 已无用，一并删除。
// 注：不放 `declare function require` —— 插件源码不使用 CJS require，
// 且动态 require 形态会被安全扫描判为命令注入入口（误报但硬拦截）。

declare module "react" {
  export function useState<S>(initial: S | (() => S)): [S, (v: S) => void];
  export function useEffect(fn: () => void | (() => void), deps?: unknown[]): void;
  export function useRef<T>(initial: T): { current: T };
  export function useCallback<T extends (...args: any[]) => any>(fn: T, deps?: unknown[]): T;
  export function useMemo<T>(factory: () => T, deps?: unknown[]): T;
}

declare module "react/jsx-runtime" {
  export function jsx(type: unknown, props: unknown, key?: unknown): unknown;
  export function jsxs(type: unknown, props: unknown, key?: unknown): unknown;
  export const Fragment: unknown;
}

declare namespace JSX {
  type Element = unknown;
  interface ElementChildrenAttribute {
    children: unknown;
  }
  interface IntrinsicElements {
    [elem: string]: unknown;
  }
  interface ElementAttributesProperty {
    props: unknown;
  }
}
