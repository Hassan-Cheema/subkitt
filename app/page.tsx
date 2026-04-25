'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    const { error } = await supabase
      .from('waitlist')
      .insert({
        email: email.toLowerCase().trim(),
        referrer: typeof document !== 'undefined' ? document.referrer : null,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      });

    if (error) {
      if (error.code === '23505') {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(error.message);
      }
    } else {
      setStatus('success');
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-2xl mx-auto px-6 py-24 md:py-36">

        {/* Hero */}
        <section className="mb-24">
          <div className="inline-flex items-center gap-2 border border-neutral-800 rounded-full px-3 py-1 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-neutral-400 tracking-wide">Waitlist open · 50% off for first 50</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.03]">
            You ship.<br />
            Your work turns<br />
            into inbound.
          </h1>
          <p className="mt-8 text-xl text-neutral-400 leading-relaxed max-w-lg">
            SubKitt drafts your week&apos;s posts from what you shipped — so you stay in the code while your audience grows.
          </p>
        </section>

        {/* Who it's for */}
        <section className="mb-24">
          <span className="text-xs uppercase tracking-widest text-neutral-600 font-medium">Who it&apos;s for</span>
          <p className="mt-4 text-xl leading-relaxed text-neutral-300 border-l-2 border-neutral-800 pl-5">
            Solo technical founders building SaaS. You ship often but your Twitter timeline is a ghost town. You know building in public is the cheat code for growth, but you&apos;d rather stay in the codebase. SubKitt is built for you.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-24">
          <span className="text-xs uppercase tracking-widest text-neutral-600 font-medium">How it works</span>
          <div className="mt-6 space-y-3">
            {[
              { n: '01', title: 'Connect your GitHub.', body: 'SubKitt watches what you ship — features, fixes, releases.' },
              { n: '02', title: 'Your Monday morning, done.', body: 'Every Monday, SubKitt drops 5 ready-to-post drafts in your inbox. No prompts. No blank page. Just your work, packaged.' },
              { n: '03', title: 'See what\'s landing.', body: 'Every batch flags last week\'s best-performing post — and tells you which pattern this week\'s drafts are leaning toward.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-5 p-5 rounded-xl border border-neutral-800/60 bg-neutral-900/40">
                <span className="text-xs font-mono text-neutral-600 mt-0.5 shrink-0 w-6">{n}</span>
                <div>
                  <h3 className="font-semibold text-neutral-100 mb-1">{title}</h3>
                  <p className="text-neutral-400 leading-relaxed text-sm">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proof section */}
        <section className="mb-24">
          <span className="text-xs uppercase tracking-widest text-neutral-600 font-medium">What this looks like</span>
          <div className="mt-6 rounded-xl border border-neutral-800 overflow-hidden">
            <div className="bg-neutral-900/60 px-5 py-4 border-b border-neutral-800">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">Input — commit message</span>
            </div>
            <div className="px-5 py-4">
              <code className="text-sm text-green-400 font-mono">
                feat: add OAuth flow to settings page
              </code>
            </div>
            <div className="flex items-center gap-3 px-5 py-2 border-y border-neutral-800/60">
              <div className="flex-1 h-px bg-neutral-800" />
              <span className="text-neutral-700 text-xs">SubKitt</span>
              <div className="flex-1 h-px bg-neutral-800" />
            </div>
            <div className="bg-neutral-900/60 px-5 py-4 border-b border-neutral-800">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">Output — Monday draft</span>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-neutral-200 leading-relaxed">
                Just shipped OAuth into SubKitt. If you&apos;ve ever spent a Tuesday fighting GitHub&apos;s token refresh flow, this one&apos;s for you.
              </p>
            </div>
          </div>
          <p className="text-sm text-neutral-600 mt-3">One commit, one draft. That&apos;s the whole loop.</p>
        </section>

        {/* Philosophy */}
        <section className="mb-24 space-y-5">
          <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed font-medium">
            Technical founders ship more than they post. The work is there — the audience isn&apos;t, because turning code into content is a second job nobody has time for.
          </p>
          <p className="text-lg text-neutral-400 leading-relaxed">
            You tried to become a creator and it killed your velocity. That&apos;s because you aren&apos;t a creator — you&apos;re a builder.
          </p>
          <p className="text-xl md:text-2xl font-semibold text-neutral-100 leading-relaxed">
            Stay in the code. SubKitt handles the distribution.
          </p>
        </section>

        {/* CTA */}
        <section className="mb-24 rounded-2xl border border-neutral-800 bg-neutral-900/40 px-8 py-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Stop building in silence.</h2>
          <p className="text-neutral-400 mb-8">Join the waitlist. First 50 users get 50% off for life.</p>

          {status === 'success' ? (
            <div className="bg-green-950/40 border border-green-900 rounded-xl p-5 text-green-300 flex items-center gap-3">
              <span className="text-lg">✓</span>
              You&apos;re in. One email when SubKitt is ready for you.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={status === 'loading'}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 disabled:opacity-50 text-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-neutral-100 text-neutral-950 font-semibold px-7 py-3.5 rounded-xl hover:bg-white transition disabled:opacity-50 text-sm whitespace-nowrap"
              >
                {status === 'loading' ? 'Joining...' : 'Join waitlist →'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-red-400 text-sm mt-3">Something went wrong: {errorMsg}</p>
          )}

          <p className="text-xs text-neutral-600 mt-5">No spam. One email when you&apos;re in.</p>
        </section>

        {/* Founder note */}
        <section className="pt-10 border-t border-neutral-900">
          <span className="text-xs uppercase tracking-widest text-neutral-600 font-medium">Building in public</span>
          <div className="mt-5 flex gap-4 items-start">
            <div className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 shrink-0 flex items-center justify-center text-sm font-semibold text-neutral-400">H</div>
            <div className="space-y-3">
              <p className="text-neutral-300 leading-relaxed">
                I&apos;m Hassan. Solo, technical, broke student, Day 8.
              </p>
              <p className="text-neutral-400 leading-relaxed text-sm">
                I got tired of shipping code nobody saw. I refused to waste my build time on &ldquo;Twitter growth hacks.&rdquo; So I&apos;m building the tool I needed.
              </p>
              <div className="flex flex-col gap-1 pt-2">
                <a href="https://x.com/CheemaEdu" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-neutral-200 transition">
                  → @CheemaEdu on X
                </a>
                <a href="https://github.com/Hassan-Cheema/subkitt" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-neutral-200 transition">
                  → github.com/Hassan-Cheema/subkitt
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
