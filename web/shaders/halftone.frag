#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_primary;
uniform vec3 u_secondary;
uniform vec3 u_tertiary;
uniform vec3 u_surface;
uniform vec3 u_onSurface;
uniform vec3 u_container;
uniform vec2 u_mouse;
uniform float u_intensity;
out vec4 fragColor;

void main() {
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
}
