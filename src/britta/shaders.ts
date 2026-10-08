/** Dual-platform surface shaders: WebGL2 GLSL ES 3.0 + Android AGSL. */

export type ShaderId =
  | "tonal-mesh"
  | "paper-grain"
  | "elevation-light"
  | "aurora"
  | "spotlight"
  | "iridescent"
  | "halftone"
  | "caustics"
  | "ripple"
  | "dither";

export type ShaderDef = {
  id: ShaderId;
  name: string;
  blurb: string;
  use: string;
  interactive?: boolean;
  glsl: string;
  agsl: string;
};

export const GLSL_UNIFORMS = `uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_primary;
uniform vec3 u_secondary;
uniform vec3 u_tertiary;
uniform vec3 u_surface;
uniform vec3 u_onSurface;
uniform vec3 u_container;
uniform vec2 u_mouse;
uniform float u_intensity;`;

export const AGSL_UNIFORMS = `uniform float2 size;
uniform float time;
uniform half4 primary;
uniform half4 secondary;
uniform half4 tertiary;
uniform half4 surface;
uniform half4 onSurface;
uniform half4 container;
uniform float2 mouse;
uniform float intensity;`;

export function wrapGlsl(body: string) {
  return `#version 300 es
precision highp float;
${GLSL_UNIFORMS}
out vec4 fragColor;

${body}
`;
}

export function wrapAgsl(body: string) {
  return `${AGSL_UNIFORMS}

${body}
`;
}

