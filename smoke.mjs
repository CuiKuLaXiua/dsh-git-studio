// dsh-git-studio 冒烟：语法 + 注册面锚点断言（node --check 级别，零依赖）。
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const nodeExe = process.execPath;

for (const f of ["lib/index.js", "lib/client.js"]) {
  execFileSync(nodeExe, ["--check", join(here, f)], { stdio: "inherit" });
  console.log("smoke: " + f + " 语法 OK");
}

const client = readFileSync(join(here, "lib", "client.js"), "utf8");
for (const anchor of ["conversation.session.header.utilities", "dsh-git-studio", "zenwb-float"]) {
  if (!client.includes(anchor)) throw new Error("client.js 缺少锚点: " + anchor);
}
console.log("smoke: client 注册面锚点 OK");

const host = readFileSync(join(here, "lib", "index.js"), "utf8");
for (const anchor of ["/git-studio/api", "apply", "inject"]) {
  if (!host.includes(anchor)) throw new Error("index.js 缺少锚点: " + anchor);
}
console.log("smoke: host 锚点 OK");
