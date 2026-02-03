import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  ArrowRight,
  X,
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
  const [selectedGalleryId, setSelectedGalleryId] = useState('g0');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState<string>('');
  const [galleryAngle, setGalleryAngle] = useState(0);
  const [galleryDragging, setGalleryDragging] = useState(false);
  const dragLastX = useRef(0);
  const dragLastAngle = useRef(0);
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const lastAutoSelectedGalleryId = useRef('g0');

  const newsPosts = [
    {
      title: 'Launch Week Live agenda is out',
      date: 'Feb 2026',
      tag: 'Product',
      desc: 'A full schedule of demos, workshops, and platform deep dives with the team.',
    },
    {
      title: 'New meetup kit for local organizers',
      date: 'Jan 2026',
      tag: 'Community',
      desc: 'Templates, speaker notes, and a quick-start checklist to host your first chapter night.',
    },
    {
      title: 'Workshop: Deploying low-latency inference',
      date: 'Jan 2026',
      tag: 'Inference',
      desc: 'A practical walkthrough from container build to production traffic with monitoring.',
    },
  ];

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
    {
      id: 'g0',
      title: 'Dynamic Moments',
      meta: 'Spotlight sessions',
      category: 'Keynote',
      desc: 'Fast updates, crisp demos, and the best moments from community keynotes and product launches.'
    },
    {
      id: 'g1',
      title: 'Abstract Movement',
      meta: 'Hands-on labs',
      category: 'Workshop',
      desc: 'Guided workshops where you ship a working prototype with live feedback from the team.'
    },
    {
      id: 'g2',
      title: 'Sport Art',
      meta: 'Ship it moment',
      category: 'Demo',
      desc: 'Live demos built for real-time: rapid iteration, instant scaling, and production-ready workflows.'
    },
    {
      id: 'g3',
      title: 'Community Nights',
      meta: 'Local chapters',
      category: 'Meetup',
      desc: 'Meetups across cities with lightning talks, networking, and new partner integrations.'
    },
    {
      id: 'g4',
      title: 'Office Hours',
      meta: 'Ask the team',
      category: 'Q&A',
      desc: 'Bring your architecture and get actionable suggestions in a focused, small-group session.'
    },
    {
      id: 'g5',
      title: 'Build Sprint',
      meta: 'Weekend hack',
      category: 'Hack',
      desc: 'A tight build sprint: ship a feature, share a demo, and leave with a production-ready baseline.'
    },
  ];

  const selectedGallery = galleryCards.find((c) => c.id === selectedGalleryId) ?? galleryCards[0];

  const selectedEvent =
    featuredEvents.find((e) => e.title === selectedEventTitle) ??
    featuredEvents[0];

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = window.requestAnimationFrame(tick);
      if (galleryDragging) return;
      setGalleryAngle((a) => a + 0.12);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [galleryDragging]);

  useEffect(() => {
    if (galleryDragging || detailsOpen) return;

    const step = 360 / galleryCards.length;
    let bestId = lastAutoSelectedGalleryId.current;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let idx = 0; idx < galleryCards.length; idx += 1) {
      const id = galleryCards[idx].id;
      const rot = (step * idx + galleryAngle) % 360;
      const norm = ((rot + 180) % 360) - 180;
      const dist = Math.abs(norm);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = id;
      }
    }

    if (bestId !== lastAutoSelectedGalleryId.current) {
      lastAutoSelectedGalleryId.current = bestId;
      setSelectedGalleryId(bestId);
    }
  }, [detailsOpen, galleryAngle, galleryCards.length, galleryDragging]);

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) + Math.abs(e.deltaY) < 1) return;
      e.preventDefault();
      const delta = (e.deltaX !== 0 ? e.deltaX : e.deltaY) * 0.06;
      setGalleryAngle((a) => a + delta);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel as any);
  }, []);

  const onOrbitPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    setGalleryDragging(true);
    dragLastX.current = e.clientX;
    dragLastAngle.current = galleryAngle;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onOrbitPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!galleryDragging) return;
    const dx = e.clientX - dragLastX.current;
    setGalleryAngle(dragLastAngle.current + dx * 0.22);
  };

  const onOrbitPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    setGalleryDragging(false);
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      null;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] overflow-hidden font-sans selection:bg-[rgba(var(--accent-rgb),0.30)] selection:text-[color:var(--bg-primary)]">
      <Nav />

      <main>
        <section className="pt-40 pb-20 px-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(var(--accent-rgb),0.14),transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,_rgba(var(--accent-rgb),0.18)_1px,transparent_1px)] [background-size:44px_44px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-sm text-[color:var(--text-secondary)]"
            >
              <Sparkles size={16} className="text-[color:var(--accent)]" />
              Events & News • Updates • Community
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div>
                <h1 className="text-6xl md:text-7xl font-bold leading-[1.0] mb-6">Event &amp; News</h1>
                <p className="text-xl text-[color:var(--text-secondary)] max-w-xl leading-relaxed">
                  Upcoming events, meetups, and the latest product news — curated for teams shipping in real time.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#events"
                    className="px-7 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:opacity-95 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Browse events <ArrowRight size={18} />
                  </a>
                  <a
                    href="#news"
                    className="px-7 py-3 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)] font-bold hover:bg-[color:var(--bg-tertiary)] transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Read news <Newspaper size={18} />
                  </a>
                </div>
              </div>

              <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--accent-rgb),0.12)] to-transparent" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-[color:var(--text-secondary)]">Next event</div>
                    <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] text-[color:var(--text-secondary)]">
                      <Calendar size={14} className="text-[color:var(--accent)]" />
                      Registration open
                    </div>
                  </div>

                  <div className="text-2xl font-bold mb-2">Realtime Infra Summit</div>
                  <div className="text-[color:var(--text-secondary)] mb-6">Mar 12, 2026 • San Francisco</div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-[color:var(--bg-primary)] border border-[color:var(--border-color)]">
                      <div className="text-xs text-[color:var(--text-secondary)]">Track</div>
                      <div className="font-bold">Platform</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[color:var(--bg-primary)] border border-[color:var(--border-color)]">
                      <div className="text-xs text-[color:var(--text-secondary)]">Format</div>
                      <div className="font-bold">In-person</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[color:var(--bg-primary)] border border-[color:var(--border-color)]">
                      <div className="text-xs text-[color:var(--text-secondary)]">Seats</div>
                      <div className="font-bold">Limited</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="news" className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-3">News</h2>
                <p className="text-[color:var(--text-secondary)] max-w-2xl">
                  Product updates, community announcements, and what we’re shipping next.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)] hover:underline underline-offset-4"
              >
                Share an announcement <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {announcements.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.06 }}
                  className="p-8 rounded-2xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] hover:border-[rgba(var(--accent-rgb),0.45)] transition-colors"
                >
                  <a.icon className="text-[color:var(--accent)] mb-6" size={34} />
                  <div className="text-xl font-bold mb-3">{a.title}</div>
                  <p className="text-[color:var(--text-secondary)] leading-relaxed">{a.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {newsPosts.map((p, idx) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.05 }}
                  className="p-7 rounded-2xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] hover:border-[rgba(var(--accent-rgb),0.45)] transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">{p.tag}</div>
                    <div className="text-xs text-[color:var(--text-tertiary)]">{p.date}</div>
                  </div>
                  <div className="mt-3 font-bold text-lg">{p.title}</div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                    {p.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="events"
          className="px-6 py-24 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-3">Featured events</h2>
                <p className="text-[color:var(--text-secondary)] max-w-2xl">
                  A curated set of sessions designed to connect builders and teams.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/contact"
                  className="px-5 py-2.5 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] font-bold hover:bg-[color:var(--bg-tertiary)] transition-colors"
                >
                  Host a meetup
                </Link>
                <Link
                  to="/resources"
                  className="px-5 py-2.5 rounded-full bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] font-bold hover:border-[rgba(var(--accent-rgb),0.45)] transition-colors"
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
                  whileHover={{ y: -10, scale: 1.01 }}
                  onClick={() => {
                    setSelectedEventTitle(ev.title);
                    setEventDetailsOpen(true);
                  }}
                  className="relative rounded-2xl bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] overflow-hidden p-8 group hover:border-[rgba(var(--accent-rgb),0.55)] transition-all cursor-pointer"
                >
                  <div className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-45 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--accent-rgb),0.08)] to-transparent" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[1px] rotate-45 blur-[0.5px] bg-[linear-gradient(90deg,transparent,rgba(var(--accent-rgb),0.16),transparent)]" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[1px] -rotate-45 blur-[0.5px] bg-[linear-gradient(90deg,transparent,rgba(var(--accent-rgb),0.16),transparent)]" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[8px] rotate-45 blur-[16px] bg-[linear-gradient(90deg,transparent,rgba(var(--accent-rgb),0.08),transparent)]" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[8px] -rotate-45 blur-[16px] bg-[linear-gradient(90deg,transparent,rgba(var(--accent-rgb),0.08),transparent)]" />
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold tracking-wider text-[color:var(--accent)] mb-3">{ev.track.toUpperCase()}</div>
                        <div className="text-2xl font-bold mb-2">{ev.title}</div>
                        <div className="text-[color:var(--text-secondary)] flex items-center gap-2">
                          <Calendar size={16} className="text-[color:var(--text-secondary)]" /> {ev.date}
                        </div>
                      </div>
                      <div className="text-xs px-3 py-1 rounded-full bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-[color:var(--text-secondary)] whitespace-nowrap">
                        {ev.format}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)]">
                        <div className="text-xs text-[color:var(--text-secondary)] mb-1">Location</div>
                        <div className="font-bold flex items-center gap-2">
                          <MapPin size={14} className="text-[color:var(--accent)]" /> {ev.city}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)]">
                        <div className="text-xs text-[color:var(--text-secondary)] mb-1">Access</div>
                        <div className="font-bold flex items-center gap-2">
                          <Users size={14} className="text-[color:var(--accent)]" /> {ev.seats}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEventTitle(ev.title);
                        setEventDetailsOpen(true);
                      }}
                      className="mt-6 w-full px-6 py-3 rounded-full bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] font-bold hover:border-[rgba(var(--accent-rgb),0.55)] transition-colors inline-flex items-center justify-center gap-2"
                    >
                      View details <ArrowRight size={16} className="text-[color:var(--accent)]" />
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
                <p className="text-[color:var(--text-secondary)]">A fast list view for planning your month.</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-[color:var(--text-secondary)]">
                <ImageIcon size={14} className="text-[color:var(--accent)]" />
                Live agenda updates
              </div>
            </div>

            <div className="border border-[color:var(--border-color)] rounded-2xl overflow-hidden bg-[color:var(--bg-secondary)]">
              {upcomingList.map((row, i) => (
                <motion.div
                  key={row.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.04 }}
                  whileHover={{ x: 8 }}
                  onClick={() => {
                    setSelectedEventTitle(row.title);
                    setEventDetailsOpen(true);
                  }}
                  className="grid grid-cols-1 md:grid-cols-[150px_1fr_180px] gap-4 items-center p-6 border-b border-[color:var(--border-color)] last:border-b-0 hover:bg-[color:var(--bg-tertiary)] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] flex flex-col items-center justify-center">
                      <div className="text-xs text-[color:var(--text-secondary)]">{row.day}</div>
                      <div className="font-bold">{row.date}</div>
                    </div>
                    <div className="text-xs px-3 py-1 rounded-full bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] text-[color:var(--text-secondary)]">
                      {row.tag}
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-lg">{row.title}</div>
                    <div className="text-sm text-[color:var(--text-secondary)]">{row.location}</div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3">
                    <div className="text-sm text-[color:var(--text-secondary)]">{row.time}</div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEventTitle(row.title);
                        setEventDetailsOpen(true);
                      }}
                      className="px-4 py-2 rounded-full bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] font-bold hover:border-[rgba(var(--accent-rgb),0.55)] transition-colors"
                    >
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
              <div className="p-10 rounded-2xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--accent-rgb),0.14)] to-transparent" />
                <div className="relative">
                  <h2 className="text-4xl font-bold mb-4">Announcements + newsletter</h2>
                  <p className="text-[color:var(--text-secondary)] text-lg leading-relaxed mb-8">
                    Get new events, speaker drops, and product announcements in one clean email.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] rounded-full px-6 py-3 focus:outline-none focus:border-[color:var(--accent)] text-[color:var(--text-primary)]"
                    />
                    <button className="px-8 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:opacity-95 transition-colors">
                      Subscribe
                    </button>
                  </div>

                  <div className="mt-5 text-xs text-[color:var(--text-secondary)]">
                    No spam. Unsubscribe anytime.
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-2xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)]">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-sm text-[color:var(--text-secondary)]">Latest</div>
                    <div className="text-2xl font-bold">Announcements</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] flex items-center justify-center">
                    <Newspaper size={22} className="text-[color:var(--accent)]" />
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
                      className="p-5 rounded-xl bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] hover:border-[rgba(var(--accent-rgb),0.45)] transition-colors"
                    >
                      <div className="font-bold">{t}</div>
                      <div className="text-sm text-[color:var(--text-secondary)] mt-1">Posted this week</div>
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
                <p className="text-[color:var(--text-secondary)]">A live look at recent sessions and community moments.</p>
              </div>
              <div className="hidden md:block text-sm text-[color:var(--text-secondary)]">
                Drag to rotate • Scroll to browse • Click to view details
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
              <div
                ref={orbitRef}
                className="relative rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden h-[520px] md:h-[560px]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.08),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(var(--accent-rgb),0.10),transparent_55%)]" />
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,_rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:56px_56px] pointer-events-none" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[420px] h-[420px] md:w-[460px] md:h-[460px] rounded-full border border-[color:var(--border-color)] bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_62%)] shadow-[0_40px_120px_rgba(0,0,0,0.22)]" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[340px] h-[340px] md:w-[380px] md:h-[380px] [perspective:1200px]">
                    <div
                      className="absolute inset-0"
                      style={{ transformStyle: 'preserve-3d', transform: 'rotateX(14deg)' }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div
                          onPointerDown={onOrbitPointerDown}
                          onPointerMove={onOrbitPointerMove}
                          onPointerUp={onOrbitPointerUp}
                          onPointerCancel={onOrbitPointerUp}
                          className="absolute inset-0 select-none"
                          style={{ cursor: galleryDragging ? 'grabbing' : 'grab' }}
                        >
                          {galleryCards.map((c, idx) => {
                            const step = 360 / galleryCards.length;
                            const rot = step * idx + galleryAngle;
                            const radius = 260;
                            const isActive = c.id === selectedGalleryId;

                            return (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => {
                                  lastAutoSelectedGalleryId.current = c.id;
                                  setSelectedGalleryId(c.id);
                                  setDetailsOpen(true);
                                }}
                                className={
                                  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border overflow-hidden text-left transition-all ' +
                                  (isActive
                                    ? 'border-[rgba(var(--accent-rgb),0.60)] shadow-[0_24px_70px_rgba(0,0,0,0.22)]'
                                    : 'border-[color:var(--border-color)] hover:border-[rgba(var(--accent-rgb),0.45)]')
                                }
                                style={{
                                  width: isActive ? 164 : 132,
                                  height: isActive ? 220 : 180,
                                  transform:
                                    `rotateY(${rot}deg) translateZ(${radius}px) rotateY(${-rot}deg)`
                                }}
                              >
                                <div className="absolute inset-0 bg-[color:var(--bg-primary)]" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(var(--accent-rgb),0.18),transparent_55%)] opacity-70" />
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_55%)]" />

                                <div className="relative h-full p-4 flex flex-col justify-between">
                                  <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-black/40 border border-[color:var(--border-color)] text-[color:var(--text-primary)] w-fit">
                                    <ImageIcon size={14} className="text-[color:var(--accent)]" />
                                    {c.category}
                                  </div>
                                  <div>
                                    <div className="font-bold leading-tight">
                                      {c.title}
                                    </div>
                                    <div className="text-xs text-[color:var(--text-secondary)] mt-1">{c.meta}</div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-[220px] md:w-[240px] rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
                        <div className="h-44 bg-[color:var(--bg-primary)] relative">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(var(--accent-rgb),0.18),transparent_58%)]" />
                          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_55%)]" />
                          <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-black/50 border border-[color:var(--border-color)] text-[color:var(--text-primary)]">
                            <Sparkles size={14} className="text-[color:var(--accent)]" />
                            Featured
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="font-bold text-lg leading-tight">{selectedGallery.title}</div>
                          <div className="text-sm text-[color:var(--text-secondary)] mt-1">{selectedGallery.meta}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
                  <div className="text-xs text-[color:var(--text-secondary)]">Tip: drag anywhere on the orbit, or scroll to rotate</div>
                </div>
              </div>

              <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden">
                <div className="p-7 border-b border-[color:var(--border-color)] flex items-start justify-between gap-6">
                  <div>
                    <div className="text-sm text-[color:var(--text-secondary)]">Selected</div>
                    <div className="text-2xl font-bold">{selectedGallery.title}</div>
                    <div className="text-sm text-[color:var(--text-secondary)] mt-1">{selectedGallery.meta}</div>
                  </div>
                  <div className="text-xs px-3 py-1 rounded-full bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] text-[color:var(--text-secondary)] whitespace-nowrap">
                    {selectedGallery.category}
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-[color:var(--text-secondary)] leading-relaxed">
                    {selectedGallery.desc}
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setDetailsOpen(true)}
                      className="px-7 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:opacity-95 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      View details <ArrowRight size={18} />
                    </button>
                    <Link
                      to="/contact"
                      className="px-7 py-3 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] font-bold hover:bg-[color:var(--bg-tertiary)] transition-colors inline-flex items-center justify-center gap-2"
                    >
                      Get notified <Mail size={18} />
                    </Link>
                  </div>
                </div>
              </div>

              {eventDetailsOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <button
                    type="button"
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setEventDetailsOpen(false)}
                  />
                  <div className="relative w-full max-w-2xl rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden">
                    <div className="p-6 border-b border-[color:var(--border-color)] flex items-start justify-between gap-6">
                      <div>
                        <div className="text-xs text-[color:var(--text-secondary)]">Event preview</div>
                        <div className="text-2xl font-bold mt-1">{selectedEvent?.title}</div>
                        <div className="text-sm text-[color:var(--text-secondary)] mt-2">
                          {selectedEvent?.date} • {selectedEvent?.city}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEventDetailsOpen(false)}
                        className="w-10 h-10 rounded-full bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] flex items-center justify-center"
                      >
                        <X size={18} className="text-[color:var(--text-secondary)]" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-4 rounded-2xl bg-[color:var(--bg-primary)] border border-[color:var(--border-color)]">
                          <div className="text-xs text-[color:var(--text-secondary)]">Track</div>
                          <div className="font-bold mt-1">{selectedEvent?.track}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-[color:var(--bg-primary)] border border-[color:var(--border-color)]">
                          <div className="text-xs text-[color:var(--text-secondary)]">Format</div>
                          <div className="font-bold mt-1">{selectedEvent?.format}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-[color:var(--bg-primary)] border border-[color:var(--border-color)]">
                          <div className="text-xs text-[color:var(--text-secondary)]">Access</div>
                          <div className="font-bold mt-1">{selectedEvent?.seats}</div>
                        </div>
                      </div>

                      <div className="mt-6 p-6 rounded-2xl bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] text-[color:var(--text-secondary)] leading-relaxed">
                        Join the session for talks, demos, and community Q&A. You’ll get the agenda and calendar invite after RSVP.
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          className="px-7 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:opacity-95 transition-colors inline-flex items-center justify-center gap-2"
                        >
                          RSVP now <ArrowRight size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEventDetailsOpen(false)}
                          className="px-7 py-3 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] font-bold hover:bg-[color:var(--bg-tertiary)] transition-colors inline-flex items-center justify-center gap-2"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {detailsOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex items-end">
                  <button
                    type="button"
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setDetailsOpen(false)}
                  />
                  <div className="relative w-full rounded-t-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="text-xs text-[color:var(--text-secondary)]">Details</div>
                        <div className="text-xl font-bold">{selectedGallery.title}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDetailsOpen(false)}
                        className="w-10 h-10 rounded-full bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] flex items-center justify-center"
                      >
                        <X size={18} className="text-[color:var(--text-secondary)]" />
                      </button>
                    </div>
                    <div className="text-sm text-[color:var(--text-secondary)] mb-4">{selectedGallery.meta}</div>
                    <p className="text-[color:var(--text-secondary)] leading-relaxed">{selectedGallery.desc}</p>
                    <button
                      type="button"
                      className="mt-5 w-full px-7 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:opacity-95 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      View details <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden p-10">
              <div className="text-sm text-[color:var(--text-secondary)] mb-4">Want your event featured?</div>
              <div className="text-3xl font-bold mb-5">Bring the community together.</div>
              <p className="text-[color:var(--text-secondary)] leading-relaxed mb-8">
                We support local chapters, partner demos, and hands-on workshops. Pitch a topic and we’ll help amplify it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="px-7 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:opacity-95 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Propose an event <ArrowRight size={18} />
                </Link>
                <a
                  href="#featured"
                  className="px-7 py-3 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] font-bold hover:bg-[color:var(--bg-tertiary)] transition-colors inline-flex items-center justify-center gap-2"
                >
                  Browse schedule <Calendar size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
