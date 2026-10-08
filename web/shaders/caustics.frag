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
}
