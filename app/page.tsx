import type { CSSProperties } from 'react';
import ScrollEffects from '@/components/ScrollEffects';
import Faq from '@/components/Faq';
import Waitlist from '@/components/Waitlist';
import { buildOrbit, features, shiftWords, shiftAccentFrom, stories, wave, type Feature } from '@/lib/content';

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

function Callout({ kind }: { kind: 'share' | 'notes' | 'first' }) {
  if (kind === 'share')
    return (
      <div className="callout">
        <div className="callout-row"><span className="pulse-dot" /><span className="callout-k">SHARE</span></div>
        <span className="callout-t">New people land on the outer ring the moment they scan.</span>
      </div>
    );
  if (kind === 'notes')
    return (
      <div className="callout">
        <span className="callout-k">NOTES</span>
        <span className="callout-t">Where you met, and what you talked about, pinned to each person.</span>
      </div>
    );
  return (
    <div className="callout">
      <span className="callout-k">FIRST MESSAGE</span>
      <span className="callout-t">Drifting? Goen drafts the note that pulls them back in.</span>
      <span className="callout-bubble">“Still thinking about that ceramics studio<span className="caret">|</span>”</span>
    </div>
  );
}

function Chip({ kind }: { kind: Feature['key'] }) {
  if (kind === 'scan')
    return (
      <div className="chip">
        <div className="chip-row">
          <span className="chip-avatar">T</span>
          <div className="chip-name"><b>Theo saved your details</b><small>Just now · Rooftop, Surry Hills</small></div>
        </div>
        <div className="tags"><span>Instagram</span><span>LinkedIn</span><span>Portfolio</span><span>Number</span></div>
      </div>
    );
  if (kind === 'voice')
    return (
      <div className="chip wide">
        <div className="chip-top"><span className="callout-k">VOICE NOTE · LEILA</span><small>0:12</small></div>
        <div className="chip-row" style={{ gap: 12 }}>
          <span className="play" />
          <div className="wave">
            {wave.map((b, i) => (
              <span key={i} style={{ height: `${b.h}%`, background: b.c, animationDelay: `${b.d}s` }} />
            ))}
          </div>
        </div>
        <span className="chip-quote">“Met at Sofia’s dinner. Opening a ceramics studio. Intro her to Maya.”</span>
      </div>
    );
  return (
    <div className="chip">
      <span className="callout-k">DRIFTING</span>
      <div className="chip-row" style={{ gap: 12 }}>
        <div className="dots">
          <span />
          <span />
          <span style={{ background: 'var(--ink)', opacity: 0.6 }} />
        </div>
        <span className="chip-drift">Priya, Sam and Jules. Three months since you spoke.</span>
      </div>
      <span className="chip-cta">Say hi →</span>
    </div>
  );
}

