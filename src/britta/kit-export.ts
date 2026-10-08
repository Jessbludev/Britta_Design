import {
  generateCss,
  generateKotlin,
  generateStandaloneCss,
  generateTokensJson,
} from "./compiler";
import { KIT_FILES, KIT_README } from "./compose-kit";
import { iconsJson, iconsKotlinObject } from "./icons-data";
import { shadersJson, shadersKotlin, SHADERS, wrapAgsl, wrapGlsl } from "./shaders";
import { downloadZip } from "@/lib/zip";

export function kitFiles(seed: string) {
  return [
    { path: "README.md", contents: KIT_README },
    { path: "core/tokens.json", contents: generateTokensJson(seed) },
    { path: "web/tokens.css", contents: generateCss(seed) },
    { path: "web/britta.css", contents: generateStandaloneCss(seed) },
    { path: "web/icons.json", contents: iconsJson() },
    { path: "web/shaders.json", contents: shadersJson() },
    ...SHADERS.flatMap((s) => [
      { path: `web/shaders/${s.id}.frag`, contents: wrapGlsl(s.glsl) },
      { path: `android/shaders/${s.id}.agsl`, contents: wrapAgsl(s.agsl) },
    ]),
    ...KIT_FILES.map((f) => ({
      path: `android/${f.path}`,
      contents: f.contents,
    })),
    {
      path: "android/britta-compose/src/main/kotlin/com/britta/design/generated/BrittaGeneratedTokens.kt",
      contents: generateKotlin(seed),
    },
    {
      path: "android/britta-compose/src/main/kotlin/com/britta/design/BrittaShaders.kt",
      contents: shadersKotlin(),
    },
    {
      path: "android/britta-compose/src/main/kotlin/com/britta/design/BrittaIcons.kt",
      contents: iconsKotlinObject(),
    },
  ];
}

export function downloadBrittaKit(seed: string) {
  downloadZip("britta-design-kit.zip", kitFiles(seed));
}
