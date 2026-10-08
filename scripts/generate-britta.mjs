import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  generateCss,
  generateKotlin,
  generateStandaloneCss,
  generateTokensJson,
} from "../src/britta/compiler.ts";
import { KIT_FILES } from "../src/britta/compose-kit.ts";

const root = join(import.meta.dirname, "..");
const androidRoot = join(root, "android");

const css = generateCss();
const standalone = generateStandaloneCss();
const kotlin = generateKotlin();
const json = generateTokensJson();

const artifacts = [
  { path: join(root, "web/tokens.css"), contents: css },
  { path: join(root, "web/britta.css"), contents: standalone },
  {
    path: join(
      androidRoot,
      "britta-compose/src/main/kotlin/com/britta/design/generated/BrittaGeneratedTokens.kt",
    ),
    contents: kotlin,
  },
  { path: join(root, "core/tokens/tokens.json"), contents: json },
];

for (const file of KIT_FILES) {
  artifacts.push({ path: join(androidRoot, file.path), contents: file.contents });
}

for (const file of artifacts) {
  mkdirSync(dirname(file.path), { recursive: true });
  writeFileSync(file.path, file.contents);
  console.log("wrote", file.path.replace(root + "/", ""));
}

console.log("Britta Design artifacts generated.");
