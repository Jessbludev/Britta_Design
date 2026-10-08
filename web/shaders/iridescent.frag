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

vec3 hueShift(vec3 c, float h) {
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
}
