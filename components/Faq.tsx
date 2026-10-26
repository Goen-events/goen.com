'use client';

import { useState } from 'react';
import { faqs } from '@/lib/content';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list" data-reveal="up" style={{ ['--d' as string]: '160ms' }}>
      {faqs.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              id={`faq-q-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{q}</span>
              <span className="faq-icon" aria-hidden="true">+</span>
            </button>
            <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} inert={!isOpen}>
              <div><p>{a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
