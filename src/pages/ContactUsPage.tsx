import { useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import {
  Building2,
  Clock,
  CreditCard,
  LifeBuoy,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
  Wrench
} from 'lucide-react';

export function ContactUsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('General');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const supportTopics = [
    {
      title: 'Sales & pricing',
      desc: 'Quotes, plans, and cost estimation.',
      icon: Building2,
      type: 'Sales'
    },
    {
      title: 'Technical support',
      desc: 'Troubleshooting and production issues.',
      icon: LifeBuoy,
      type: 'Support'
    },
    {
      title: 'Billing',
      desc: 'Invoices, payments, and billing cycles.',
      icon: CreditCard,
      type: 'Billing'
    },
    {
      title: 'Security',
      desc: 'Compliance, policies, and best practices.',
      icon: ShieldCheck,
      type: 'Security'
    },
    {
      title: 'Integrations',
      desc: 'APIs, SSO, and platform integrations.',
      icon: Wrench,
      type: 'Integrations'
    }
  ] as const;

  const selectTopic = (type: string, title: string) => {
    setInquiryType(type);
    setSubject(`${title} — ${type}`);
    setSubmitted(false);
    const el = document.getElementById('contact-form');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]">
      <Nav />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <section className="mb-14">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Contact Us
              </h1>
              <p className="mt-4 text-base md:text-lg text-[color:var(--text-secondary)] leading-relaxed">
                Tell us what you’re building. We’ll help you pick the right plan, architecture, and services.
              </p>
            </div>
          </section>

          <section className="mb-14">
            <div className="flex items-end justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact Information</h2>
                <p className="mt-2 text-[color:var(--text-secondary)] max-w-2xl">
                  Reach out to Sales or Support and we’ll respond as quickly as possible.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[color:var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold">Phone</div>
                    <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                      +95-9-400-635-977
                    </div>
                    <div className="text-sm text-[color:var(--text-secondary)]">
                      +95-9-400-635-978
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[color:var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold">Email</div>
                    <div className="mt-2 text-sm text-[color:var(--text-secondary)] break-all">
                      sales@1cloudng.com
                    </div>
                    <div className="text-sm text-[color:var(--text-secondary)] break-all">
                      support@1cloudng.com
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[color:var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold">Address</div>
                    <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                      Tower A, Room 304, 4th floor, Shwe Zabu River View Complex, Strand Road, Ahlone Township, Yangon
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-7 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden">
                <div className="p-6 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold">Map</div>
                    <div className="mt-1 text-sm text-[color:var(--text-secondary)]">
                      Tower A, Room 304 — Ahlone Township, Yangon
                    </div>
                  </div>
                  <a
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)] hover:text-[color:var(--accent-hover)] transition-colors"
                    href="https://www.google.com/maps?q=Tower%20A%2C%20Room%20304%2C%204th%20floor%2C%20Shwe%20Zabu%20River%20View%20Complex%2C%20Strand%20Road%2C%20Ahlone%20Township%2C%20Yangon&z=15"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get directions
                    <Navigation size={16} />
                  </a>
                </div>
                <div className="h-[320px] bg-[color:var(--bg-tertiary)] border-t border-[color:var(--border-color)]">
                  <iframe
                    title="Office map"
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Tower%20A%2C%20Room%20304%2C%204th%20floor%2C%20Shwe%20Zabu%20River%20View%20Complex%2C%20Strand%20Road%2C%20Ahlone%20Township%2C%20Yangon&z=15&output=embed"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-[color:var(--accent)]" />
                    </div>
                    <div>
                      <div className="font-semibold">Office hours</div>
                      <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                        Monday–Friday, 9:00 AM – 6:00 PM
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6">
                  <div className="text-sm font-semibold">Quick contacts</div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="mailto:sales@1cloudng.com"
                      className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] px-4 py-3 text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)] transition-colors"
                    >
                      Sales
                    </a>
                    <a
                      href="mailto:support@1cloudng.com"
                      className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] px-4 py-3 text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)] transition-colors"
                    >
                      Support
                    </a>
                    <a
                      href="tel:+959400635977"
                      className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] px-4 py-3 text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)] transition-colors"
                    >
                      Call
                    </a>
                    <a
                      href="/docs"
                      className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] px-4 py-3 text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)] transition-colors"
                    >
                      Docs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How can we help?</h2>
                <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">
                  Whether you need pricing guidance, technical support, or an enterprise plan, send a message and we’ll route it to the right team.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {supportTopics.map((t) => (
                    <button
                      key={t.title}
                      type="button"
                      onClick={() => selectTopic(t.type, t.title)}
                      className="text-left rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-4 hover:bg-[color:var(--bg-tertiary)] transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] flex items-center justify-center shrink-0">
                          <t.icon size={16} className="text-[color:var(--accent)]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{t.title}</div>
                          <div className="mt-1 text-xs text-[color:var(--text-secondary)] leading-relaxed">
                            {t.desc}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6">
                  <div className="text-sm font-semibold">What you’ll get</div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                    A clear next step, recommended services, and an estimate tailored to your workload.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div id="contact-form" className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6 md:p-8">
                  <h3 className="text-xl font-semibold">Send us a message</h3>
                  <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                    Fill out the form and we’ll get back to you.
                  </p>

                  {submitted && (
                    <div className="mt-5 rounded-xl border border-[rgba(var(--accent-rgb),0.35)] bg-[rgba(var(--accent-rgb),0.10)] px-4 py-3 text-sm">
                      Thanks — we received your message.
                    </div>
                  )}

                  <form
                    className="mt-6 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    <div>
                      <label className="text-sm font-medium" htmlFor="contact-type">
                        Inquiry type
                      </label>
                      <select
                        id="contact-type"
                        value={inquiryType}
                        onChange={(e) => {
                          const next = e.target.value;
                          setInquiryType(next);
                          setSubmitted(false);
                          if (!subject.trim()) {
                            setSubject(`${next} inquiry`);
                          }
                        }}
                        className="mt-2 w-full px-4 py-2.5 rounded-xl bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] focus:outline-none focus:border-[rgba(var(--accent-rgb),0.45)]"
                      >
                        <option value="General">General</option>
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                        <option value="Billing">Billing</option>
                        <option value="Security">Security</option>
                        <option value="Integrations">Integrations</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium" htmlFor="contact-name">
                          Name
                        </label>
                        <input
                          id="contact-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="mt-2 w-full px-4 py-2.5 rounded-xl bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-tertiary)] focus:outline-none focus:border-[rgba(var(--accent-rgb),0.45)]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium" htmlFor="contact-email">
                          Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="mt-2 w-full px-4 py-2.5 rounded-xl bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-tertiary)] focus:outline-none focus:border-[rgba(var(--accent-rgb),0.45)]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium" htmlFor="contact-subject">
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="What do you need help with?"
                        className="mt-2 w-full px-4 py-2.5 rounded-xl bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-tertiary)] focus:outline-none focus:border-[rgba(var(--accent-rgb),0.45)]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium" htmlFor="contact-message">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your project, requirements, and timeline..."
                        rows={6}
                        className="mt-2 w-full px-4 py-2.5 rounded-xl bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-tertiary)] focus:outline-none focus:border-[rgba(var(--accent-rgb),0.45)]"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="text-xs text-[color:var(--text-tertiary)]">
                        By submitting this form, you agree to be contacted by our team.
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[color:var(--accent)] text-white text-sm font-semibold hover:bg-[color:var(--accent-hover)] transition-colors"
                      >
                        Send
                        <Send size={16} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-14">
            <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm font-semibold">Sales</div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                    Need a quote, custom plan, or procurement support?
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Support</div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                    Already a customer and have a technical issue?
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Partnerships</div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                    Interested in integrations, reselling, or enterprise collaborations?
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-12 shadow-[0_18px_55px_rgba(0,0,0,0.10)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Let’s build together</h2>
                  <p className="mt-2 text-[color:var(--text-secondary)]">
                    From proof of concept to production scale, we’ll help you ship faster.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="mailto:sales@1cloudng.com"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:bg-[color:var(--accent-hover)] transition-colors"
                  >
                    Email Sales
                  </a>
                  <a
                    href="mailto:support@1cloudng.com"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] text-[color:var(--text-primary)] font-bold hover:bg-[color:var(--bg-secondary)] transition-colors"
                  >
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