export const SHADERS: ShaderDef[] = [
  {
    id: "tonal-mesh",
    name: "Tonal mesh",
    blurb: "Four-stop mesh of primary, secondary, tertiary, and surface. The seed is the lighting.",
    use: "Hero surfaces, theme lab, empty states",
    glsl: `float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 w = uv + 0.045 * vec2(
    sin(uv.y * 4.2 + u_time * 0.22),
    cos(uv.x * 3.6 + u_time * 0.18)
  );
  vec3 a = mix(u_surface, u_primary, 0.55);
  vec3 b = mix(u_container, u_secondary, 0.62);
  vec3 c = mix(u_surface, u_tertiary, 0.48);
  vec3 d = mix(u_container, u_primary, 0.18);
  vec3 col = mix(mix(a, b, w.x), mix(c, d, w.x), w.y);
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.025 * u_intensity;
  fragColor = vec4(col, 1.0);
}`,
    agsl: `float hash(float2 p) { return fract(sin(dot(p, float2(127.1, 311.7))) * 43758.5453); }
half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  float2 w = uv + 0.045 * float2(
    sin(uv.y * 4.2 + time * 0.22),
    cos(uv.x * 3.6 + time * 0.18)
  );
  half3 a = mix(surface.rgb, primary.rgb, 0.55);
  half3 b = mix(container.rgb, secondary.rgb, 0.62);
  half3 c = mix(surface.rgb, tertiary.rgb, 0.48);
  half3 d = mix(container.rgb, primary.rgb, 0.18);
  half3 col = mix(mix(a, b, w.x), mix(c, d, w.x), w.y);
  col += (hash(fragCoord) - 0.5) * 0.025 * intensity;
  return half4(col, 1.0);
}`,
  },
  {
    id: "paper-grain",
    name: "Paper grain",
    blurb: "Film grain on a tonal wash. Reads as paper, not noise-for-noise.",
    use: "Cards, sheets, long-form reading",
    glsl: `float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 base = mix(u_surface, u_container, uv.y);
  float n = hash(gl_FragCoord.xy + floor(u_time * 12.0));
  float fine = hash(gl_FragCoord.xy * 1.7);
  float grain = mix(n, fine, 0.45);
  vec3 col = base + (grain - 0.5) * 0.10 * u_intensity;
  col = mix(col, u_primary, 0.03 * u_intensity);
  fragColor = vec4(col, 1.0);
}`,
    agsl: `float hash(float2 p) { return fract(sin(dot(p, float2(127.1, 311.7))) * 43758.5453); }
half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  half3 base = mix(surface.rgb, container.rgb, uv.y);
  float n = hash(fragCoord + floor(time * 12.0));
  float fine = hash(fragCoord * 1.7);
  float grain = mix(n, fine, 0.45);
  half3 col = base + (grain - 0.5) * 0.10 * intensity;
  col = mix(col, primary.rgb, 0.03 * intensity);
  return half4(col, 1.0);
}`,
  },
  {
    id: "elevation-light",
    name: "Elevation light",
    blurb: "M3 elevation as a lighting model: key from the top-left, tinted ambient, contact shade.",
    use: "Raised cards, FABs, modal sheets",
    glsl: `void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
  vec3 N = normalize(vec3(-p.x * 0.35, 0.85, 1.0 - length(p) * 0.4));
  vec3 L = normalize(vec3(-0.45, 0.82, 0.55));
  float diff = max(dot(N, L), 0.0);
  float rim = pow(1.0 - max(N.z, 0.0), 2.2);
  float ao = smoothstep(0.92, 0.15, length(p));
  vec3 ambient = mix(u_surface, u_container, 0.55);
  vec3 lit = ambient + u_primary * (diff * 0.38 * u_intensity);
  lit += u_secondary * rim * 0.16 * u_intensity;
  lit *= mix(0.82, 1.0, ao);
  fragColor = vec4(lit, 1.0);
}`,
    agsl: `half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  float2 p = (uv - 0.5) * float2(size.x / size.y, 1.0);
  float3 N = normalize(float3(-p.x * 0.35, 0.85, 1.0 - length(p) * 0.4));
  float3 L = normalize(float3(-0.45, 0.82, 0.55));
  float diff = max(dot(N, L), 0.0);
  float rim = pow(1.0 - max(N.z, 0.0), 2.2);
  float ao = smoothstep(0.92, 0.15, length(p));
  half3 ambient = mix(surface.rgb, container.rgb, 0.55);
  half3 lit = ambient + primary.rgb * (diff * 0.38 * intensity);
  lit += secondary.rgb * rim * 0.16 * intensity;
  lit *= mix(0.82, 1.0, ao);
  return half4(lit, 1.0);
}`,
  },
  {
    id: "aurora",
    name: "Aurora",
    blurb: "Slow seed-hue bands. Use on a hero, never as a full-page wallpaper.",
    use: "Landing heroes, splash, theme reveal",
    glsl: `void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * vec2(1.6, 1.0);
  float t = u_time * 0.18;
  float b1 = sin(p.x * 3.1 + t) + sin(p.y * 4.4 - t * 0.7);
  float b2 = sin(p.x * 5.0 - t * 1.1 + p.y * 2.2);
  float b3 = sin(length(p - vec2(0.4, 0.6)) * 6.0 - t);
  vec3 col = u_surface;
  col = mix(col, u_primary, smoothstep(0.2, 1.4, b1) * 0.42 * u_intensity);
  col = mix(col, u_secondary, smoothstep(0.1, 1.3, b2) * 0.32 * u_intensity);
  col = mix(col, u_tertiary, smoothstep(0.15, 1.2, b3) * 0.28 * u_intensity);
  col = mix(col, u_container, uv.y * 0.18);
  fragColor = vec4(col, 1.0);
}`,
    agsl: `half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  float2 p = uv * float2(1.6, 1.0);
  float t = time * 0.18;
  float b1 = sin(p.x * 3.1 + t) + sin(p.y * 4.4 - t * 0.7);
  float b2 = sin(p.x * 5.0 - t * 1.1 + p.y * 2.2);
  float b3 = sin(length(p - float2(0.4, 0.6)) * 6.0 - t);
  half3 col = surface.rgb;
  col = mix(col, primary.rgb, smoothstep(0.2, 1.4, b1) * 0.42 * intensity);
  col = mix(col, secondary.rgb, smoothstep(0.1, 1.3, b2) * 0.32 * intensity);
  col = mix(col, tertiary.rgb, smoothstep(0.15, 1.2, b3) * 0.28 * intensity);
  col = mix(col, container.rgb, uv.y * 0.18);
  return half4(col, 1.0);
}`,
  },
  {
    id: "spotlight",
    name: "Spotlight",
    blurb: "Pointer-driven key light. Follows the cursor; falls back to a rest pose.",
    use: "Interactive cards, icon grids, hover chrome",
    interactive: true,
    glsl: `void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 m = u_mouse.x + u_mouse.y > 0.0 ? u_mouse : vec2(0.62, 0.38);
  float d = distance(uv, m);
  float spot = smoothstep(0.55 * u_intensity + 0.15, 0.02, d);
  vec3 base = mix(u_surface, u_container, 0.4 + uv.y * 0.2);
  vec3 lit = mix(base, mix(u_primary, u_container, 0.35), spot * 0.72);
  float rim = smoothstep(0.22, 0.0, abs(d - 0.18));
  lit += u_secondary * rim * 0.12 * u_intensity;
  fragColor = vec4(lit, 1.0);
}`,
    agsl: `half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  float2 m = mouse.x + mouse.y > 0.0 ? mouse : float2(0.62, 0.38);
  float d = distance(uv, m);
  float spot = smoothstep(0.55 * intensity + 0.15, 0.02, d);
  half3 base = mix(surface.rgb, container.rgb, 0.4 + uv.y * 0.2);
  half3 lit = mix(base, mix(primary.rgb, container.rgb, 0.35), spot * 0.72);
  float rim = smoothstep(0.22, 0.0, abs(d - 0.18));
  lit += secondary.rgb * rim * 0.12 * intensity;
  return half4(lit, 1.0);
}`,
  },
  {
    id: "iridescent",
    name: "Iridescent rim",
    blurb: "Spectral edge lighting that shifts with the seed. Think oil on water, not rainbow chrome.",
    use: "Selected chips, premium cards, icon tiles",
    glsl: `vec3 hueShift(vec3 c, float h) {
  float a = h * 6.2831853;
  float cosA = cos(a);
  float sinA = sin(a);
  mat3 m = mat3(
    cosA + (1.0 - cosA) / 3.0,
    (1.0 - cosA) / 3.0 - sqrt(1.0 / 3.0) * sinA,
    (1.0 - cosA) / 3.0 + sqrt(1.0 / 3.0) * sinA,
    (1.0 - cosA) / 3.0 + sqrt(1.0 / 3.0) * sinA,
    cosA + (1.0 - cosA) / 3.0,
    (1.0 - cosA) / 3.0 - sqrt(1.0 / 3.0) * sinA,
    (1.0 - cosA) / 3.0 - sqrt(1.0 / 3.0) * sinA,
    (1.0 - cosA) / 3.0 + sqrt(1.0 / 3.0) * sinA,
    cosA + (1.0 - cosA) / 3.0
  );
  return clamp(c * m, 0.0, 1.0);
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;
  float d = length(p);
  float rim = smoothstep(0.92, 0.58, d) * smoothstep(0.42, 0.72, d);
  float ang = atan(p.y, p.x) / 6.2831853 + u_time * 0.04;
  vec3 shift = hueShift(u_primary, fract(ang + d * 0.25));
  vec3 base = mix(u_surface, u_container, 0.5);
  vec3 col = mix(base, shift, rim * 0.85 * u_intensity);
  col = mix(col, u_secondary, pow(rim, 3.0) * 0.25);
  fragColor = vec4(col, 1.0);
}`,
    agsl: `half3 hueShift(half3 c, float h) {
  float a = h * 6.2831853;
  float ca = cos(a);
  float sa = sin(a);
  half3 k = half3(0.57735, 0.57735, 0.57735);
  return clamp(c * ca + cross(k, c) * sa + k * dot(k, c) * (1.0 - ca), 0.0, 1.0);
}
half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  float2 p = uv * 2.0 - 1.0;
  p.x *= size.x / size.y;
  float d = length(p);
  float rim = smoothstep(0.92, 0.58, d) * smoothstep(0.42, 0.72, d);
  float ang = atan(p.y, p.x) / 6.2831853 + time * 0.04;
  half3 shift = hueShift(primary.rgb, fract(ang + d * 0.25));
  half3 base = mix(surface.rgb, container.rgb, 0.5);
  half3 col = mix(base, shift, rim * 0.85 * intensity);
  col = mix(col, secondary.rgb, pow(rim, 3.0) * 0.25);
  return half4(col, 1.0);
}`,
  },
  {
    id: "halftone",
    name: "Halftone",
    blurb: "Print shading. Dot size follows a tonal ramp of the seed.",
    use: "Editorial posters, empty illustrations, print mocks",
    glsl: `void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float cell = 14.0;
  vec2 grid = gl_FragCoord.xy / cell;
  vec2 cellUv = fract(grid) - 0.5;
  float tone = mix(0.15, 0.82, uv.x * 0.65 + uv.y * 0.35);
  tone = mix(tone, 0.5 + 0.5 * sin(uv.x * 6.0 + u_time * 0.4), 0.18);
  float r = mix(0.08, 0.48, tone) * u_intensity;
  float dotp = smoothstep(r, r - 0.04, length(cellUv));
  vec3 paper = mix(u_surface, u_container, 0.25);
  vec3 ink = mix(u_onSurface, u_primary, 0.55);
  vec3 col = mix(paper, ink, 1.0 - dotp);
  fragColor = vec4(col, 1.0);
}`,
    agsl: `half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  float cell = 14.0;
  float2 grid = fragCoord / cell;
  float2 cellUv = fract(grid) - 0.5;
  float tone = mix(0.15, 0.82, uv.x * 0.65 + uv.y * 0.35);
  tone = mix(tone, 0.5 + 0.5 * sin(uv.x * 6.0 + time * 0.4), 0.18);
  float r = mix(0.08, 0.48, tone) * intensity;
  float dotp = smoothstep(r, r - 0.04, length(cellUv));
  half3 paper = mix(surface.rgb, container.rgb, 0.25);
  half3 ink = mix(onSurface.rgb, primary.rgb, 0.55);
  half3 col = mix(paper, ink, 1.0 - dotp);
  return half4(col, 1.0);
}`,
  },
  {
    id: "caustics",
    name: "Caustics",
    blurb: "Light through water, tinted with primary. Slow and shallow, not a lava lamp.",
    use: "Wellness, weather, liquid-glass surfaces",
    glsl: `void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 3.0;
  float t = u_time * 0.25;
  float c = 0.0;
  c += 0.55 * sin(p.x * 2.1 + t) * sin(p.y * 1.7 - t * 0.8);
  c += 0.35 * sin((p.x + p.y) * 2.8 - t * 1.3);
  c += 0.25 * sin(length(p - vec2(1.4, 0.8)) * 4.0 + t);
  c = pow(abs(c), 1.4);
  vec3 water = mix(u_surface, u_secondary, 0.22);
  vec3 light = mix(u_primary, vec3(1.0), 0.35);
  vec3 col = mix(water, light, c * 0.55 * u_intensity);
  col = mix(col, u_container, uv.y * 0.12);
  fragColor = vec4(col, 1.0);
}`,
    agsl: `half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  float2 p = uv * 3.0;
  float t = time * 0.25;
  float c = 0.0;
  c += 0.55 * sin(p.x * 2.1 + t) * sin(p.y * 1.7 - t * 0.8);
  c += 0.35 * sin((p.x + p.y) * 2.8 - t * 1.3);
  c += 0.25 * sin(length(p - float2(1.4, 0.8)) * 4.0 + t);
  c = pow(abs(c), 1.4);
  half3 water = mix(surface.rgb, secondary.rgb, 0.22);
  half3 light = mix(primary.rgb, half3(1.0), 0.35);
  half3 col = mix(water, light, c * 0.55 * intensity);
  col = mix(col, container.rgb, uv.y * 0.12);
  return half4(col, 1.0);
}`,
  },
  {
    id: "ripple",
    name: "Ripple field",
    blurb: "M3 state-layer ripple as a field. Click or rest on a breathing ring.",
    use: "Buttons, list items, touch feedback studies",
    interactive: true,
    glsl: `void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 origin = u_mouse.x + u_mouse.y > 0.0 ? u_mouse : vec2(0.5, 0.5);
  float d = distance(uv, origin);
  float wave = sin(d * 28.0 - u_time * 3.6);
  float envelope = exp(-d * 3.2);
  float ring = smoothstep(0.08, 0.0, abs(d - fract(u_time * 0.35) * 0.7)) * 0.9;
  float field = wave * envelope * 0.22 * u_intensity + ring * 0.35 * u_intensity;
  vec3 base = mix(u_surface, u_container, 0.45);
  vec3 col = mix(base, u_primary, max(field, 0.0));
  col = mix(col, u_onSurface, max(-field, 0.0) * 0.08);
  fragColor = vec4(col, 1.0);
}`,
    agsl: `half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  float2 origin = mouse.x + mouse.y > 0.0 ? mouse : float2(0.5, 0.5);
  float d = distance(uv, origin);
  float wave = sin(d * 28.0 - time * 3.6);
  float envelope = exp(-d * 3.2);
  float ring = smoothstep(0.08, 0.0, abs(d - fract(time * 0.35) * 0.7)) * 0.9;
  float field = wave * envelope * 0.22 * intensity + ring * 0.35 * intensity;
  half3 base = mix(surface.rgb, container.rgb, 0.45);
  half3 col = mix(base, primary.rgb, max(field, 0.0));
  col = mix(col, onSurface.rgb, max(-field, 0.0) * 0.08);
  return half4(col, 1.0);
}`,
  },
  {
    id: "dither",
    name: "Ordered dither",
    blurb: "Bayer 4×4 shading into two tonal roles. Print-room, not 8-bit nostalgia.",
    use: "Low-ink posters, data ink, reduced palettes",
    glsl: `float bayer(vec2 p) {
  vec2 i = mod(floor(p), 4.0);
  float idx = i.x + i.y * 4.0;
  float m[16];
  m[0]=0.0;m[1]=8.0;m[2]=2.0;m[3]=10.0;
  m[4]=12.0;m[5]=4.0;m[6]=14.0;m[7]=6.0;
  m[8]=3.0;m[9]=11.0;m[10]=1.0;m[11]=9.0;
  m[12]=15.0;m[13]=7.0;m[14]=13.0;m[15]=5.0;
  return m[int(idx)] / 16.0;
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float tone = uv.x * 0.7 + uv.y * 0.3;
  tone = mix(tone, 0.5 + 0.5 * sin(u_time * 0.3 + uv.x * 2.0), 0.12);
  float t = tone * u_intensity + (1.0 - u_intensity) * 0.5;
  float dith = step(bayer(gl_FragCoord.xy * 0.5), t);
  vec3 a = mix(u_surface, u_container, 0.2);
  vec3 b = mix(u_primary, u_onSurface, 0.15);
  fragColor = vec4(mix(a, b, dith), 1.0);
}`,
    agsl: `float bayer(float2 p) {
  float2 i = mod(floor(p), 4.0);
  float idx = i.x + i.y * 4.0;
  float v = 0.0;
  if (idx < 0.5) v = 0.0;
  else if (idx < 1.5) v = 8.0;
  else if (idx < 2.5) v = 2.0;
  else if (idx < 3.5) v = 10.0;
  else if (idx < 4.5) v = 12.0;
  else if (idx < 5.5) v = 4.0;
  else if (idx < 6.5) v = 14.0;
  else if (idx < 7.5) v = 6.0;
  else if (idx < 8.5) v = 3.0;
  else if (idx < 9.5) v = 11.0;
  else if (idx < 10.5) v = 1.0;
  else if (idx < 11.5) v = 9.0;
  else if (idx < 12.5) v = 15.0;
  else if (idx < 13.5) v = 7.0;
  else if (idx < 14.5) v = 13.0;
  else v = 5.0;
  return v / 16.0;
}
half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  float tone = uv.x * 0.7 + uv.y * 0.3;
  tone = mix(tone, 0.5 + 0.5 * sin(time * 0.3 + uv.x * 2.0), 0.12);
  float t = tone * intensity + (1.0 - intensity) * 0.5;
  float dith = step(bayer(fragCoord * 0.5), t);
  half3 a = mix(surface.rgb, container.rgb, 0.2);
  half3 b = mix(primary.rgb, onSurface.rgb, 0.15);
  return half4(mix(a, b, dith), 1.0);
}`,
  },
];

