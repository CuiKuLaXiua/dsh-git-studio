# 发布指南

## 1. 发布到 npm

```sh
# 检查 npm 源必须是官方源
npm config get registry        # 应输出 https://registry.npmjs.org/

npm login
npm publish --registry https://registry.npmjs.org
```

发布后可用 `npm view dsh-git-studio version` 验证。

## 2. 推送到 GitHub

```sh
git init
git add .
git commit -m "feat: initial release of dsh-git-studio"
git branch -M main
git remote add origin https://github.com/CuiKuLaXiua/dsh-git-studio.git
git push -u origin main
```

给仓库打 topic：`dsh-plugin`、`deepseek-harness`、`dsh`、`git`、`panel`。

## 3. 让社区发现

- 向 [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) 提 PR
- 关注 [dsh-market](https://github.com/dsh-market/dsh-market) 插件市场收录
