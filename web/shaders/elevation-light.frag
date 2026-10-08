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
}
