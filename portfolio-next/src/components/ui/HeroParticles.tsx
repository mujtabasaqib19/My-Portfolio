"use client";

import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   Neural Network Forward-Pass Visualisation
   ─────────────────────────────────────────
   • Layers of neurons with weighted connections
   • Wave of activations fires every ~4 s
   • Bright signal pulses travel along connections
   • Nodes bloom white on activation, decay smoothly
   • Subtle random noise keeps it alive between waves
   • Topology + node size adapt to the canvas width
══════════════════════════════════════════════════════════════ */

/* Topology adapts to canvas width so it never overcrowds on mobile */
const LAYERS_WIDE   = [4, 7, 9, 9, 7, 3];   // desktop / tablet
const LAYERS_MED    = [3, 6, 6, 4];          // ≤ 760px
const LAYERS_NARROW = [3, 5, 3];             // ≤ 480px

function layersForWidth(w: number): number[] {
  if (w <= 480) return LAYERS_NARROW;
  if (w <= 760) return LAYERS_MED;
  return LAYERS_WIDE;
}

const WAVE_INTERVAL = 3800;                   // ms between forward passes
const LAYER_DELAY   = 420;                    // ms between layer activations
const SIGNAL_SPEED  = 0.022;                  // progress units per frame (~60fps)
const SIGNAL_FRAC   = 0.55;                   // fraction of edges that carry a signal

/* colours */
const C_NODE_DIM    = "rgba(56,189,248,";
const C_NODE_ACT    = "rgba(220,245,255,";
const C_EDGE_DIM    = "rgba(56,189,248,0.055)";
const C_EDGE_LIT    = "rgba(56,189,248,0.35)";
const C_SIG_CORE    = "rgba(255,255,255,";
const C_SIG_TRAIL   = "rgba(56,189,248,";

