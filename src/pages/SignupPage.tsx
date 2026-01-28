import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bolt,
  Box,
  CheckCircle2,
  Eye,
  EyeOff,
  Github,
  Lock,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users } from
'lucide-react';

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const nameValid = name.trim().length >= 2;
  const passwordValid = password.length >= 8;
  const formValid = nameValid && emailValid && passwordValid && termsAccepted;

  const features = [
    {
      icon: Rocket,
      title: 'Fast onboarding',
      description: 'Go from signup to your first deployment in minutes with guided setup.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure by default',
      description: 'Encryption at rest and in transit, sensible defaults, and audit-friendly controls.'
    },
    {
      icon: Box,
      title: 'Built for production',
      description: 'Retries, observability hooks, and predictable runtimes that scale with your workload.'
    },
    {
      icon: Users,
      title: 'Team-ready',
      description: 'Invite teammates, share projects, and keep access organized.'
    },
    {
      icon: Bolt,
      title: 'Performance-first',
      description: 'Low-latency infra designed for modern AI workloads and data pipelines.'
    },
    {
      icon: Lock,
      title: 'Privacy controls',
      description: 'Keep environments isolated and limit access with fine-grained permissions.'
    }
  ];

  const testimonials = [
    {
      quote: 'We replaced weeks of infra work with a single afternoon. Signup was the easy part — shipping was the win.',
      name: 'A. Sharma',
      title: 'ML Engineer'
    },
    {
      quote: 'The UI is clean, the DX is better than anything we tried, and costs are finally predictable.',
      name: 'M. Reynolds',
      title: 'Founding Engineer'
    },
    {
      quote: 'Our team went from prototype to production with zero ops headcount. That changed how we plan roadmap.',
      name: 'K. Nguyen',
      title: 'CTO'
    }
  ];

  const faqs = [
    {
      q: 'Do I need a credit card to start?',
      a: 'No. Create an account and start exploring immediately. You can add billing later when you are ready to scale.'
    },
    {
      q: 'Can I invite my team?',
      a: 'Yes. You can invite teammates after signup and manage access at the workspace level.'
    },
    {
      q: 'Is my data encrypted?',
      a: 'Yes. We encrypt data at rest and in transit and follow best-practice security controls.'
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
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--accent-rgb),0.18)_0%,_transparent_60%)]" />
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
                  Start free. Upgrade when you scale.
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
                Create your account and ship faster
              </h1>
              <p className="text-[color:var(--text-secondary)] text-lg mt-4 max-w-xl">
                Join teams building AI workloads, data pipelines, and internal tooling with predictable infra.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[{ label: 'Fast setup', desc: 'Guided onboarding' }, { label: 'Team-ready', desc: 'Invite collaborators' }, { label: 'Secure', desc: 'Best-practice defaults' }, { label: 'Scales', desc: 'From prototype to prod' }].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-5"
                  >
                    <div className="text-sm font-bold">{item.label}</div>
                    <div className="text-sm text-[color:var(--text-secondary)] mt-1">{item.desc}</div>
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
                <h2 className="text-2xl font-bold mb-2 text-center">Create an account</h2>
                <p className="text-[color:var(--text-secondary)] text-center mb-8 text-sm">
                  Start building with $30/mo in free credits
                </p>

                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)] font-medium py-2.5 rounded-lg hover:brightness-[0.98] transition-all flex items-center justify-center gap-2 mb-6"
                >
                  <Github size={18} />
                  Continue with GitHub
                </motion.button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[color:var(--border-color)]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[color:var(--bg-tertiary)] px-2 text-[color:var(--text-tertiary)]">
                      Or continue with email
                    </span>
                  </div>
                </div>

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
                      Full Name
                    </label>
                    <div className="relative">
                      <UserRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-tertiary)]" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-lg pl-10 pr-4 py-2.5 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:rgba(var(--accent-rgb),0.8)] transition-colors"
                        placeholder="Jane Doe"
                        required
                        aria-invalid={attemptedSubmit && !nameValid}
                      />
                    </div>
                    {attemptedSubmit && !nameValid && (
                      <div className="text-xs mt-1 text-[color:var(--text-tertiary)]">Please enter your full name.</div>
                    )}
                  </div>

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
                    <label className="block text-sm font-medium text-[color:var(--text-secondary)] mb-1.5">
                      Password
                    </label>
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

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 rounded bg-[color:var(--bg-secondary)] border-[color:var(--border-color)] text-[color:var(--accent)] focus:ring-0"
                    />

                    <label
                      htmlFor="terms"
                      className="text-xs text-[color:var(--text-secondary)] leading-relaxed"
                    >
                      I agree to the{' '}
                      <Link to="/terms" className="text-[color:var(--text-primary)] hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-[color:var(--text-primary)] hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </label>
                  </div>
                  {attemptedSubmit && !termsAccepted && (
                    <div className="text-xs text-[color:var(--text-tertiary)]">You must accept the terms to continue.</div>
                  )}

                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-[color:var(--accent)] text-white font-bold py-2.5 rounded-lg hover:bg-[color:var(--accent-hover)] transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:hover:bg-[color:var(--accent)] disabled:cursor-not-allowed"
                    disabled={!formValid}
                  >
                    Create Account <ArrowRight size={16} />
                  </motion.button>
                </form>

                <div className="mt-6 pt-6 border-t border-[color:var(--border-color)] text-center">
                  <p className="text-sm text-[color:var(--text-secondary)]">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="text-[color:var(--accent)] hover:text-[color:var(--accent-hover)] font-medium"
                    >
                      Log in
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
              <div className="text-sm font-bold text-[color:var(--accent)]">What you get</div>
              <h3 className="text-3xl md:text-4xl font-bold mt-2">Everything you need to start</h3>
              <p className="text-[color:var(--text-secondary)] mt-3 max-w-2xl mx-auto">
                A clean workflow with strong defaults. Add complexity only when you need it.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {features.map((f, idx) => (
                <motion.div
                  key={f.title}
                  variants={sectionVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6"
                >
                  <div className="w-11 h-11 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] flex items-center justify-center mb-4">
                    <f.icon size={18} className="text-[color:var(--accent)]" />
                  </div>
                  <div className="font-bold">{f.title}</div>
                  <div className="text-sm text-[color:var(--text-secondary)] mt-1">{f.description}</div>
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
              <h3 className="text-3xl font-bold">Trusted foundation</h3>
              <p className="text-[color:var(--text-secondary)] text-lg mt-3">
                Built to be the reliable layer between your code and the infra it runs on.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[{ icon: CheckCircle2, title: 'Clear pricing', desc: 'Know what you pay' }, { icon: ShieldCheck, title: 'Security', desc: 'Best practices' }, { icon: Users, title: 'Collaboration', desc: 'Invite your team' }, { icon: Box, title: 'Portability', desc: 'Predictable runtime' }].map((b) => (
                  <motion.div
                    key={b.title}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-5"
                  >
                    <div className="flex items-center gap-2">
                      <b.icon size={16} className="text-[color:var(--accent)]" />
                      <div className="font-bold text-sm">{b.title}</div>
                    </div>
                    <div className="text-sm text-[color:var(--text-secondary)] mt-2">{b.desc}</div>
                  </motion.div>
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
              <div className="text-sm font-bold text-[color:var(--accent)]">Built for builders</div>
              <div className="text-2xl font-bold mt-2">A smoother path to production</div>
              <div className="text-[color:var(--text-secondary)] mt-3">
                Everything is designed to help you move faster without losing confidence in your deployments.
              </div>
              <div className="mt-6 space-y-3">
                {['Guided onboarding and templates', 'Team permissions and workspace structure', 'Security defaults you can trust'].map((t) => (
                  <div key={t} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[color:var(--accent)] mt-0.5" />
                    <div className="text-sm text-[color:var(--text-secondary)]">{t}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-16 bg-[color:var(--bg-tertiary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="text-sm font-bold text-[color:var(--accent)]">Social proof</div>
              <h3 className="text-3xl md:text-4xl font-bold mt-2">Teams ship with confidence</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={t.name}
                  variants={sectionVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6"
                >
                  <div className="text-sm text-[color:var(--text-secondary)] leading-relaxed">“{t.quote}”</div>
                  <div className="mt-5">
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-[color:var(--text-tertiary)]">{t.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
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
                Quick answers before you create your account.
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
      
      </main>
      <Footer />
    </div>
  );
}