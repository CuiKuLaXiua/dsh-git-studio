# Changelog

## [0.1.0] - 2026-08

### Added
- 初始公开版本：`dsh-git-studio`
- Git 独立浮窗：仓库状态、暂存/提交/推送、分支/日志、差异查看、文件树浏览
- 入口位于 DSH 会话头 `conversation.session.header.utilities`（右上角工具区）
- 禁用 Zenith 专用 `#zenith-header-extra` 挂载点，统一走 DSH 原生插槽
- 标准 bundle 安装：`dsh plugin --profile web add dsh-git-studio`
