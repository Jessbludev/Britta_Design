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
}
