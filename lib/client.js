window.__ModuleLoader__.load({ id: "dsh-git-studio", factory: function (require) {
var module = { exports: {} }; var exports = module.exports;
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react3 = require("react");
var import_react_dom = require("react-dom");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/styles.ts
var WORKBENCH_CSS = `
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
var WORKBENCH_CSS_EXTRA = `
.zenwb-githead{width:28px;height:28px;box-sizing:border-box;padding:6px;flex:none;display:inline-flex;align-items:center;justify-content:center;
  border:none;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);
  cursor:pointer;font-family:inherit;line-height:1;transition:color .15s ease,background .15s ease}
.zenwb-githead svg{width:15px;height:15px;flex:none;display:block;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;fill:none}
.zenwb-githead:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
.zenwb-githead:disabled{opacity:.4;cursor:default}
.zenwb-githead.zenwb-on{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
/* shell \u4E0D\u53EF\u7528\u65F6\u7684\u56DE\u9000\u5BBF\u4E3B\uFF1A\u62B5\u6D88 utilities \u7684 8px \u95F4\u9699\uFF0C\u4F7F\u672C\u6309\u94AE\u4E0E\u539F\u751F\u7684
   \u53F3\u680F\u6536\u8D77\u5F00\u5173\u95F4\u8DDD\u81EA\u7136\uFF08\u6B64\u65F6\u6CA1\u6709 shell \u7C07\uFF0C\u53EA\u80FD\u7559\u5728\u539F\u751F\u5DE5\u5177\u533A\uFF09\u3002 */
.zenwb-githead-host{display:inline-flex;align-items:center;flex:none;margin-left:-8px}
/**
 * \u72EC\u7ACB Git \u6D6E\u7A97\uFF08\u65B9\u6848 A\uFF09\uFF1A\u4E0D\u7ECF sidebar-right / openTab\u3002
 * fixed + \u6807\u9898\u680F\u62D6\u52A8 + \u53F3\u4E0B\u89D2\u7F29\u653E\uFF1B\u989C\u8272\u53EA\u7528 DSW \u522B\u540D\u3002
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
function ensureWorkbenchStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("zenwb-style")) return;
  const style = document.createElement("style");
  style.id = "zenwb-style";
  style.textContent = WORKBENCH_CSS + "\n" + WORKBENCH_CSS_EXTRA;
  document.head.appendChild(style);
}

// src/client/shell-mount.ts
var import_react = require("react");
var MOUNT_IDS = [];
function mountShown(el) {
  const cluster = el.closest(".git-studio-header,.git-studio-fallback") ?? el;
  try {
    const cs = getComputedStyle(cluster);
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    const r = cluster.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  } catch {
    return true;
  }
}
function findMountPoint() {
  if (typeof document === "undefined") return null;
  for (const id of MOUNT_IDS) {
    const el = document.getElementById(id);
    if (el?.isConnected && mountShown(el)) return el;
  }
  return null;
}
function useShellMount() {
  const [target, setTarget] = (0, import_react.useState)(() => findMountPoint());
  (0, import_react.useEffect)(() => {
    let timer;
    let observer;
    function check() {
      const el = findMountPoint();
      setTarget((prev) => {
        if (!prev) return el ?? prev;
        if (!prev.isConnected || !mountShown(prev)) return el;
        if (el && el !== prev) return el;
        return prev;
      });
    }
    check();
    try {
      observer = new MutationObserver(check);
      observer.observe(document.body, { childList: true });
    } catch {
    }
    timer = setInterval(check, 2e3);
    return () => {
      if (timer) clearInterval(timer);
      try {
        observer?.disconnect();
      } catch {
      }
    };
  }, []);
  return target;
}

// src/client/git-body.tsx
var import_react2 = require("react");

// src/client/api.ts
var API_TIMEOUT_MS = 2e4;
async function apiCall(method, payload, opts) {
  const timeoutMs = opts?.timeoutMs ?? API_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = timeoutMs > 0 ? setTimeout(() => controller.abort(), timeoutMs) : void 0;
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
      signal: controller.signal
    });
    let body = null;
    try {
      body = await res.json();
    } catch {
    }
    if (!body) throw new Error("HTTP " + res.status);
    if (!body.ok) throw new Error(body.error?.message || body.error?.code || "HTTP " + res.status);
    return body.value;
  } catch (e) {
    if (e?.name === "AbortError") {
      if (opts?.signal?.aborted) throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");
      throw new Error("\u8BF7\u6C42\u8D85\u65F6\uFF08" + Math.round(timeoutMs / 1e3) + "s\uFF09\uFF1A" + method);
    }
    throw e;
  } finally {
    if (timer) clearTimeout(timer);
    opts?.signal?.removeEventListener("abort", onOuterAbort);
  }
}

// src/client/git-body.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PATCH_RENDER_LIMIT = 500;
function collapseDefaultFor(path) {
  return /(^|\/)(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb|Cargo\.lock|Cargo\.lock\.orig|poetry\.lock|composer\.lock|Gemfile\.lock|go\.sum)$/i.test(
    path
  ) || /(^|\/)(__tests__|tests|test|spec|snapshots)\//i.test(path) || /\.(test|spec|snap)\.[^./]+$/i.test(path);
}
function baseName(p) {
  const i = p.lastIndexOf("/");
  return i >= 0 ? p.slice(i + 1) : p;
}
function badgeOf(xy, side) {
  if (xy === "??") return "??";
  return side === 0 ? xy[0] : xy[1];
}
function lineKind(line) {
  if (line.startsWith("diff ") || line.startsWith("index ") || line.startsWith("---") || line.startsWith("+++") || line.startsWith("new file") || line.startsWith("deleted file") || line.startsWith("rename ") || line.startsWith("similarity ") || line.startsWith("Binary files") || line.startsWith("\\ No newline"))
    return "meta";
  if (line.startsWith("@@")) return "hunk";
  if (line.startsWith("+")) return "add";
  if (line.startsWith("-")) return "del";
  return "ctx";
}
var GitFiFile = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4.2 2h4.6l3.6 3.6v7.8c0 .9-.7 1.6-1.6 1.6H4.2c-.9 0-1.6-.7-1.6-1.6V3.6c0-.9.7-1.6 1.6-1.6z" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.6 2.2v3.6h3.6" })
] });
var GitFiImg = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1.6" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "5.7", cy: "6.4", r: "1.1" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2.9 11.5l3.3-3.5 2.5 2.6 1.9-1.8 2.5 2.6" })
] });
var GitFiDoc = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4.2 2h4.6l3.6 3.6v7.8c0 .9-.7 1.6-1.6 1.6H4.2c-.9 0-1.6-.7-1.6-1.6V3.6c0-.9.7-1.6 1.6-1.6z" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5.6 8h4.8M5.6 10.6h4.8" })
] });
var GitFiCode = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5.8 4.2 2.4 8l3.4 3.8" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.2 4.2 13.6 8l-3.4 3.8" })
] });
var GitFiZip = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4.2 2h4.6l3.6 3.6v7.8c0 .9-.7 1.6-1.6 1.6H4.2c-.9 0-1.6-.7-1.6-1.6V3.6c0-.9.7-1.6 1.6-1.6z" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7.4 2.2v1.6M7.4 5v1.6M7.4 7.8v1.6" })
] });
var GitActPlus = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 3.2v9.6M3.2 8h9.6" }) });
var GitActMinus = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3.2 8h9.6" }) });
var GitActUndo = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 3.5H4.2c-.9 0-1.6.7-1.6 1.6v1.2c0 .9.7 1.6 1.6 1.6H9.8" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6.2 2.2 3.6 4.8l2.6 2.6" })
] });
var GitBranchIco = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "5", cy: "4", r: "1.8" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "5", cy: "12", r: "1.8" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "11", cy: "8", r: "1.8" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 5.8v4.4M5 8c0-2 2.4-1.6 4.2-2.2" })
] });
var GitRefreshIco = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13.2 8A5.2 5.2 0 1 1 8 2.8c2 0 3.7 1.1 4.6 2.8" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.9 1.8v3.8h-3.8" })
] });
var GitCheckHeroIco = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4.5 12.5l5 5 10-11" }) });
var GitCopyIco = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "5.2", y: "5.2", width: "7.6", height: "7.6", rx: "1.4" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3.4 10.2V4.6c0-.8.6-1.4 1.4-1.4h5.6" })
] });
var GitCheckIco = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3.2 8.4l3.2 3.2 6.4-7.2" }) });
var GitBackIco = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.6 3.6 5.2 8l4.4 4.4" }) });
var IMG_EXT2 = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "svg", "avif"]);
var DOC_EXT2 = /* @__PURE__ */ new Set(["md", "markdown", "txt", "pdf", "doc", "docx"]);
var CODE_EXT2 = /* @__PURE__ */ new Set(["ts", "tsx", "js", "jsx", "mjs", "cjs", "py", "rs", "go", "c", "h", "cpp", "hpp", "java", "kt", "swift", "rb", "php", "cs", "vue", "svelte", "json", "jsonc", "yaml", "yml", "toml", "ini", "cfg", "sh", "bat", "ps1", "sql", "html", "css", "scss", "less", "xml", "lua", "dart"]);
var ZIP_EXT2 = /* @__PURE__ */ new Set(["zip", "gz", "tar", "rar", "7z", "bz2", "xz", "zst"]);
function gitFileIcon(name) {
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".") + 1).toLowerCase() : "";
  if (IMG_EXT2.has(ext)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-fi zenwb-fi-img", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitFiImg, {}) });
  if (DOC_EXT2.has(ext)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-fi zenwb-fi-doc", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitFiDoc, {}) });
  if (CODE_EXT2.has(ext)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-fi zenwb-fi-code", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitFiCode, {}) });
  if (ZIP_EXT2.has(ext)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-fi zenwb-fi-zip", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitFiZip, {}) });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-fi zenwb-fi-file", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitFiFile, {}) });
}
function actIcon(label) {
  if (label === "\uFF0B" || label === "stage") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitActPlus, {});
  if (label === "\u2212" || label === "unstage") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitActMinus, {});
  if (label === "\u21A9" || label === "discard") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitActUndo, {});
  return label;
}
function GitSkeleton() {
  const rows = ["96%", "78%", "88%", "64%", "91%", "73%"];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-sk", "aria-busy": "true", "aria-label": "\u6B63\u5728\u52A0\u8F7D Git \u72B6\u6001", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-sk zenwb-git-sk-head" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-sk zenwb-git-sk-sec" }),
    rows.slice(0, 3).map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-sk zenwb-git-sk-row", style: { width: w } }, i)),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-sk zenwb-git-sk-sec" }),
    rows.slice(3).map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-sk zenwb-git-sk-row", style: { width: w } }, i))
  ] });
}
function DiffSkeleton() {
  const rows = [
    { w: "92%", k: "" },
    { w: "78%", k: "zenwb-git-sk-add" },
    { w: "85%", k: "" },
    { w: "64%", k: "zenwb-git-sk-del" },
    { w: "88%", k: "" },
    { w: "72%", k: "zenwb-git-sk-add" },
    { w: "81%", k: "" },
    { w: "58%", k: "" }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git-patch", "aria-busy": "true", "aria-label": "\u6B63\u5728\u62C9\u53D6 diff", children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-l", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-lnum", children: " " }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-sk zenwb-git-sk-patch" + (r.k ? " " + r.k : ""), style: { width: r.w } })
  ] }, i)) });
}
function FileRow({
  row,
  active,
  actions,
  onOpen,
  busy
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-row" + (active ? " zenwb-on" : ""), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-badge zenwb-git-b-" + (row.badge === "??" ? "U" : row.badge), children: row.badge }),
    gitFileIcon(baseName(row.path)),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "zenwb-git-row-name", title: row.path, onClick: onOpen, children: [
      baseName(row.path),
      row.path.includes("/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "zenwb-git-row-dir", children: [
        " ",
        row.path.slice(0, row.path.lastIndexOf("/"))
      ] }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-row-actions", children: actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        className: "zenwb-git-act" + (a.danger ? " zenwb-git-act-danger" : ""),
        title: a.title,
        disabled: busy,
        onClick: (e) => {
          e.stopPropagation();
          a.run();
        },
        children: actIcon(a.label)
      },
      a.label
    )) })
  ] });
}
function DiffView({
  sel,
  patch,
  onBack
}) {
  const [expanded, setExpanded] = (0, import_react2.useState)(!collapseDefaultFor(sel.path));
  const [copied, setCopied] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    setExpanded(!collapseDefaultFor(sel.path));
  }, [sel.path]);
  (0, import_react2.useEffect)(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);
  const allLines = patch === null ? [] : patch.split("\n");
  const collapsedNote = collapseDefaultFor(sel.path) ? "\u6D4B\u8BD5/\u9501\u6587\u4EF6\uFF1A\u9ED8\u8BA4\u6298\u53E0" : allLines.length > PATCH_RENDER_LIMIT ? "diff \u8FC7\u957F\uFF1A\u4EC5\u6E32\u67D3\u524D " + PATCH_RENDER_LIMIT + " \u884C\uFF08\u5171 " + allLines.length + " \u884C\uFF09" : null;
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-diff", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-diff-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "zenwb-git-back", onClick: onBack, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBackIco, {}),
        "\u8FD4\u56DE"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-diff-path", title: sel.path, children: sel.path }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-side-tag", children: sel.untracked ? "\u65B0\u6587\u4EF6" : sel.staged ? "\u5DF2\u6682\u5B58" : "\u5DE5\u4F5C\u533A" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          className: "zenwb-iconbtn zenwb-git-copy" + (copied ? " zenwb-on" : ""),
          title: copied ? "\u5DF2\u590D\u5236" : "\u590D\u5236 diff",
          onClick: copyPatch,
          children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCheckIco, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCopyIco, {})
        }
      )
    ] }),
    patch === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffSkeleton, {}) : collapsedNote && !expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "zenwb-git-collapse-bar", onClick: () => setExpanded(true), children: [
      collapsedNote,
      " \xB7 \u70B9\u51FB\u5C55\u5F00\uFF08",
      allLines.length,
      " \u884C\uFF09"
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      collapsedNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "zenwb-git-collapse-bar", onClick: () => setExpanded(false), children: "\u6298\u53E0" }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-patch", children: [
        lines.map((l, i) => {
          const k = lineKind(l);
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-l zenwb-git-l-" + k, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-lnum", children: i + 1 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-ltxt", children: l === "" ? " " : l })
          ] }, i);
        }),
        expanded && allLines.length > PATCH_RENDER_LIMIT ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-trunc", children: [
          "\u2026 \u5DF2\u622A\u65AD\uFF08\u5171 ",
          allLines.length,
          " \u884C\uFF0C\u4EC5\u6E32\u67D3\u524D ",
          PATCH_RENDER_LIMIT,
          " \u884C\uFF09"
        ] }) : null
      ] })
    ] })
  ] });
}
function GitBody(props) {
  const sessionId = props?.sessionId;
  const [status, setStatus] = (0, import_react2.useState)(null);
  const [fatal, setFatal] = (0, import_react2.useState)(null);
  const [busy, setBusy] = (0, import_react2.useState)(false);
  const [view, setView] = (0, import_react2.useState)("changes");
  const [sel, setSel] = (0, import_react2.useState)(null);
  const [patch, setPatch] = (0, import_react2.useState)(null);
  const [msg, setMsg] = (0, import_react2.useState)("");
  const [commitErr, setCommitErr] = (0, import_react2.useState)(null);
  const [hist, setHist] = (0, import_react2.useState)([]);
  const [histDone, setHistDone] = (0, import_react2.useState)(false);
  const inflightRef = (0, import_react2.useRef)(/* @__PURE__ */ new Map());
  const aliveRef = (0, import_react2.useRef)(true);
  function begin(kind) {
    inflightRef.current.get(kind)?.abort();
    const ac = new AbortController();
    inflightRef.current.set(kind, ac);
    return ac;
  }
  function readable(e) {
    if (e?.name === "AbortError") return null;
    return String(e?.message ?? e);
  }
  (0, import_react2.useEffect)(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      for (const ac of inflightRef.current.values()) ac.abort();
      inflightRef.current.clear();
    };
  }, [sessionId]);
  const refresh = (0, import_react2.useCallback)(() => {
    const ac = begin("status");
    setBusy(true);
    apiCall("git.status", { sessionId }, { signal: ac.signal }).then((s) => {
      if (!aliveRef.current) return;
      setStatus(s);
      setFatal(null);
    }).catch((e) => {
      const m = readable(e);
      if (m !== null && aliveRef.current) setFatal(m);
    }).finally(() => {
      if (aliveRef.current) setBusy(false);
    });
  }, [sessionId]);
  (0, import_react2.useEffect)(() => {
    setStatus(null);
    setFatal(null);
    setSel(null);
    setPatch(null);
    setHist([]);
    setHistDone(false);
    if (sessionId) refresh();
    else setBusy(false);
  }, [sessionId, refresh]);
  const loadHistory = (0, import_react2.useCallback)(
    (reset) => {
      const ac = begin("log");
      setBusy(true);
      const skip = reset ? 0 : hist.length;
      apiCall("git.log", { sessionId, skip }, { signal: ac.signal }).then((d) => {
        if (!aliveRef.current) return;
        setHist((h) => reset ? d.entries : [...h, ...d.entries]);
        setHistDone(d.entries.length < d.page);
      }).catch((e) => {
        const m = readable(e);
        if (m !== null && aliveRef.current) setFatal(m);
      }).finally(() => {
        if (aliveRef.current) setBusy(false);
      });
    },
    [sessionId, hist.length]
  );
  (0, import_react2.useEffect)(() => {
    if (view === "history" && hist.length === 0) loadHistory(true);
  }, [view, hist.length, loadHistory]);
  function mutate(method, payload, after) {
    const ac = begin("mutate");
    setBusy(true);
    apiCall(method, { sessionId, ...payload }, { signal: ac.signal }).then(() => {
      if (!aliveRef.current) return;
      setSel(null);
      setPatch(null);
      if (after) after();
      refresh();
    }).catch((e) => {
      const m = readable(e);
      if (m !== null && aliveRef.current) setFatal(m);
    }).finally(() => {
      if (aliveRef.current) setBusy(false);
    });
  }
  function discard(row) {
    const what = row.untracked ? "\u5220\u9664\u672A\u8DDF\u8E2A\u6587\u4EF6\uFF08\u4E0D\u53EF\u6062\u590D\uFF09" : "\u4E22\u5F03\u6B64\u6587\u4EF6\u7684\u5168\u90E8\u672A\u6682\u5B58\u4FEE\u6539";
    if (!window.confirm(what + "\uFF1A\n" + row.path + "\n\n\u786E\u5B9A\uFF1F")) return;
    mutate("git.discard", { paths: [row.path], untracked: row.untracked });
  }
  function openDiff(row) {
    setSel(row);
    setPatch(null);
    const ac = begin("diff");
    apiCall(
      "git.diff",
      { sessionId, path: row.path, staged: row.staged, untracked: row.untracked },
      { signal: ac.signal }
    ).then((d) => {
      if (aliveRef.current) setPatch(d.patch);
    }).catch((e) => {
      const m = readable(e);
      if (m !== null && aliveRef.current) setPatch("\u52A0\u8F7D diff \u5931\u8D25\uFF1A" + m);
    });
  }
  function commit() {
    if (msg.trim() === "") return;
    const ac = begin("commit");
    setBusy(true);
    setCommitErr(null);
    apiCall("git.commit", { sessionId, message: msg }, { signal: ac.signal }).then(() => {
      if (!aliveRef.current) return;
      setMsg("");
      setHist([]);
      if (view === "history") loadHistory(true);
      refresh();
    }).catch((e) => {
      const m = readable(e);
      if (m !== null && aliveRef.current) setCommitErr(m);
    }).finally(() => {
      if (aliveRef.current) setBusy(false);
    });
  }
  const { stagedRows, unstagedRows, untrackedRows } = (0, import_react2.useMemo)(() => {
    const stagedRows2 = [];
    const unstagedRows2 = [];
    const untrackedRows2 = [];
    for (const e of status?.entries ?? []) {
      if (e.xy === "??") {
        untrackedRows2.push({ path: e.path, badge: "??", staged: false, untracked: true });
        continue;
      }
      if (e.xy[0] !== " " && e.xy[0] !== "?")
        stagedRows2.push({ path: e.path, badge: badgeOf(e.xy, 0), staged: true, untracked: false });
      if (e.xy[1] !== " " && e.xy[1] !== "?")
        unstagedRows2.push({ path: e.path, badge: badgeOf(e.xy, 1), staged: false, untracked: false });
    }
    return { stagedRows: stagedRows2, unstagedRows: unstagedRows2, untrackedRows: untrackedRows2 };
  }, [status]);
  if (!sessionId || sessionId === "__git-studio-hero__") {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git-empty", children: "\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD" }) });
  }
  if (fatal !== null) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-empty", children: [
        "Git \u9762\u677F\u51FA\u9519\uFF1A",
        fatal
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git-actions", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "zenwb-btn", onClick: refresh, children: "\u91CD\u8BD5" }) })
    ] });
  }
  if (status === null)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitSkeleton, {}) });
  if (!status.isRepo) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git-empty", children: "\u6B64\u5DE5\u4F5C\u533A\u4E0D\u662F Git \u4ED3\u5E93" }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "zenwb-git-branch", title: status.root ?? status.branch, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranchIco, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-branch-name", children: status.branch })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "zenwb-git-head-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-seg", role: "tablist", "aria-label": "Git \u89C6\u56FE", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": view === "changes",
              className: "zenwb-git-vw" + (view === "changes" ? " zenwb-on" : ""),
              onClick: () => setView("changes"),
              children: "\u53D8\u66F4"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": view === "history",
              className: "zenwb-git-vw" + (view === "history" ? " zenwb-on" : ""),
              onClick: () => setView("history"),
              children: "\u5386\u53F2"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            className: "zenwb-iconbtn zenwb-git-refresh" + (busy ? " zenwb-busy" : ""),
            title: busy ? "\u5237\u65B0\u4E2D\u2026" : "\u5237\u65B0\u72B6\u6001",
            "aria-label": "\u5237\u65B0 Git \u72B6\u6001",
            disabled: busy,
            onClick: () => view === "history" ? (setHist([]), loadHistory(true)) : refresh(),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitRefreshIco, {})
          }
        )
      ] })
    ] }),
    status.truncated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git-note", children: "\u53D8\u66F4\u8D85\u8FC7 2000 \u6761\uFF1A\u4EC5\u663E\u793A\u524D 2000 \u6761" }) : null,
    view === "history" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-hist", children: [
      hist.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-commit", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-commit-top", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-commit-hash", children: h.hash }),
          h.refs ? h.refs.split(",").map((s) => s.trim()).filter(Boolean).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-ref", children: r }, r)) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-commit-subj", title: h.subject, children: h.subject }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "zenwb-git-commit-meta", children: [
          h.author,
          " \xB7 ",
          h.date.slice(0, 10)
        ] })
      ] }, h.hash)),
      !histDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "zenwb-git-more", disabled: busy, onClick: () => loadHistory(false), children: busy ? "\u52A0\u8F7D\u4E2D\u2026" : "\u52A0\u8F7D\u66F4\u591A" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git-more zenwb-git-end", children: "\u6CA1\u6709\u66F4\u65E9\u7684\u63D0\u4EA4\u4E86" })
    ] }) : sel !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffView, { sel, patch, onBack: () => setSel(null) }) : (() => {
      const unstagedTotal = unstagedRows.length + untrackedRows.length;
      const isClean = stagedRows.length === 0 && unstagedTotal === 0;
      const hasStaged = stagedRows.length > 0;
      if (isClean) {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-clean-hero", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-clean-hero-ico", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCheckHeroIco, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git-clean-hero-title", children: "\u5DE5\u4F5C\u533A\u5E72\u51C0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-clean-hero-sub", children: [
            "\u6CA1\u6709\u53EF\u63D0\u4EA4\u7684\u66F4\u6539",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
            "\u6682\u5B58\u65B0\u7684\u4FEE\u6539\u540E\uFF0C\u8FD9\u91CC\u4F1A\u51FA\u73B0\u63D0\u4EA4\u6846"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "zenwb-btn", onClick: () => setView("history"), children: "\u67E5\u770B\u63D0\u4EA4\u5386\u53F2" })
        ] });
      }
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-changes", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-sec", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-sec-title", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
              "\u6682\u5B58\u7684\u66F4\u6539 \xB7 ",
              stagedRows.length
            ] }),
            stagedRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                className: "zenwb-git-sec-act",
                disabled: busy,
                onClick: () => mutate("git.unstage", { paths: stagedRows.map((r) => r.path) }),
                children: "\u5168\u90E8\u53D6\u6D88\u6682\u5B58"
              }
            ) : null
          ] }),
          stagedRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git-sec-empty", children: "\u6682\u65E0\u6682\u5B58 \u2014 \u5728\u4E0B\u65B9\u6587\u4EF6\u884C\u70B9\u300C+\u300D\u6216\u300C\u5168\u90E8\u6682\u5B58\u300D" }) : null,
          stagedRows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            FileRow,
            {
              row: r,
              active: sel?.path === r.path && sel.staged,
              busy,
              onOpen: () => openDiff(r),
              actions: [{ label: "unstage", title: "\u53D6\u6D88\u6682\u5B58", run: () => mutate("git.unstage", { paths: [r.path] }) }]
            },
            "s " + r.path
          ))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-sec", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-sec-title", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
              "\u66F4\u6539 \xB7 ",
              unstagedTotal
            ] }),
            unstagedTotal > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                className: "zenwb-git-sec-act",
                disabled: busy,
                onClick: () => mutate("git.stage", { paths: [...unstagedRows, ...untrackedRows].map((r) => r.path) }),
                children: "\u5168\u90E8\u6682\u5B58"
              }
            ) : null
          ] }),
          unstagedRows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            FileRow,
            {
              row: r,
              active: sel?.path === r.path && !sel.staged,
              busy,
              onOpen: () => openDiff(r),
              actions: [
                { label: "stage", title: "\u6682\u5B58", run: () => mutate("git.stage", { paths: [r.path] }) },
                { label: "discard", title: "\u4E22\u5F03\u4FEE\u6539", danger: true, run: () => discard(r) }
              ]
            },
            "w " + r.path
          )),
          untrackedRows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            FileRow,
            {
              row: r,
              active: sel?.path === r.path && !sel.staged,
              busy,
              onOpen: () => openDiff(r),
              actions: [
                { label: "stage", title: "\u6682\u5B58", run: () => mutate("git.stage", { paths: [r.path] }) },
                { label: "discard", title: "\u5220\u9664\u672A\u8DDF\u8E2A\u6587\u4EF6", danger: true, run: () => discard(r) }
              ]
            },
            "u " + r.path
          ))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-commitbox", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "zenwb-git-commitbox-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u63D0\u4EA4" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "zenwb-git-commitbox-count", children: hasStaged ? "\u5C06\u63D0\u4EA4 " + stagedRows.length + " \u4E2A\u6587\u4EF6" : "\u6682\u5B58\u540E\u53EF\u63D0\u4EA4" })
          ] }),
          !hasStaged ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git-stage-hint", children: "\u63D0\u4EA4\u524D\u9700\u5148\u6682\u5B58\u6587\u4EF6 \u2014 \u70B9\u6587\u4EF6\u884C\u300C+\u300D\uFF0C\u6216\u300C\u5168\u90E8\u6682\u5B58\u300D\u3002" }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "textarea",
            {
              className: "zenwb-git-msg",
              placeholder: hasStaged ? "\u63D0\u4EA4\u4FE1\u606F\uFF08Ctrl+Enter \u63D0\u4EA4\uFF09" : "\u6682\u5B58\u6587\u4EF6\u540E\u5728\u6B64\u8F93\u5165\u63D0\u4EA4\u4FE1\u606F\u2026",
              value: msg,
              rows: 2,
              disabled: !hasStaged,
              onChange: (e) => setMsg(e.target.value),
              onKeyDown: (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  e.preventDefault();
                  commit();
                }
              }
            }
          ),
          commitErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zenwb-git-commit-err", children: commitErr }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              className: "zenwb-btn zenwb-git-commit-btn",
              disabled: busy || msg.trim() === "" || !hasStaged,
              title: busy ? "\u6267\u884C\u4E2D\u2026" : !hasStaged ? "\u9700\u5148\u6682\u5B58\u6587\u4EF6" : msg.trim() === "" ? "\u8BF7\u8F93\u5165\u63D0\u4EA4\u4FE1\u606F" : "\u63D0\u4EA4 " + stagedRows.length + " \u4E2A\u6587\u4EF6",
              onClick: commit,
              children: busy ? "\u63D0\u4EA4\u4E2D\u2026" : hasStaged ? "\u63D0\u4EA4\uFF08" + stagedRows.length + "\uFF09" : "\u63D0\u4EA4"
            }
          )
        ] })
      ] });
    })()
  ] });
}