export default function Home() {
  const orbit = buildOrbit();

  return (
    <div className="page">
      <ScrollEffects />

      {/* HEADER */}
      <header className="nav-wrap">
        <div className="nav">
          <a href="#top" className="wordmark" aria-label="goen, back to top">goen</a>
          <nav className="nav-links" aria-label="Main">
            <a href="#product" className="plain">Product</a>
            <a href="#faq" className="plain">FAQ</a>
            <a href="#join" className="btn">Join the beta</a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="top" className="hero">
          <div className="hero-frame">
            <div className="hero-media">
              <div className="hero-zoom" data-zoom="0.18">
                <img
                  src="/img/hero-grey.webp"
                  srcSet="/img/hero-grey-sm.webp 900w, /img/hero-grey.webp 1536w"
                  sizes="100vw"
                  alt="Friends gathered and talking in a bright studio"
                  fetchPriority="high"
                  width={1536}
                  height={1024}
                />
              </div>
            </div>
            <div className="hero-shade" />
            <div className="hero-content">
              <div className="hero-copy">
                <h1 className="display">
                  <span className="mask">
                    <span data-reveal="rise" style={delay(120)}>Get more out of your <em>relationships.</em></span>
                  </span>
                </h1>
                <p className="hero-sub" data-reveal="up" style={delay(300)}>One scan to swap everything. One place to remember everyone.</p>
                <div className="hero-actions" data-reveal="up" style={delay(420)}>
                  <a href="#join" className="btn">Join the beta</a>
                  <a href="#product" className="text-link">See it in action</a>
                </div>
              </div>
              <span className="hero-tag" data-reveal="up" style={delay(540)}>BETA FOREVER</span>
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section id="overview">
          <div className="overview-inner">
            <div className="proof" data-reveal="up">
              <div className="dots" aria-hidden="true">
                <span /><span /><span /><span style={{ background: 'var(--ink)' }} />
              </div>
              <span className="proof-text"><strong>1,000+ people</strong> already on the waitlist</span>
            </div>

            <h2 className="display statement" data-reveal="up" style={delay(80)}>
              Goen is your personal network management tool, helping you <em className="accent">get more out of your connections.</em>
            </h2>

            <div className="network" data-reveal="up" style={delay(160)}>
              <div className="network-head">
                <div className="network-title">
                  <span className="kicker">YOUR NETWORK</span>
                  <span className="serif">Everyone you know, <em className="accent">arranged around you.</em></span>
                </div>
                <div className="legend">
                  <span><i />Close</span>
                  <span><i />In touch</span>
                  <span><i className="drift" />Drifting</span>
                </div>
              </div>

              <div className="orbit">
                <div className="orbit-glow" aria-hidden="true" />
                {orbit.map((r, ri) => (
                  <div key={ri} aria-hidden="true">
                    <div
                      className="orbit-ring"
                      style={{ inset: `${r.inset}%`, border: `1px ${r.bs} rgba(var(--ink-rgb),${r.bo})` }}
                    />
                    <div className="orbit-spin" style={{ animation: r.anim }}>
                      {r.dots.map((d, di) => (
                        <span
                          key={di}
                          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, marginLeft: -d.s / 2, marginTop: -d.s / 2, background: d.c, opacity: d.o }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                <div className="orbit-you">You</div>
                <div className="callout-pos share"><div><Callout kind="share" /></div></div>
                <div className="callout-pos notes"><div><Callout kind="notes" /></div></div>
                <div className="callout-pos first"><div><Callout kind="first" /></div></div>
              </div>

              <div className="callouts-stack">
                <Callout kind="share" />
                <Callout kind="notes" />
                <Callout kind="first" />
              </div>
            </div>
          </div>
        </section>

        {/* THE SHIFT */}
        <section className="shift" data-pin="">
          <div className="shift-pin">
            <span className="kicker" data-reveal="up">THE SHIFT</span>
            <p className="shift-text" data-scrub="pin">
              {shiftWords.map((w, i) =>
                i >= shiftAccentFrom ? <em key={i}><span data-w="">{w}</span></em> : <span key={i} data-w="">{w}</span>,
              )}
            </p>
            <p className="shift-sub" data-reveal="up" style={delay(100)}>
              Goen replaces the handle-swapping, the forgotten names and the “great to meet you” that goes nowhere.
            </p>
          </div>
        </section>

        {/* PRODUCT */}
        <section id="product">
          <div className="h-sec" data-h-sec="">
            <div className="h-pin">
              <div className="h-head">
                <h2 className="display">One hello in. A <em className="accent">relationship</em> out.</h2>
                <span className="kicker">THE PRODUCT</span>
              </div>
              <div className="h-viewport">
                <div className="h-track" data-h-track="">
                  {features.map((f) => (
                    <article key={f.key} className="h-card" data-h-card="">
                      <div className="h-img" data-h-img="">
                        <img src={f.img} alt={f.alt} loading="lazy" style={{ objectPosition: f.pos }} width={1880} height={836} />
                      </div>
                      <div className="h-shade" />
                      <span className="h-num" aria-hidden="true">{f.num}</span>
                      <div className="h-chip-pos" aria-hidden="true"><Chip kind={f.key} /></div>
                      <div className="h-copy">
                        <span className="kicker">{f.kicker}</span>
                        <h3 className="display">{f.title} <em>{f.em}</em></h3>
                        <p>{f.line}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="h-rail" aria-hidden="true">
                {features.map((f) => (
                  <div key={f.key}>
                    <div className="h-bar"><div className="h-fill" data-h-fill="" /></div>
                    <span className="h-label" data-h-label="">{f.num} {f.short}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="stories" className="stories">
          <div className="stories-head">
            <span className="kicker" data-reveal="up">FROM THE BETA</span>
            <h2 className="display big-h" data-reveal="up" style={delay(80)}>People, <em className="accent">kept.</em></h2>
          </div>
          <div className="stories-body">
            {[stories.slice(0, 2), stories.slice(2)].map((row, ri) => (
              <div key={ri} className={`stories-row ${ri === 0 ? 'top' : 'bottom'}`} data-reveal="up" style={delay(ri === 0 ? 120 : 200)}>
                {row.map((s) => (
                  <figure key={s.name} className="story">
                    <blockquote>“{s.quote}”</blockquote>
                    <figcaption>
                      <img src={s.img} alt="" width={52} height={52} loading="lazy" />
                      <div className="story-who"><b>{s.name}</b><span>{s.role}</span></div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="faq">
          <div className="faq-inner">
            <div className="faq-head">
              <span className="kicker" data-reveal="up">FAQ</span>
              <h2 className="display big-h" data-reveal="up" style={delay(80)}>Good <em className="accent">questions.</em></h2>
            </div>
            <Faq />
          </div>
        </section>

        {/* WAITLIST */}
        <section id="join" className="join">
          <div className="band" data-reveal="scale">
            <div className="band-media" data-parallax="0.08">
              <img src="/img/waitlist.webp" alt="Four friends playing padel, seen from above" loading="lazy" width={1700} height={919} />
            </div>
            <div className="band-shade" />
            <div className="band-content">
              <span className="kicker">JOIN THE BETA</span>
              <h2 className="display big-h">Your next favourite person is <em>one scan away.</em></h2>
              <Waitlist />
              <span className="band-note">Invites go out weekly. Core features stay free, forever.</span>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="serif">goen</span>
              <span>Get more out of your relationships.</span>
            </div>
            <div className="footer-col">
              <span className="kicker">PRODUCT</span>
              <a href="#product">Features</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-col">
              <span className="kicker">COMPANY</span>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="mailto:hello@goen.app">Say hi</a>
            </div>
            <div className="footer-col">
              <span className="kicker">SOCIAL</span>
              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Goen · Beta Forever</span>
            <nav aria-label="Legal"><a href="#">Privacy</a><a href="#">Terms</a></nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
