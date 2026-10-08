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

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 base = mix(u_surface, u_container, uv.y);
  float n = hash(gl_FragCoord.xy + floor(u_time * 12.0));
  float fine = hash(gl_FragCoord.xy * 1.7);
  float grain = mix(n, fine, 0.45);
  vec3 col = base + (grain - 0.5) * 0.10 * u_intensity;
  col = mix(col, u_primary, 0.03 * u_intensity);
  fragColor = vec4(col, 1.0);
}
