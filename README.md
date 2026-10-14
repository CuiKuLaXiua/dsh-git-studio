# dsh-git-studio

DeepSeek Harness (DSH) 标准插件 — **Git Studio**：一个独立的 Git 工作面板。

在 DSH 桌面端 / Web 端的**会话头部右上角**点击 Git 按钮，即可打开一个**可拖拽、可缩放的独立浮窗**，直接操作当前会话工作目录所在的 Git 仓库：

- 仓库状态（分支、暂存/未暂存/未跟踪文件）
- 暂存 / 取消暂存 / 提交 / 推送
- 分支查看与切换
- 提交历史（log）
- 文件差异查看（diff）
- 文件树浏览与内容预览

## 功能入口位置

本插件使用 DSH 官方会话头部扩展点 **`conversation.session.header.utilities`**（右对齐工具区）：

- 该插槽渲染在会话标题栏右上角，与官方 `Open In...`、日程等按钮并排；
- **Web 端与桌面端共用同一套 UI**，因此桌面端与 Web 端行为完全一致；
- 点击按钮后，Git 面板以 `position:fixed` 独立浮窗打开（不占用右侧栏），可拖动标题栏、右下角缩放。

> 注：早期版本为适配 Zenith 自研壳（`dsh-zenith-shell`）的固定标题栏，曾用 `#zenith-header-extra` DOM 挂载点把按钮 portal 进 shell 头部簇。独立版已禁用该逻辑，统一走 DSH 原生会话头插槽。

## 安装

前置：已安装 DeepSeek Harness（Web 或桌面版），本机已安装 `git` 命令行。

### Web 版

```sh
dsh plugin --profile web add dsh-git-studio
```

重启 dsh 服务后，打开一个位于 git 仓库内的项目会话，右上角出现 Git 按钮。

### 桌面版

1. 打开桌面端 → 侧边栏 **Plugins / 插件** 页
2. 安装来源填 `dsh-git-studio`（或本地 tarball 的 `file:` 路径）
3. 按提示重启桌面端生效

### 从 GitHub 安装（未发布 npm 时）

```sh
dsh plugin --profile web add github:CuiKuLaXiua/dsh-git-studio
```

> 本插件是 bundle 型包（声明了 `dsh.bundle.patch` 与 `dsh.client`），`dsh plugin add` 会自动加入
> profile 的 `dsh.profile.bundles` 并应用 `cordis.patch.yml`，**不需要手工加 loader 行**。

## 数据链路与安全

- 宿主端在 `/git-studio/api` 注册同源 JSON-RPC 代理，执行 `git` 命令（status/diff/stage/unstage/commit/branch/log/discard）；
- 请求仅接受本机回环 / 可信宿主，并做仓库路径白名单校验（禁止绝对路径、`..` 逃逸）；
- 命令通过 `spawn("git", [...args])` 参数数组执行，不经 shell，无命令注入面；
- 浏览器端只拿到 git 命令的 JSON 结果，不接触凭据。

## 开发

```sh
npm install       # 安装 esbuild（构建依赖）
npm run build     # 从 src/ 重新构建 lib/
npm run smoke     # 语法 + 注册面锚点自检
npm pack          # 打包检查
```

- 宿主端源码 `src/host/*.ts`，浏览器端源码 `src/client/*.tsx`；
- 本地安装测试：`dsh plugin --profile web add file:<本目录>`。

## 发布（维护者）

见 `docs/PUBLISHING.md`。

## License

MIT