/* ── Types ───────────────────────────────────────────────────── */
interface Neuron { x: number; y: number; act: number; }   // act 0→1
interface Edge   { a: Neuron; b: Neuron; lit: boolean; }
interface Signal { edge: Edge; t: number; }                // t 0→1

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let neurons: Neuron[][] = [];
    let edges:   Edge[]     = [];
    let signals: Signal[]   = [];
    let nodeScale = 1;        // shrinks nodes / labels on small canvases
    let layerSizes: number[] = LAYERS_WIDE;
    /* In-flight per-layer wave timers — a resize rebuilds `neurons`
       with a different layer count, so any pending wave must be
       cancelled or it will index into a now-shorter array. */
    let waveTimers: ReturnType<typeof setTimeout>[] = [];

    /* ── Layout ─────────────────────────────────────────────── */
    function build() {
      /* Cancel any wave still firing against the previous topology */
      for (const id of waveTimers) clearTimeout(id);
      waveTimers = [];
      neurons = [];
      edges   = [];
      signals = [];

      layerSizes = layersForWidth(W);
      /* scale visuals down as the canvas narrows (clamped 0.62–1) */
      nodeScale = Math.max(0.62, Math.min(1, W / 1100));

      /* Network centred across the full canvas */
      const netLeft  = W * 0.06;
      const netRight = W * 0.94;
      const netMidY  = H * 0.46;
      const netH     = H * 0.60;

      const colW = (netRight - netLeft) / (layerSizes.length - 1);

      for (let li = 0; li < layerSizes.length; li++) {
        const n   = layerSizes[li];
        const col: Neuron[] = [];
        const cx  = netLeft + li * colW;
        for (let ni = 0; ni < n; ni++) {
          const cy = netMidY + ((ni - (n - 1) / 2) / Math.max(n - 1, 1)) * netH * 0.78;
          col.push({ x: cx, y: cy, act: 0 });
        }
        neurons.push(col);
      }

      /* All-to-all edges between adjacent layers */
      for (let li = 0; li < neurons.length - 1; li++) {
        for (const a of neurons[li]) {
          for (const b of neurons[li + 1]) {
            edges.push({ a, b, lit: false });
          }
        }
      }
    }

    /* ── Fire a forward-pass wave ────────────────────────────── */
    function fireWave() {
      /* Reset all edges */
      for (const e of edges) e.lit = false;

      for (let li = 0; li < neurons.length; li++) {
        const delay = li * LAYER_DELAY;

        const id = setTimeout(() => {
          /* A rebuild may have shrunk the network since we scheduled
             this — bail if this layer (or the next) no longer exists. */
          const layer = neurons[li];
          if (!layer) return;

          /* Activate all neurons in this layer */
          for (const n of layer) n.act = 1.0;

          /* Send signals along outgoing edges to next layer */
          const next = neurons[li + 1];
          if (next) {
            const outEdges = edges.filter(
              (e) => layer.includes(e.a) && next.includes(e.b),
            );
            /* Only a fraction of edges carry a visible signal */
            const active = outEdges.filter(() => Math.random() < SIGNAL_FRAC);
            for (const e of active) {
              e.lit = true;
              signals.push({ edge: e, t: 0 });
            }
          }
        }, delay);
        waveTimers.push(id);
      }
    }

    /* ── Resize ─────────────────────────────────────────────── */
    function resize() {
      if (!el || !ctx) return;
      /* Measure the PARENT, not the canvas — the canvas width is locked
         to px below, so reading its own offsetWidth would return a stale
         value and the network would never re-fit on desktop resize. */
      const parent = el.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = parent ? parent.clientWidth  : window.innerWidth;
      H = parent ? parent.clientHeight : window.innerHeight;
      el.width  = W * dpr;
      el.height = H * dpr;
      el.style.width  = `${W}px`;
      el.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    /* ── Draw loop ───────────────────────────────────────────── */
    let lastTick = performance.now();
    let waveTimer = 0;

    function draw(now: number) {
      if (!el || !ctx) return;
      rafRef.current = requestAnimationFrame(draw);

      const dt = now - lastTick;
      lastTick = now;
      waveTimer += dt;
      if (waveTimer > WAVE_INTERVAL) { waveTimer = 0; fireWave(); }

      ctx.clearRect(0, 0, W, H);

      /* ── Background depth gradient ──────────────── */
      const bg = ctx.createRadialGradient(W * 0.50, H * 0.46, 0, W * 0.50, H * 0.46, W * 0.62);
      bg.addColorStop(0,   "rgba(4,18,48,0.55)");
      bg.addColorStop(0.5, "rgba(3,10,28,0.22)");
      bg.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* ── Edges ─────────────────────────────────── */
      for (const e of edges) {
        ctx.beginPath();
        ctx.moveTo(e.a.x, e.a.y);
        ctx.lineTo(e.b.x, e.b.y);
        ctx.strokeStyle = e.lit ? C_EDGE_LIT : C_EDGE_DIM;
        ctx.lineWidth   = e.lit ? 0.9 : 0.5;
        ctx.stroke();
      }

      /* ── Signals ───────────────────────────────── */
      signals = signals.filter((sig) => sig.t <= 1);
      for (const sig of signals) {
        sig.t += SIGNAL_SPEED;
        const { a, b } = sig.edge;
        const px = a.x + (b.x - a.x) * sig.t;
        const py = a.y + (b.y - a.y) * sig.t;

        /* Trail */
        for (let tr = 1; tr <= 4; tr++) {
          const tt  = Math.max(0, sig.t - tr * 0.04);
          const tx  = a.x + (b.x - a.x) * tt;
          const ty  = a.y + (b.y - a.y) * tt;
          const ta  = (1 - tr / 5) * 0.45;
          ctx.beginPath();
          ctx.arc(tx, ty, 1.8 - tr * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `${C_SIG_TRAIL}${ta})`;
          ctx.fill();
        }

        /* Core dot */
        const gSig = ctx.createRadialGradient(px, py, 0, px, py, 7);
        gSig.addColorStop(0, `${C_SIG_CORE}0.9)`);
        gSig.addColorStop(1, `${C_SIG_CORE}0)`);
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = gSig;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${C_SIG_CORE}1)`;
        ctx.fill();
      }

      /* ── Neurons ───────────────────────────────── */
      for (const layer of neurons) {
        for (const n of layer) {
          /* Decay activation */
          n.act = Math.max(0, n.act - 0.012);

          /* Idle micro-flicker */
          const flicker = Math.random() < 0.004 ? 0.12 : 0;
          const a = Math.min(1, n.act + flicker);

          const r    = (4 + a * 5) * nodeScale;   // radius grows on activation
          const alpha = 0.18 + a * 0.82;

          /* Outer glow */
          if (a > 0.05) {
            const glowR = r * (3.5 + a * 3);
            const gGlow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
            gGlow.addColorStop(0, `${C_NODE_ACT}${a * 0.22})`);
            gGlow.addColorStop(1, `${C_NODE_ACT}0)`);
            ctx.beginPath();
            ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = gGlow;
            ctx.fill();
          }

          /* Core */
          const color = a > 0.5 ? C_NODE_ACT : C_NODE_DIM;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle   = `${color}${alpha})`;
          ctx.shadowColor = `rgba(56,189,248,${a * 0.6})`;
          ctx.shadowBlur  = a * 14;
          ctx.fill();
          ctx.shadowBlur  = 0;

          /* Bright centre dot when active */
          if (a > 0.3) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, r * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${a * 0.9})`;
            ctx.fill();
          }
        }
      }

      /* ── Layer labels ──────────────────────────── */
      /* Labels would collide once columns get tight — skip on narrow canvases */
      if (W > 560) {
        const last = neurons.length - 1;
        const fontPx = Math.max(8, Math.round(10 * nodeScale));
        ctx.font      = `500 ${fontPx}px 'JetBrains Mono', monospace`;
        ctx.textAlign = "center";
        for (let li = 0; li < neurons.length; li++) {
          const col = neurons[li];
          if (!col.length) continue;
          const label = li === 0 ? "Input" : li === last ? "Output" : "Dense";
          const cx  = col[0].x;
          const bot = Math.max(...col.map((n) => n.y)) + 22;
          ctx.fillStyle = "rgba(56,189,248,0.35)";
          ctx.fillText(label, cx, bot);
        }
      }
    }

    /* ── Boot ────────────────────────────────────────────────── */
    resize();
    window.addEventListener("resize", resize, { passive: true });

    /* ResizeObserver catches every layout change of the parent —
       more reliable than the window 'resize' event alone. */
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && el.parentElement) {
      ro = new ResizeObserver(() => resize());
      ro.observe(el.parentElement);
    }

    /* First wave fires after a short pause so page has settled */
    const firstFire = setTimeout(() => fireWave(), 600);
    rafRef.current  = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(firstFire);
      for (const id of waveTimers) clearTimeout(id);
      window.removeEventListener("resize", resize);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        zIndex:        0,
        pointerEvents: "none",
      }}
    />
  );
}
