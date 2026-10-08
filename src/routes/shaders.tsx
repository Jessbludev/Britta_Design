import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page } from "@/components/shell";
import { CodeBlock } from "@/components/code-block";
import {
  BrittaButton,
  BrittaChip,
  BrittaShaderCanvas,
  BrittaSlider,
  BrittaSparkline,
  BrittaBarChart,
  BrittaDonut,
  BrittaAreaChart,
  BrittaSwitch,
  BrittaCard,
} from "@/britta";
import { SHADERS, wrapAgsl, wrapGlsl, type ShaderId } from "@/britta/shaders";
import { ELEVATION } from "@/britta/motion";
import { downloadText } from "@/lib/download";
import { downloadZip } from "@/lib/zip";
import { cn } from "@/lib/utils";
import { MdIcon } from "@/britta/icon";

export const Route = createFileRoute("/shaders")({ component: ShadersPage });

function ShadersPage() {
  const [picked, setPicked] = useState<ShaderId>("aurora");
  const [intensity, setIntensity] = useState(90);
  const [paused, setPaused] = useState(false);
  const active = SHADERS.find((s) => s.id === picked) ?? SHADERS[0]!;
  const glsl = useMemo(() => wrapGlsl(active.glsl), [active]);
  const agsl = useMemo(() => wrapAgsl(active.agsl), [active]);

  function downloadPack() {
    downloadZip(
      "britta-shaders.zip",
      SHADERS.flatMap((s) => [
        { path: `glsl/${s.id}.frag`, contents: wrapGlsl(s.glsl) },
        { path: `agsl/${s.id}.agsl`, contents: wrapAgsl(s.agsl) },
      ]),
    );
  }

  return (
    <Page
      eyebrow="Foundation"
      title="Graphics & shaders"
      lede="Seed-tinted surfaces in WebGL2 and Android AGSL. Same uniforms, same lighting model, two languages. Charts sit on the same tokens."
    >
      <div className="mb-8 flex flex-wrap gap-3">
        <BrittaButton icon="download" onClick={downloadPack}>
          Download shader pack
        </BrittaButton>
        <BrittaButton
          variant="outlined"
          icon="code"
          onClick={() => downloadText(`${active.id}.frag`, glsl, "text/plain")}
        >
          This GLSL
        </BrittaButton>
        <BrittaButton
          variant="text"
          icon="android"
          onClick={() => downloadText(`${active.id}.agsl`, agsl, "text/plain")}
        >
          This AGSL
        </BrittaButton>
      </div>

      <div className="mb-10 overflow-hidden rounded-xl ring-1 ring-outline-variant/60">
        <BrittaShaderCanvas
          shaderId={active.id}
          intensity={intensity / 100}
          paused={paused}
          className="h-[280px] sm:h-[360px]"
          label={active.name}
        />
        <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container-low px-4 py-3">
          <div>
            <div className="font-display text-lg font-medium">{active.name}</div>
            <p className="text-sm text-on-surface-variant">{active.blurb}</p>
          </div>
          {active.interactive ? (
            <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-medium text-on-secondary-container">
              Pointer-reactive
            </span>
          ) : null}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {SHADERS.map((s) => (
          <BrittaChip
            key={s.id}
            selected={picked === s.id}
            onClick={() => setPicked(s.id)}
          >
            {s.name}
          </BrittaChip>
        ))}
      </div>

      <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_260px]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {SHADERS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setPicked(s.id)}
              className={cn(
                "overflow-hidden rounded-xl text-left ring-1",
                picked === s.id
                  ? "ring-2 ring-primary"
                  : "ring-outline-variant/60 hover:ring-outline",
              )}
            >
              <BrittaShaderCanvas
                shaderId={s.id}
                intensity={0.9}
                className="h-20"
                label={s.name}
              />
              <div className="truncate px-2 py-1.5 text-[11px] text-on-surface-variant">
                {s.name}
              </div>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-4 ring-1 ring-outline-variant/60">
          <BrittaSlider
            label="Intensity"
            value={intensity}
            onChange={setIntensity}
          />
          <BrittaSwitch checked={paused} onChange={setPaused} label="Pause time" />
          <p className="text-xs leading-5 text-on-surface-variant">{active.use}</p>
        </div>
      </div>

      <CodeBlock
        className="mb-12"
        tabs={[
          { id: "glsl", label: "GLSL ES 3.0", lang: "css", code: glsl },
          { id: "agsl", label: "AGSL · API 33", lang: "kt", code: agsl },
          {
            id: "kt",
            label: "Compose",
            lang: "kt",
            code: `@RequiresApi(33)
@Composable
fun Hero(modifier: Modifier = Modifier) {
    val shader = remember { BrittaShaders.runtime("${active.id}") }
    Box(
        modifier
            .fillMaxWidth()
            .height(220.dp)
            .graphicsLayer {
                shader.setFloatUniform("time", time)
                shader.setColorUniform("primary", scheme.primary)
                renderEffect = RenderEffect
                    .createRuntimeShaderEffect(shader, "el")
                    .asComposeRenderEffect()
            }
    )
}`,
          },
        ]}
      />

      <h2 className="mb-2 font-display text-2xl font-semibold">Shading · elevation as light</h2>
      <p className="mb-6 max-w-2xl text-sm leading-6 text-on-surface-variant">
        Material 3 elevation is a lighting model, not a drop-shadow. Key light from
        the top-left, ambient from surface-container, contact shade at the base.
        Same levels on web and Compose.
      </p>
      <div className="mb-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {ELEVATION.map((e) => (
          <div
            key={e.level}
            className="rounded-xl bg-surface-container-lowest p-4"
            style={{ boxShadow: e.level === 0 ? "none" : `var(--shadow-elev-${e.level})` }}
          >
            <div className="font-display text-lg font-medium">{e.label}</div>
            <div className="text-xs text-on-surface-variant">{e.dp} dp</div>
            <div className="mt-2 text-[11px] leading-4 text-on-surface-variant">{e.use}</div>
          </div>
        ))}
      </div>

      <h2 className="mb-2 font-display text-2xl font-semibold">Charts</h2>
      <p className="mb-6 max-w-2xl text-sm leading-6 text-on-surface-variant">
        Token-colored SVG on web, Canvas on Compose. No third-party chart chrome —
        the ink is primary, secondary, tertiary.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <BrittaCard variant="filled" className="p-5">
          <div className="mb-2 text-xs tracking-[0.08em] text-on-surface-variant uppercase">
            Sparkline
          </div>
          <BrittaSparkline />
        </BrittaCard>
        <BrittaCard variant="filled" className="p-5">
          <div className="mb-2 text-xs tracking-[0.08em] text-on-surface-variant uppercase">
            Area
          </div>
          <BrittaAreaChart />
        </BrittaCard>
        <BrittaCard variant="filled" className="p-5">
          <div className="mb-2 text-xs tracking-[0.08em] text-on-surface-variant uppercase">
            Bars
          </div>
          <BrittaBarChart />
        </BrittaCard>
        <BrittaCard variant="filled" className="flex items-center gap-6 p-5">
          <BrittaDonut value={72} label="Parity" />
          <div>
            <div className="font-display text-xl font-medium">72% kit parity</div>
            <p className="mt-1 text-sm text-on-surface-variant">
              Web components with a matching Compose signature.
            </p>
          </div>
        </BrittaCard>
      </div>

      <div className="mt-10 flex items-start gap-3 rounded-xl bg-surface-container p-4 text-sm text-on-surface-variant">
        <MdIcon name="info" size={20} className="mt-0.5 text-primary" />
        <p>
          AGSL runs on Android 13+ via <span className="font-mono text-on-surface">RuntimeShader</span>.
          Below API 33, Compose falls back to the same elevation and grain tokens as CSS.
        </p>
      </div>
    </Page>
  );
}
