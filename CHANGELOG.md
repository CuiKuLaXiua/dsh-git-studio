# Changelog

## [0.1.1] - 2026-10-20

### Fixed
- 修复 DSH 桌面端升级到 0.2.1 后 Git 面板报 `HTTP 405`：宿主服务 `webRuntime` 在 0.2.1
  改名为 `webStartup`，而旧版把它写进静态 `inject`（硬依赖）。服务缺失使宿主半端整体
  INACTIVE、`apply` 不执行，`/git-studio/api` 路由未注册，POST 请求落到前端静态兜底被回
  405（空 body）。
- `trustedHosts` 改为可选读取（`webStartup` → `webRuntime` 回退），同时兼容 0.1.x /
  0.2.x，缺服务时按"无额外信任主机"处理，不再阻塞插件启动。

## [0.1.0] - 2026-08

### Added
- 初始公开版本：`dsh-git-studio`
- Git 独立浮窗：仓库状态、暂存/提交/推送、分支/日志、差异查看、文件树浏览
- 入口位于 DSH 会话头 `conversation.session.header.utilities`（右上角工具区）
- 禁用 Zenith 专用 `#zenith-header-extra` 挂载点，统一走 DSH 原生插槽
- 标准 bundle 安装：`dsh plugin --profile web add dsh-git-studio`
