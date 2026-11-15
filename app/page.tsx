import type { CSSProperties } from 'react';
import ScrollEffects from '@/components/ScrollEffects';
import Faq from '@/components/Faq';
import Waitlist from '@/components/Waitlist';
import { buildOrbit, features, shiftWords, shiftHighlightFrom, stories, wave, type Feature } from '@/lib/content';

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

function Callout({ kind }: { kind: 'capture' | 'organise' | 'ask' }) {
  if (kind === 'capture')
    return (
      <div className="callout">
        <div className="callout-row"><span className="pulse-dot" /><span className="callout-k">CAPTURE</span></div>
        <span className="callout-t">Voice-note or text Goen after you meet someone. They land on your map, context and all.</span>
      </div>
    );
  if (kind === 'organise')
    return (
      <div className="callout">
        <span className="callout-k">ORGANISE</span>
        <span className="callout-t">Where you met and what you talked about, sorted and pinned to each person automatically.</span>
      </div>
    );
  return (
    <div className="callout">
      <span className="callout-k">ASK</span>
      <span className="callout-t">Call on it in the same chat, whenever you need it.</span>
      <span className="callout-bubble">“Who was the ceramicist from Sofia’s dinner?<span className="caret">|</span>”</span>
    </div>
  );
}

function Chip({ kind }: { kind: Feature['key'] }) {
  if (kind === 'voice')
    return (
      <div className="chip wide">
        <div className="chip-top"><span className="callout-k">WHATSAPP · GOEN</span><small>9:41 pm</small></div>
        <div className="chat">
          <div className="bubble out voice">
            <span className="play" />
            <div className="wave">
              {wave.map((b, i) => (
                <span key={i} style={{ height: `${b.h}%`, background: b.c, animationDelay: `${b.d}s` }} />
              ))}
            </div>
            <small>0:12</small>
          </div>
          <div className="bubble in">Saved <b>Leila</b>. Met at Sofia’s dinner, opening a ceramics studio. I’ll remind you to intro her to Maya.</div>
        </div>
      </div>
    );
  if (kind === 'ask')
    return (
      <div className="chip wide">
        <div className="chip-top"><span className="callout-k">IMESSAGE · GOEN</span><small>Now</small></div>
        <div className="chat">
          <div className="bubble out">Who was the ceramicist from Sofia’s dinner?</div>
          <div className="bubble in"><b>Leila H.</b> You met in March. She’s opening a studio and wanted an intro to Maya. Want me to draft a hello?</div>
        </div>
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
          <a href="#top" className="wordmark" aria-label="goen, back to top"><img src="/img/goen-mark.svg" alt="" className="logo-mark" width={219} height={207} />goen</a>
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
                  src="/img/hero-paris-cafe.webp"
                  srcSet="/img/hero-paris-cafe-sm.webp 900w, /img/hero-paris-cafe.webp 1536w"
                  sizes="100vw"
                  alt="Friends talking around a marble table in a Paris café at dusk"
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
                    <span data-reveal="rise" style={delay(120)}>Helping you turn connections into <em>real relationships.</em></span>
                  </span>
                </h1>
                <p className="hero-sub" data-reveal="up" style={delay(300)}>No more empty conversations. Text or voice note Goen on WhatsApp or iMessage to store network context and draw insights. We handle the details so you can focus on the people.</p>
                <div className="hero-actions" data-reveal="up" style={delay(420)}>
                  <a href="#join" className="btn">Join the beta</a>
                  <a href="#product" className="text-link">See it in action</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <div className="proof-row">
          <div className="proof" data-reveal="up">
            <div className="dots" aria-hidden="true">
              <span /><span /><span /><span style={{ background: 'var(--ink)' }} />
            </div>
            <span className="proof-text"><strong>1,000+ people</strong> already on the waitlist</span>
          </div>
        </div>

        {/* THE SHIFT */}
        <section className="shift" data-pin="">
          <div className="shift-pin">
            <p className="shift-text" data-scrub="pin">
              <span className="shift-lead">
                {shiftWords.slice(0, shiftHighlightFrom).map((w, i) => <span key={i} data-w="">{w}</span>)}
              </span>
              <mark className="shift-pill">
                {shiftWords.slice(shiftHighlightFrom).map((w, i) => <span key={i} data-w="">{w}</span>)}
              </mark>
            </p>
            <p className="shift-sub" data-reveal="up" style={delay(100)}>
              Easily attach context to any contact after an interaction for future queries and automated network management.
            </p>
          </div>
        </section>

        {/* OVERVIEW */}
        <section id="overview">
          <div className="overview-inner">

            <div className="network" data-reveal="up" style={delay(80)}>
              <div className="network-head">
                <h2 className="network-title serif">
                  Goen is your personal network intelligence tool, helping you <em className="accent">get more out of your connections.</em>
                </h2>
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
                <div className="callout-pos capture"><div><Callout kind="capture" /></div></div>
                <div className="callout-pos organise"><div><Callout kind="organise" /></div></div>
                <div className="callout-pos ask"><div><Callout kind="ask" /></div></div>
              </div>

              <div className="callouts-stack">
                <Callout kind="capture" />
                <Callout kind="organise" />
                <Callout kind="ask" />
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT */}
        <section id="product">
          <div className="h-sec" data-h-sec="">
            <div className="h-pin">
              <div className="h-head">
                <h2 className="display">How it works</h2>
              </div>
              <div className="h-viewport">
                <div className="h-track" data-h-track="">
                  {features.map((f) => (
                    <article key={f.key} className={`h-card h-card-${f.key}`} data-h-card="">
                      <div className="h-img" data-h-img="">
                        <img src={f.img} alt={f.alt} loading="lazy" style={{ objectPosition: f.pos }} width={1880} height={836} />
                      </div>
                      <div className="h-shade" />
                      <span className="h-num" aria-hidden="true">{f.num}</span>
                      <div className="h-chip-pos" aria-hidden="true"><Chip kind={f.key} /></div>
                      <div className="h-copy">
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

        {/* HARDWARE */}
        <section id="hardware" className="hw">
          <div className="hw-card" data-reveal="up" style={delay(80)}>
            <div className="hw-copy">
              <h2 className="display">A new way to talk to Goen. <em className="accent">Coming soon.</em></h2>
              <p>We’re building a small device that lets you capture context the moment a conversation ends, without reaching for your phone. Everything still lands in the same network, ready to call on in your chats.</p>
              <a href="#join" className="btn">Get early access</a>
            </div>
            <div className="hw-visual" aria-hidden="true">
              <div className="hw-glow" />
              <span className="hw-ring" style={{ inset: '0%' }} />
              <span className="hw-ring" style={{ inset: '14%' }} />
              <span className="hw-ring" style={{ inset: '28%' }} />
              <span className="hw-ping" />
              <span className="hw-ping" style={{ animationDelay: '1.6s' }} />
              <div className="hw-device"><span className="hw-light" /></div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="stories" className="stories">
          <div className="stories-head">
            <h2 className="display big-h" data-reveal="up" style={delay(80)}>Testimonials</h2>
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
              <h2 className="display big-h" data-reveal="up" style={delay(80)}>FAQs</h2>
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
              <h2 className="display big-h">Because life is better <em>experienced together</em></h2>
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
              <span className="serif"><img src="/img/goen-mark.svg" alt="" className="logo-mark" width={219} height={207} />goen</span>
              <span>Helping you turn connections into real relationships.</span>
            </div>
            <div className="footer-col">
              <span className="kicker">PRODUCT</span>
              <a href="#product">Features</a>
              <a href="#hardware">Hardware</a>
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
            <span>© 2026 Goen</span>
            <nav aria-label="Legal"><a href="#">Privacy</a><a href="#">Terms</a></nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
