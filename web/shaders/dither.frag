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

float bayer(vec2 p) {
  vec2 i = mod(floor(p), 4.0);
  float idx = i.x + i.y * 4.0;
  float m[16];
  m[0]=0.0;m[1]=8.0;m[2]=2.0;m[3]=10.0;
  m[4]=12.0;m[5]=4.0;m[6]=14.0;m[7]=6.0;
  m[8]=3.0;m[9]=11.0;m[10]=1.0;m[11]=9.0;
  m[12]=15.0;m[13]=7.0;m[14]=13.0;m[15]=5.0;
  return m[int(idx)] / 16.0;
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float tone = uv.x * 0.7 + uv.y * 0.3;
  tone = mix(tone, 0.5 + 0.5 * sin(u_time * 0.3 + uv.x * 2.0), 0.12);
  float t = tone * u_intensity + (1.0 - u_intensity) * 0.5;
  float dith = step(bayer(gl_FragCoord.xy * 0.5), t);
  vec3 a = mix(u_surface, u_container, 0.2);
  vec3 b = mix(u_primary, u_onSurface, 0.15);
  fragColor = vec4(mix(a, b, dith), 1.0);
}