// src/client/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var FLOAT_W = 440;
var FLOAT_H = 620;
var FLOAT_TOP = 72;
var FLOAT_RIGHT = 24;
var MIN_W = 280;
var MIN_H = 320;
var inject = ["slots"];
var openSessions = /* @__PURE__ */ new Set();
var openListeners = /* @__PURE__ */ new Set();
function notifyOpen() {
  for (const fn of openListeners) fn();
}
function subscribeOpen(fn) {
  openListeners.add(fn);
  return () => openListeners.delete(fn);
}
function openPanel(sessionId) {
  if (openSessions.has(sessionId)) return;
  openSessions.add(sessionId);
  notifyOpen();
}
function closePanel(sessionId) {
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
    height
  };
}
function sessionOf(props) {
  return typeof props?.sessionId === "string" && props.sessionId ? props.sessionId : void 0;
}
function apply(ctx) {
  ensureWorkbenchStyles();
  ctx.effect(
    () => ctx.slots.inject(
      "conversation.session.header.utilities",
      () => ctx.slots.register(
        { name: "conversation.session.header.utilities", id: "git-studio-toggle", order: 40 },
        (props) => HeaderButton(props)
      )
    ),
    "git-studio: header git toggle"
  );
  ctx.effect(
    () => ctx.slots.inject(
      "shell.overlay",
      () => ctx.slots.register(
        { name: "shell.overlay", id: "git-studio-fallback-toggle", order: 1, label: "Git \u5165\u53E3\uFF08\u7A7A\u6001\uFF09" },
        () => {
          let sessions = void 0;
          try {
            sessions = ctx.get("sessions");
          } catch {
          }
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RootGitToggle, { sessions });
        }
      )
    ),
    "git-studio: fallback git toggle"
  );
}
function RootGitToggle({ sessions }) {
  const mount = useShellMount();
  const currentId = (snapshot) => {
    const byId = snapshot?.byId;
    if (!byId) return void 0;
    for (const id of Object.keys(byId)) {
      const row = byId[id];
      if (row && (row.retainedBy?.mainView ?? 0) > 0) return row.id;
    }
    return void 0;
  };
  const [current, setCurrent] = (0, import_react3.useState)(
    () => sessions?.list ? currentId(sessions.list.getSnapshot()) : void 0
  );
  (0, import_react3.useEffect)(() => {
    if (!sessions?.list?.subscribe) return;
    return sessions.list.subscribe(() => {
      setCurrent(currentId(sessions.list.getSnapshot()));
    });
  }, [sessions]);
  if (!mount || mount.id !== "zenith-header-extra-fallback") return null;
  if (!current) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(HeaderButton, { sessionId: current });
}
function guardShellDoubleClick(e) {
  if (e?.detail === 2) e?.stopPropagation?.();
}
function HeaderButton(props) {
  const sessionId = sessionOf(props);
  const [open, setOpen] = (0, import_react3.useState)(() => !!sessionId && openSessions.has(sessionId));
  const mount = useShellMount();
  const [showPanel, setShowPanel] = (0, import_react3.useState)(() => !!sessionId && openSessions.has(sessionId));
  (0, import_react3.useEffect)(
    () => subscribeOpen(() => {
      setOpen(!!sessionId && openSessions.has(sessionId));
      setShowPanel(!!sessionId && openSessions.has(sessionId));
    }),
    [sessionId]
  );
  function toggle(e) {
    e?.stopPropagation?.();
    if (!sessionId) return;
    if (openSessions.has(sessionId)) closePanel(sessionId);
    else openPanel(sessionId);
  }
  const button = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: open ? "\u5173\u95ED Git \u9762\u677F" : "\u6253\u5F00 Git \u9762\u677F", side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "button",
    {
      type: "button",
      className: "zenwb-githead" + (open ? " zenwb-on" : ""),
      "aria-label": open ? "\u5173\u95ED Git \u9762\u677F" : "\u6253\u5F00 Git \u9762\u677F",
      "aria-pressed": open,
      "data-git-studio-panel": "",
      onMouseDown: guardShellDoubleClick,
      onDoubleClick: (e) => e.stopPropagation(),
      onClick: toggle,
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconBranchOutlineRegular, {})
    }
  ) });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    mount ? (0, import_react_dom.createPortal)(button, mount) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "zenwb-githead-host", children: button }),
    showPanel && sessionId ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      GitFloatPanel,
      {
        sessionId,
        onClose: () => {
          closePanel(sessionId);
        }
      }
    ) : null
  ] });
}
function GitFloatPanel({ sessionId, onClose }) {
  const [rect, setRect] = (0, import_react3.useState)(defaultRect);
  const drag = (0, import_react3.useRef)(
    null
  );
  (0, import_react3.useEffect)(() => {
    function onMove(ev) {
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
  function startDrag(e, mode) {
    if (e.button !== 0) return;
    const t = e.target;
    if (mode === "move" && t?.closest?.("button,a,input,textarea,select")) return;
    e.preventDefault();
    e.stopPropagation();
    drag.current = { mode, x: e.clientX, y: e.clientY, r: rect };
    document.body.setAttribute("data-zenwb-float-drag", mode);
  }
  const panel = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      className: "zenwb-float",
      "data-zenwb-float": "",
      style: {
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height
      },
      role: "dialog",
      "aria-label": "Git \u9762\u677F",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: "zenwb-float-bar",
            onMouseDown: (e) => startDrag(e, "move"),
            onDoubleClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "zenwb-float-title", children: "Git" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "button",
                {
                  type: "button",
                  className: "zenwb-float-close",
                  "aria-label": "\u5173\u95ED",
                  onMouseDown: (e) => e.stopPropagation(),
                  onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                  },
                  children: "\xD7"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "zenwb-float-body", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GitBody, { sessionId }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: "zenwb-float-resize",
            "aria-hidden": "true",
            onMouseDown: (e) => startDrag(e, "resize")
          }
        )
      ]
    }
  );
  return (0, import_react_dom.createPortal)(panel, document.body);
}

return module.exports;
} });
