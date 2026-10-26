'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Posts { name, email } to /api/waitlist, which upserts into Supabase `signups`.
export default function Waitlist() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const company = new FormData(e.currentTarget).get('company');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    const first = name.trim();
    return (
      <div className="joined" role="status">
        <span className="serif">Hi{first ? ` ${first}` : ''}. <em>You&apos;re in.</em></span>
        <span>Your invite will land at {email.trim()}.</span>
      </div>
    );
  }

  return (
    <>
      <form className="join-form" onSubmit={onSubmit}>
        <label className="field name">
          <span className="sr-only">First name</span>
          <input type="text" name="name" required maxLength={80} autoComplete="given-name" placeholder="First name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field email">
          <span className="sr-only">Email</span>
          <input type="email" name="email" required maxLength={254} autoComplete="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="hp" aria-hidden="true">
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
        <button type="submit" className="join-submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Joining…' : 'Join the beta →'}
        </button>
      </form>
      {status === 'error' && (
        <p className="join-error" role="alert">Something went wrong. Please try again.</p>
      )}
    </>
  );
}
