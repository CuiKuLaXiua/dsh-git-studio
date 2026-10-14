/**
 * 工作台样式（自旧 client/index.tsx 的样式数组抽取，经括号配平与孤立行自检）。
 *
 * 迁移背景：Git 面板改为原生右侧栏标签类型后入口重写，样式需保留 ——
 * 其中 `.zenwb-btn` / `.zenwb-fi*` / `.zenwb-iconbtn` / `.zenwb-sk*` /
 * `.zenwb-on` / `.zenwb-busy` / `.zenwb-menu-item` 等共享小类仍被 Git 视图与
 * 标签菜单使用。全部颜色取自 DSW 别名变量（--dsw-alias-*），随壳层主题切换。
 *
 * ⚠ 本文件由 extract-styles.mjs 生成；手改样式请改抽取源或直接改此处并保持自检通过。
 */

export const WORKBENCH_CSS = `
[data-zenwb-host]{position:fixed;inset:0;z-index:25;pointer-events:none;overflow:clip}
[data-zenwb-panel]{position:absolute;top:40px;right:8px;bottom:8px;width:var(--zenwb-sidebar-width,0px);transform:translateX(calc(100% + 12px));transition:transform .22s ease,top .22s ease,right .22s ease,bottom .22s ease,height .22s ease,border-radius .22s ease;pointer-events:auto;display:flex;flex-direction:column;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,0.22);color:var(--dsw-alias-label-primary);font-size:13px;overflow:clip}
[data-zenwb-host][data-open='1'] [data-zenwb-panel]{transform:none}
html[data-zenwb-mode='dock'] [data-zenwb-panel]{top:0;right:0;bottom:0;border:none;border-left:1px solid var(--dsw-alias-border-l1);border-radius:0;box-shadow:none}
html[data-zenwb-mode='island'] [data-zenwb-panel]{height:var(--zenwb-panel-height,620px);bottom:auto;min-height:clamp(520px,55dvh,720px);max-height:calc(100dvh - 48px)}
html[data-zenwb-mode='dock'] #root{margin-right:var(--zenwb-sidebar-width,0px);width:calc(100% - var(--zenwb-sidebar-width,0px));transition:margin-right .22s ease,width .22s ease}
html[data-zenwb-mode='dock'] .git-studio-header,html[data-zenwb-mode='dock'] .git-studio-fallback{right:calc(var(--zenith-details-width,0px) + var(--zenwb-sidebar-width,0px) + 8px);transition:right .22s ease}
body[data-zenwb-dragging] [data-zenwb-panel]{transition:none}
body[data-zenwb-dragging] #root{transition:none}
.zenwb-tabbar{display:flex;align-items:stretch;gap:2px;padding:6px 8px 0;border-bottom:1px solid var(--dsw-alias-border-l1);flex:none;overflow-x:auto;scrollbar-width:none}
.zenwb-tab{display:inline-flex;align-items:center;gap:6px;padding:6px 8px 6px 12px;border-radius:8px 8px 0 0;cursor:pointer;color:var(--dsw-alias-label-secondary);max-width:180px;user-select:none}
.zenwb-tab:hover{background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-tab.zenwb-active{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-bottom:none}
.zenwb-tab-title{font-size:12px;line-height:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zenwb-tab-close{width:16px;height:16px;border:none;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:12px;line-height:16px;padding:0;flex:none;font-family:inherit}
.zenwb-tab-close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
@keyframes zenwb-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.zenwb-spin{width:22px;height:22px;border-radius:50%;flex:none;border:2px solid var(--dsw-alias-border-l1);border-top-color:var(--dsw-alias-state-business-primary);animation:zenwb-spin .8s linear infinite}
.zenwb-load{flex:1;display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary);font-size:12px;padding:24px 12px}
@keyframes zenwb-shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
.zenwb-sk{position:relative;overflow:hidden;background:var(--dsw-alias-bg-layer-2);border-radius:6px;flex:none}
.zenwb-sk::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,color-mix(in srgb, var(--dsw-alias-label-tertiary,#8a8a99) 20%, transparent) 50%,transparent 100%);animation:zenwb-shimmer 1.4s ease-in-out infinite}
.zenwb-git-sk{flex:1;display:flex;flex-direction:column;gap:6px;padding:10px;overflow:hidden}
.zenwb-git-sk-head{height:30px;border-radius:8px}
.zenwb-git-sk-sec{height:11px;width:38%;margin-top:6px}
.zenwb-git-sk-row{height:26px}
.zenwb-git-sk-patch{height:12px;align-self:center;flex:1 1 auto}
.zenwb-git-sk-add{background:color-mix(in srgb, var(--dsw-alias-state-success-primary,#5a9e6f) 18%, transparent)}
.zenwb-git-sk-del{background:color-mix(in srgb, var(--dsw-alias-state-error-primary,#c75f5f) 18%, transparent)}
.zenwb-git-refresh svg{width:14px;height:14px;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;fill:none}
.zenwb-git-refresh:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-git-refresh:disabled{opacity:.65;cursor:default}
.zenwb-git-refresh.zenwb-busy svg{animation:zenwb-spin .9s linear infinite}
.zenwb-filetabs{padding-top:2px;background:var(--dsw-alias-bg-layer-2)}
.zenwb-filetabs .zenwb-tab{padding-top:4px;padding-bottom:4px}
.zenwb-filetabs .zenwb-tab-title{font-size:11px}
.zenwb-content{flex:1;overflow:auto;display:flex;flex-direction:column}
.zenwb-placeholder,.zenwb-tab-error{flex:1;display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary)}
.zenwb-retry{padding:4px 14px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-primary);cursor:pointer;font-family:inherit;font-size:12px}
.zenwb-drag-handle{position:absolute;left:-3px;top:0;bottom:0;width:7px;cursor:col-resize;z-index:5}
.zenwb-drag-handle-bottom{position:absolute;left:0;right:0;bottom:-3px;height:7px;cursor:row-resize;z-index:5}
html[data-zenwb-mode='dock'] .zenwb-drag-handle-bottom{display:none}
.zenwb-files{flex:1;display:flex;flex-direction:column;min-height:0}
.zenwb-files-head{display:flex;align-items:center;gap:7px;padding:10px 10px 8px;flex:none}
.zenwb-files-root{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.zenwb-iconbtn{width:26px;height:26px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;padding:0;display:inline-flex;align-items:center;justify-content:center;flex:none;transition:color .15s ease,background .15s ease}
.zenwb-iconbtn:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-iconbtn svg{width:14px;height:14px;stroke:currentColor;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}
.zenwb-files-search{position:relative;padding:0 10px 8px;flex:none}
.zenwb-search-ico{position:absolute;left:19px;top:16px;transform:translateY(-50%);color:var(--dsw-alias-label-tertiary,#7a7a8a);display:inline-flex;pointer-events:none}
.zenwb-search-ico svg{width:13px;height:13px;stroke:currentColor;stroke-width:1.4;stroke-linecap:round}
.zenwb-files-search input{width:100%;box-sizing:border-box;padding:7px 10px 7px 30px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-size:13px;font-family:inherit}
.zenwb-files-search input:focus{outline:none;border-color:var(--dsw-alias-state-business-primary)}
.zenwb-tree,.zenwb-search-results{flex:1;overflow:auto;padding:6px 6px 12px;user-select:none}
.zenwb-tree-row{display:flex;align-items:center;gap:5px;padding:4px 8px;margin:1px 0;border-radius:7px;cursor:pointer;color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px;white-space:nowrap}
.zenwb-tree-row:hover{background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-tree-row.zenwb-on{background:var(--dsw-alias-bg-layer-2)}
.zenwb-tree-row.zenwb-droptarget{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 18%, transparent);outline:1px dashed var(--dsw-alias-state-business-primary)}
.zenwb-tree-caret{width:16px;height:16px;flex:none;display:inline-flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary,#7a7a8a);transition:transform .15s ease}
.zenwb-tree-caret svg{width:11px;height:11px;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.zenwb-tree-caret.zenwb-open{transform:rotate(90deg)}
.zenwb-fi{width:16px;height:16px;flex:none;display:inline-flex;align-items:center;justify-content:center}
.zenwb-fi svg{width:14px;height:14px;stroke:currentColor;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}
.zenwb-fi-dir{color:var(--dsw-alias-state-business-primary,#6b9e7a)}
.zenwb-fi-img{color:#b07fd8}
.zenwb-fi-code,.zenwb-fi-doc{color:#6b93cc}
.zenwb-fi-zip{color:var(--dsw-alias-state-warning-primary,#c7a04a)}
.zenwb-fi-file{color:var(--dsw-alias-label-tertiary,#8a8a99)}
.zenwb-tree-name{overflow:hidden;text-overflow:ellipsis}
.zenwb-tree-dirpart{color:var(--dsw-alias-label-tertiary,#8a8a99)}
.zenwb-tree-row.zenwb-hidden .zenwb-tree-name{opacity:0.5}
.zenwb-tree-row.zenwb-broken{color:var(--dsw-alias-state-error-primary)}
.zenwb-tree-note{padding:8px 10px;font-size:12px;line-height:1.6;color:var(--dsw-alias-label-tertiary,#8a8a99)}
.zenwb-tree::-webkit-scrollbar,.zenwb-search-results::-webkit-scrollbar,.zenwb-content::-webkit-scrollbar{width:10px;height:10px}
.zenwb-tree::-webkit-scrollbar-thumb,.zenwb-search-results::-webkit-scrollbar-thumb,.zenwb-content::-webkit-scrollbar-thumb{background:var(--dsw-alias-border-l1,#3a3a44);border-radius:999px;border:3px solid transparent;background-clip:padding-box}
.zenwb-tree::-webkit-scrollbar-thumb:hover,.zenwb-search-results::-webkit-scrollbar-thumb:hover,.zenwb-content::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-label-tertiary,#8a8a99);background-clip:padding-box;border:3px solid transparent}
.zenwb-tree::-webkit-scrollbar-track,.zenwb-search-results::-webkit-scrollbar-track,.zenwb-content::-webkit-scrollbar-track{background:transparent}
.zenwb-menu{position:fixed;z-index:60;min-width:190px;padding:4px;border-radius:10px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);box-shadow:0 8px 24px rgba(0,0,0,0.18);display:flex;flex-direction:column}
.zenwb-menu-item{display:flex;align-items:center;gap:8px;padding:6px 10px;border:none;border-radius:7px;background:transparent;color:var(--dsw-alias-label-primary);font-size:12px;font-family:inherit;text-align:left;cursor:pointer;white-space:nowrap}
.zenwb-menu-item:hover{background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-menu-sep{height:1px;margin:4px 6px;background:var(--dsw-alias-border-l1)}
.zenwb-upmask{position:fixed;inset:0;z-index:70;background:color-mix(in srgb, #000 45%, transparent);display:flex;align-items:center;justify-content:center}
.zenwb-upcard{width:min(420px,84%);border-radius:14px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);padding:16px 18px;display:flex;flex-direction:column;gap:10px;color:var(--dsw-alias-label-primary)}
.zenwb-upbar{height:8px;border-radius:999px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);overflow:hidden}
.zenwb-upfill{height:100%;background:var(--dsw-alias-state-business-primary);transition:width .15s ease}
.zenwb-upmeta{font-size:12px;color:var(--dsw-alias-label-secondary);display:flex;justify-content:space-between;gap:10px;min-width:0}
.zenwb-upmeta span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.zenwb-upfail{font-size:11px;color:var(--dsw-alias-state-error-primary);max-height:90px;overflow:auto;white-space:pre-wrap}
.zenwb-preview{flex:1;display:flex;flex-direction:column;min-height:0}
.zenwb-preview-head{display:flex;align-items:center;gap:6px;padding:6px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);flex:none;min-width:0}
.zenwb-preview-head .zenwb-btn{flex:none}
.zenwb-pathinput{flex:1;min-width:0;padding:3px 8px;border-radius:7px;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary);font-size:11px;font-family:inherit}
.zenwb-pathinput:hover{border-color:var(--dsw-alias-border-l1)}
.zenwb-pathinput:focus{outline:none;border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary)}
.zenwb-dirty{color:var(--dsw-alias-state-business-primary);font-size:14px;line-height:1;flex:none}
.zenwb-editor{flex:1;display:flex;flex-direction:column;min-height:0}
.zenwb-cm{flex:1;min-height:0}
.zenwb-cm .cm-editor{height:100%}
.zenwb-cm .cm-scroller{overflow:auto}
.zenwb-textview{flex:1;overflow:auto;margin:0;padding:12px 14px;font-family:ui-monospace,SFMono-Regular,Consolas,'Courier New',monospace;font-size:12px;line-height:1.55;color:var(--dsw-alias-label-primary);white-space:pre;tab-size:4}
.zenwb-imgview{flex:1;display:flex;align-items:center;justify-content:center;overflow:auto;padding:14px}
.zenwb-imgview img{max-width:100%;max-height:100%;object-fit:contain}
.zenwb-pdfview{flex:1;border:none;background:#fff}
.zenwb-notebar{flex:none;padding:6px 10px;font-size:11px;color:var(--dsw-alias-label-tertiary,#7a7a8a);border-bottom:1px dashed var(--dsw-alias-border-l1)}
.zenwb-mdwrap{flex:1;display:flex;flex-direction:column;min-height:0;position:relative}
.zenwb-md-toc{position:absolute;top:6px;left:12px;right:12px;z-index:12;display:flex;flex-direction:column;max-height:62%;border-radius:10px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);box-shadow:0 10px 30px rgba(0,0,0,0.22);font-size:11px;color:var(--dsw-alias-label-secondary)}
.zenwb-md-toc-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 8px 6px 12px;border-bottom:1px solid var(--dsw-alias-border-l1);flex:none}
.zenwb-md-toc-list{overflow:auto;padding:4px 8px 6px}
.zenwb-md-toc-item{padding:4px 6px;cursor:pointer;border-radius:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.zenwb-md-toc-item:hover{color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-md-toc-fab{position:absolute;top:6px;right:12px;z-index:11;padding:3px 10px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 85%, transparent);backdrop-filter:blur(4px);color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:11px;font-family:inherit;flex:none}
.zenwb-md-toc-fab:hover{color:var(--dsw-alias-state-business-primary);border-color:var(--dsw-alias-state-business-primary)}
.zenwb-md{flex:1;overflow:auto;padding:16px 20px;font-size:13px;line-height:1.65;color:var(--dsw-alias-label-primary)}
.zenwb-md h1,.zenwb-md h2,.zenwb-md h3,.zenwb-md h4{line-height:1.3;margin:1.1em 0 0.5em;scroll-margin-top:8px}
.zenwb-md h1{font-size:20px;border-bottom:1px solid var(--dsw-alias-border-l1);padding-bottom:6px}
.zenwb-md h2{font-size:17px}
.zenwb-md h3{font-size:15px}
.zenwb-md a{color:var(--dsw-alias-state-business-primary);text-decoration:none}
.zenwb-md a:hover{text-decoration:underline}
.zenwb-md code{font-family:ui-monospace,Consolas,monospace;font-size:12px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:5px;padding:1px 5px}
.zenwb-md pre{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:10px 12px;overflow-x:auto}
.zenwb-md pre code{background:transparent;border:none;padding:0}
.zenwb-md blockquote{margin:0.6em 0;padding:2px 12px;border-left:3px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.zenwb-md table{border-collapse:collapse;margin:0.8em 0}
.zenwb-md th,.zenwb-md td{border:1px solid var(--dsw-alias-border-l1);padding:4px 10px;font-size:12px}
.zenwb-md img{max-width:100%;border-radius:6px}
.zenwb-md hr{border:none;border-top:1px solid var(--dsw-alias-border-l1);margin:1.2em 0}
.zenwb-fileinfo{margin:auto;display:flex;flex-direction:column;gap:10px;padding:28px;max-width:420px;font-size:12px;color:var(--dsw-alias-label-secondary)}
.zenwb-filepath{word-break:break-all;color:var(--dsw-alias-label-primary);font-size:13px}
.zenwb-btn{padding:5px 14px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-primary);cursor:pointer;font-family:inherit;font-size:12px}
.zenwb-btn:hover{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}
.zen-chip{padding:4px 10px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-tertiary,#7a7a8a);cursor:pointer;font-size:11px;font-family:inherit;line-height:1.4;white-space:nowrap;transition:color .15s ease,border-color .15s ease,background .15s ease}
.zen-chip[data-on='1']{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent)}
.zenwb-settings{display:flex;flex-direction:column;gap:10px;padding:12px 2px;font-size:13px}
.zenwb-settings-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.zenwb-settings-chips{display:inline-flex;gap:6px}
.zenwb-settings-label{color:var(--dsw-alias-label-primary)}
.zenwb-settings-caption{font-size:11px;color:var(--dsw-alias-label-tertiary,#7a7a8a)}
.zenwb-settings-caption code{font-size:11px}
.zenwb-settings-grid{display:flex;flex-direction:column;gap:8px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:10px 12px}
.zenwb-toggle{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:none;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;flex:none;transition:background .15s ease,color .15s ease}
.zenwb-toggle.zenwb-fixed{position:fixed;top:4px;right:var(--zenwb-chip-offset,calc(var(--zenwb-sidebar-width,0px) + 8px));z-index:22;background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 72%, transparent);backdrop-filter:blur(6px);transition:background .15s ease,color .15s ease,right .22s ease}
.zenwb-toggle:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.zenwb-toggle[data-on='1']{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent)}
.zenwb-termdrawer{position:relative;flex:none;height:var(--zenwb-term-height,260px);display:flex;flex-direction:column;border-top:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);min-height:0}
.zenwb-termdrawer-empty{height:auto}
.zenwb-termdrawer-empty .zenwb-termdrawer-tabs{border-bottom:none;padding:2px 8px}
.zenwb-termdrawer-grip{position:absolute;top:-4px;left:0;right:0;height:8px;cursor:row-resize;z-index:5}
.zenwb-termdrawer-tabs{display:flex;align-items:center;gap:2px;padding:4px 8px;border-bottom:1px solid var(--dsw-alias-border-l1);flex:none}
.zenwb-termtab{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:7px;cursor:pointer;color:var(--dsw-alias-label-secondary);font-size:12px;max-width:160px;user-select:none}
.zenwb-termtab:hover{background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-termtab.zenwb-on{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.zenwb-termtab-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.zenwb-termtab-close{width:15px;height:15px;border:none;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:11px;line-height:15px;padding:0;flex:none;font-family:inherit}
.zenwb-termtab-close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.zenwb-termtab-add{border:none;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:14px;padding:2px 8px;border-radius:7px;font-family:inherit;flex:none}
.zenwb-termtab-add:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.zenwb-termtab-msg{font-size:11px;color:var(--dsw-alias-state-error-primary);margin-left:6px}
.zenwb-termdrawer-body{flex:1;min-height:0;display:flex}
.zenwb-term{flex:1;min-width:0;display:flex;flex-direction:column;padding:2px 6px 4px}
.zenwb-term-banner{flex:none;margin:4px 0;padding:6px 10px;border-radius:8px;border:1px solid var(--dsw-alias-state-error-primary);color:var(--dsw-alias-label-primary);font-size:11px;display:flex;flex-direction:column;gap:2px}
.zenwb-term-host{flex:1;min-height:0}
.zenwb-git{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.zenwb-git-empty{padding:24px 12px;text-align:center;color:var(--dsw-alias-label-secondary);font-size:12px}
.zenwb-git-actions{display:flex;justify-content:center;padding:8px;gap:8px;flex-wrap:wrap}
.zenwb-git-head{flex:none;display:flex;align-items:center;gap:8px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}
.zenwb-git-branch{display:inline-flex;align-items:center;gap:6px;min-width:0;max-width:48%;font-size:12px;font-weight:600;line-height:16px;height:26px;box-sizing:border-box;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:0 10px 0 8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:0 1 auto}
.zenwb-git-branch svg{width:13px;height:13px;stroke:var(--dsw-alias-state-business-primary,#6b9e7a);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;fill:none;flex:none}
.zenwb-git-branch-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.zenwb-git-head-actions{margin-left:auto;display:flex;align-items:center;gap:6px;flex:none}
.zenwb-git-seg{display:inline-flex;align-items:stretch;height:26px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-2);overflow:hidden;flex:none}
.zenwb-git-vw{appearance:none;-webkit-appearance:none;box-sizing:border-box;border:none;border-right:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);font-size:11px;font-weight:500;line-height:1;letter-spacing:.02em;height:24px;padding:0 10px;margin:0;cursor:pointer;font-family:inherit;white-space:nowrap;flex:none;display:inline-flex;align-items:center;justify-content:center}
.zenwb-git-vw:last-child{border-right:none}
.zenwb-git-vw:hover:not(.zenwb-on){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-git-vw.zenwb-on{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-weight:600;box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l1)}
.zenwb-git-refresh{width:26px;height:26px}
.zenwb-git-note{flex:none;margin:6px 10px 0;padding:5px 8px;border-radius:7px;background:color-mix(in srgb, var(--dsw-alias-state-warning-primary,#c7a04a) 14%, transparent);color:var(--dsw-alias-label-primary);font-size:11px;line-height:1.45}
.zenwb-git-changes{flex:1;min-height:0;display:flex;flex-direction:column;overflow-y:auto;padding:6px 8px 10px;gap:2px}
.zenwb-git-sec{margin-top:4px;display:flex;flex-direction:column;gap:1px}
.zenwb-git-sec-title{position:sticky;top:0;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11px;font-weight:600;line-height:16px;color:var(--dsw-alias-label-secondary);padding:8px 4px 4px;letter-spacing:.03em;background:var(--dsw-alias-bg-layer-1)}
.zenwb-git-sec-act{appearance:none;-webkit-appearance:none;box-sizing:border-box;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary);font-size:11px;font-weight:500;line-height:14px;height:22px;cursor:pointer;padding:0 8px;border-radius:6px;font-family:inherit;letter-spacing:0;flex:none;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap}
.zenwb-git-sec-act:hover{border-color:var(--dsw-alias-border-l1);background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.zenwb-git-sec-act:disabled{opacity:.5;cursor:default}
.zenwb-git-row{display:flex;align-items:center;gap:6px;padding:3px 6px;margin:0;border-radius:8px;cursor:default;user-select:none;min-height:32px;box-sizing:border-box}
.zenwb-git-row:hover{background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-git-row:focus-within .zenwb-git-row-actions{opacity:.85}
.zenwb-git-row.zenwb-on{background:var(--dsw-alias-bg-layer-2);box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l1)}
.zenwb-git-row-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;line-height:18px;color:var(--dsw-alias-label-primary);cursor:pointer;align-self:center}
.zenwb-git-row-dir{color:var(--dsw-alias-label-tertiary,#8a8a99);font-size:11px;font-weight:400}
.zenwb-git-badge{flex:none;min-width:20px;height:16px;box-sizing:border-box;text-align:center;font-size:10px;font-weight:700;line-height:16px;border-radius:4px;padding:0 4px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);font-family:ui-monospace,Consolas,monospace}
.zenwb-git-badge.zenwb-git-b-M{color:var(--dsw-alias-state-warning-primary,#c7a04a);background:color-mix(in srgb, var(--dsw-alias-state-warning-primary,#c7a04a) 16%, transparent)}
.zenwb-git-badge.zenwb-git-b-A{color:var(--dsw-alias-state-success-primary,#5a9e6f);background:color-mix(in srgb, var(--dsw-alias-state-success-primary,#5a9e6f) 16%, transparent)}
.zenwb-git-badge.zenwb-git-b-D{color:var(--dsw-alias-state-error-primary,#c75f5f);background:color-mix(in srgb, var(--dsw-alias-state-error-primary,#c75f5f) 16%, transparent)}
.zenwb-git-badge.zenwb-git-b-R{color:var(--dsw-alias-state-business-primary,#6b93cc);background:color-mix(in srgb, var(--dsw-alias-state-business-primary,#6b93cc) 16%, transparent)}
.zenwb-git-badge.zenwb-git-b-U{color:var(--dsw-alias-label-tertiary,#8a8a99);background:color-mix(in srgb, var(--dsw-alias-label-tertiary,#8a8a99) 16%, transparent)}
.zenwb-git-row-actions{flex:none;display:flex;align-items:center;gap:3px;opacity:0;transition:opacity .12s;min-width:51px;justify-content:flex-end}
.zenwb-git-row:hover .zenwb-git-row-actions{opacity:1}
.zenwb-git-act{appearance:none;-webkit-appearance:none;box-sizing:border-box;width:24px;height:24px;min-width:24px;min-height:24px;max-height:24px;border:1px solid var(--dsw-alias-border-l1);border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;padding:0;line-height:0;display:inline-flex;align-items:center;justify-content:center;flex:none;transition:color .15s ease,background .15s ease,border-color .15s ease}
.zenwb-git-act svg{width:13px;height:13px;flex:none;display:block;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;fill:none}
.zenwb-git-act:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-tertiary,#8a8a99)}
.zenwb-git-act:active{transform:scale(.96)}
.zenwb-git-act:disabled{opacity:.4;cursor:default;transform:none}
.zenwb-git-act-danger:hover{color:var(--dsw-alias-state-error-primary,#c75f5f);border-color:var(--dsw-alias-state-error-primary,#c75f5f)}
.zenwb-git-diff{flex:1;min-height:0;display:flex;flex-direction:column}
.zenwb-git-diff-head{position:sticky;top:0;z-index:1;flex:none;display:flex;align-items:center;gap:6px;padding:6px 8px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}
.zenwb-git-back{appearance:none;-webkit-appearance:none;box-sizing:border-box;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px;height:26px;cursor:pointer;padding:0 8px;border-radius:7px;font-family:inherit;flex:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap}
.zenwb-git-back:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l1)}
.zenwb-git-diff-path{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:var(--dsw-alias-label-primary);font-family:ui-monospace,Consolas,monospace}
.zenwb-git-side-tag{flex:none;height:18px;box-sizing:border-box;line-height:16px;font-size:10px;font-weight:600;padding:0 7px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);display:inline-flex;align-items:center}
.zenwb-git-copy{width:26px;height:26px}
.zenwb-git-copy svg{width:13px;height:13px;flex:none;display:block;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;fill:none}
.zenwb-git-copy.zenwb-on{color:var(--dsw-alias-state-success-primary,#5a9e6f);border-color:var(--dsw-alias-state-success-primary,#5a9e6f)}
.zenwb-git-back svg{width:14px;height:14px;flex:none;display:block;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;fill:none}
.zenwb-git-collapse-bar{flex:none;width:calc(100% - 12px);margin:4px 6px 0;border:1px dashed var(--dsw-alias-border-l1);border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary);font-size:11px;line-height:15px;padding:6px 8px;cursor:pointer;font-family:inherit;text-align:left}
.zenwb-git-collapse-bar:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-git-patch{flex:1;min-height:0;overflow:auto;font-family:ui-monospace,SFMono-Regular,Consolas,'Courier New',monospace;font-size:12px;line-height:1.55;tab-size:4;padding:6px 0 10px}
.zenwb-git-l{display:flex;gap:0;white-space:pre;color:var(--dsw-alias-label-primary)}
.zenwb-git-lnum{flex:none;width:3em;text-align:right;padding:0 8px;color:var(--dsw-alias-label-tertiary,#8a8a99);user-select:none;font-size:11px}
.zenwb-git-ltxt{flex:1;min-width:0;padding-right:8px;overflow:hidden;text-overflow:ellipsis}
.zenwb-git-l-meta{color:var(--dsw-alias-label-secondary)}
.zenwb-git-l-hunk{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2)}
.zenwb-git-l-add{background:color-mix(in srgb, var(--dsw-alias-state-success-primary,#5a9e6f) 18%, transparent)}
.zenwb-git-l-del{background:color-mix(in srgb, var(--dsw-alias-state-error-primary,#c75f5f) 18%, transparent)}
.zenwb-git-trunc{padding:6px 8px;color:var(--dsw-alias-label-secondary);font-style:italic}
.zenwb-git-commitbox{flex:none;border-top:1px solid var(--dsw-alias-border-l1);padding:10px 10px 12px;background:var(--dsw-alias-bg-layer-1);display:flex;flex-direction:column;gap:8px}
.zenwb-git-commitbox-head{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11px;font-weight:600;line-height:16px;color:var(--dsw-alias-label-secondary);letter-spacing:.04em}
.zenwb-git-commitbox-count{font-size:11px;font-weight:400;color:var(--dsw-alias-label-tertiary,#8a8a99);letter-spacing:0}
.zenwb-git-stage-hint{display:flex;align-items:flex-start;gap:6px;font-size:11px;line-height:1.5;color:var(--dsw-alias-state-warning-primary,#c7a04a);background:color-mix(in srgb, var(--dsw-alias-state-warning-primary,#c7a04a) 12%, transparent);border-radius:7px;padding:6px 8px}
.zenwb-git-msg{width:100%;box-sizing:border-box;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;color:var(--dsw-alias-label-primary);font-family:inherit;font-size:12px;line-height:1.5;padding:8px 10px;resize:none;min-height:52px}
.zenwb-git-msg:focus{outline:none;border-color:var(--dsw-alias-state-business-primary,#6b9e7a)}
.zenwb-git-msg:disabled{opacity:.6}
.zenwb-git-commit-btn{width:100%;box-sizing:border-box;height:32px;padding:0 14px;font-weight:600;font-size:12px;line-height:1;border-radius:8px}
.zenwb-git-commit-btn:not(:disabled){background:var(--dsw-alias-state-business-primary,#6b9e7a);border-color:var(--dsw-alias-state-business-primary,#6b9e7a);color:var(--dsw-alias-bg-layer-1,#fff)}
.zenwb-git-commit-btn:not(:disabled):hover{filter:brightness(1.06);color:var(--dsw-alias-bg-layer-1,#fff)}
.zenwb-git-commit-btn:disabled{opacity:.45;cursor:not-allowed}
.zenwb-git-clean-hero{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:36px 20px;text-align:center}
.zenwb-git-clean-hero-ico{width:48px;height:48px;border-radius:999px;background:color-mix(in srgb, var(--dsw-alias-state-success-primary,#5a9e6f) 14%, transparent);color:var(--dsw-alias-state-success-primary,#5a9e6f);display:inline-flex;align-items:center;justify-content:center}
.zenwb-git-clean-hero-ico svg{width:22px;height:22px;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;fill:none}
.zenwb-git-clean-hero-title{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary)}
.zenwb-git-clean-hero-sub{font-size:11px;color:var(--dsw-alias-label-secondary);line-height:1.65;max-width:220px}
.zenwb-git-sec-empty{padding:2px 8px 8px;font-size:11px;color:var(--dsw-alias-label-tertiary,#8a8a99);line-height:1.5}
.zenwb-git-commit-err{font-size:11px;line-height:1.5;color:var(--dsw-alias-state-error-primary,#c75f5f);white-space:pre-wrap;word-break:break-word}
.zenwb-git-hist{flex:1;min-height:0;overflow-y:auto;padding:4px 8px 8px}
.zenwb-git-commit{display:flex;flex-direction:column;gap:3px;padding:9px 8px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.zenwb-git-commit-top{display:flex;align-items:center;gap:6px;flex-wrap:wrap;min-height:18px}
.zenwb-git-commit-hash{font-family:ui-monospace,Consolas,monospace;font-size:11px;font-weight:600;color:var(--dsw-alias-state-business-primary,#6b9e7a)}
.zenwb-git-ref{font-size:10px;font-weight:600;line-height:14px;padding:1px 7px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);display:inline-flex;align-items:center}
.zenwb-git-commit-subj{font-size:12px;line-height:17px;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.zenwb-git-commit-meta{font-size:11px;color:var(--dsw-alias-label-tertiary,#8a8a99)}
.zenwb-git-more{display:flex;align-items:center;justify-content:center;width:calc(100% - 12px);margin:8px 6px 4px;box-sizing:border-box;height:30px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:500;padding:0 10px;cursor:pointer;font-family:inherit;text-align:center}
.zenwb-git-more:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-git-more:disabled{opacity:.55;cursor:default}
.zenwb-git-more.zenwb-git-end{cursor:default;pointer-events:none;border-style:dashed;color:var(--dsw-alias-label-tertiary,#8a8a99)}
.zenwb-git-changes::-webkit-scrollbar,.zenwb-git-hist::-webkit-scrollbar,.zenwb-git-patch::-webkit-scrollbar{width:10px;height:10px}
.zenwb-git-changes::-webkit-scrollbar-thumb,.zenwb-git-hist::-webkit-scrollbar-thumb,.zenwb-git-patch::-webkit-scrollbar-thumb{background:var(--dsw-alias-border-l1,#3a3a44);border-radius:999px;border:3px solid transparent;background-clip:padding-box}
.zenwb-git-changes::-webkit-scrollbar-thumb:hover,.zenwb-git-hist::-webkit-scrollbar-thumb:hover,.zenwb-git-patch::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-label-tertiary,#8a8a99);background-clip:padding-box;border:3px solid transparent}
.zenwb-git-changes::-webkit-scrollbar-track,.zenwb-git-hist::-webkit-scrollbar-track,.zenwb-git-patch::-webkit-scrollbar-track{background:transparent}

`;

