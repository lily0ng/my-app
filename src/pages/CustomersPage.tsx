import { useEffect, useMemo, useRef, useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  Quote,
  ChevronDown,
  ChevronUp,
  Play,
  ArrowRight } from
'lucide-react';

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '').trim();
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  if (full.length !== 6) return `rgba(168,85,247,${alpha})`;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some((v) => Number.isNaN(v))) return `rgba(168,85,247,${alpha})`;
  return `rgba(${r},${g},${b},${alpha})`;
}

export function CustomersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { theme, darkAccent } = useTheme();

  const mapArcs = useMemo(() => {
    const points = {
      sfo: { x: 155, y: 175 },
      nyc: { x: 245, y: 165 },
      lon: { x: 470, y: 150 },
      par: { x: 485, y: 160 },
      lag: { x: 465, y: 260 },
      cai: { x: 525, y: 205 },
      hyd: { x: 650, y: 230 },
      sin: { x: 735, y: 275 },
      tok: { x: 850, y: 190 },
      syd: { x: 845, y: 360 },
      sao: { x: 330, y: 330 },
    };

    const arcs = [
      { from: 'sfo', to: 'lon', lift: 88, dur: 4.2, delay: 0.2 },
      { from: 'nyc', to: 'par', lift: 78, dur: 3.9, delay: 0.6 },
      { from: 'lon', to: 'cai', lift: 64, dur: 3.6, delay: 0.9 },
      { from: 'par', to: 'hyd', lift: 74, dur: 4.5, delay: 1.1 },
      { from: 'cai', to: 'sin', lift: 82, dur: 4.0, delay: 1.5 },
      { from: 'hyd', to: 'tok', lift: 92, dur: 4.8, delay: 1.9 },
      { from: 'sin', to: 'syd', lift: 70, dur: 4.1, delay: 0.4 },
      { from: 'lag', to: 'lon', lift: 68, dur: 3.7, delay: 1.3 },
      { from: 'sao', to: 'lon', lift: 88, dur: 4.6, delay: 2.2 },
      { from: 'tok', to: 'sfo', lift: 104, dur: 5.2, delay: 2.6 },
    ].map((a, idx) => {
      const p1 = points[a.from as keyof typeof points];
      const p2 = points[a.to as keyof typeof points];
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const cx = mx;
      const cy = Math.max(18, my - a.lift);
      const d = `M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`;
      return {
        id: `arc-${idx}`,
        d,
        from: p1,
        to: p2,
        dur: a.dur,
        delay: a.delay,
      };
    });

    return { points, arcs };
  }, []);

  const mapRegions = useMemo(
    () => [
      { cx: 120, cy: 155, rx: 60, ry: 42, rot: -10 },
      { cx: 215, cy: 190, rx: 55, ry: 38, rot: 18 },
      { cx: 360, cy: 280, rx: 52, ry: 72, rot: -8 },
      { cx: 535, cy: 165, rx: 55, ry: 44, rot: 10 },
      { cx: 565, cy: 230, rx: 92, ry: 55, rot: -12 },
      { cx: 700, cy: 220, rx: 70, ry: 50, rot: 10 },
      { cx: 820, cy: 175, rx: 85, ry: 44, rot: 8 },
      { cx: 855, cy: 320, rx: 92, ry: 55, rot: 12 },
    ],
    [],
  );

  const mapRings = useMemo(
    () => [
      { cx: 180, cy: 220, r: 7.5, delay: 0.2 },
      { cx: 460, cy: 185, r: 8.5, delay: 0.8 },
      { cx: 515, cy: 150, r: 6.5, delay: 1.2 },
      { cx: 600, cy: 205, r: 8.5, delay: 0.5 },
      { cx: 680, cy: 285, r: 7.5, delay: 1.6 },
      { cx: 905, cy: 210, r: 7.5, delay: 1.1 },
      { cx: 940, cy: 365, r: 9.5, delay: 0.9 },
      { cx: 740, cy: 355, r: 7.5, delay: 0.35 },
    ],
    [],
  );

  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.25 });

  const industryRef = useRef<HTMLDivElement | null>(null);
  const industryInView = useInView(industryRef, { once: true, amount: 0.25 });

  const useCountUp = (target: number, active: boolean, durationMs = 900) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      if (!active) return;
      let raf = 0;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        const base = target * eased;
        const jitter = t < 0.98 ? Math.random() * (Math.max(1, target) * 0.06) : 0;
        const next = Math.min(target, Math.floor(base + jitter));
        setValue(next);
        if (t < 1) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [active, durationMs, target]);

    return value;
  };

  const count60 = useCountUp(60, statsInView, 950);
  const count10 = useCountUp(10, statsInView, 850);

  const shoutouts = [
    {
      name: 'Jon Ashp',
      handle: '@jonashp_',
      text: 'Setup @1cloudng by @sitepee yesterday. All I have to say is, wow. First I was using my Cloudex Max sub and I used all of my limit quickly, so today I had my cloud bot setup a proxy to route my Copilot subscription as an API endpoint… It just runs on that. If the fact that cloud can just keep building upon itself by talking to it in discord is crazy. The future is already here.',
      company: 'Community'
    },
    {
      name: 'Ayreh Dubois',
      handle: '@AyrehDubois',
      text: 'Tried Cloud by @sitepee. I tried to build my own AI assistant bots before, and I am very impressed how many hard things Cloud gets right. Persistent memory, persona onboarding, comms integration, heartbeats. A few minor wrinkles remain, but the end result is AWESOME.',
      company: 'Developer'
    },
    {
      name: 'Mark Jaquith',
      handle: '@markjaquith',
      text: 'I’ve been saying for like six months that even if LLMs suddenly stopped improving, we could spend “years” discovering new transformative uses. @1cloudng feels like that kind of “just had to glue all the parts together” leap forward. Incredible experience.',
      company: 'Founder'
    },
    {
      name: 'Dan Pequenne',
      handle: '@danpequenne',
      text: 'Why @1cloudng is nuts: your context and skills live on YOUR computer, not a walled garden. It’s open source. Growing community building skills. Only 19 days old and constantly improving. Personal assistant understands it’s a company assistant, family assistant, team tool. Proactive AI: cron jobs, reminders, background tasks. Memory is amazing, context persists 24/7.',
      company: 'Engineer'
    },
    {
      name: 'Nate Liason',
      handle: '@nateliason',
      text: 'Yeah this was 1,000% worth it. Separate Claude subscription + Cloud, managing Claude Code / Codex sessions I can kick off anywhere, autonomously running tests on my app and capturing errors through a sentry webhook then resolving them and opening PRs. The future is here.',
      company: 'Creator'
    },
    {
      name: 'Nathan Clark',
      handle: '@nathanclark',
      text: 'A smart model with eyes and hands at a desk with keyboard and mouse. You message it like a coworker and it does everything a person could do with that Mac mini. That’s what you have now.',
      company: 'Community'
    }
  ];

  const marqueeItems = [...shoutouts, ...shoutouts];
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Nav />

      <main>
        <section className="pt-40 pb-32 px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            Trusted by <span className="text-[#00ff88]">Innovators</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            From fast-growing startups to public companies, engineering teams
            rely on Modal to power their mission-critical AI workloads.
          </p>
        </section>

        {/* Logo Grid */}
        <section className="pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {[
              'Ramp',
              'Substack',
              'Scale',
              'Vercel',
              'Replit',
              'Perplexity',
              'Descript',
              'Runway',
              'Pika',
              'Suno',
              'Cursor',
              'Linear'].
              map((name) =>
              <div
                key={name}
                className="h-20 bg-[#111] rounded-xl flex items-center justify-center text-xl font-bold text-gray-500 hover:text-white hover:bg-[#1a1a1a] transition-all cursor-default">

                  {name}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Interactive Map Placeholder */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Powering AI Globally</h2>
            <p className="text-xl text-gray-400 mb-16">
              Teams across 30+ countries build on Modal.
            </p>
            <div className="aspect-[2/1] rounded-2xl relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    theme === 'dark'
                      ? 'radial-gradient(900px 520px at 55% 35%, rgba(59,130,246,0.22), transparent 60%), radial-gradient(900px 520px at 35% 55%, rgba(168,85,247,0.16), transparent 58%), radial-gradient(1200px 600px at 50% 50%, rgba(2,6,23,0.15), rgba(2,6,23,0.92) 70%), linear-gradient(180deg, rgba(3,6,14,1), rgba(2,3,8,1))'
                      : 'radial-gradient(900px 520px at 55% 35%, rgba(37,99,235,0.12), transparent 60%), radial-gradient(900px 520px at 35% 55%, rgba(124,58,237,0.08), transparent 58%), radial-gradient(1200px 600px at 50% 50%, rgba(15,23,42,0.06), rgba(15,23,42,0.12) 70%), linear-gradient(180deg, rgba(250,250,255,1), rgba(245,247,255,1))',
                }}
              />

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 500"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  <filter id="arcGlow" x="-35%" y="-35%" width="170%" height="170%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="regionGlow" x="-45%" y="-45%" width="190%" height="190%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g filter="url(#regionGlow)">
                  {mapRegions.map((r, idx) => (
                    <ellipse
                      key={idx}
                      cx={r.cx}
                      cy={r.cy}
                      rx={r.rx}
                      ry={r.ry}
                      transform={`rotate(${r.rot} ${r.cx} ${r.cy})`}
                      fill={theme === 'dark' ? 'rgba(56,189,248,0.22)' : 'rgba(59,130,246,0.12)'}
                      stroke={theme === 'dark' ? 'rgba(191,219,254,0.42)' : 'rgba(37,99,235,0.22)'}
                      strokeWidth="1"
                    />
                  ))}
                </g>

                <g filter="url(#arcGlow)">
                  {mapArcs.arcs.map((a) => {
                    const baseStroke =
                      theme === 'dark' ? 'rgba(148,163,184,0.26)' : 'rgba(148,163,184,0.22)';
                    const accent = theme === 'dark' ? 'rgba(191,219,254,0.85)' : 'rgba(37,99,235,0.65)';
                    const glow = theme === 'dark' ? hexToRgba(darkAccent, 0.7) : 'rgba(37,99,235,0.28)';
                    return (
                      <g key={a.id}>
                        <path id={a.id} d={a.d} fill="none" stroke={baseStroke} strokeWidth="1.05" />
                        <path
                          d={a.d}
                          fill="none"
                          stroke={accent}
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeDasharray="1 16"
                          style={{
                            animation: `arc-dash ${a.dur}s linear ${a.delay}s infinite`,
                          }}
                        />
                        <circle r="2.2" fill={accent} opacity={0.95}>
                          <animateMotion dur={`${a.dur}s`} begin={`${a.delay}s`} repeatCount="indefinite" path={a.d} />
                        </circle>
                        <circle r="7" fill="none" stroke={glow} strokeWidth="1" opacity={0.35}>
                          <animateMotion dur={`${a.dur}s`} begin={`${a.delay}s`} repeatCount="indefinite" path={a.d} />
                        </circle>
                      </g>
                    );
                  })}
                </g>

                <g>
                  {Object.entries(mapArcs.points).map(([id, p]) => {
                    const dot = theme === 'dark' ? 'rgba(226,232,240,0.95)' : 'rgba(37,99,235,0.85)';
                    const ring = theme === 'dark' ? 'rgba(147,197,253,0.55)' : 'rgba(37,99,235,0.35)';
                    return (
                      <g key={id}>
                        <circle cx={p.x} cy={p.y} r="2" fill={dot} />
                        <circle
                          className="map-dotRing"
                          cx={p.x}
                          cy={p.y}
                          r="7"
                          fill="none"
                          stroke={ring}
                          strokeWidth="1"
                          style={{ animationDelay: `${(id.length % 7) * 0.24}s` }}
                        />
                      </g>
                    );
                  })}
                </g>

                <g>
                  {mapRings.map((r, idx) => (
                    <circle
                      key={idx}
                      className="map-ring"
                      cx={r.cx}
                      cy={r.cy}
                      r={r.r}
                      fill="none"
                      stroke={theme === 'dark' ? 'rgba(99,102,241,0.45)' : 'rgba(37,99,235,0.22)'}
                      strokeWidth="1"
                      style={{ animationDelay: `${r.delay}s` }}
                    />
                  ))}
                </g>
              </svg>

              <style>
                {`
                  @keyframes arc-dash {
                    0% { stroke-dashoffset: 120; opacity: 0.0; }
                    12% { opacity: 1.0; }
                    70% { opacity: 0.65; }
                    100% { stroke-dashoffset: -520; opacity: 0.0; }
                  }
                  .map-ring,
                  .map-dotRing {
                    transform-box: fill-box;
                    transform-origin: center;
                    animation: ring-pulse 3.2s ease-in-out infinite;
                  }
                  @keyframes ring-pulse {
                    0% { opacity: 0.0; transform: scale(0.92); }
                    25% { opacity: 0.75; transform: scale(1.0); }
                    70% { opacity: 0.18; transform: scale(1.28); }
                    100% { opacity: 0.0; transform: scale(1.38); }
                  }
                `}
              </style>
            </div>
          </div>
        </section>

        {/* Customer Feedback */}
        <section className="py-32 px-6 relative overflow-hidden border-y border-[color:var(--border-color)] bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[rgba(var(--accent-rgb),0.14)] via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle,_rgba(var(--accent-rgb),0.28)_1px,transparent_1px)] [background-size:70px_70px] [background-position:0_0] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-center justify-between gap-6 mb-14">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--text-secondary)]">
                  <span className="text-[color:var(--accent)]">›</span>
                  What People Say
                </div>
                <h2 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight">
                  <span className="text-[color:var(--accent)]">›</span> Shoutouts
                </h2>
                <p className="mt-4 text-[color:var(--text-secondary)] max-w-2xl">
                  What the community is saying about 1CloudNG
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="marquee" style={{ ['--marquee-duration' as any]: '36s' }}>
                <div className="marquee__track gap-6 pr-6">
                  {marqueeItems.map((t, idx) => (
                    <div
                      key={`${t.handle}-${idx}`}
                      className="shoutout-card w-[360px] md:w-[420px] shrink-0 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] shadow-[0_20px_70px_rgba(0,0,0,0.18)] px-6 py-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="shoutout-avatar w-10 h-10 rounded-full bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] flex items-center justify-center text-sm font-bold text-[color:var(--text-primary)]">
                          {t.name
                            .split(' ')
                            .slice(0, 2)
                            .map((p) => p[0])
                            .join('')}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="font-semibold text-[color:var(--text-primary)] truncate">{t.name}</div>
                              <div className="text-xs text-[#ff5a5a] font-semibold">{t.handle}</div>
                            </div>
                            <Quote size={18} className="shoutout-quote text-[color:var(--text-tertiary)] shrink-0" />
                          </div>

                          <div className="mt-3 text-sm text-[color:var(--text-secondary)] leading-relaxed line-clamp-5">
                            {t.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="marquee marquee--reverse" style={{ ['--marquee-duration' as any]: '44s' }}>
                <div className="marquee__track gap-6 pr-6">
                  {marqueeItems
                    .slice()
                    .reverse()
                    .map((t, idx) => (
                      <div
                        key={`${t.handle}-rev-${idx}`}
                        className="shoutout-card w-[320px] md:w-[380px] shrink-0 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] shadow-[0_20px_70px_rgba(0,0,0,0.18)] px-6 py-5"
                      >
                        <div className="flex items-start gap-3">
                          <div className="shoutout-avatar w-9 h-9 rounded-full bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] flex items-center justify-center text-xs font-bold text-[color:var(--text-primary)]">
                            {t.name
                              .split(' ')
                              .slice(0, 2)
                              .map((p) => p[0])
                              .join('')}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="font-semibold text-[color:var(--text-primary)] truncate">{t.name}</div>
                                <div className="text-xs text-[#ff5a5a] font-semibold">{t.handle}</div>
                              </div>
                              <Quote size={18} className="shoutout-quote text-[color:var(--text-tertiary)] shrink-0" />
                            </div>
                            <div className="mt-3 text-sm text-[color:var(--text-secondary)] leading-relaxed line-clamp-4">
                              {t.text}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Case Studies */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Success Stories
            </h2>
            <div className="space-y-24">
              {[
              {
                company: 'Ramp',
                title: 'Scaling OCR to Millions',
                desc: 'How Ramp built a zero-ops document processing pipeline that scales to millions of receipts daily.',
                stat: '60% Cost Reduction'
              },
              {
                company: 'Substack',
                title: 'Personalized Recommendations',
                desc: 'Delivering custom reading recommendations to millions of users with low-latency inference.',
                stat: '10x Faster Deployments'
              },
              {
                company: 'Scale AI',
                title: 'Generative Media Pipeline',
                desc: 'Processing petabytes of image and video data for generative AI model training.',
                stat: 'Zero Ops Headcount'
              }].
              map((study, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group"
              >

                  <div
                  className={`order-2 ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>

                    <div className="text-[#00ff88] font-bold mb-4 uppercase tracking-wider">
                      {study.company}
                    </div>
                    <h3 className="text-4xl font-bold mb-6">{study.title}</h3>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                      {study.desc}
                    </p>
                    <div className="flex items-center gap-8 mb-8">
                      <div>
                        <div className="text-3xl font-bold text-white mb-1">
                          {study.stat}
                        </div>
                        <div className="text-sm text-gray-500">Key Result</div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="text-[#00ff88] font-bold flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read Case Study <ArrowRight size={20} />
                    </motion.button>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className={`order-1 ${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} aspect-video bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden relative group-hover:border-[#00ff88]/50 transition-colors`}
                  >

                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-transparent opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white opacity-20">
                        {study.company}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Hear from our customers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="aspect-video bg-[#111] rounded-xl border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors" />
                    <Play
                    size={48}
                    className="text-white relative z-10 group-hover:scale-110 transition-transform" />

                  </motion.div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700" />
                    <div>
                      <div className="font-bold text-white">Jane Doe</div>
                      <div className="text-xs text-gray-500">CTO, TechCorp</div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    "Modal changed the way we think about infrastructure."
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ROI Stats */}
        <section className="py-32 px-6 border-y border-white/5">
          <div ref={statsRef} className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Real Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/40 hover:-translate-y-1 transition-all"
              >
                <div className="text-6xl font-bold text-[#00ff88] mb-4 tabular-nums">
                  {count60}%
                </div>
                <div className="text-xl text-white font-bold mb-2">
                  Cost Reduction
                </div>
                <div className="text-gray-400">
                  Average savings vs legacy cloud
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
                className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/40 hover:-translate-y-1 transition-all"
              >
                <div className="text-6xl font-bold text-[#00ff88] mb-4 tabular-nums">
                  {count10}x
                </div>
                <div className="text-xl text-white font-bold mb-2">
                  Faster Deployment
                </div>
                <div className="text-gray-400">From code to production</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
                className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/40 hover:-translate-y-1 transition-all"
              >
                <div className="text-6xl font-bold text-[#00ff88] mb-4 tabular-nums">0</div>
                <div className="text-xl text-white font-bold mb-2">
                  Ops Headcount
                </div>
                <div className="text-gray-400">
                  Required to manage infrastructure
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Industry Breakdown */}
        <section className="py-32 px-6">
          <div ref={industryRef} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Diverse Use Cases</h2>
              <p className="text-xl text-gray-400 mb-8">
                Modal powers workloads across every major industry, from
                generative AI startups to Fortune 500 enterprises.
              </p>
              <ul className="space-y-4">
                {[
                {
                  label: 'Generative AI',
                  pct: '40%'
                },
                {
                  label: 'Fintech',
                  pct: '25%'
                },
                {
                  label: 'Healthcare & Bio',
                  pct: '20%'
                },
                {
                  label: 'Media & Entertainment',
                  pct: '15%'
                }].
                map((item, i) =>
                <div key={i}>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span>{item.label}</span>
                      <span>{item.pct}</span>
                    </div>
                    <div className="w-full bg-[#111] h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-[#00ff88] h-full"
                        initial={{ width: 0 }}
                        animate={industryInView ? { width: item.pct } : {}}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.08 + i * 0.08 }}
                      />

                    </div>
                  </div>
                )}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={industryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 flex items-center justify-center"
            >
              {/* Placeholder for Pie Chart */}
              <div className="w-64 h-64 rounded-full border-8 border-[#111] relative flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">1000+</div>
                  <div className="text-sm text-gray-500">Customers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">FAQ</h2>
            <div className="space-y-4">
              {[
              {
                q: 'Can I read detailed case studies?',
                a: 'Yes, check out our blog for deep dives into how customers architect their systems on Modal.'
              },
              {
                q: 'Do you sign BAAs?',
                a: 'Yes, we sign BAAs for Enterprise customers in healthcare and life sciences.'
              },
              {
                q: 'How do you handle data privacy?',
                a: 'We are SOC 2 Type II compliant and encrypt all data at rest and in transit.'
              }].
              map((faq, i) =>
              <div
                key={i}
                className="border border-white/10 rounded-xl bg-[#0a0a0a] overflow-hidden">

                  <button
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>

                    <span className="font-medium text-lg">{faq.q}</span>
                    {openFaq === i ?
                  <ChevronUp size={20} className="text-gray-500" /> :

                  <ChevronDown size={20} className="text-gray-500" />
                  }
                  </button>
                  {openFaq === i &&
                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                }
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-40 px-6 text-center border-t border-white/5 bg-gradient-to-b from-black to-[#05150d]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Join the leaders
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Start building on the infrastructure chosen by the world's best
              engineering teams.
            </p>
            <button className="px-12 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
              Contact Sales
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}