// dsh-git-studio 构建脚本
// 产物落入本包 lib/（ModuleLoader 双半结构）。
// 依赖策略：仅用 esbuild（devDependency），零运行时依赖。
//
// 产物契约：
//   lib/index.js  — host 半，ESM（inject 元数据 + apply）
//   lib/client.js — client 半，CJS 闭包工厂：
//     window.__ModuleLoader__.load({ id, factory: (require) => { …; return module.exports } })
import { build } from "esbuild";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "lib");
const PLUGIN_ID = "dsh-git-studio";

await build({
  entryPoints: [join(here, "src", "host", "index.ts")],
  outfile: join(outDir, "index.js"),
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node20",
  sourcemap: false,
  legalComments: "none",
  logLevel: "warning",
});

// 只外置页面运行时真正提供的模块（DSH web 引导模块表的子集）。
const CLIENT_EXTERNALS = [
  "react",
  "react/jsx-runtime",
  "react-dom",
  "react-dom/client",
  "@deepseek-ai/dsh-client-ui-primitives",
];

await build({
  entryPoints: [join(here, "src", "client", "index.tsx")],
  outfile: join(outDir, "client.js"),
  bundle: true,
  format: "cjs",
  platform: "browser",
  target: ["es2020"],
  external: CLIENT_EXTERNALS,
  jsx: "automatic",
  sourcemap: false,
  legalComments: "none",
  logLevel: "warning",
  banner: {
    js:
      'window.__ModuleLoader__.load({ id: "' + PLUGIN_ID + '", factory: function (require) {\n' +
      'var module = { exports: {} }; var exports = module.exports;\n' +
      'Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });',
  },
  footer: { js: "\nreturn module.exports;\n} });" },
});

// 产物自检
const clientSrc = readFileSync(join(outDir, "client.js"), "utf8");
if (!clientSrc.startsWith('window.__ModuleLoader__.load({ id: "' + PLUGIN_ID + '"')) {
  throw new Error("client bundle 头部不是 ModuleLoader 闭包工厂");
}
try { new Function(clientSrc); } catch (e) {
  throw new Error("client bundle 语法校验失败: " + e.message);
}
for (const needle of ["conversation.session.header.utilities", "zenwb-float", "GitBody"]) {
  if (!clientSrc.includes(needle)) throw new Error("client bundle 缺少注册面: " + needle);
}
for (const name of ["index.js", "client.js"]) {
  const size = readFileSync(join(outDir, name)).length;
  console.log("  lib/" + name + "  " + (size / 1024).toFixed(1) + " KB");
}
console.log("git-studio build -> lib/ OK");
