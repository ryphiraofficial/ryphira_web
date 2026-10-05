import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import CourseHero from './CourseHero';
import CourseDetailPanel from './CourseDetailPanel';

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

const OPEN_BTN_OFF = ['opacity-0', 'scale-[0.8]'];
const OPEN_BTN_ON = ['opacity-100', 'scale-100'];

export function BooksShowcase({
  books = [],
  heroTitle = 'Books.',
  showDetailPanel = true,
  showCarousel = true,
  className = '',
  onBookSelect,
  onOpenModal,
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const openBtnRef = useRef(null);
  const dpRef = useRef(null);
  const shiftCarouselRef = useRef(() => {});
  const closeRef = useRef(() => {});

  const onBookSelectRef = useRef(onBookSelect);
  useEffect(() => {
    onBookSelectRef.current = onBookSelect;
  }, [onBookSelect]);

  const [uiMode, setUiMode] = useState('hero');
  const [selectedCfg, setSelectedCfg] = useState(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvasEl = canvasRef.current;
    if (!root || !canvasEl || books.length === 0) return;

    let cancelled = false;
    const timeouts = [];
    const setT = (fn, ms) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
      return id;
    };

    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    class Spring {
      constructor(v, k = 120, d = 14) {
        this.v = v;
        this.t = v;
        this.vel = 0;
        this.k = k;
        this.d = d;
      }
      set(v) {
        this.v = v;
        this.t = v;
        this.vel = 0;
        return this;
      }
      update(dt) {
        const a = this.k * (this.t - this.v) - this.d * this.vel;
        this.vel += a * dt;
        this.v += this.vel * dt;
        return this.v;
      }
    }

    function mkCanvas(w, h) {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      return c;
    }

    function drawSpaced(x, text, cx, y, ls) {
      const prev = x.textAlign;
      x.textAlign = 'left';
      const chars = [...text];
      let tot = 0;
      const ws = chars.map((ch) => {
        const w = x.measureText(ch).width;
        tot += w;
        return w;
      });
      tot += ls * (chars.length - 1);
      let px = cx - tot / 2;
      chars.forEach((ch, i) => {
        x.fillText(ch, px, y);
        px += ws[i] + ls;
      });
      x.textAlign = prev;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
    } catch (err) {
      console.warn('BooksShowcase: WebGL renderer creation failed', err);
      return;
    }

    const dims = {
      w: root.offsetWidth || window.innerWidth,
      h: root.offsetHeight || 600,
    };

    renderer.setSize(dims.w, dims.h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.98;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const ANISO = renderer.capabilities.getMaxAnisotropy();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, dims.w / Math.max(1, dims.h), 0.1, 100);
    camera.position.set(0, 0.1, 9.6);

    function envBlob(x, cx, cy, r, rgb, a) {
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, 'rgba(' + rgb + ',' + a + ')');
      g.addColorStop(1, 'rgba(' + rgb + ',0)');
      x.fillStyle = g;
      x.beginPath();
      x.arc(cx, cy, r, 0, 6.2832);
      x.fill();
    }

    (function buildEnv() {
      const c = mkCanvas(512, 256),
        x = c.getContext('2d');
      const g = x.createLinearGradient(0, 0, 0, 256);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.55, '#f8fafc');
      g.addColorStop(1, '#f1f5f9');
      x.fillStyle = g;
      x.fillRect(0, 0, 512, 256);
      envBlob(x, 140, 66, 95, '255,255,255', 0.95);
      envBlob(x, 405, 84, 55, '226,232,240', 0.55);
      const tx = new THREE.CanvasTexture(c);
      tx.mapping = THREE.EquirectangularReflectionMapping;
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromEquirectangular(tx).texture;
      tx.dispose();
      pmrem.dispose();
    })();

    const hemi = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.5);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.0);
    key.position.set(3.5, 5, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    scene.add(key);
    const fillLight = new THREE.DirectionalLight(0xc7d2fe, 0.3);
    fillLight.position.set(-4, 1, 4);
    scene.add(fillLight);

    const bookRoot = new THREE.Group();
    scene.add(bookRoot);

    function tex(c) {
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = ANISO;
      return t;
    }

    function loadOrPaint(material, imageURL, paintFallback) {
      material.map = tex(paintFallback());
      material.needsUpdate = true;
    }

    function noiseTexture(base, amp) {
      const s = 256,
        c = mkCanvas(s, s),
        x = c.getContext('2d');
      const img = x.createImageData(s, s),
        d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = base + (Math.random() - 0.5) * 2 * amp;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
      x.putImageData(img, 0, 0);
      return new THREE.CanvasTexture(c);
    }
    const laminateBump = noiseTexture(128, 10);
    const clothBump = (function () {
      const s = 128,
        c = mkCanvas(s, s),
        x = c.getContext('2d');
      x.fillStyle = '#808080';
      x.fillRect(0, 0, s, s);
      for (let i = 0; i < s; i += 2) {
        x.fillStyle = i % 4 === 0 ? 'rgba(255,255,255,.22)' : 'rgba(0,0,0,.22)';
        x.fillRect(i, 0, 1, s);
        x.fillRect(0, i, s, 1);
      }
      return new THREE.CanvasTexture(c);
    })();

    function striationTexture() {
      const s = 512,
        c = mkCanvas(s, s),
        x = c.getContext('2d');
      x.fillStyle = '#ece4d2';
      x.fillRect(0, 0, s, s);
      return tex(c);
    }
    const striV = striationTexture();
    const striH = striationTexture();

    const endpaperTex = (function () {
      const s = 512,
        c = mkCanvas(s, s),
        x = c.getContext('2d');
      x.fillStyle = '#f8fafc';
      x.fillRect(0, 0, s, s);
      return tex(c);
    })();

    const blobTex = (function () {
      const s = 256,
        c = mkCanvas(s, s),
        x = c.getContext('2d');
      const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, 'rgba(0,0,0,.15)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = g;
      x.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(c);
    })();

    function paintDefaultFront(x, w, h, o) {
      x.fillStyle = o.bg || '#3b82f6';
      x.fillRect(0, 0, w, h);
      x.fillStyle = o.titleColor || '#ffffff';
      x.textAlign = 'center';
      x.font = 'bold 76px Inter, sans-serif';
      const words = o.title.split(' ');
      let line = '';
      const lines = [];
      words.forEach((word) => {
        const test = line ? line + ' ' + word : word;
        if (x.measureText(test).width > w * 0.75 && line) {
          lines.push(line);
          line = word;
        } else line = test;
      });
      if (line) lines.push(line);
      const startY = h * 0.3 - ((lines.length - 1) * 88) / 2;
      lines.forEach((l, i) => x.fillText(l, w / 2, startY + i * 88));

      x.fillStyle = 'rgba(255,255,255,0.8)';
      x.font = '500 28px Inter, sans-serif';
      x.fillText(o.sub || 'LEARN. ADAPT. OPTIMIZE.', w / 2, startY + lines.length * 88 + 40);

      x.strokeStyle = 'rgba(255,255,255,0.5)';
      x.lineWidth = 3;
      x.beginPath();
      x.arc(w / 2, h * 0.7, 140, 0, Math.PI * 2);
      x.stroke();
    }

    function paintBack(x, w, h, o) {
      x.fillStyle = o.backBg || '#1e293b';
      x.fillRect(0, 0, w, h);
    }

    function paintSpine(x, w, h, o) {
      x.fillStyle = o.spineBg || '#1e1b4b';
      x.fillRect(0, 0, w, h);
      x.save();
      x.translate(w / 2, h / 2);
      x.rotate(Math.PI / 2);
      x.fillStyle = o.spineInk || '#ffffff';
      x.font = o.spineFont || '700 42px Inter';
      drawSpaced(x, o.title.toUpperCase(), -h * 0.1, 15, 6);
      x.restore();
    }

    function trimToWidth(x, text, maxW) {
      if (x.measureText(text).width <= maxW) return text;
      let t = text;
      while (t.length > 1 && x.measureText(t + '...').width > maxW) t = t.slice(0, -1);
      return t + '...';
    }

    function makeIndexPageTex(chapters) {
      const w = 1024,
        h = 1536,
        c = mkCanvas(w, h),
        x = c.getContext('2d');
      x.fillStyle = '#f8fafc';
      x.fillRect(0, 0, w, h);
      x.fillStyle = '#0f172a';
      x.textAlign = 'center';
      x.font = '700 84px Georgia';
      x.fillText('INDEX', w / 2, 190);
      x.globalAlpha = 0.2;
      x.fillRect(220, 225, w - 440, 3);
      x.globalAlpha = 1;

      const list = chapters && chapters.length ? chapters : ['Introduction', 'Main Ideas', 'Practical Lessons', 'Case Studies', 'Takeaways', 'Final Notes'];
      x.textAlign = 'left';
      x.font = '500 46px Georgia';
      let y = 318;
      for (let i = 0; i < list.length; i++) {
        const n = String(i + 1).padStart(2, '0');
        const pageNo = String(7 + i * 14).padStart(3, ' ');
        const left = n + '. ' + trimToWidth(x, list[i], 650);
        x.fillStyle = '#0f172a';
        x.fillText(left, 150, y);
        x.textAlign = 'right';
        x.fillStyle = '#475569';
        x.fillText(pageNo, w - 150, y);
        x.textAlign = 'left';
        x.globalAlpha = 0.15;
        x.fillRect(150, y + 16, w - 300, 2);
        x.globalAlpha = 1;
        y += 112;
      }
      return tex(c);
    }

    const N = books.length;
    const VISIBLE = Math.min(3, N);

    const W = 1.1,
      H = 1.65,
      T = 0.26,
      CT = 0.026,
      OV = 0.04;
    const PAGE_N = 12,
      PW = W - 0.02,
      PH = H - 0.02;
    const BLOCK_D = 0.2,
      BLOCK_Z = -0.016,
      PIVOT_Z = T / 2 + CT / 2,
      BPIVOT_Z = -(T / 2 + CT / 2);

    const coverGeo = new THREE.BoxGeometry(W + OV, H + OV * 2, CT);
    const blockGeo = new THREE.BoxGeometry(W - 0.015, H, BLOCK_D);
    const pageGeo = new THREE.PlaneGeometry(PW, PH);
    const spineGeo = new THREE.BoxGeometry(0.024, H + OV * 2, T + CT * 2 + 0.005);
    const hitGeo = new THREE.BoxGeometry(1.5, 2.1, 0.9);
    const blobGeo = new THREE.PlaneGeometry(1, 1);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });

    function std(o) {
      return new THREE.MeshStandardMaterial(Object.assign({ metalness: 0.02 }, o));
    }

    const paperFlat = std({ color: 0xf8fafc, roughness: 0.95 });
    const striMatV = std({ map: striV, bumpMap: striV, bumpScale: 0.0025, roughness: 0.95 });
    const striMatH = std({ map: striH, bumpMap: striH, bumpScale: 0.0025, roughness: 0.95 });
    const endpaperMat = std({ map: endpaperTex, roughness: 0.9 });
    const pageMats = [0xf8fafc, 0xf1f5f9, 0xe2e8f0].map((c) =>
      std({ color: c, roughness: 0.92, side: THREE.DoubleSide })
    );

    const bookInstances = [];
    const hitMeshes = [];

    function buildBook(cfg, index) {
      const rootG = new THREE.Group();
      const float = new THREE.Group();
      rootG.add(float);
      bookRoot.add(rootG);

      const indexPageMat = std({ map: makeIndexPageTex(cfg.chapters), roughness: 0.92, side: THREE.DoubleSide });

      const edgeColor = cfg.edge ?? '#cbd5e1';
      const mEdge = std({ color: edgeColor, bumpMap: laminateBump, bumpScale: 0.0035, roughness: 0.68 });
      const mFront = std({ bumpMap: laminateBump, bumpScale: 0.0035, roughness: 0.54 });
      const mBack = std({ bumpMap: laminateBump, bumpScale: 0.0035, roughness: 0.58 });
      const mSpine = std({ bumpMap: clothBump, bumpScale: 0.006, roughness: 0.78 });

      loadOrPaint(mFront, null, () => {
        const c = mkCanvas(1024, 1536);
        const ctx = c.getContext('2d');
        if (cfg.front) cfg.front(ctx, 1024, 1536);
        else paintDefaultFront(ctx, 1024, 1536, { title: cfg.title, author: cfg.author, bg: cfg.spineBg ?? '#3b82f6', sub: cfg.sub });
        return c;
      });
      loadOrPaint(mBack, null, () => {
        const c = mkCanvas(1024, 1536);
        const ctx = c.getContext('2d');
        if (cfg.back) cfg.back(ctx, 1024, 1536);
        else paintBack(ctx, 1024, 1536, { backBg: cfg.backBg ?? '#1e293b' });
        return c;
      });
      loadOrPaint(mSpine, null, () => {
        const c = mkCanvas(220, 1536);
        const ctx = c.getContext('2d');
        if (cfg.spine) cfg.spine(ctx, 220, 1536);
        else
          paintSpine(ctx, 220, 1536, {
            spineBg: cfg.spineBg ?? '#1e1b4b',
            spineInk: cfg.spineInk ?? '#ffffff',
            spineFont: cfg.spineFont ?? '700 42px Inter',
            title: cfg.title,
            author: cfg.author,
          });
        return c;
      });

      const backPivot = new THREE.Group();
      backPivot.position.set(-W / 2, 0, BPIVOT_Z);
      const backMesh = new THREE.Mesh(coverGeo, [mEdge, mEdge, mEdge, mEdge, endpaperMat, mBack]);
      backMesh.position.x = (W + OV) / 2;
      backMesh.castShadow = backMesh.receiveShadow = true;
      backPivot.add(backMesh);
      float.add(backPivot);

      const pivot = new THREE.Group();
      pivot.position.set(-W / 2, 0, PIVOT_Z);
      const frontMesh = new THREE.Mesh(coverGeo, [mEdge, mEdge, mEdge, mEdge, mFront, endpaperMat]);
      frontMesh.position.x = (W + OV) / 2;
      frontMesh.castShadow = frontMesh.receiveShadow = true;
      pivot.add(frontMesh);
      float.add(pivot);

      const spine = new THREE.Mesh(spineGeo, mSpine);
      spine.position.set(-W / 2 - 0.011, 0, 0);
      spine.castShadow = true;
      float.add(spine);

      const block = new THREE.Mesh(blockGeo, [striMatV, paperFlat, striMatH, striMatH, paperFlat, paperFlat]);
      block.position.set(-0.006, 0, BLOCK_Z);
      block.castShadow = block.receiveShadow = true;
      float.add(block);

      const pages = [];
      for (let i = 0; i < PAGE_N; i++) {
        const pp = new THREE.Group();
        pp.position.set(-W / 2 + 0.008, (Math.random() - 0.5) * 0.005, 0.13 - i * 0.0035);
        const pm = new THREE.Mesh(pageGeo, i === 0 ? indexPageMat : pageMats[i % 3]);
        pm.position.x = PW / 2;
        pm.rotation.z = (Math.random() - 0.5) * 0.005;
        pp.add(pm);
        float.add(pp);
        pages.push(pp);
      }

      const pagesB = [];
      for (let i = 0; i < 6; i++) {
        const pp = new THREE.Group();
        pp.position.set(-W / 2 + 0.008, (Math.random() - 0.5) * 0.005, -0.13 + i * 0.0035);
        const pm = new THREE.Mesh(pageGeo, pageMats[i % 3]);
        pm.position.x = PW / 2;
        pm.rotation.z = (Math.random() - 0.5) * 0.005;
        pp.add(pm);
        float.add(pp);
        pagesB.push(pp);
      }

      const blob = new THREE.Mesh(
        blobGeo,
        new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, opacity: 0.12, depthWrite: false })
      );
      blob.scale.set(2.5, 3.2, 1);
      blob.position.set(0.1, -0.25, -0.7);
      blob.renderOrder = -5;
      rootG.add(blob);

      const hit = new THREE.Mesh(hitGeo, hitMat);
      float.add(hit);

      const springs = {
        px: new Spring(0, 17, 6.8),
        py: new Spring(0, 17, 6.8),
        pz: new Spring(0, 17, 6.8),
        rx: new Spring(0, 17, 6.8),
        ry: new Spring(0, 17, 6.8),
        rz: new Spring(0, 17, 6.8),
        sc: new Spring(1, 17, 6.8),
        tiltX: new Spring(0, 120, 13),
        tiltY: new Spring(0, 120, 13),
        lift: new Spring(0, 120, 13),
        cover: new Spring(0, 90, 12),
        coverB: new Spring(0, 90, 12),
        drag: new Spring(0, 160, 16),
      };

      const b = {
        cfg,
        index,
        root: rootG,
        float,
        pivot,
        backPivot,
        spine,
        block,
        hit,
        springs,
        phase: Math.random() * 6.28,
        slotScale: 1,
        hitEdge: null,
        scr: { x: 0, y: 0 },
        orbY: 0,
        orbYv: 0,
        orbPhase: 'idle',
        orbTarget: 0,
        orbXs: new Spring(0, 60, 12),
      };
      bookInstances.push(b);
      return b;
    }

    books.forEach(buildBook);
    const bookByHit = (m) => bookInstances.find((b) => b.hit === m);

    const state = { mode: 'hero', selected: null, hovered: null, pillLock: null, kbIndex: -1 };
    const SLOTS = { hero: [], detail: null, portrait: false };

    function computeSlots() {
      const a = dims.w / Math.max(1, dims.h);
      const fit = clamp(a / 1.75, 0.56, 1);
      bookRoot.scale.setScalar(fit);
      bookRoot.position.y = 0;
      SLOTS.portrait = a < 0.85;

      SLOTS.hero = SLOTS.portrait
        ? [
            { p: [-1.2, -0.15, -0.1], r: [-0.045, 0.4, 0.185], s: 1.05 },
            { p: [0.1, 0.1, 0.5], r: [-0.05, -0.1, -0.035], s: 1.15 },
            { p: [1.4, -0.2, -0.25], r: [-0.045, -0.42, -0.17], s: 1.05 },
          ]
        : [
            { p: [-1.5, 0, 0.1], r: [-0.045, 0.35, 0.12], s: 1.08 },
            { p: [0.0, 0.1, 0.6], r: [-0.05, -0.1, -0.02], s: 1.2 },
            { p: [1.5, 0, 0.1], r: [-0.045, -0.35, -0.12], s: 1.08 },
          ];

      SLOTS.detail = { p: [-1.8, 0.0, 1.1], r: [0.02, -0.52, 0.1], s: 1.28 };
    }

    function setTargets(b, slot) {
      if (!b || !slot) return;
      const s = b.springs;
      s.px.t = slot.p[0];
      s.py.t = slot.p[1];
      s.pz.t = slot.p[2];
      s.rx.t = slot.r[0];
      s.ry.t = slot.r[1];
      s.rz.t = slot.r[2];
      b.slotScale = slot.s;
    }

    function windowIndices(start, total, count) {
      const arr = [];
      for (let i = 0; i < count; i++) arr.push((start + i) % total);
      return arr;
    }

    let carouselStart = 0;
    let currentWindow = windowIndices(0, N, VISIBLE);
    let carouselBusy = false;

    function rebuildHitMeshes() {
      hitMeshes.length = 0;
      currentWindow.forEach((bi) => {
        if (bookInstances[bi]) hitMeshes.push(bookInstances[bi].hit);
      });
    }

    function applyMode() {
      if (state.mode === 'hero' || state.mode === 'closing') {
        currentWindow.forEach((bi, i) => {
          const slot = SLOTS.hero[i];
          if (slot && bookInstances[bi]) {
            setTargets(bookInstances[bi], slot);
            bookInstances[bi].root.visible = true;
          }
        });
      } else if (state.selected) {
        bookInstances.forEach((b) => {
          if (b !== state.selected) b.root.visible = false;
        });
        setTargets(state.selected, SLOTS.detail);
      }
    }

    function shiftCarousel(dir) {
      if (carouselBusy || state.mode !== 'hero' || N <= VISIBLE) return;
      carouselBusy = true;
      const outgoing = currentWindow;
      carouselStart = (((carouselStart + dir) % N) + N) % N;
      const incoming = windowIndices(carouselStart, N, VISIBLE);

      const toHide = outgoing.filter((bi) => !incoming.includes(bi));
      toHide.forEach((bi) => {
        const oldIdx = outgoing.indexOf(bi);
        const slot = SLOTS.hero[oldIdx];
        const b = bookInstances[bi];
        if (slot && b) b.springs.px.t = slot.p[0] - dir * 6.5;
      });
      setT(() => toHide.forEach((bi) => { if (bookInstances[bi]) bookInstances[bi].root.visible = false; }), 650);

      incoming.forEach((bi, i) => {
        const slot = SLOTS.hero[i];
        if (!slot) return;
        const b = bookInstances[bi];
        if (!b) return;
        const alreadyOnScreen = outgoing.includes(bi);
        b.root.visible = true;
        if (!alreadyOnScreen) {
          b.springs.px.set(slot.p[0] + dir * 6.5);
          b.springs.py.set(slot.p[1]);
          b.springs.pz.set(slot.p[2]);
          b.springs.rx.set(slot.r[0]);
          b.springs.ry.set(slot.r[1]);
          b.springs.rz.set(slot.r[2]);
          b.springs.sc.set(slot.s * 0.92);
        }
        setTargets(b, slot);
      });

      currentWindow = incoming;
      rebuildHitMeshes();
      setT(() => { carouselBusy = false; }, 700);
    }
    shiftCarouselRef.current = shiftCarousel;

    const camX = new Spring(0, 13, 6.5),
      camY = new Spring(0.1, 13, 6.5),
      camZ = new Spring(9.6, 13, 6.5);
    const lookX = new Spring(0, 13, 6.5),
      lookY = new Spring(0, 13, 6.5);

    function camTo(mode) {
      if (mode === 'detail') {
        camX.t = SLOTS.portrait ? 0 : -0.4;
        camZ.t = SLOTS.portrait ? 9.9 : 8.9;
        lookX.t = SLOTS.portrait ? 0 : -0.5;
        lookY.t = SLOTS.portrait ? 0 : 0.15;
      } else {
        camX.t = 0;
        camZ.t = 9.6;
        lookX.t = 0;
        lookY.t = 0;
      }
    }

    function showPill() {
      const el = openBtnRef.current;
      if (!el) return;
      el.classList.remove(...OPEN_BTN_OFF);
      el.classList.add(...OPEN_BTN_ON);
    }
    function hidePill() {
      const el = openBtnRef.current;
      if (el) {
        el.classList.remove(...OPEN_BTN_ON);
        el.classList.add(...OPEN_BTN_OFF);
      }
    }

    function open(book) {
      if (state.mode !== 'hero' || !book) return;
      state.mode = 'opening';
      setUiMode('opening');
      state.selected = book;
      hidePill();
      root.classList.add('bs-transit');
      setSelectedCfg(book.cfg);
      onBookSelectRef.current?.(book.cfg);
      computeSlots();

      bookInstances.forEach((b) => {
        if (b !== book) b.root.visible = false;
      });

      setT(() => {
        if (state.mode !== 'opening' && state.mode !== 'detail') return;
        book.orbY = RM ? 0 : -6.2832;
        book.orbYv = RM ? 0 : 3;
        book.orbPhase = 'return';
        book.orbTarget = 0;
        book.orbXs.set(0);
        applyMode();
        camTo('detail');
      }, 760);
      setT(() => {
        if (state.mode === 'opening') {
          root.classList.add('bs-detail-open');
          state.mode = 'detail';
          setUiMode('detail');
        }
      }, 1400);
    }

    function close() {
      if (state.mode !== 'detail') return;
      state.mode = 'closing';
      setUiMode('closing');
      root.classList.remove('bs-detail-open');
      onBookSelectRef.current?.(null);
      const b = state.selected;
      if (b) {
        b.orbTarget = Math.round(b.orbY / 6.2832) * 6.2832 + 6.2832;
        b.orbYv = Math.max(b.orbYv, 3);
        b.orbPhase = 'return';
        b.orbXs.t = 0;
      }
      setT(() => {
        root.classList.remove('bs-transit');
        applyMode();
        camTo('hero');
        currentWindow.forEach((bi) => {
          const bk = bookInstances[bi];
          if (bk) bk.root.visible = true;
        });
      }, 250);
      setT(() => {
        if (state.mode === 'closing') {
          state.mode = 'hero';
          setUiMode('hero');
          state.selected = null;
          setSelectedCfg(null);
        }
      }, 1600);
    }

    closeRef.current = close;

    const ptr = {
      ndcX: 0, ndcY: 0, cx: 0, cy: 0, lastX: 0, lastY: 0,
      down: false, downX: 0, downY: 0, moved: 0, t0: 0, type: 'mouse', seen: false, id: null,
    };
    const curCursor = { x: 0, y: 0 };
    const isTouch = () => ptr.type === 'touch' || ptr.type === 'pen';
    let dragBook = null, rayBook = null;
    const orbit = { drag: false, dxAcc: 0, dyAcc: 0 };
    const ray = new THREE.Raycaster();
    const tmpV = new THREE.Vector3();

    const canvas = canvasEl;
    const onContextMenu = (e) => e.preventDefault();
    canvas.addEventListener('contextmenu', onContextMenu);

    const onPointerLeave = () => {
      rayBook = null;
      state.pillLock = null;
      state.kbIndex = -1;
      hidePill();
    };
    canvas.addEventListener('pointerleave', onPointerLeave);

    const localXY = (e) => {
      const r = root.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onPointerMove = (e) => {
      if (ptr.id !== null && e.pointerId !== ptr.id) return;
      const { x: cx, y: cy } = localXY(e);
      const dxN = (cx - ptr.lastX) / Math.max(1, dims.w);
      const dyN = (cy - ptr.lastY) / Math.max(1, dims.h);
      ptr.lastX = cx; ptr.lastY = cy;
      ptr.cx = cx; ptr.cy = cy;
      ptr.ndcX = (cx / Math.max(1, dims.w)) * 2 - 1;
      ptr.ndcY = -(cy / Math.max(1, dims.h)) * 2 + 1;
      ptr.type = e.pointerType || 'mouse';
      ptr.seen = true;

      if (ptr.down && dragBook) {
        ptr.moved += Math.abs(dxN * dims.w) + Math.abs(dyN * dims.h);
        dragBook.springs.drag.t = clamp(((ptr.downX - cx) / Math.max(1, dims.w)) * 3.4, 0, 1.0);
      }
      if (ptr.down && orbit.drag) {
        orbit.dxAcc += dxN;
        orbit.dyAcc += dyN;
        ptr.moved += Math.abs(dxN * dims.w) + Math.abs(dyN * dims.h);
      }
    };
    canvas.addEventListener('pointermove', onPointerMove);

    const onPointerDown = (e) => {
      if (ptr.id !== null) return;
      ptr.id = e.pointerId;
      const { x: cx, y: cy } = localXY(e);
      ptr.cx = cx; ptr.cy = cy;
      ptr.lastX = cx; ptr.lastY = cy;
      ptr.ndcX = (cx / Math.max(1, dims.w)) * 2 - 1;
      ptr.ndcY = -(cy / Math.max(1, dims.h)) * 2 + 1;
      ptr.type = e.pointerType || 'mouse';
      ptr.seen = true;
      castRay();
      if (state.mode === 'hero' && rayBook) {
        ptr.down = true;
        dragBook = rayBook;
        ptr.downX = cx;
        ptr.downY = cy;
        ptr.moved = 0;
        ptr.t0 = performance.now();
        canvas.setPointerCapture(e.pointerId);
      } else if (state.mode === 'detail' && rayBook === state.selected) {
        ptr.down = true;
        orbit.drag = true;
        orbit.dxAcc = 0;
        orbit.dyAcc = 0;
        ptr.moved = 0;
        ptr.t0 = performance.now();
        canvas.setPointerCapture(e.pointerId);
      } else {
        state.pillLock = null;
        state.kbIndex = -1;
      }
    };
    canvas.addEventListener('pointerdown', onPointerDown);

    const onPointerUp = (e) => {
      if (ptr.id !== null && e.pointerId !== ptr.id) return;
      ptr.id = null;
      orbit.drag = false;
      if (dragBook) {
        const slop = isTouch() ? 26 : 14;
        const limit = isTouch() ? 650 : 450;
        const wasDrag = ptr.moved > slop;
        dragBook.springs.drag.t = 0;
        if (!wasDrag && state.mode === 'hero' && performance.now() - ptr.t0 < limit) open(dragBook);
        dragBook = null;
      }
      ptr.down = false;
      if (isTouch()) rayBook = null;
    };
    window.addEventListener('pointerup', onPointerUp);

    const cancelPointer = (e) => {
      if (e && ptr.id !== null && e.pointerId !== ptr.id) return;
      ptr.id = null; ptr.down = false; orbit.drag = false;
      if (dragBook) {
        dragBook.springs.drag.t = 0;
        dragBook = null;
      }
      if (isTouch()) rayBook = null;
    };
    window.addEventListener('pointercancel', cancelPointer);
    canvas.addEventListener('lostpointercapture', cancelPointer);

    const onKeydown = (e) => {
      if (e.key === 'Escape') close();
      if (state.mode !== 'hero') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (e.shiftKey) {
          shiftCarousel(e.key === 'ArrowRight' ? 1 : -1);
        } else {
          const d = e.key === 'ArrowRight' ? 1 : -1;
          state.kbIndex = ((state.kbIndex < 0 ? (d > 0 ? -1 : 1) : state.kbIndex) + d + VISIBLE) % VISIBLE;
          state.pillLock = null;
        }
        e.preventDefault();
      }
      if (e.key === 'Enter' && state.hovered) open(state.hovered);
    };
    root.addEventListener('keydown', onKeydown);

    function castRay() {
      ray.setFromCamera({ x: ptr.ndcX, y: ptr.ndcY }, camera);
      const hits = ray.intersectObjects(hitMeshes, false);
      if (hits.length) {
        rayBook = bookByHit(hits[0].object);
        if (rayBook) {
          const lp = rayBook.hit.worldToLocal(hits[0].point.clone());
          rayBook.hitEdge = clamp((lp.x / 0.9) * 0.5 + 0.5, 0, 1);
        }
      } else {
        rayBook = null;
      }
    }

    const clock = new THREE.Clock();

    function screenPos(b) {
      b.root.getWorldPosition(tmpV).project(camera);
      b.scr.x = (tmpV.x * 0.5 + 0.5) * dims.w;
      b.scr.y = (-tmpV.y * 0.5 + 0.5) * dims.h;
    }

    function tickBook(b, dt, t) {
      if (state.mode !== 'hero' && state.mode !== 'closing' && b !== state.selected) {
        b.root.visible = false;
      }

      const s = b.springs;
      const isHov = state.hovered === b;
      const inDetail = state.mode === 'detail' && state.selected === b;
      const orbitActive = state.selected === b && state.mode !== 'hero';

      let activity = 0;
      if (orbitActive) {
        if (orbit.drag && inDetail) {
          const step = orbit.dxAcc * 6.5;
          orbit.dxAcc = 0;
          b.orbY += step;
          b.orbYv = clamp(b.orbYv * 0.5 + (step / Math.max(dt, 0.001)) * 0.5, -14, 14);
          b.orbXs.t = clamp(b.orbXs.t + orbit.dyAcc * 3.2, -0.55, 0.55);
          orbit.dyAcc = 0;
          b.orbPhase = 'drag';
        } else {
          b.orbXs.t = 0;
          if (b.orbPhase === 'drag') {
            if (Math.abs(b.orbYv) > 0.6) b.orbPhase = 'spin';
            else {
              b.orbPhase = 'return';
              b.orbTarget = Math.round((b.orbY + b.orbYv * 1.2) / Math.PI) * Math.PI;
            }
          }
          if (b.orbPhase === 'spin') {
            b.orbYv *= Math.exp(-0.9 * dt);
            b.orbY += b.orbYv * dt;
            if (Math.abs(b.orbYv) < 0.5) {
              b.orbPhase = 'return';
              b.orbTarget = Math.round((b.orbY + b.orbYv * 1.2) / Math.PI) * Math.PI;
            }
          } else if (b.orbPhase === 'return') {
            const acc = 16 * (b.orbTarget - b.orbY) - 8 * b.orbYv;
            b.orbYv += acc * dt;
            b.orbY += b.orbYv * dt;
            if (Math.abs(b.orbTarget - b.orbY) < 0.002 && Math.abs(b.orbYv) < 0.01) {
              b.orbY = b.orbTarget;
              b.orbYv = 0;
              b.orbPhase = 'idle';
            }
          }
        }
        const distRest = Math.abs(b.orbY - Math.round(b.orbY / 6.2832) * 6.2832);
        activity = clamp(Math.abs(b.orbYv) * 1.5 + (orbit.drag ? 1 : 0) + distRest * 2, 0, 1);
      }
      b.orbXs.update(dt);

      let coverBase = 0;
      if (inDetail) coverBase = 1.18 + Math.sin(t * 0.8 + b.phase) * 0.05 * (RM ? 0 : 1);
      const fan = orbitActive ? clamp(b.orbYv * 0.16, 0, 0.75) : 0;
      const fanB = orbitActive ? clamp(-b.orbYv * 0.16, 0, 0.75) : 0;
      let coverBBase = 0;
      if (inDetail) coverBBase = 0.2 + Math.sin(t * 0.8 + b.phase + 1.7) * 0.02 * (RM ? 0 : 1);

      if (isHov && ptr.seen && state.mode === 'hero') {
        const dxN = (ptr.cx - b.scr.x) / (dims.w * 0.25);
        const dyN = (b.scr.y - ptr.cy) / (dims.h * 0.3);
        s.tiltY.t = clamp(dxN * 0.28, -0.15, 0.15);
        s.tiltX.t = clamp(-dyN * 0.1, -0.09, 0.1);
        s.lift.t = 0.3;
        const edge = b.hitEdge != null ? b.hitEdge : 0.5;
        coverBase = 0.085 + edge * 0.16 + clamp(dyN, 0, 1) * 0.09;
      } else {
        s.tiltY.t = 0;
        s.tiltX.t = 0;
        s.lift.t = 0;
      }
      s.cover.t = coverBase + fan;
      s.coverB.t = coverBBase + fanB;
      s.sc.t = b.slotScale * (isHov && state.mode === 'hero' ? 1.09 : 1);

      s.px.update(dt);
      s.py.update(dt);
      s.pz.update(dt);
      s.rx.update(dt);
      s.ry.update(dt);
      s.rz.update(dt);
      s.sc.update(dt);
      s.tiltX.update(dt);
      s.tiltY.update(dt);
      s.lift.update(dt);
      s.cover.update(dt);
      s.coverB.update(dt);
      s.drag.update(dt);

      b.float.position.y = Math.sin(t * 0.7 + b.phase) * 0.035 * (RM ? 0 : 1);
      b.float.rotation.z = Math.sin(t * 0.9 + b.phase * 1.7) * 0.006 * (RM ? 0 : 1);

      b.root.position.set(s.px.v, s.py.v, s.pz.v + s.lift.v);
      const sway = inDetail ? Math.sin(t * 0.45 + b.phase) * 0.035 * (RM ? 0 : 1) * (1 - activity) : 0;
      const swing = clamp(-s.px.vel * 0.12, -0.5, 0.5);
      b.root.rotation.set(s.rx.v + s.tiltX.v + b.orbXs.v, s.ry.v + s.tiltY.v + b.orbY + sway + swing, s.rz.v);
      b.root.scale.setScalar(Math.max(s.sc.v, 0.001));

      const ang = Math.max(0, s.cover.v + s.drag.v);
      const angB = Math.max(0, s.coverB.v);
      b.pivot.rotation.y = -ang;
      b.pivot.position.z = PIVOT_Z + ang * 0.022;
      b.backPivot.rotation.y = angB;
      b.backPivot.position.z = BPIVOT_Z - angB * 0.022;
      b.spine.rotation.y = -ang * 0.16 + angB * 0.16;
      b.block.scale.z = 1 - (ang + angB) * 0.05;
      b.block.position.z = BLOCK_Z - ang * 0.006 + angB * 0.006;
    }

    function tick() {
      if (cancelled) return;
      const dt = Math.min(clock.getDelta(), 0.08);
      const t = clock.getElapsedTime();

      if (ptr.seen && !ptr.down && state.mode === 'hero') castRay();

      let hovered = null;
      if (state.mode === 'hero') {
        if (state.kbIndex >= 0 && state.kbIndex < currentWindow.length) {
          hovered = bookInstances[currentWindow[state.kbIndex]];
        } else if (rayBook && currentWindow.includes(rayBook.index)) {
          hovered = rayBook;
        }
      }
      state.hovered = hovered;

      bookInstances.forEach((b) => {
        screenPos(b);
        tickBook(b, dt, t);
      });

      camX.update(dt);
      camY.update(dt);
      camZ.update(dt);
      lookX.update(dt);
      lookY.update(dt);
      camera.position.set(camX.v, camY.v, camZ.v);
      camera.lookAt(lookX.v, lookY.v, 0);

      curCursor.x += (ptr.cx - curCursor.x) * 0.35;
      curCursor.y += (ptr.cy - curCursor.y) * 0.35;
      if (openBtnRef.current) {
        openBtnRef.current.style.transform =
          'translate3d(' + curCursor.x.toFixed(2) + 'px, ' + curCursor.y.toFixed(2) + 'px, 0) translate(-50%, -50%)';
      }

      const targetPill = state.pillLock || (state.mode === 'hero' ? state.hovered : null);
      if (targetPill && state.mode === 'hero') {
        showPill();
      } else {
        hidePill();
      }

      renderer.render(scene, camera);
      if (isVisible) {
        animId = requestAnimationFrame(tick);
      }
    }

    let isVisible = true;
    let animId = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible && !cancelled) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(root);

    computeSlots();
    applyMode();
    rebuildHitMeshes();
    animId = requestAnimationFrame(tick);

    const onResize = () => {
      dims.w = root.offsetWidth || window.innerWidth;
      dims.h = root.offsetHeight || window.innerHeight;
      renderer.setSize(dims.w, dims.h, false);
      camera.aspect = dims.w / Math.max(1, dims.h);
      camera.updateProjectionMatrix();
      computeSlots();
      applyMode();
    };

    window.addEventListener('resize', onResize);
    const onOpenClick = () => {
      const b = state.pillLock || state.hovered;
      if (b) open(b);
    };
    openBtnRef.current?.addEventListener('click', onOpenClick);

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(animId);
      timeouts.forEach(clearTimeout);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('contextmenu', onContextMenu);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', cancelPointer);
      canvas.removeEventListener('lostpointercapture', cancelPointer);
      root.removeEventListener('keydown', onKeydown);
      openBtnRef.current?.removeEventListener('click', onOpenClick);
      renderer.dispose();
    };
  }, [books]);

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      className={`bs-root relative w-full h-[580px] sm:h-[650px] overflow-hidden select-none outline-none font-sans bg-white text-slate-900 ${className}`}
    >
      {/* Top Center Close Button */}
      {(uiMode === 'detail' || uiMode === 'opening') && (
        <button
          type="button"
          onClick={() => closeRef.current()}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-11 h-11 rounded-full bg-slate-900/10 text-slate-900 border border-slate-300 hover:bg-slate-900/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto shadow-sm"
          aria-label="Close detail panel"
        >
          <span className="text-lg font-light">✕</span>
        </button>
      )}

      {/* Massive Background Title Overlay */}
      <CourseHero heroTitle={heroTitle} uiMode={uiMode} />

      {/* WebGL 3D Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-20" />

      {/* Transparent Cursor Badge */}
      <button
        ref={openBtnRef}
        type="button"
        className="absolute top-0 left-0 z-40 w-16 h-16 rounded-full bg-slate-900/60 backdrop-blur-md text-white shadow-2xl flex flex-col items-center justify-center pointer-events-auto opacity-0 scale-[0.8] transition-opacity duration-200 border border-white/30 cursor-pointer"
        style={{ willChange: 'transform' }}
      >
        <span className="text-[10px] tracking-wider font-black leading-tight">OPEN</span>
        <span className="text-sm font-black leading-none">↗</span>
      </button>

      {/* Carousel Circle Controls */}
      {showCarousel && books.length > 3 && uiMode === 'hero' && (
        <>
          <button
            type="button"
            onClick={() => shiftCarouselRef.current(-1)}
            aria-label="Previous Book"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-slate-900 border border-slate-200 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            onClick={() => shiftCarouselRef.current(1)}
            aria-label="Next Book"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-slate-900 border border-slate-200 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Right Side Detail Panel Overlay */}
      {showDetailPanel && (
        <CourseDetailPanel
          dpRef={dpRef}
          uiMode={uiMode}
          selectedCfg={selectedCfg}
          onOpenModal={onOpenModal}
        />
      )}
    </div>
  );
}
