import { useEffect, useRef, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import { getShader, wrapGlsl, type ShaderId } from "./shaders";

const VERT = `#version 300 es
const vec2 V[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main(){ gl_Position = vec4(V[gl_VertexID], 0.0, 1.0); }`;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  if (h.length < 6) return [0.4, 0.31, 0.64];
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function token(el: HTMLElement, name: string): [number, number, number] {
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  if (raw.startsWith("#")) return hexToRgb(raw);
  const m = raw.match(/rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)/);
  if (m) return [+m[1]! / 255, +m[2]! / 255, +m[3]! / 255];
  return hexToRgb("#6750A4");
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("[britta shader]", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function BrittaShaderCanvas({
  shaderId,
  intensity = 1,
  paused = false,
  className,
  label,
}: {
  shaderId: ShaderId | string;
  intensity?: number;
  paused?: boolean;
  className?: string;
  label?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.62, y: 0.38 });
  const intensityRef = useRef(intensity);
  const pausedRef = useRef(paused);
  intensityRef.current = intensity;
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
    });
    const def = getShader(shaderId);
    if (!gl || !def) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, wrapGlsl(def.glsl));
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("[britta shader]", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);
    const loc = {
      res: gl.getUniformLocation(prog, "u_resolution"),
      time: gl.getUniformLocation(prog, "u_time"),
      primary: gl.getUniformLocation(prog, "u_primary"),
      secondary: gl.getUniformLocation(prog, "u_secondary"),
      tertiary: gl.getUniformLocation(prog, "u_tertiary"),
      surface: gl.getUniformLocation(prog, "u_surface"),
      onSurface: gl.getUniformLocation(prog, "u_onSurface"),
      container: gl.getUniformLocation(prog, "u_container"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      intensity: gl.getUniformLocation(prog, "u_intensity"),
    };

    const root = document.documentElement;
    let raf = 0;
    const start = performance.now();
    let elapsed = 0;
    let last = start;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, wrap.clientWidth);
      const h = Math.max(1, wrap.clientHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const draw = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && !reduce.matches) elapsed += dt;
      gl.uniform2f(loc.res, canvas.width, canvas.height);
      gl.uniform1f(loc.time, elapsed);
      gl.uniform3fv(loc.primary, token(root, "--md-primary"));
      gl.uniform3fv(loc.secondary, token(root, "--md-secondary"));
      gl.uniform3fv(loc.tertiary, token(root, "--md-tertiary"));
      gl.uniform3fv(loc.surface, token(root, "--md-surface"));
      gl.uniform3fv(loc.onSurface, token(root, "--md-on-surface"));
      gl.uniform3fv(loc.container, token(root, "--md-primary-container"));
      gl.uniform2f(loc.mouse, mouse.current.x, 1 - mouse.current.y);
      gl.uniform1f(loc.intensity, intensityRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [shaderId]);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mouse.current = {
      x: (e.clientX - r.left) / Math.max(1, r.width),
      y: (e.clientY - r.top) / Math.max(1, r.height),
    };
  }

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      className={cn("relative overflow-hidden bg-surface-container", className)}
      role="img"
      aria-label={label ?? `${shaderId} shader`}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
