(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang = () => root.lang === 'en' ? 'en' : 'fr';
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* préférence non essentielle */ } },
  };

  const I18N = {
    fr: {
      ready: 'Prêt à transmettre', tx: 'Transmission en cours', fail: 'CRC invalide : erreur détectée',
      retx: 'Retransmission demandée', ok: 'Message reçu intact', preamble: 'Préambule', len: 'Longueur', data: 'Données', crc: 'CRC-16',
      copied: 'Courriel copié', copyFail: 'Copie impossible : sélectionnez l’adresse ci-dessus', ph: 'Tapez un mot', empty: 'Tapez au moins un caractère',
      title: 'Landry Tchouela | Génie informatique, logiciel et IA',
      desc: 'Portfolio de Landry Tchouela, étudiant en génie informatique à l’Université de Sherbrooke : logiciel, IA et systèmes intelligents, du capteur au produit.',
    },
    en: {
      ready: 'Ready to transmit', tx: 'Transmitting', fail: 'Invalid CRC: error detected',
      retx: 'Retransmission requested', ok: 'Message received intact', preamble: 'Preamble', len: 'Length', data: 'Data', crc: 'CRC-16',
      copied: 'Email copied', copyFail: 'Copy failed: select the address above', ph: 'Type a word', empty: 'Type at least one character',
      title: 'Landry Tchouela | Computer engineering, software and AI',
      desc: 'Portfolio of Landry Tchouela, computer engineering student at Université de Sherbrooke: software, AI and intelligent systems, from sensor to product.',
    },
  };
  const tr = k => I18N[lang()][k];

  /* Toast */
  const toast = msg => {
    const box = $('#toasts');
    const el = document.createElement('div');
    el.className = 'toast'; el.textContent = msg; box.append(el);
    setTimeout(() => el.remove(), 4000);
  };

  /* Langue */
  const applyLang = l => {
    root.lang = l;
    document.title = I18N[l].title;
    $('meta[name="description"]')?.setAttribute('content', I18N[l].desc);
    $('#msg').placeholder = I18N[l].ph;
    $('#lang').textContent = l === 'fr' ? 'EN' : 'FR';
    $('#lang').setAttribute('aria-label', l === 'fr' ? 'Switch to English' : 'Passer en français');
    store.set('lang', l);
    Scope.relabel();
  };

  /* Apparence */
  const theme = (() => { try { return JSON.parse(store.get('ui_theme', '{}')); } catch { return {}; } })();
  theme.mode ||= 'system'; theme.preset ||= 'ocean';
  const applyTheme = () => {
    if (theme.mode === 'system') root.removeAttribute('data-theme'); else root.dataset.theme = theme.mode;
    root.dataset.preset = theme.preset;
    store.set('ui_theme', JSON.stringify(theme));
    $$('[data-mode]').forEach(b => b.setAttribute('aria-pressed', b.dataset.mode === theme.mode));
    $$('[data-preset-btn]').forEach(b => b.setAttribute('aria-pressed', b.dataset.presetBtn === theme.preset));
    Scope.repaint();
  };

  /* Démo : vraie trame, vrai Manchester, vrai CRC, calculés ici même */
  const Scope = (() => {
    const canvas = $('#trace'), ctx = canvas.getContext('2d');
    const enc = new TextEncoder(), dec = new TextDecoder();
    const PRE = [0x55, 0x55];
    let frame, tx, rx, flip = -1, head = 0, tries = 0, status = 'ready', raf = 0, busy = false, seq = 0;
    let colors = {}, W = 0, H = 0, noiseSeed = [];

    const crc16 = bytes => {
      let c = 0xFFFF;
      for (const b of bytes) {
        c ^= b << 8;
        for (let i = 0; i < 8; i++) c = (c & 0x8000 ? (c << 1) ^ 0x1021 : c << 1) & 0xFFFF;
      }
      return c;
    };
    const hex = n => '0x' + n.toString(16).toUpperCase().padStart(4, '0');
    const toBits = bytes => bytes.flatMap(b => Array.from({ length: 8 }, (_, i) => (b >> (7 - i)) & 1));
    const toBytes = bits => { const o = []; for (let i = 0; i + 8 <= bits.length; i += 8) o.push(bits.slice(i, i + 8).reduce((a, b) => a * 2 + b, 0)); return o; };

    const build = text => {
      let data = [];
      for (const ch of text) {
        const b = [...enc.encode(ch)];
        if (data.length + b.length > 12) break;
        data = data.concat(b);
      }
      const body = [data.length, ...data];
      const crc = crc16(body);
      const bytes = [...PRE, ...body, crc >> 8, crc & 255];
      return { bytes, data, crc, nBits: bytes.length * 8, dataStart: 24, dataEnd: 24 + data.length * 8 };
    };

    const palette = () => {
      const s = getComputedStyle(root);
      colors = { trace: s.getPropertyValue('--scope-trace').trim() || '#5cc8ff', dim: s.getPropertyValue('--scope-dim').trim() };
    };
    const fit = () => {
      const r = canvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * d); canvas.height = Math.round(H * d);
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };

    const draw = () => {
      if (!frame || !W) return;
      ctx.clearRect(0, 0, W, H);
      const n = frame.nBits;
      const bitW = Math.max(W / n, 15);
      const total = bitW * n;
      const off = total > W ? Math.min(Math.max(head * bitW - W * .62, 0), total - W) : 0;
      const X = b => b * bitW - off;
      const top = 30, hi = top + (H - top - 34) * .1, lo = H - 40;
      const fs = 11;
      ctx.font = `700 ${fs}px Inter, system-ui, sans-serif`;

      // Champs de la trame
      const fields = [[0, 16, 'preamble'], [16, 24, 'len'], [24, frame.dataEnd, 'data'], [frame.dataEnd, n, 'crc']];
      fields.forEach(([a, b, k], i) => {
        const x = X(a), w = (b - a) * bitW;
        if (x > W || x + w < 0) return;
        if (i % 2 === 1 || k === 'data') { ctx.fillStyle = k === 'data' ? 'rgba(92,200,255,.07)' : 'rgba(255,255,255,.025)'; ctx.fillRect(x, 0, w, H); }
        ctx.strokeStyle = 'rgba(160,200,240,.22)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(Math.round(x) + .5, 0); ctx.lineTo(Math.round(x) + .5, H); ctx.stroke();
        const label = tr(k), lw = ctx.measureText(label).width;
        if (lw < w - 12) {
          ctx.fillStyle = colors.dim; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
          ctx.fillText(label, Math.max(x, 0) + 8, 16);
        }
      });

      // Bits
      if (bitW >= 12) {
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.font = `600 ${Math.min(11, bitW * .62)}px Inter, system-ui, sans-serif`;
        for (let i = 0; i < n; i++) {
          const x = X(i + .5); if (x < -10 || x > W + 10) continue;
          const shown = i < head ? rx[i] : tx[i];
          ctx.fillStyle = i === flip && i < head ? '#ff7d9b' : i < head ? 'rgba(232,241,251,.86)' : 'rgba(139,163,189,.5)';
          ctx.fillText(shown, x, H - 18);
        }
      }

      // Trace : deux niveaux par bit (IEEE 802.3 : 1 = montant, 0 = descendant)
      const path = (from, to, bits) => {
        ctx.beginPath();
        let first = true;
        for (let i = from; i < to; i++) {
          const b = bits[i], x0 = X(i), xm = X(i + .5), x1 = X(i + 1);
          if (x1 < -2 || x0 > W + 2) { first = true; continue; }
          const a = b ? lo : hi, c = b ? hi : lo;
          if (first) { ctx.moveTo(x0, a); first = false; } else ctx.lineTo(x0, a);
          ctx.lineTo(xm, a); ctx.lineTo(xm, c); ctx.lineTo(x1, c);
        }
      };
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(139,163,189,.32)'; ctx.lineWidth = 1.5;
      const hb = Math.floor(head);
      path(hb, n, tx); ctx.stroke();
      ctx.save();
      ctx.strokeStyle = colors.trace; ctx.lineWidth = 2.25;
      ctx.shadowColor = colors.trace; ctx.shadowBlur = 12;
      path(0, Math.min(hb, n), rx); ctx.stroke();
      ctx.restore();

      // Bit perturbé
      if (flip >= 0 && hb > flip) {
        const x = X(flip);
        ctx.fillStyle = 'rgba(255,43,94,.2)'; ctx.fillRect(x, top - 6, bitW, H - top - 22);
        ctx.save();
        ctx.strokeStyle = '#ff5c83'; ctx.lineWidth = 1.5; ctx.beginPath();
        noiseSeed.forEach((v, i) => { const px = x + (i / noiseSeed.length) * bitW, py = (hi + lo) / 2 + v * (lo - hi) * .5; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
        ctx.stroke(); ctx.restore();
      }

      // Tête de lecture
      if (busy && head < n) {
        const x = X(head);
        const g = ctx.createLinearGradient(x - 70, 0, x, 0);
        g.addColorStop(0, 'rgba(92,200,255,0)'); g.addColorStop(1, 'rgba(92,200,255,.16)');
        ctx.fillStyle = g; ctx.fillRect(x - 70, 0, 70, H);
        ctx.fillStyle = colors.trace; ctx.fillRect(x - 1, 0, 2, H);
      }
    };

    const setStatus = s => {
      status = s;
      const el = $('#state'); el.dataset.s = s === 'retx' ? 'retx' : s;
      $('#state-t').textContent = tr(s);
    };
    const readouts = ok => {
      $('#r-len').textContent = `${frame.bytes.length} ${lang() === 'fr' ? 'octets' : 'bytes'}`;
      $('#r-sent').textContent = hex(frame.crc);
      const body = toBytes(rx).slice(2, -2), got = toBytes(rx).slice(-2);
      const calc = crc16(body), recv = (got[0] << 8) | got[1];
      const r = $('#r-recv');
      r.textContent = head >= frame.nBits ? hex(calc) : '…';
      r.className = head >= frame.nBits ? (calc === recv ? 'good' : 'bad') : '';
      $('#r-try').textContent = tries || '0';
      void ok;
    };
    const showRx = () => {
      const upto = Math.min(Math.floor(head), frame.dataEnd);
      const n = Math.max(0, Math.floor((upto - 24) / 8));
      const bytes = toBytes(rx.slice(24, 24 + n * 8));
      const out = $('#rxtext');
      out.textContent = dec.decode(new Uint8Array(bytes)) || ' ';
      out.classList.toggle('bad', flip >= 0 && Math.floor(head) > flip);
    };

    const sweep = (run, done) => {
      const dur = Math.min(3400, Math.max(1700, frame.nBits * 24));
      if (reduce) { head = frame.nBits; draw(); showRx(); readouts(); return done(); }
      const t0 = performance.now();
      cancelAnimationFrame(raf);
      const step = now => {
        if (run !== seq) return;
        const p = Math.min(1, (now - t0) / dur);
        head = p * frame.nBits;
        draw(); showRx(); readouts();
        if (p < 1) raf = requestAnimationFrame(step); else done();
      };
      raf = requestAnimationFrame(step);
    };

    const wait = ms => new Promise(r => setTimeout(r, reduce ? Math.min(ms, 500) : ms));

    const attempt = (run, noisy) => new Promise(res => {
      tries++; rx = [...tx]; head = 0; flip = -1;
      if (noisy) {
        const span = frame.dataEnd - frame.dataStart;
        flip = frame.dataStart + Math.floor(Math.random() * span);
        rx[flip] ^= 1;
        noiseSeed = Array.from({ length: 16 }, () => Math.random() * 2 - 1);
      }
      sweep(run, () => {
        const bytes = toBytes(rx), body = bytes.slice(2, -2), tail = bytes.slice(-2);
        res(crc16(body) === ((tail[0] << 8) | tail[1]));
      });
    });

    const send = async (text, noisy = false) => {
      const run = ++seq;
      frame = build(text); tx = toBits(frame.bytes); rx = [...tx]; tries = 0;
      busy = true; $('#noise').disabled = true;
      setStatus('tx');
      let ok = await attempt(run, noisy);
      if (run !== seq) return;
      if (!ok) {
        setStatus('fail'); readouts();
        await wait(1100); if (run !== seq) return;
        setStatus('retx');
        await wait(700); if (run !== seq) return;
        ok = await attempt(run, false);
        if (run !== seq) return;
      }
      busy = false; head = frame.nBits; $('#noise').disabled = false;
      setStatus(ok ? 'ok' : 'fail'); draw(); showRx(); readouts();
      $('#announce').textContent = tr(status);
    };

    const init = text => {
      palette(); fit();
      frame = build(text); tx = toBits(frame.bytes); rx = [...tx]; head = frame.nBits;
      draw(); showRx(); readouts();
      $('#state-t').textContent = tr(status);
      new ResizeObserver(() => { fit(); draw(); }).observe(canvas);
      document.fonts?.ready.then(draw);
    };

    return {
      init, send,
      relabel() { if (frame) { draw(); readouts(); $('#state-t').textContent = tr(status); } },
      repaint() { if (frame) { palette(); draw(); } },
    };
  })();

  /* Interactions */
  const params = new URLSearchParams(location.search);
  const l0 = params.get('lang') || store.get('lang', (navigator.language || 'fr').startsWith('fr') ? 'fr' : 'en');
  const input = $('#msg');
  const value = () => input.value.trim();
  let timer = 0;

  Scope.init(value() || 'LANDRY');
  applyLang(l0 === 'en' ? 'en' : 'fr');
  applyTheme();
  if (!reduce) setTimeout(() => Scope.send(value() || 'LANDRY'), 500);

  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => { if (value()) Scope.send(value()); }, 380);
  });
  $('#scope-form').addEventListener('submit', e => {
    e.preventDefault();
    if (value()) Scope.send(value()); else toast(tr('empty'));
  });
  $('#noise').addEventListener('click', () => {
    if (value()) Scope.send(value(), true); else toast(tr('empty'));
  });

  $('#lang').addEventListener('click', () => applyLang(lang() === 'fr' ? 'en' : 'fr'));

  const panel = $('#panel'), themeBtn = $('#theme-btn');
  const togglePanel = open => { panel.hidden = !open; themeBtn.setAttribute('aria-expanded', open); };
  themeBtn.addEventListener('click', e => { e.stopPropagation(); togglePanel(panel.hidden); });
  document.addEventListener('click', e => { if (!panel.hidden && !panel.contains(e.target)) togglePanel(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') togglePanel(false); });
  $$('[data-mode]').forEach(b => b.addEventListener('click', () => { theme.mode = b.dataset.mode; applyTheme(); }));
  $$('[data-preset-btn]').forEach(b => b.addEventListener('click', () => { theme.preset = b.dataset.presetBtn; applyTheme(); }));
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => Scope.repaint());

  $('#copy').addEventListener('click', async () => {
    const addr = $('#addr').textContent.trim();
    try { await navigator.clipboard.writeText(addr); toast(tr('copied')); }
    catch {
      const r = document.createRange(); r.selectNodeContents($('#addr'));
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      toast(tr('copyFail'));
    }
  });

  const links = $$('[data-spy]');
  const spy = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => {
        const on = a.dataset.spy === e.target.id;
        a.classList.toggle('on', on);
        on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));
})();
