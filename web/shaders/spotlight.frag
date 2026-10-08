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
  vec2 m = u_mouse.x + u_mouse.y > 0.0 ? u_mouse : vec2(0.62, 0.38);
  float d = distance(uv, m);
  float spot = smoothstep(0.55 * u_intensity + 0.15, 0.02, d);
  vec3 base = mix(u_surface, u_container, 0.4 + uv.y * 0.2);
  vec3 lit = mix(base, mix(u_primary, u_container, 0.35), spot * 0.72);
  float rim = smoothstep(0.22, 0.0, abs(d - 0.18));
  lit += u_secondary * rim * 0.12 * u_intensity;
  fragColor = vec4(lit, 1.0);
}
