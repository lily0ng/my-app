import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Image as ImageIcon,
  Mail,
  MapPin,
  Megaphone,
  Newspaper,
  Sparkles,
  Ticket,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';

export function EventsPage() {
  const featuredEvents = [
    {
      title: 'Realtime Infra Summit',
      date: 'Mar 12, 2026',
      city: 'San Francisco',
      format: 'In-person',
      track: 'Platform',
      seats: 'Limited seats',
    },
    {
      title: 'GPU Inference Clinic',
      date: 'Mar 26, 2026',
      city: 'Online',
      format: 'Virtual',
      track: 'Inference',
      seats: 'Open registration',
    },
    {
      title: 'Builders Meetup: Scaling Teams',
      date: 'Apr 09, 2026',
      city: 'New York',
      format: 'In-person',
      track: 'Community',
      seats: 'RSVP required',
    },
    {
      title: 'Security & Reliability Briefing',
      date: 'Apr 24, 2026',
      city: 'Online',
      format: 'Virtual',
      track: 'Security',
      seats: 'Open registration',
    },
    {
      title: 'Partner Showcase: Tooling Night',
      date: 'May 07, 2026',
      city: 'Austin',
      format: 'In-person',
      track: 'Ecosystem',
      seats: 'Limited seats',
    },
    {
      title: 'Launch Week Live',
      date: 'May 22, 2026',
      city: 'Online',
      format: 'Virtual',
      track: 'Product',
      seats: 'Open registration',
    },
  ];

  const announcements = [
    {
      icon: Megaphone,
      title: 'Call for Speakers',
      desc: 'Share a lightning talk or deep dive. Submissions are open for the next community stage.'
    },
    {
      icon: Newspaper,
      title: 'New: Monthly Community Roundup',
      desc: 'A quick digest of talks, meetups, and demos — shipped on the first week of every month.'
    },
    {
      icon: Ticket,
      title: 'Student Tickets',
      desc: 'We reserve a small set of discounted tickets for students and first-time founders.'
    }
  ];

  const upcomingList = [
    {
      day: 'Thu',
      date: 'Mar 12',
      title: 'Realtime Infra Summit',
      location: 'SF • Mission Bay',
      time: '6:00 PM',
      tag: 'Keynote + Demos'
    },
    {
      day: 'Wed',
      date: 'Mar 26',
      title: 'GPU Inference Clinic',
      location: 'Virtual • Live stream',
      time: '10:00 AM',
      tag: 'Hands-on'
    },
    {
      day: 'Thu',
      date: 'Apr 09',
      title: 'Builders Meetup: Scaling Teams',
      location: 'NYC • Midtown',
      time: '6:30 PM',
      tag: 'Networking'
    },
    {
      day: 'Fri',
      date: 'Apr 24',
      title: 'Security & Reliability Briefing',
      location: 'Virtual • Webinar',
      time: '12:00 PM',
      tag: 'Enterprise'
    },
  ];

  const galleryCards = [
    { title: 'Keynote stage', meta: 'Spotlight sessions' },
    { title: 'Live demos', meta: 'Ship it moment' },
    { title: 'Workshops', meta: 'Hands-on labs' },
    { title: 'Meetups', meta: 'Local chapters' },
    { title: 'Partner booths', meta: 'Ecosystem tools' },
    { title: 'After hours', meta: 'Community nights' },
    { title: 'Office hours', meta: 'Ask the team' },
    { title: 'Build sprint', meta: 'Weekend hack' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Nav />

      <main>
        <section className="pt-40 pb-20 px-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,136,0.14),transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,_rgba(0,255,136,0.18)_1px,transparent_1px)] [background-size:44px_44px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a] border border-white/10 text-sm text-gray-300"
            >
              <Sparkles size={16} className="text-[#00ff88]" />
              Events • Talks • Meetups • Community
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div>
                <h1 className="text-6xl md:text-7xl font-bold leading-[1.0] mb-6">Events</h1>
                <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                  Join live sessions, community meetups, and product announcements. Built for teams shipping in real time.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#featured"
                    className="px-7 py-3 rounded-full bg-[#00ff88] text-black font-bold hover:bg-[#00cc6a] transition-colors inline-flex items-center justify-center gap-2"
                  >
                    View upcoming <ArrowRight size={18} />
                  </a>
                  <a
                    href="#newsletter"
                    className="px-7 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Get updates <Mail size={18} />
                  </a>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/8 to-transparent" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-gray-400">Next event</div>
                    <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#111] border border-white/10 text-gray-300">
                      <Calendar size={14} className="text-[#00ff88]" />
                      Registration open
                    </div>
                  </div>

                  <div className="text-2xl font-bold mb-2">Realtime Infra Summit</div>
                  <div className="text-gray-400 mb-6">Mar 12, 2026 • San Francisco</div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-[#111] border border-white/5">
                      <div className="text-xs text-gray-500">Track</div>
                      <div className="font-bold">Platform</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#111] border border-white/5">
                      <div className="text-xs text-gray-500">Format</div>
                      <div className="font-bold">In-person</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#111] border border-white/5">
                      <div className="text-xs text-gray-500">Seats</div>
                      <div className="font-bold">Limited</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {announcements.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.06 }}
                  className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/35 transition-colors"
                >
                  <a.icon className="text-[#00ff88] mb-6" size={34} />
                  <div className="text-xl font-bold mb-3">{a.title}</div>
                  <p className="text-gray-400 leading-relaxed">{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="featured" className="px-6 py-24 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-3">Featured events</h2>
                <p className="text-gray-400 max-w-2xl">
                  A curated set of sessions designed to connect builders and teams.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/contact"
                  className="px-5 py-2.5 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors"
                >
                  Host a meetup
                </Link>
                <Link
                  to="/resources"
                  className="px-5 py-2.5 rounded-full bg-[#111] border border-white/10 text-gray-200 font-bold hover:border-[#00ff88]/40 transition-colors"
                >
                  Explore resources
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((ev, i) => (
                <motion.div
                  key={ev.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.04 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden p-8 group hover:border-[#00ff88]/45 transition-all"
                >
                  <div className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-45 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 to-transparent" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[1px] rotate-45 blur-[0.5px] bg-[linear-gradient(90deg,transparent,rgba(0,255,136,0.14),transparent)]" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[1px] -rotate-45 blur-[0.5px] bg-[linear-gradient(90deg,transparent,rgba(0,255,136,0.14),transparent)]" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[8px] rotate-45 blur-[16px] bg-[linear-gradient(90deg,transparent,rgba(0,255,136,0.06),transparent)]" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[8px] -rotate-45 blur-[16px] bg-[linear-gradient(90deg,transparent,rgba(0,255,136,0.06),transparent)]" />
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold tracking-wider text-[#00ff88] mb-3">{ev.track.toUpperCase()}</div>
                        <div className="text-2xl font-bold mb-2">{ev.title}</div>
                        <div className="text-gray-400 flex items-center gap-2">
                          <Calendar size={16} className="text-gray-500" /> {ev.date}
                        </div>
                      </div>
                      <div className="text-xs px-3 py-1 rounded-full bg-[#111] border border-white/10 text-gray-300 whitespace-nowrap">
                        {ev.format}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#111] border border-white/5">
                        <div className="text-xs text-gray-500 mb-1">Location</div>
                        <div className="font-bold flex items-center gap-2">
                          <MapPin size={14} className="text-[#00ff88]" /> {ev.city}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#111] border border-white/5">
                        <div className="text-xs text-gray-500 mb-1">Access</div>
                        <div className="font-bold flex items-center gap-2">
                          <Users size={14} className="text-[#00ff88]" /> {ev.seats}
                        </div>
                      </div>
                    </div>

                    <button className="mt-6 w-full px-6 py-3 rounded-full bg-[#111] border border-white/10 text-white font-bold hover:border-[#00ff88]/45 transition-colors inline-flex items-center justify-center gap-2">
                      View details <ArrowRight size={16} className="text-[#00ff88]" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-4xl font-bold mb-3">Upcoming schedule</h2>
                <p className="text-gray-400">A fast list view for planning your month.</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#0a0a0a] border border-white/10 text-gray-300">
                <ImageIcon size={14} className="text-[#00ff88]" />
                Live agenda updates
              </div>
            </div>

            <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0a0a0a]">
              {upcomingList.map((row, i) => (
                <motion.div
                  key={row.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.04 }}
                  className="grid grid-cols-1 md:grid-cols-[150px_1fr_180px] gap-4 items-center p-6 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/10 flex flex-col items-center justify-center">
                      <div className="text-xs text-gray-500">{row.day}</div>
                      <div className="font-bold">{row.date}</div>
                    </div>
                    <div className="text-xs px-3 py-1 rounded-full bg-[#111] border border-white/10 text-gray-300">
                      {row.tag}
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-lg">{row.title}</div>
                    <div className="text-sm text-gray-400">{row.location}</div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3">
                    <div className="text-sm text-gray-400">{row.time}</div>
                    <button className="px-4 py-2 rounded-full bg-[#111] border border-white/10 text-white font-bold hover:border-[#00ff88]/45 transition-colors">
                      RSVP
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="newsletter" className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/8 to-transparent" />
                <div className="relative">
                  <h2 className="text-4xl font-bold mb-4">Announcements + newsletter</h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    Get new events, speaker drops, and product announcements in one clean email.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 bg-[#111] border border-white/20 rounded-full px-6 py-3 focus:outline-none focus:border-[#00ff88] text-white"
                    />
                    <button className="px-8 py-3 rounded-full bg-[#00ff88] text-black font-bold hover:bg-[#00cc6a] transition-colors">
                      Subscribe
                    </button>
                  </div>

                  <div className="mt-5 text-xs text-gray-500">
                    No spam. Unsubscribe anytime.
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-sm text-gray-500">Latest</div>
                    <div className="text-2xl font-bold">Announcements</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center">
                    <Newspaper size={22} className="text-[#00ff88]" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    'Launch Week Live agenda is out',
                    'New meetup kit for local organizers',
                    'Workshop: Deploying low-latency inference',
                  ].map((t) => (
                    <div
                      key={t}
                      className="p-5 rounded-xl bg-[#111] border border-white/10 hover:border-[#00ff88]/30 transition-colors"
                    >
                      <div className="font-bold">{t}</div>
                      <div className="text-sm text-gray-500 mt-1">Posted this week</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-28">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-4xl font-bold mb-3">Event gallery</h2>
                <p className="text-gray-400">A live look at recent sessions and community moments.</p>
              </div>
              <div className="hidden md:block text-sm text-gray-500">Hover to pause</div>
            </div>

            <div className="space-y-10">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
                <div className="marquee-x flex gap-6 p-6">
                  {[...galleryCards, ...galleryCards].map((c, idx) => (
                    <div
                      key={`x-${idx}`}
                      className="min-w-[260px] md:min-w-[320px] p-6 rounded-xl bg-[#111] border border-white/10 flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">
                        <ImageIcon size={18} className="text-[#00ff88]" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{c.title}</div>
                        <div className="text-sm text-gray-500">{c.meta}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden">
                  <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Vertical reel</div>
                      <div className="text-xl font-bold">Highlights</div>
                    </div>
                    <div className="text-xs px-3 py-1 rounded-full bg-[#111] border border-white/10 text-gray-300">Looping</div>
                  </div>

                  <div className="h-[420px] overflow-hidden">
                    <div className="marquee-y flex flex-col gap-4 p-6">
                      {[...galleryCards, ...galleryCards].map((c, idx) => (
                        <div
                          key={`y-${idx}`}
                          className="p-5 rounded-xl bg-[#111] border border-white/10 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">
                              <ImageIcon size={16} className="text-[#00ff88]" />
                            </div>
                            <div>
                              <div className="font-bold">{c.title}</div>
                              <div className="text-xs text-gray-500">{c.meta}</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">NEW</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden p-10">
                  <div className="text-sm text-gray-500 mb-4">Want your event featured?</div>
                  <div className="text-3xl font-bold mb-5">Bring the community together.</div>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    We support local chapters, partner demos, and hands-on workshops. Pitch a topic and we’ll help amplify it.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/contact"
                      className="px-7 py-3 rounded-full bg-[#00ff88] text-black font-bold hover:bg-[#00cc6a] transition-colors inline-flex items-center justify-center gap-2"
                    >
                      Propose an event <ArrowRight size={18} />
                    </Link>
                    <a
                      href="#featured"
                      className="px-7 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      Browse schedule <Calendar size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes marqueeX {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marqueeY {
              0% { transform: translateY(0); }
              100% { transform: translateY(-50%); }
            }
            .marquee-x {
              width: max-content;
              animation: marqueeX 26s linear infinite;
            }
            .marquee-y {
              animation: marqueeY 22s linear infinite;
            }
            .marquee-x:hover,
            .marquee-y:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>
      </main>

      <Footer />
    </div>
  );
}
