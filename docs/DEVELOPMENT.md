# 开发说明

## 架构

- 宿主端 `src/host/*.ts`：注册 `/git-studio/api` 同源 JSON-RPC 代理（git status/diff/stage/unstage/commit/branch/log/discard），
  路径白名单 + 回环信任校验。
- 浏览器端 `src/client/*.tsx`：注册 `conversation.session.header.utilities` 会话头按钮，点击打开
  `position:fixed` 独立浮窗（可拖动、可缩放）。
- 构建：`npm run build`（esbuild 打包双半结构到 `lib/`）。
- 自检：`npm run smoke`。

## 功能入口：为什么用 `conversation.session.header.utilities`

DSH（Web 与桌面共用壳）在会话标题栏右上角提供右对齐工具区插槽
`conversation.session.header.utilities`（list，session 作用域），官方
`ui-open-in-app`、`ui-schedule` 均注册于此。这是标准 DSH 中与"右上角入口"
语义最接近的原生位置。

旧版为适配 Zenith 自研壳的固定标题栏，曾通过 `#zenith-header-extra` /
`#zenith-header-extra-fallback` DOM 挂载点把按钮 portal 进 shell 头部簇。
独立版已把 `MOUNT_IDS` 置空，`useShellMount()` 恒返回 null，入口统一走原生插槽。

## 本地测试

```sh
dsh plugin --profile web add file:D:\code\dsh-git-studio
```
