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
}
