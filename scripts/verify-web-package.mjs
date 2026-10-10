import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const packageDir = path.join(root, "packages/web");
const required = ["index.js", "index.d.ts", "README.md", "LICENSE"];
for (const file of required) {
  if (!fs.existsSync(path.join(packageDir, file))) throw new Error(`Missing web package file: ${file}`);
}
for (const dir of ["assets/icons", "assets/themes", "styles"]) {
  const full = path.join(packageDir, dir);
  if (!fs.existsSync(full) || fs.readdirSync(full).length === 0) throw new Error(`Missing web package directory: ${dir}`);
}
const output = execFileSync("npm", ["pack", "--dry-run", "--json"], { cwd: packageDir, encoding: "utf8" });
const report = JSON.parse(output)[0];
const names = new Set(report.files.map(({ path: file }) => file));
for (const file of required) {
  if (!names.has(file)) throw new Error(`Tarball does not include: ${file}`);
}
if (![...names].some((file) => file.startsWith("assets/icons/"))) throw new Error("Tarball has no icons");
if (![...names].some((file) => file.startsWith("assets/themes/"))) throw new Error("Tarball has no themes");
if (![...names].some((file) => file.startsWith("styles/"))) throw new Error("Tarball has no styles");
console.log(`Web package verified: ${report.entryCount} files, Apache-2.0 license included`);
