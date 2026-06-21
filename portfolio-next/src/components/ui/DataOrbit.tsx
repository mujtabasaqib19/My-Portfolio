"use client";

import { useEffect, useRef } from "react";

/* ── Types ───────────────────────────────────────────────────── */
interface OrbNode {
  id: string;
  label: string;
  ring: number;
  angle: number;
  speed: number;
  color: string;
  size: number;
}

interface Packet {
  fromId: string;
  toId: string;
  t: number;
  speed: number;
  color: string;
}

/* ── Static data ─────────────────────────────────────────────── */
const FILL = 0.88;
const RATIOS = [0.3, 0.55, 0.82];
const REF = 700;

const NODES_DEF: Array<Omit<OrbNode, "angle">> = [
  { id: "py",  label: "Python",    ring: 0, speed: 0.22, color: "#3B82F6", size: 16 },
  { id: "sql", label: "SQL",       ring: 0, speed: 0.22, color: "#38BDF8", size: 16 },
  { id: "air", label: "Airflow",   ring: 1, speed: 0.13, color: "#10B981", size: 14 },
  { id: "dbt", label: "dbt",       ring: 1, speed: 0.13, color: "#F59E0B", size: 13 },
  { id: "spk", label: "Spark",     ring: 1, speed: 0.13, color: "#38BDF8", size: 14 },
  { id: "sf",  label: "Snowflake", ring: 2, speed: 0.07, color: "#06B6D4", size: 13 },
  { id: "ml",  label: "ML",        ring: 2, speed: 0.07, color: "#A78BFA", size: 14 },
  { id: "rag", label: "RAG",       ring: 2, speed: 0.07, color: "#34D399", size: 13 },
  { id: "bi",  label: "Power BI",  ring: 2, speed: 0.07, color: "#FB923C", size: 13 },
  { id: "k8",  label: "Docker",    ring: 2, speed: 0.07, color: "#60A5FA", size: 12 },
];

const EDGES: Array<[string, string]> = [
  ["py", "air"], ["py", "dbt"], ["sql", "sf"],
  ["air", "sf"], ["dbt", "sf"], ["spk", "ml"],
  ["py", "rag"], ["sql", "bi"], ["air", "k8"],
  ["spk", "rag"],
];

const PKT_COLORS = ["#3B82F6", "#38BDF8", "#10B981", "#F59E0B", "#06B6D4", "#34D399"];

/* ── Init helpers ────────────────────────────────────────────── */
function makeNodes(): OrbNode[] {
  const totals: Record<number, number> = {};
  const counts: Record<number, number> = {};
  for (const n of NODES_DEF) {
    totals[n.ring] = (totals[n.ring] ?? 0) + 1;
    counts[n.ring] = 0;
  }
  return NODES_DEF.map((n) => {
    const idx   = counts[n.ring] ?? 0;
    const total = totals[n.ring] ?? 1;
    counts[n.ring] = idx + 1;
    return { ...n, angle: ((2 * Math.PI) / total) * idx };
  });
}

function makePackets(): Packet[] {
  return EDGES.slice(0, 6).map(([fromId, toId], i) => ({
    fromId,
    toId,
    t: Math.random(),
    speed: 0.18 + Math.random() * 0.14,
    color: PKT_COLORS[i % PKT_COLORS.length] ?? "#fff",
  }));
}

/* ── Pure math ───────────────────────────────────────────────── */
function radiiFromSize(W: number, H: number): number[] {
  const half = (Math.min(W, H) / 2) * FILL;
  return RATIOS.map((r) => half * r);
}

function nPos(n: OrbNode, cx: number, cy: number, radii: number[]): { x: number; y: number } {
  const r = radii[n.ring] ?? 0;
  return { x: cx + Math.cos(n.angle) * r, y: cy + Math.sin(n.angle) * r };
}

function qBezier(
  ax: number, ay: number,
  bx: number, by: number,
  ox: number, oy: number,
  t: number,
): { x: number; y: number } {
  const cpx = (ax + bx) / 2 + (ox - (ax + bx) / 2) * 0.35;
  const cpy = (ay + by) / 2 + (oy - (ay + by) / 2) * 0.35;
  const u = 1 - t;
  return { x: u * u * ax + 2 * u * t * cpx + t * t * bx,
           y: u * u * ay + 2 * u * t * cpy + t * t * by };
}

