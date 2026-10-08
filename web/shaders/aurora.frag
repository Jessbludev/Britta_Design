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
}
