import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "packages/web");
const copy = (from, to) => {
  fs.rmSync(to, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true });
};

copy(path.join(root, "assets/icons"), path.join(out, "assets/icons"));
copy(path.join(root, "assets/themes"), path.join(out, "assets/themes"));
fs.mkdirSync(path.join(out, "styles"), { recursive: true });
fs.copyFileSync(path.join(root, "web/tokens.css"), path.join(out, "styles/tokens.css"));
fs.copyFileSync(path.join(root, "web/britta.css"), path.join(out, "styles/britta.css"));
fs.copyFileSync(path.join(root, "web/fonts/iconforge.css"), path.join(out, "styles/iconforge.css"));
copy(path.join(root, "web/fonts/IconForge.woff2"), path.join(out, "styles/IconForge.woff2"));
fs.copyFileSync(path.join(root, "LICENSE"), path.join(out, "LICENSE"));
console.log("Web package prepared");
