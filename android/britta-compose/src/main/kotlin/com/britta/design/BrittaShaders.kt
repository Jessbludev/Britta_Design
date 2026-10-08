package com.britta.design

import android.graphics.RuntimeShader
import android.os.Build
import androidx.annotation.RequiresApi

/**
 * AGSL sources matching the web WebGL2 shaders.
 * Requires API 33+ (Android 13) RuntimeShader.
 */
object BrittaShaders {
    val TONAL_MESH = """
uniform float2 size;
uniform float time;
uniform half4 primary;
uniform half4 secondary;
uniform half4 tertiary;
uniform half4 surface;
uniform half4 onSurface;
uniform half4 container;
uniform float2 mouse;
uniform float intensity;

float hash(float2 p) { return fract(sin(dot(p, float2(127.1, 311.7))) * 43758.5453); }
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
}

    """.trimIndent()

    val PAPER_GRAIN = """
uniform float2 size;
uniform float time;
uniform half4 primary;
uniform half4 secondary;
uniform half4 tertiary;
uniform half4 surface;
uniform half4 onSurface;
uniform half4 container;
uniform float2 mouse;
uniform float intensity;

float hash(float2 p) { return fract(sin(dot(p, float2(127.1, 311.7))) * 43758.5453); }
half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  half3 base = mix(surface.rgb, container.rgb, uv.y);
  float n = hash(fragCoord + floor(time * 12.0));
  float fine = hash(fragCoord * 1.7);
  float grain = mix(n, fine, 0.45);
  half3 col = base + (grain - 0.5) * 0.10 * intensity;
  col = mix(col, primary.rgb, 0.03 * intensity);
  return half4(col, 1.0);
}

    """.trimIndent()

    val ELEVATION_LIGHT = """
uniform float2 size;
uniform float time;
uniform half4 primary;
uniform half4 secondary;
uniform half4 tertiary;
uniform half4 surface;
uniform half4 onSurface;
uniform half4 container;
uniform float2 mouse;
uniform float intensity;

half4 main(float2 fragCoord) {
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
}

    """.trimIndent()

    val AURORA = """
uniform float2 size;
uniform float time;
uniform half4 primary;
uniform half4 secondary;
uniform half4 tertiary;
uniform half4 surface;
uniform half4 onSurface;
uniform half4 container;
uniform float2 mouse;
uniform float intensity;

half4 main(float2 fragCoord) {
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
}

    """.trimIndent()

    val SPOTLIGHT = """
uniform float2 size;
uniform float time;
uniform half4 primary;
uniform half4 secondary;
uniform half4 tertiary;
uniform half4 surface;
uniform half4 onSurface;
uniform half4 container;
uniform float2 mouse;
uniform float intensity;

half4 main(float2 fragCoord) {
  float2 uv = fragCoord / size;
  float2 m = mouse.x + mouse.y > 0.0 ? mouse : float2(0.62, 0.38);
  float d = distance(uv, m);
  float spot = smoothstep(0.55 * intensity + 0.15, 0.02, d);
  half3 base = mix(surface.rgb, container.rgb, 0.4 + uv.y * 0.2);
  half3 lit = mix(base, mix(primary.rgb, container.rgb, 0.35), spot * 0.72);
  float rim = smoothstep(0.22, 0.0, abs(d - 0.18));
  lit += secondary.rgb * rim * 0.12 * intensity;
  return half4(lit, 1.0);
}

    """.trimIndent()

    val IRIDESCENT = """
uniform float2 size;
uniform float time;
uniform half4 primary;
uniform half4 secondary;
uniform half4 tertiary;
uniform half4 surface;
uniform half4 onSurface;
uniform half4 container;
uniform float2 mouse;
uniform float intensity;

half3 hueShift(half3 c, float h) {
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
}

    """.trimIndent()

    val HALFTONE = """
uniform float2 size;
uniform float time;
uniform half4 primary;
uniform half4 secondary;
uniform half4 tertiary;
uniform half4 surface;
uniform half4 onSurface;
uniform half4 container;
uniform float2 mouse;
uniform float intensity;

half4 main(float2 fragCoord) {
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
}

    """.trimIndent()

    val CAUSTICS = """
uniform float2 size;
uniform float time;
uniform half4 primary;
uniform half4 secondary;
uniform half4 tertiary;
uniform half4 surface;
uniform half4 onSurface;
uniform half4 container;
uniform float2 mouse;
uniform float intensity;

half4 main(float2 fragCoord) {
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
}

    """.trimIndent()

    val RIPPLE = """
uniform float2 size;
uniform float time;
uniform half4 primary;
uniform half4 secondary;
uniform half4 tertiary;
uniform half4 surface;
uniform half4 onSurface;
uniform half4 container;
uniform float2 mouse;
uniform float intensity;

half4 main(float2 fragCoord) {
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
}

    """.trimIndent()

    val DITHER = """
uniform float2 size;
uniform float time;
uniform half4 primary;
uniform half4 secondary;
uniform half4 tertiary;
uniform half4 surface;
uniform half4 onSurface;
uniform half4 container;
uniform float2 mouse;
uniform float intensity;

float bayer(float2 p) {
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
}

    """.trimIndent()

    val ids = listOf("tonal-mesh", "paper-grain", "elevation-light", "aurora", "spotlight", "iridescent", "halftone", "caustics", "ripple", "dither")

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    fun runtime(id: String): RuntimeShader = RuntimeShader(source(id))

    fun source(id: String): String = when (id) {
        "tonal-mesh" -> TONAL_MESH
        "paper-grain" -> PAPER_GRAIN
        "elevation-light" -> ELEVATION_LIGHT
        "aurora" -> AURORA
        "spotlight" -> SPOTLIGHT
        "iridescent" -> IRIDESCENT
        "halftone" -> HALFTONE
        "caustics" -> CAUSTICS
        "ripple" -> RIPPLE
        "dither" -> DITHER
        else -> TONAL_MESH
    }
}
