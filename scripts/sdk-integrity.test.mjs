import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const catalog = JSON.parse(fs.readFileSync("assets/icons/icon-catalog.json", "utf8"));
const themes = JSON.parse(fs.readFileSync("assets/themes/theme-packs.json", "utf8"));

 test("IconForge exposes exactly 100 named icons in both vector formats", () => {
  const svg = fs.readdirSync("assets/icons").filter((file) => file.endsWith(".svg"));
  const xml = fs.readdirSync("android/britta-compose/src/main/res/drawable").filter((file) => file.endsWith(".xml"));
  assert.equal(catalog.length, 100);
  assert.equal(svg.length, 100);
  assert.equal(xml.length, 100);
});

test("theme catalog exposes 15 families and 5 variants", () => {
  const entries = Object.values(themes);
  assert.equal(entries.length, 75);
  assert.equal(new Set(entries.map((entry) => entry.family)).size, 15);
  assert.deepEqual([...new Set(entries.map((entry) => entry.colorScheme))].sort(), ["aqua-ocean", "crystal-glass", "dark", "light", "neon"]);
});

test("portable font artifacts are present", () => {
  for (const file of ["assets/fonts/IconForge.ttf", "web/fonts/IconForge.woff2", "web/fonts/iconforge.css"]) {
    assert.ok(fs.statSync(file).size > 0, file);
  }
});
