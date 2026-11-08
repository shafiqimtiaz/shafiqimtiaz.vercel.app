import * as THREE from 'three';
import Lenis from 'lenis';

// Scroll-driven particle film for the FlexForge story. Each [data-s] marker in `root`
// is a stage; particles morph between one shape per stage as its marker crosses mid-screen.
export function initFlexForge({ canvas, root, solid, index }) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = innerWidth < 900;
  const N = small ? 5000 : 8500;
  const R = Math.random;
  let disposed = false;
  let raf = 0;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x090b0a, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  const resize = () => {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.position.z = small ? 18 : 12;
    camera.updateProjectionMatrix();
  };
  resize();
  const view = () => {
    const h = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    return { w: h * camera.aspect, h };
  };
  const hex = (h) => {
    const c = new THREE.Color(h);
    return [c.r, c.g, c.b];
  };
  const C = {
    ink: hex('#eeede8'),
    mid: hex('#9a9c95'),
    dim: hex('#3a3e3b'),
    acc: hex('#a8e6a1'),
    peach: hex('#f3b88c'),
    butter: hex('#ead58f'),
    sky: hex('#a9c7ec'),
    rose: hex('#eea3b1'),
  };
  const PAL = [C.sky, C.acc, C.butter, C.peach, C.rose];
  const shape = (fill) => {
    const p = new Float32Array(N * 3);
    const c = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = fill(i);
      p.set([r[0], r[1], r[2]], i * 3);
      c.set(r[3], i * 3);
    }
    return { p, c };
  };
  const gauss = () => (R() + R() + R() - 1.5) / 1.5;
  const sampleText = (lines, widthFrac, yOff = 0) => {
    const W = 1600;
    const lh = 300;
    const H = lh * lines.length + 80;
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const x = c.getContext('2d');
    x.fillStyle = '#fff';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.font = '800 280px "Bricolage Grotesque", sans-serif';
    lines.forEach((l, li) =>
      x.fillText(l, W / 2, H / 2 + (li - (lines.length - 1) / 2) * lh * 0.92)
    );
    const d = x.getImageData(0, 0, W, H).data;
    const out = [];
    for (let y = 0; y < H; y += 3)
      for (let X = 0; X < W; X += 3) if (d[(y * W + X) * 4 + 3] > 128) out.push([X, y]);
    let a = 1e9;
    let b = -1e9;
    out.forEach((o) => {
      a = Math.min(a, o[0]);
      b = Math.max(b, o[0]);
    });
    const s = (view().w * widthFrac) / (b - a);
    return out.map((o) => [(o[0] - W / 2) * s, -(o[1] - H / 2) * s + yOff]);
  };

  let OFF = [];
  const build = () => {
    const { w, h } = view();
    const sh = [];
    // 0 name
    const nm = sampleText(['SHAFIQ', 'IMTIAZ'], small ? 0.8 : 0.5, small ? h * 0.25 : h * 0.16);
    sh.push(
      shape((i) => {
        const q = nm[(i * 7919) % nm.length];
        return [
          q[0] + (R() - 0.5) * 0.02,
          q[1] + (R() - 0.5) * 0.02,
          (R() - 0.5) * 0.2,
          i % 9 === 0 ? PAL[i % 5] : i % 4 === 0 ? C.acc : C.ink,
        ];
      })
    );
    // 1 the pile of documents
    const D = 42;
    const cards = [...Array(D)].map((_, k) => ({
      t: PAL[k % 5],
      x: small ? (R() - 0.5) * w * 0.95 : (R() - 0.5) * w * 0.66 - w * 0.16,
      y: (R() - 0.5) * h * 0.9,
      z: (R() - 0.5) * 6,
      r: (R() - 0.5) * 0.9,
      cw: 0.5 + R() * 0.4,
    }));
    sh.push(
      shape((i) => {
        const c = cards[i % D];
        const ch = c.cw * 1.3;
        let px;
        let py;
        const u = R();
        if (u < 0.45) {
          const e = R() * 4;
          if (e < 1) {
            px = -c.cw / 2 + e * c.cw;
            py = ch / 2;
          } else if (e < 2) {
            px = c.cw / 2;
            py = ch / 2 - (e - 1) * ch;
          } else if (e < 3) {
            px = c.cw / 2 - (e - 2) * c.cw;
            py = -ch / 2;
          } else {
            px = -c.cw / 2;
            py = -ch / 2 + (e - 3) * ch;
          }
        } else {
          px = -c.cw / 2 + 0.07 + R() * (c.cw * (0.5 + R() * 0.35));
          py = ch / 2 - 0.16 - Math.floor(R() * 7) * ch * 0.12;
        }
        const cs = Math.cos(c.r);
        const sn = Math.sin(c.r);
        return [
          c.x + px * cs - py * sn,
          c.y + px * sn + py * cs,
          c.z,
          u < 0.45 ? c.t : R() < 0.55 ? C.ink : c.t,
        ];
      })
    );
    // 2 understanding: knowledge clusters around a lit core
    const K = 8;
    const cl = [...Array(K)].map((_, k) => {
      const a = (k / K) * Math.PI * 2 + 0.3;
      const rr = Math.min(h * 0.27, 2.6);
      return {
        x: Math.cos(a) * rr,
        y: Math.sin(a) * rr * 0.75,
        z: (R() - 0.5) * 2.4,
        s: 0.22 + R() * 0.3,
        c: PAL[k % 5],
      };
    });
    sh.push(
      shape((i) => {
        if (i % 14 === 0) {
          const y = 1 - 2 * R();
          const r = Math.sqrt(1 - y * y);
          const a = R() * Math.PI * 2;
          return [Math.cos(a) * r * 0.42, y * 0.42, Math.sin(a) * r * 0.42, C.acc];
        }
        const k = cl[i % K];
        if (i % 7 === 0) {
          const t = R();
          return [k.x * t, k.y * t, k.z * t, C.dim];
        }
        return [
          k.x + gauss() * k.s * 1.5,
          k.y + gauss() * k.s * 1.5,
          k.z + gauss() * k.s,
          i % 4 === 0 ? C.ink : k.c,
        ];
      })
    );
    // 3 agentic: an orchestrator, sub-agents, a review loop
    const AR = Math.min(h * 0.26, 2.4);
    const M = 6;
    const agentColors = [C.sky, C.butter, C.peach, C.rose, C.sky, C.butter];
    sh.push(
      shape((i) => {
        const m = i % 10;
        if (m === 0) {
          const y = 1 - 2 * R();
          const r = Math.sqrt(1 - y * y);
          const a = R() * Math.PI * 2;
          const s = AR * 0.2;
          return [Math.cos(a) * r * s, y * s, Math.sin(a) * r * s, C.acc];
        }
        if (m <= 4) {
          const k = i % M;
          const a = (k / M) * Math.PI * 2;
          const y = 1 - 2 * R();
          const r = Math.sqrt(1 - y * y);
          const b = R() * Math.PI * 2;
          const s = AR * 0.09;
          return [
            Math.cos(a) * AR + Math.cos(b) * r * s,
            Math.sin(a) * AR * 0.62 + y * s,
            Math.sin(a) * AR * 0.5 + Math.sin(b) * r * s,
            agentColors[k],
          ];
        }
        if (m <= 7) {
          const k = i % M;
          const a = (k / M) * Math.PI * 2;
          const t = 0.22 + R() * 0.68;
          return [
            Math.cos(a) * AR * t,
            Math.sin(a) * AR * 0.62 * t,
            Math.sin(a) * AR * 0.5 * t,
            C.mid,
          ];
        }
        const a = R() * Math.PI * 2;
        const rr = AR * 1.42;
        const on = ((a / (Math.PI * 2)) * 28) % 1 < 0.6;
        return [
          Math.cos(a) * rr,
          Math.sin(a) * rr * 0.62,
          Math.sin(a) * rr * 0.5,
          on ? C.butter : C.dim,
        ];
      })
    );
    // 4 people decide: accepted rows stay, rejected fall away
    const colW = Math.min(w * 0.17, 2.2);
    const gap = colW * 0.28;
    const x0 = small ? 0 : w * 0.14;
    const rows = 11;
    const rowH = Math.min(h * 0.055, 0.42);
    sh.push(
      shape((i) => {
        const col = i % 3;
        const cx = x0 + (col - 1) * (colW + gap);
        if (i % 6 === 2)
          return [
            cx + (R() - 0.5) * colW * 1.2,
            -h * 0.38 - R() * h * 0.22,
            (R() - 0.5) * 2,
            C.dim,
          ];
        const r = Math.floor(R() * rows);
        const len = colW * (0.55 + ((r * 37 + col * 11) % 10) / 22);
        const y = h * 0.3 - r * rowH * 1.35;
        const mark = R() < 0.07;
        return [
          mark ? cx - colW / 2 - 0.22 : cx - colW / 2 + R() * len,
          y + (R() - 0.5) * rowH * 0.35,
          (R() - 0.5) * 0.1,
          mark ? C.acc : [C.peach, C.sky, C.acc][col],
        ];
      })
    );
    // 5 build: a process diagram
    const u = small ? w * 0.095 : Math.min(w / 16, h / 9) * 0.82;
    const ox = small ? (-0.4 * u) / 1.6 : -w * 0.2;
    const oy = small ? h * 0.2 : 0;
    const els = [
      { t: 'c', x: -7, y: 0, r: 0.45, c: C.ink },
      { t: 'r', x: -4.6, y: 0, w: 2, h: 1.1, c: C.ink },
      { t: 'd', x: -2.2, y: 0, s: 0.75, c: C.ink },
      { t: 'r', x: 0.4, y: 2, w: 2.2, h: 1.1, c: C.rose },
      { t: 'r', x: 0.4, y: 0, w: 2.2, h: 1.1, c: C.sky },
      { t: 'r', x: 0.4, y: -2, w: 2.2, h: 1.1, c: C.butter },
      { t: 'd', x: 3, y: 0, s: 0.75, c: C.ink },
      { t: 'r', x: 5.4, y: 0, w: 2.2, h: 1.1, c: C.ink },
      { t: 'c', x: 7.8, y: 0, r: 0.45, c: C.acc, bold: 1 },
    ];
    const flows = [
      [-6.55, 0, -5.6, 0],
      [-3.6, 0, -2.95, 0],
      [-2.2, 0.75, -2.2, 2],
      [-2.2, 2, -0.7, 2],
      [-1.45, 0, -0.7, 0],
      [-2.2, -0.75, -2.2, -2],
      [-2.2, -2, -0.7, -2],
      [1.5, 2, 3, 2],
      [3, 2, 3, 0.75],
      [1.5, 0, 2.25, 0],
      [1.5, -2, 3, -2],
      [3, -2, 3, -0.75],
      [3.75, 0, 4.3, 0],
      [6.5, 0, 7.35, 0],
    ];
    sh.push(
      shape((i) => {
        let x;
        let y;
        let col;
        if (i % 5 === 0) {
          const f = flows[i % flows.length];
          const t = R();
          x = f[0] + (f[2] - f[0]) * t;
          y = f[1] + (f[3] - f[1]) * t;
          col = C.dim;
        } else {
          const e = els[i % els.length];
          col = e.c;
          if (e.t === 'c') {
            const a = R() * Math.PI * 2;
            const rr = e.r * (e.bold ? 0.82 + R() * 0.18 : 1);
            x = e.x + Math.cos(a) * rr;
            y = e.y + Math.sin(a) * rr;
          } else if (e.t === 'd') {
            const k = R() * 4;
            const q = k % 1;
            const s = e.s;
            const P = [
              [0, s],
              [s, 0],
              [0, -s],
              [-s, 0],
              [0, s],
            ];
            const A = P[Math.floor(k)];
            const B = P[Math.floor(k) + 1];
            x = e.x + A[0] + (B[0] - A[0]) * q;
            y = e.y + A[1] + (B[1] - A[1]) * q;
          } else if (R() < 0.7) {
            const k = R() * 2 * (e.w + e.h);
            if (k < e.w) {
              x = e.x - e.w / 2 + k;
              y = e.y + e.h / 2;
            } else if (k < e.w + e.h) {
              x = e.x + e.w / 2;
              y = e.y + e.h / 2 - (k - e.w);
            } else if (k < 2 * e.w + e.h) {
              x = e.x + e.w / 2 - (k - e.w - e.h);
              y = e.y - e.h / 2;
            } else {
              x = e.x - e.w / 2;
              y = e.y - e.h / 2 + (k - 2 * e.w - e.h);
            }
          } else {
            x = e.x - e.w * 0.32 + R() * e.w * 0.64;
            y = e.y + (R() < 0.5 ? 0.12 : -0.12);
            col = C.mid;
          }
        }
        return [ox + (x * u) / 1.6, (y * u) / 1.6 + oy, (R() - 0.5) * 0.08, col];
      })
    );
    // 6 result
    const oc = sampleText(['99%'], small ? 0.6 : 0.3, -h * 0.02);
    sh.push(
      shape((i) => {
        const q = oc[(i * 7919) % oc.length];
        return [
          q[0] + (small ? 0 : w * 0.22),
          q[1] + (small ? h * 0.32 : 0),
          (R() - 0.5) * 0.25,
          i % 3 === 0 ? C.butter : C.acc,
        ];
      })
    );
    OFF = [0, 0, small ? 0 : w * 0.12, small ? 0 : -w * 0.14, 0, 0, 0];
    return sh;
  };

  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const seed = new Float32Array(N).map(() => R() * Math.PI * 2);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = spriteCanvas.height = 64;
  const sx = spriteCanvas.getContext('2d');
  const grad = sx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,.85)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  sx.fillStyle = grad;
  sx.fillRect(0, 0, 64, 64);
  const sprite = new THREE.CanvasTexture(spriteCanvas);
  sprite.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.PointsMaterial({
    size: small ? 0.095 : 0.068,
    map: sprite,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0.92,
  });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  let shapes = null;
  const marks = [...root.querySelectorAll('[data-s]')];
  const idxLinks = index ? [...index.querySelectorAll('a')] : [];

  let tmx = 0;
  let tmy = 0;
  let mx = 0;
  let my = 0;
  const onMove = (e) => {
    tmx = e.clientX / innerWidth - 0.5;
    tmy = e.clientY / innerHeight - 0.5;
  };
  addEventListener('pointermove', onMove);

  const lenis = reduce ? null : new Lenis({ lerp: 0.085 });
  const onAnchor = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    if (lenis) {
      lenis.start();
      lenis.scrollTo(el);
    } else el.scrollIntoView();
  };
  document.addEventListener('click', onAnchor);

  const progress = () => {
    const mid = innerHeight * 0.5;
    const cs = marks.map((m) => {
      const r = m.getBoundingClientRect();
      return r.top + r.height / 2;
    });
    if (mid <= cs[0]) return 0;
    for (let i = 0; i < cs.length - 1; i++)
      if (mid <= cs[i + 1]) return i + (mid - cs[i]) / (cs[i + 1] - cs[i]);
    return cs.length - 1;
  };
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let smooth = 0;
  const t0 = performance.now();
  const frame = (now) => {
    if (disposed) return;
    if (lenis) lenis.raf(now);
    smooth += (progress() - smooth) * (reduce ? 1 : 0.075);
    const i = Math.min(Math.floor(smooth), shapes.length - 2);
    const raw = Math.min(Math.max(smooth - i, 0), 1);
    const f = ease(Math.min(Math.max((raw - 0.18) / 0.64, 0), 1));
    const A = shapes[i];
    const B = shapes[i + 1];
    const t = (now - t0) / 1000;
    const wob = reduce ? 0 : 0.02 + 0.2 * Math.sin(f * Math.PI);
    for (let k = 0; k < N; k++) {
      const s = seed[k];
      const j = k * 3;
      const g = Math.min(Math.max(f * 1.25 - (s / 6.283) * 0.25, 0), 1);
      pos[j] = A.p[j] + (B.p[j] - A.p[j]) * g + Math.sin(t * 0.9 + s) * wob;
      pos[j + 1] = A.p[j + 1] + (B.p[j + 1] - A.p[j + 1]) * g + Math.cos(t * 0.8 + s * 1.3) * wob;
      pos[j + 2] = A.p[j + 2] + (B.p[j + 2] - A.p[j + 2]) * g + Math.sin(t * 0.7 + s * 0.7) * wob;
      col[j] = A.c[j] + (B.c[j] - A.c[j]) * g;
      col[j + 1] = A.c[j + 1] + (B.c[j + 1] - A.c[j + 1]) * g;
      col[j + 2] = A.c[j + 2] + (B.c[j + 2] - A.c[j + 2]) * g;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
    mx += (tmx - mx) * 0.05;
    my += (tmy - my) * 0.05;
    const near = (n) => Math.max(0, 1 - Math.abs(smooth - n));
    pts.position.x = OFF[i] + (OFF[i + 1] - OFF[i]) * f;
    if (small) {
      const up = (k) => (k >= 1 && k <= 5 ? 1 : 0);
      const lift = up(i) + (up(i + 1) - up(i)) * f;
      pts.position.y = view().h * 0.2 * lift;
      pts.scale.setScalar(1 - 0.18 * lift);
    }
    pts.rotation.y = mx * 0.28 + (reduce ? 0 : near(2) * t * 0.16 + near(3) * t * 0.22);
    pts.rotation.x = my * 0.18 + near(3) * 0.3;
    renderer.render(scene, camera);
    const fade = Math.min(Math.max(solid.getBoundingClientRect().top / innerHeight, 0), 1);
    canvas.style.opacity = fade;
    if (index) index.style.opacity = fade;
    const cur = Math.round(smooth);
    idxLinks.forEach((a) => a.classList.toggle('on', +a.dataset.i === cur));
    raf = requestAnimationFrame(frame);
  };

  let rt;
  const onResize = () => {
    resize();
    clearTimeout(rt);
    rt = setTimeout(() => {
      shapes = build();
    }, 200);
  };
  addEventListener('resize', onResize);

  // Shapes sample the display face, so wait for it before the first build.
  document.fonts
    .load('800 200px "Bricolage Grotesque"')
    .catch(() => {})
    .then(() => {
      if (disposed) return;
      shapes = build();
      pos.set(shapes[0].p);
      col.set(shapes[0].c);
      raf = requestAnimationFrame(frame);
    });

  return {
    lenis,
    destroy() {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      removeEventListener('pointermove', onMove);
      removeEventListener('resize', onResize);
      document.removeEventListener('click', onAnchor);
      if (lenis) lenis.destroy();
      geo.dispose();
      mat.dispose();
      sprite.dispose();
      renderer.dispose();
    },
  };
}

// Numbers with data-to count up the first time they scroll into view.
export function initCountUp(root) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = (n) => n.toLocaleString('en-US');
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target;
        const to = +el.dataset.to;
        const suf = el.dataset.suf || '';
        if (reduce) return;
        const t1 = performance.now();
        const tick = (n) => {
          const k = Math.min((n - t1) / 1400, 1);
          el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - k, 3)))) + suf;
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    { threshold: 0.6 }
  );
  root.querySelectorAll('[data-to]').forEach((el) => io.observe(el));
  return () => io.disconnect();
}