/* ── Component ───────────────────────────────────────────────── */
export function DataOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);
  const lastRef   = useRef(0);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const nodes   = makeNodes();
    const packets = makePackets();
    const byId    = new Map<string, OrbNode>(nodes.map((n) => [n.id, n]));

    function resize() {
      if (!el || !ctx) return;
      const parent = el.parentElement;
      if (!parent) return;
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const rect  = parent.getBoundingClientRect();
      el.width  = rect.width  * dpr;
      el.height = rect.height * dpr;
      el.style.width  = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let tick = 0;

    function draw(ts: number) {
      if (!el || !ctx) return;
      rafRef.current = requestAnimationFrame(draw);
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;
      tick += dt;

      const dpr = window.devicePixelRatio || 1;
      const W   = el.width  / dpr;
      const H   = el.height / dpr;
      const cx  = W / 2;
      const cy  = H / 2;
      const radii = radiiFromSize(W, H);
      const sc    = Math.max(0.5, Math.min(Math.min(W, H) / REF, 2));

      ctx.clearRect(0, 0, W, H);

      /* Dashed rings */
      radii.forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(28,29,32,${0.07 + i * 0.025})`;
        ctx.lineWidth   = 1;
        ctx.setLineDash([5, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      /* Simulate */
      nodes.forEach((n)   => { n.angle = n.angle + n.speed * dt; });
      packets.forEach((p) => { p.t = (p.t + p.speed * dt) % 1; });

      /* Edges */
      EDGES.forEach(([fId, tId]) => {
        const fn = byId.get(fId);
        const tn = byId.get(tId);
        if (!fn || !tn) return;
        const fp  = nPos(fn, cx, cy, radii);
        const tp  = nPos(tn, cx, cy, radii);
        const cpx = (fp.x + tp.x) / 2 + (cx - (fp.x + tp.x) / 2) * 0.35;
        const cpy = (fp.y + tp.y) / 2 + (cy - (fp.y + tp.y) / 2) * 0.35;
        ctx.beginPath();
        ctx.moveTo(fp.x, fp.y);
        ctx.quadraticCurveTo(cpx, cpy, tp.x, tp.y);
        ctx.strokeStyle = "rgba(28,29,32,0.07)";
        ctx.lineWidth   = 1;
        ctx.stroke();
      });

      /* Packets */
      packets.forEach((p) => {
        const fn = byId.get(p.fromId);
        const tn = byId.get(p.toId);
        if (!fn || !tn) return;
        const fp  = nPos(fn, cx, cy, radii);
        const tp  = nPos(tn, cx, cy, radii);
        const pos = qBezier(fp.x, fp.y, tp.x, tp.y, cx, cy, p.t);
        const gr  = 14 * sc;
        const g   = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, gr);
        g.addColorStop(0, `${p.color}cc`);
        g.addColorStop(1, `${p.color}00`);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, gr, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4.5 * sc, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      /* Nodes */
      nodes.forEach((n) => {
        const pos = nPos(n, cx, cy, radii);
        const r   = n.size * sc * (1 + Math.sin(tick * 2 + n.angle) * 0.12);
        const h   = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r * 4.5);
        h.addColorStop(0, `${n.color}55`);
        h.addColorStop(1, `${n.color}00`);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = h;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle   = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur  = 14 * sc;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 0.38, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fill();
        const fs = Math.max(1, Math.round(13 * sc));
        ctx.font      = `600 ${fs}px 'Plus Jakarta Sans', sans-serif`;
        ctx.fillStyle = "rgba(28,29,32,0.65)";
        ctx.textAlign = "center";
        ctx.fillText(n.label, pos.x, pos.y < cy ? pos.y - r - 10 * sc : pos.y + r + 18 * sc);
      });

      /* Centre core */
      const cR = 24 * sc * (1 + Math.sin(tick * 1.5) * 0.18);
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cR * 4);
      cg.addColorStop(0, "rgba(28,29,32,0.18)");
      cg.addColorStop(1, "rgba(28,29,32,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, cR * 4, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, cR, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(28,29,32,0.85)";
      ctx.fill();
      const cfs = Math.max(1, Math.round(11 * sc));
      ctx.font      = `600 ${cfs}px 'Plus Jakarta Sans', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.textAlign = "center";
      ctx.fillText("DATA", cx, cy - 3 * sc);
      ctx.fillText("CORE", cx, cy + 12 * sc);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%", position: "absolute", inset: 0 }}
    />
  );
}
