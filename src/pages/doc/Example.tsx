import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ExternalLink } from 'lucide-react';
import { DocsShell } from '../../components/DocsShell';

type SideItem = { label: string; to?: string; indent?: boolean };

type SideGroup = { title: string; items: SideItem[] };

type Chip = { label: string };

type ExampleCard = {
  title: string;
  description: string;
  tag: string;
  href: string;
  gradient: string;
};

export function ExamplePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState('Featured');

  const chips: Chip[] = [
    { label: 'Featured' },
    { label: 'Images, video & 3D' },
    { label: 'Fine-tuning' },
    { label: 'Language modeling' },
    { label: 'Batch processing' },
    { label: 'Audio' },
    { label: 'Modal Sandboxes' },
    { label: 'Computational biology' },
  ];

  const groups: SideGroup[] = [
    {
      title: 'Featured',
      items: [{ label: 'Getting started' }],
    },
    {
      title: 'Getting started',
      items: [
        { label: 'Hello, world', indent: true },
        { label: 'Simple web scraper', indent: true },
        { label: 'Serving web endpoints', indent: true },
      ],
    },
    {
      title: 'Large language models (LLMs)',
      items: [
        { label: 'Deploy an OpenAI-compatible LLM service' },
        { label: 'Cut cold starts by 10x with vLLM' },
        { label: 'Maximize tokens per second in batch' },
        { label: 'Serve an ultra-low-latency chatbot' },
        { label: 'Efficient LLM finetuning with Unsloth' },
      ],
    },
    {
      title: 'Images, video & 3D',
      items: [
        { label: 'Edit images with Flux Kontext' },
        { label: 'Fine-tune Wan2.1 video models' },
        { label: 'Run Flux fast with torch.compile' },
      ],
    },
  ];

  const cards: ExampleCard[] = [
    {
      title: 'Deploy an OpenAI-compatible LLM service',
      description: 'Run large language models with a drop-in replacement for the OpenAI API.',
      tag: 'Featured',
      href: '/docs/examples/',
      gradient: 'bg-gradient-to-br from-[#3a3b19] via-[#4b4b22] to-[#111216]',
    },
    {
      title: 'Custom pet art from Flux with Hugging Face and Gradio',
      description: 'Fine-tune and image generation model on pictures of your pet.',
      tag: 'Featured',
      href: '/docs/examples/',
      gradient: 'bg-gradient-to-br from-[#0b6871] via-[#0a4e58] to-[#111216]',
    },
    {
      title: 'Optimize tokens per second',
      description: 'Maximize throughput in batch LLM processing.',
      tag: 'Featured',
      href: '/docs/examples/',
      gradient: 'bg-gradient-to-br from-[#2a5f2b] via-[#204d23] to-[#111216]',
    },
    {
      title: 'Deploy vibe coding at scale',
      description: 'Build an AI coding platform for thousands of users.',
      tag: 'Featured',
      href: '/docs/examples/',
      gradient: 'bg-gradient-to-br from-[#9b7d16] via-[#6c5b12] to-[#111216]',
    },
    {
      title: 'Transcribe speech in batches with Whisper',
      description: 'Transcribe large audio datasets efficiently.',
      tag: 'Audio',
      href: '/docs/examples/',
      gradient: 'bg-gradient-to-br from-[#a28b0b] via-[#6f6010] to-[#111216]',
    },
    {
      title: 'Voice chat with LLMs',
      description: 'Real-time voice chat with streaming responses.',
      tag: 'Audio',
      href: '/docs/examples/',
      gradient: 'bg-gradient-to-br from-[#2b7a3a] via-[#1e5a2a] to-[#111216]',
    },
    {
      title: 'Edit images with Flux Kontext',
      description: 'Inpainting and edits with a fast diffusion stack.',
      tag: 'Images, video & 3D',
      href: '/docs/examples/',
      gradient: 'bg-gradient-to-br from-[#2c6f77] via-[#1d4f57] to-[#111216]',
    },
    {
      title: 'Fold proteins with Boltz-2',
      description: 'Predict molecular structures and binding affinities.',
      tag: 'Computational biology',
      href: '/docs/examples/',
      gradient: 'bg-gradient-to-br from-[#2f7048] via-[#1f4c33] to-[#111216]',
    },
  ];

  const visibleCards = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cards.filter((c) => {
      const chipOk = activeChip === 'Featured' ? true : c.tag === activeChip;
      const queryOk = q.length === 0 ? true : (c.title + ' ' + c.description).toLowerCase().includes(q);
      return chipOk && queryOk;
    });
  }, [activeChip, cards, search]);

  const sidebar = (
    <div className="pr-2">
      <div className="pt-1 pb-4">
        <div className="text-[13px] font-semibold text-[color:var(--text-primary)] truncate">Examples</div>
      </div>

      <div className="space-y-6 pb-6">
        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="text-[11px] font-semibold text-[color:var(--docs-muted-2)] uppercase tracking-wider mb-2">{g.title}</h4>
            <ul className="space-y-0.5">
              {g.items.map((it) => (
                <li key={it.label}>
                  {(() => {
                    const active = g.title === 'Featured' && it.label === 'Getting started';
                    const base = it.indent ? 'pl-8 text-[12px] text-[color:var(--docs-muted-2)]' : 'pl-3 text-[13px] text-[color:var(--docs-muted)]';
                    return (
                  <div
                    className={
                      'block w-full -mx-3 px-3 pr-3 py-2 leading-tight transition-colors ' +
                      base +
                      (active ? ' bg-[color:var(--docs-panel-2)] text-[color:var(--text-primary)]' : ' hover:text-[color:var(--text-primary)] hover:bg-[color:var(--docs-panel-2)]')
                    }
                  >
                    {it.label}
                  </div>
                    );
                  })()}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="pt-4 border-t border-[color:var(--docs-border)]" />
      </div>
    </div>
  );

  const rightRail = null;

  const breadcrumbs = [{ label: 'Examples' }];

  return (
    <DocsShell
      breadcrumbs={breadcrumbs}
      sidebar={sidebar}
      rightRail={rightRail}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((v) => !v)}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search"
    >
      <div>
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mt-2 text-[color:var(--text-primary)]">Featured Examples</h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map((c) => {
              const active = c.label === activeChip;
              return (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setActiveChip(c.label)}
                  className={
                    'h-8 px-3 rounded-full border text-[12px] font-semibold transition-colors inline-flex items-center gap-2 ' +
                    (active
                      ? 'bg-[color:var(--docs-panel)] border-[color:var(--docs-border)] text-[color:var(--text-primary)]'
                      : 'bg-transparent border-[color:var(--docs-border)] text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--docs-panel-2)]')
                  }
                >
                  {active && (
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent-green text-black">
                      <Check size={12} />
                    </span>
                  )}
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleCards.map((c) => (
            <Link
              key={c.title}
              to={c.href}
              className={
                'group relative overflow-hidden rounded-xl border border-[color:var(--docs-border)] ' +
                c.gradient +
                ' min-h-[240px]'
              }
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="relative p-4 h-full flex flex-col justify-end">
                <div className="text-[13px] font-semibold text-white leading-snug line-clamp-3">{c.title}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-[11px] text-white/70">{c.description}</div>
                  <ExternalLink size={14} className="text-white/70 shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DocsShell>
  );
}