export function getShader(id: string) {
  return SHADERS.find((s) => s.id === id);
}

export function shadersKotlin() {
  const bodies = SHADERS.map((s) => {
    const escaped = wrapAgsl(s.agsl)
      .replace(/\$/g, "${'$'}")
      .replace(/"""/g, '"\\""');
    return `    const val ${kotlinConst(s.id)} = """
${escaped}
    """.trimIndent()`;
  });
  return `package com.britta.design

import android.graphics.RuntimeShader
import android.os.Build
import androidx.annotation.RequiresApi

/**
 * AGSL sources matching the web WebGL2 shaders.
 * Requires API 33+ (Android 13) RuntimeShader.
 */
object BrittaShaders {
${bodies.join("\n\n")}

    val ids = listOf(${SHADERS.map((s) => `"${s.id}"`).join(", ")})

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    fun runtime(id: String): RuntimeShader = RuntimeShader(source(id))

    fun source(id: String): String = when (id) {
${SHADERS.map((s) => `        "${s.id}" -> ${kotlinConst(s.id)}`).join("\n")}
        else -> ${kotlinConst(SHADERS[0]!.id)}
    }
}
`;
}

function kotlinConst(id: string) {
  return id
    .split("-")
    .map((p) => p.toUpperCase())
    .join("_");
}

export function shadersJson() {
  return JSON.stringify(
    {
      uniforms: {
        glsl: [
          "u_resolution",
          "u_time",
          "u_primary",
          "u_secondary",
          "u_tertiary",
          "u_surface",
          "u_onSurface",
          "u_container",
          "u_mouse",
          "u_intensity",
        ],
        agsl: [
          "size",
          "time",
          "primary",
          "secondary",
          "tertiary",
          "surface",
          "onSurface",
          "container",
          "mouse",
          "intensity",
        ],
      },
      shaders: SHADERS.map((s) => ({
        id: s.id,
        name: s.name,
        blurb: s.blurb,
        use: s.use,
        interactive: !!s.interactive,
      })),
    },
    null,
    2,
  );
}
