'use client';

import { useEffect } from 'react';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * One rAF-throttled scroll handler for every scroll-linked effect on the page:
 * header pill, reveals, hero zoom, CTA parallax, "The shift" word fill, and the
 * horizontal product rail. Ported from the prototype's goen-motion.js + frame().
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const q = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T & HTMLElement>(s));

    // Reveals: elements fade/slide in once when 12% visible.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        (targets.get(el) || []).forEach((t) => t.classList.add('is-in'));
        io.unobserve(el);
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    const targets = new Map<Element, HTMLElement[]>();
    q('[data-reveal]').forEach((el) => {
      if (reduce) { el.classList.add('is-in'); return; }
      const target = el.getAttribute('data-reveal') === 'rise' ? el.parentElement! : el;
      if (!targets.has(target)) targets.set(target, []);
      targets.get(target)!.push(el);
      io.observe(target);
    });

    const navWrap = document.querySelector<HTMLElement>('.nav-wrap');
    const zooms = q('[data-zoom]');
    const pars = q('[data-parallax]');
    const scrubs = q('[data-scrub]');
    const hsecs = q('[data-h-sec]');
    let pill: boolean | null = null;
    let raf = 0;

    function frame() {
      raf = 0;
      const vh = innerHeight, vw = innerWidth;

      const p = scrollY > 40;
      if (navWrap && p !== pill) { pill = p; navWrap.classList.toggle('is-pill', p); }

      scrubs.forEach((s) => {
        const pin = s.closest<HTMLElement>('[data-pin]');
        if (!pin) return;
        const pr = pin.getBoundingClientRect();
        const prog = reduce ? 1 : clamp((clamp(-pr.top / Math.max(1, pr.height - vh)) - 0.08) / 0.8);
        const ws = s.querySelectorAll<HTMLElement>('[data-w]');
        const n = ws.length;
        ws.forEach((w, i) => { w.style.opacity = String(0.14 + 0.86 * clamp(prog * (n + 2) - i)); });
      });

      if (!reduce) {
        zooms.forEach((el) => {
          const r = el.parentElement!.getBoundingClientRect();
          const pz = clamp(-r.top / Math.max(1, r.height));
          const max = parseFloat(el.dataset.zoom || '0.18');
          el.style.transform = `scale(${(1.02 + pz * max).toFixed(4)}) translate3d(0,${(pz * 60).toFixed(1)}px,0)`;
        });
        pars.forEach((el) => {
          const r = el.parentElement!.getBoundingClientRect();
          const off = r.top + r.height / 2 - vh / 2;
          el.style.transform = `translate3d(0,${(-off * parseFloat(el.dataset.parallax || '0.08')).toFixed(1)}px,0)`;
        });
      }

      hsecs.forEach((sec) => {
        const track = sec.querySelector<HTMLElement>('[data-h-track]');
        if (!track) return;
        const r = sec.getBoundingClientRect();
        const ph = clamp(-r.top / Math.max(1, r.height - vh));
        const max = Math.max(0, track.scrollWidth - track.parentElement!.clientWidth);
        track.style.transform = `translate3d(${(-ph * max).toFixed(1)}px,0,0)`;
        sec.querySelectorAll<HTMLElement>('[data-h-card]').forEach((c) => {
          const cr = c.getBoundingClientRect();
          const d = (cr.left + cr.width / 2 - vw / 2) / vw;
          c.style.transform = reduce ? 'none' : `scale(${(1 - 0.07 * Math.min(1, Math.abs(d))).toFixed(4)})`;
          const im = c.querySelector<HTMLElement>('[data-h-img]');
          if (im) im.style.transform = reduce ? 'none' : `translate3d(${(-d * 90).toFixed(1)}px,0,0)`;
        });
        const fills = sec.querySelectorAll<HTMLElement>('[data-h-fill]');
        const n = fills.length || 1;
        const act = Math.min(n - 1, Math.floor(ph * n));
        fills.forEach((el, i) => { el.style.transform = `scaleX(${clamp(ph * n - i).toFixed(3)})`; });
        sec.querySelectorAll<HTMLElement>('[data-h-label]').forEach((l, i) => l.classList.toggle('is-active', i === act));
      });
    }

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    frame();
    const t = setTimeout(onScroll, 300);

    return () => {
      io.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  return null;
}
