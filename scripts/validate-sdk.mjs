import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const files = (dir, ext) => fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith(ext));
const fail = (message) => { throw new Error(message); };

const catalog = JSON.parse(read("assets/icons/icon-catalog.json"));
const svg = files("assets/icons", ".svg");
const xml = files("android/britta-compose/src/main/res/drawable", ".xml");
const themes = files("assets/themes", ".json").filter((f) => f !== "theme-packs.json");
const themeCatalog = JSON.parse(read("assets/themes/theme-packs.json"));
const themeEntries = Object.values(themeCatalog);

if (catalog.length !== 100) fail(`Icon catalog must contain 100 icons; got ${catalog.length}`);
if (svg.length !== 100) fail(`SVG directory must contain 100 icons; got ${svg.length}`);
if (xml.length !== 100) fail(`VectorDrawable directory must contain 100 icons; got ${xml.length}`);
if (themes.length !== 75) fail(`Theme directory must contain 75 variants; got ${themes.length}`);
if (!themeCatalog || themeEntries.length !== 75) fail("Theme catalog must contain 75 variants");

for (const file of svg) {
  const body = read(`assets/icons/${file}`);
  if (!body.includes("<svg") || !body.includes("<path")) fail(`SVG is not path-compatible: ${file}`);
  if (!/viewBox="0 0 24 24"/.test(body)) fail(`SVG viewBox mismatch: ${file}`);
}
for (const file of xml) {
  const body = read(`android/britta-compose/src/main/res/drawable/${file}`);
  if (!body.includes("<vector") || !body.includes("<path")) fail(`VectorDrawable is not path-compatible: ${file}`);
  if (!/android:viewportWidth="24"/.test(body) || !/android:viewportHeight="24"/.test(body)) fail(`VectorDrawable viewport mismatch: ${file}`);
}
for (const file of ["assets/fonts/IconForge.ttf", "web/fonts/IconForge.woff2", "web/fonts/iconforge.css"]) {
  if (!fs.existsSync(path.join(root, file)) || fs.statSync(path.join(root, file)).size === 0) fail(`Missing or empty font artifact: ${file}`);
}
const families = new Set(themeEntries.map((theme) => theme.family));
const variants = new Set(themeEntries.map((theme) => theme.colorScheme));
if (families.size !== 15) fail(`Expected 15 theme families; got ${families.size}`);
if (!["dark", "light", "crystal-glass", "aqua-ocean", "neon"].every((v) => variants.has(v))) fail("Theme variant set is incomplete");

console.log(`SDK assets valid: ${svg.length} SVG + ${xml.length} VectorDrawable + ${themes.length} themes + fonts`);