/**
 * 手改区（不被抽取器覆盖的部分）。
 *
 * 头部开关按钮：悬浮面板的主入口。落位优先 portal 进 `dsh-zenith-shell` 的
 * `#zenith-header-extra`（见 shell-mount.ts），因此几何/配色**照 shell 的窗口
 * 控件**（`.zenith-btn`：28px 圆钮、`--dsw-alias-label-secondary`、无色底），
 * 而不是照原生 utilities —— 它最终是排在那簇按钮中间的。图标本体来自官方
 * primitives 的 IconBranchOutline16，这里只兜尺寸与描边色。
 */
export const WORKBENCH_CSS_EXTRA = `
.zenwb-githead{width:28px;height:28px;box-sizing:border-box;padding:6px;flex:none;display:inline-flex;align-items:center;justify-content:center;
  border:none;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);
  cursor:pointer;font-family:inherit;line-height:1;transition:color .15s ease,background .15s ease}
.zenwb-githead svg{width:15px;height:15px;flex:none;display:block;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;fill:none}
.zenwb-githead:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-githead:disabled{opacity:.4;cursor:default}
.zenwb-githead.zenwb-on{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
/* shell 不可用时的回退宿主：抵消 utilities 的 8px 间隙，使本按钮与原生的
   右栏收起开关间距自然（此时没有 shell 簇，只能留在原生工具区）。 */
.zenwb-githead-host{display:inline-flex;align-items:center;flex:none;margin-left:-8px}
/**
 * 独立 Git 浮窗（方案 A）：不经 sidebar-right / openTab。
 * fixed + 标题栏拖动 + 右下角缩放；颜色只用 DSW 别名。
 */
.zenwb-float{position:fixed;z-index:40;display:flex;flex-direction:column;
  background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);
  border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.28);overflow:hidden;
  color:var(--dsw-alias-label-primary);font-size:13px;pointer-events:auto}
.zenwb-float-bar{display:flex;align-items:center;gap:8px;flex:none;height:36px;
  padding:0 10px 0 14px;border-bottom:1px solid var(--dsw-alias-border-l1);
  background:var(--dsw-alias-bg-layer-2);cursor:move;user-select:none}
.zenwb-float-title{flex:1;min-width:0;font-size:13px;font-weight:600;
  color:var(--dsw-alias-label-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zenwb-float-close{width:28px;height:28px;flex:none;border:none;border-radius:999px;background:transparent;
  color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:18px;line-height:1;padding:0;
  display:inline-flex;align-items:center;justify-content:center;font-family:inherit;
  position:relative;z-index:2;pointer-events:auto}
.zenwb-float-close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.zenwb-float-body{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column}
.zenwb-float-body>.zenwb-git{flex:1;min-height:0}
.zenwb-float-resize{position:absolute;right:0;bottom:0;width:16px;height:16px;cursor:nwse-resize;
  background:linear-gradient(135deg,transparent 50%,var(--dsw-alias-border-l2,#666) 50%)}
body[data-zenwb-float-drag]{user-select:none}
body[data-zenwb-float-drag] .zenwb-float *{pointer-events:none}
body[data-zenwb-float-drag] .zenwb-float{pointer-events:auto}
`.trim();

/** 幂等注入样式表（重复调用不重复插入）。 */
export function ensureWorkbenchStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById("zenwb-style")) return;
  const style = document.createElement("style");
  style.id = "zenwb-style";
  style.textContent = WORKBENCH_CSS + "\n" + WORKBENCH_CSS_EXTRA;
  document.head.appendChild(style);
}
