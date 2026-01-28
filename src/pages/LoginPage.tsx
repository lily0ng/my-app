import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Cloud,
  Eye,
  EyeOff,
  KeyRound,
  LifeBuoy,
  Lock,
  Mail,
  Sparkles,
  Zap } from
'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = password.length >= 8;
  const formValid = emailValid && passwordValid;

  const highlights = [
    {
      icon: Zap,
      title: 'Quick access',
      description: 'Get back to your projects and deployments in seconds.'
    },
    {
      icon: Cloud,
      title: 'Everything in one place',
      description: 'Your runs, logs, and usage live in one consistent interface.'
    },
    {
      icon: BadgeCheck,
      title: 'Trusted sessions',
      description: 'Secure sessions and modern auth patterns that keep you protected.'
    }
  ];

  const helpCards = [
    {
      icon: KeyRound,
      title: 'Forgot password',
      description: 'Reset your password and regain access quickly.',
      href: '/forgot-password'
    },
    {
      icon: LifeBuoy,
      title: 'Need help?',
      description: 'Reach out to support for account access or billing questions.',
      href: '/contact'
    },
    {
      icon: Lock,
      title: 'Security tips',
      description: 'Use a password manager and enable strong passwords.',
      href: '/docs'
    }
  ];

  const faqs = [
    {
      q: 'Why do I keep getting logged out?',
      a: 'If you use strict privacy settings or clear cookies, your session may reset. Try allowing first-party cookies for this site.'
    },
    {
      q: 'Can I use SSO?',
      a: 'SSO is available on business plans. Contact sales or support if you need help enabling it.'
    },
    {
      q: 'Where can I see my usage?',
      a: 'After you log in, visit your dashboard to view usage, billing, and project activity.'
    }
  ];

  const sectionVariant = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] flex flex-col">
      <Nav />

      <main className="flex-1">
        <section className="px-6 pt-16 pb-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--accent-rgb),0.16)_0%,_transparent_60%)]" />
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="pt-4"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]">
                <Sparkles size={14} className="text-[color:var(--accent)]" />
                <span className="text-[color:var(--text-secondary)]">
                  Secure access to your workspace
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
                Welcome back
              </h1>
              <p className="text-[color:var(--text-secondary)] text-lg mt-4 max-w-xl">
                Log in to manage your projects, deployments, and team access.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {highlights.map((h) => (
                  <motion.div
                    key={h.title}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-5"
                  >
                    <div className="w-10 h-10 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] flex items-center justify-center mb-3">
                      <h.icon size={18} className="text-[color:var(--accent)]" />
                    </div>
                    <div className="text-sm font-bold">{h.title}</div>
                    <div className="text-sm text-[color:var(--text-secondary)] mt-1">{h.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
              className="w-full max-w-md lg:justify-self-end lg:sticky lg:top-24"
            >
              <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)]/70 backdrop-blur p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-2 text-center">Log in</h2>
                <p className="text-[color:var(--text-secondary)] text-center mb-8 text-sm">
                  Use your email and password to continue.
                </p>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setAttemptedSubmit(true);
                    if (!formValid) return;
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium text-[color:var(--text-secondary)] mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-tertiary)]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-lg pl-10 pr-4 py-2.5 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:rgba(var(--accent-rgb),0.8)] transition-colors"
                        placeholder="you@company.com"
                        required
                        aria-invalid={attemptedSubmit && !emailValid}
                      />
                    </div>
                    {attemptedSubmit && !emailValid && (
                      <div className="text-xs mt-1 text-[color:var(--text-tertiary)]">Enter a valid email address.</div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-sm font-medium text-[color:var(--text-secondary)]">
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-[color:var(--accent)] hover:text-[color:var(--accent-hover)]"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-tertiary)]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-lg pl-10 pr-11 py-2.5 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:rgba(var(--accent-rgb),0.8)] transition-colors"
                        placeholder="••••••••"
                        required
                        aria-invalid={attemptedSubmit && !passwordValid}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-md hover:bg-[color:var(--bg-tertiary)] flex items-center justify-center"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff size={16} className="text-[color:var(--text-tertiary)]" />
                        ) : (
                          <Eye size={16} className="text-[color:var(--text-tertiary)]" />
                        )}
                      </button>
                    </div>
                    {attemptedSubmit && !passwordValid && (
                      <div className="text-xs mt-1 text-[color:var(--text-tertiary)]">Password must be at least 8 characters.</div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded bg-[color:var(--bg-secondary)] border-[color:var(--border-color)] text-[color:var(--accent)] focus:ring-0"
                    />

                    <label htmlFor="remember" className="text-sm text-[color:var(--text-secondary)]">
                      Remember me for 30 days
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-[color:var(--accent)] text-white font-bold py-2.5 rounded-lg hover:bg-[color:var(--accent-hover)] transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:hover:bg-[color:var(--accent)] disabled:cursor-not-allowed"
                    disabled={!formValid}
                  >
                    Log In <ArrowRight size={16} />
                  </motion.button>
                </form>

                <div className="mt-6 pt-6 border-t border-[color:var(--border-color)] text-center">
                  <p className="text-sm text-[color:var(--text-secondary)]">
                    Don't have an account?{' '}
                    <Link
                      to="/signup"
                      className="text-[color:var(--accent)] hover:text-[color:var(--accent-hover)] font-medium"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-14 border-y border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="text-sm font-bold text-[color:var(--accent)]">Helpful links</div>
              <h3 className="text-3xl md:text-4xl font-bold mt-2">Get unstuck fast</h3>
              <p className="text-[color:var(--text-secondary)] mt-3 max-w-2xl mx-auto">
                Common tasks and quick paths to support.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
              {helpCards.map((c, idx) => (
                <motion.div
                  key={c.title}
                  variants={sectionVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6"
                >
                  <div className="w-11 h-11 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] flex items-center justify-center mb-4">
                    <c.icon size={18} className="text-[color:var(--accent)]" />
                  </div>
                  <div className="font-bold">{c.title}</div>
                  <div className="text-sm text-[color:var(--text-secondary)] mt-1">{c.description}</div>
                  <Link
                    to={c.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[color:var(--accent)] hover:text-[color:var(--accent-hover)] mt-4"
                  >
                    Open <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h3 className="text-3xl font-bold">Security essentials</h3>
              <p className="text-[color:var(--text-secondary)] text-lg mt-3">
                Keep your account protected with a few simple habits.
              </p>
              <div className="mt-8 space-y-3">
                {['Use a password manager to generate strong passwords', 'Enable unique passwords per service', 'Review access if you share a computer'].map((t) => (
                  <div key={t} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[color:var(--accent)] mt-0.5" />
                    <div className="text-sm text-[color:var(--text-secondary)]">{t}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
              className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] p-8"
            >
              <div className="text-sm font-bold text-[color:var(--accent)]">Tip</div>
              <div className="text-2xl font-bold mt-2">One login. Many workflows.</div>
              <div className="text-[color:var(--text-secondary)] mt-3">
                Keep a single workspace and invite teammates with appropriate permissions.
              </div>
              <div className="mt-6">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[color:var(--accent)] text-white font-bold hover:bg-[color:var(--accent-hover)] transition-colors"
                >
                  Create an account <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-16 bg-[color:var(--bg-tertiary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl font-bold">FAQ</h3>
              <p className="text-[color:var(--text-secondary)] mt-3">
                Common questions about logging in.
              </p>
            </motion.div>

            <div className="mt-10 space-y-3">
              {faqs.map((f, idx) => (
                <div
                  key={f.q}
                  className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    type="button"
                  >
                    <span className="font-bold">{f.q}</span>
                    <span className="text-[color:var(--accent)]">{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 text-[color:var(--text-secondary)]">{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold">New here?</h3>
                <p className="text-[color:var(--text-secondary)] mt-3">
                  Create an account and start building right away.
                </p>
              </div>
              <div className="flex md:justify-end">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[color:var(--accent)] text-white font-bold hover:bg-[color:var(--accent-hover)] transition-colors"
                >
                  Sign up <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>);

}