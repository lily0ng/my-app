import { useMemo, useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import {
  ChevronDown,
  Rocket,
  Search,
  Plus,
  Upload,
  FolderOpen,
} from 'lucide-react';

type MarketplaceApp = {
  id: string;
  name: string;
  vendor: string;
  description: string;
  category: string;
};

export function MarketplaceAppsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [hideDuplicates, setHideDuplicates] = useState(true);

  const logoDataUriFor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i += 1) {
      hash = (hash * 31 + name.charCodeAt(i)) % 360;
    }

    const hue = (hash + 360) % 360;
    const hue2 = (hue + 18) % 360;
    const initials = name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue} 70% 58%)" />
      <stop offset="100%" stop-color="hsl(${hue2} 70% 46%)" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="88" height="88" rx="18" fill="url(#g)" />
  <text x="44" y="52" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system" font-size="28" font-weight="700" fill="white">${initials}</text>
</svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  };

  const dashboardIconUrlFor = (appNameOrId: string) => {
    const slug = appNameOrId
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '');

    return `https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/${slug}.svg`;
  };

  const apps: MarketplaceApp[] = useMemo(
    () => [
      {
        id: 'ansible-semaphore',
        name: 'Ansible Semaphore',
        vendor: 'TinyActive',
        description: 'A modern UI for Ansible automation, simple, secure.',
        category: 'DevOps',
      },
      {
        id: 'appsmith',
        name: 'Appsmith',
        vendor: 'TinyActive',
        description: 'Build internal tools and dashboards fast.',
        category: 'Developer Tools',
      },
      {
        id: 'gitea',
        name: 'Gitea',
        vendor: 'Community',
        description: 'Lightweight Git service, self-hosted.',
        category: 'Developer Tools',
      },
      {
        id: 'grafana',
        name: 'Grafana',
        vendor: 'Community',
        description: 'Dashboards and observability for metrics, logs, traces.',
        category: 'Monitoring',
      },
      {
        id: 'prometheus',
        name: 'Prometheus',
        vendor: 'Community',
        description: 'Time-series monitoring with a powerful query language.',
        category: 'Monitoring',
      },
      {
        id: 'postgres',
        name: 'PostgreSQL',
        vendor: 'Community',
        description: 'Reliable relational database for production workloads.',
        category: 'Database',
      },
      {
        id: 'redis',
        name: 'Redis',
        vendor: 'Community',
        description: 'In-memory data store for caching and real-time apps.',
        category: 'Database',
      },
      {
        id: 'n8n',
        name: 'n8n',
        vendor: 'Community',
        description: 'Workflow automation platform for your internal ops.',
        category: 'Automation',
      },
      {
        id: 'supabase',
        name: 'Supabase',
        vendor: 'Community',
        description: 'Open source Firebase alternative built on Postgres.',
        category: 'Database',
      },
      {
        id: 'minio',
        name: 'MinIO',
        vendor: 'Community',
        description: 'S3-compatible object storage for self-hosted stacks.',
        category: 'Storage',
      },
      {
        id: 'vault',
        name: 'Vault',
        vendor: 'Community',
        description: 'Secure secrets management and encryption as a service.',
        category: 'Security',
      },
      {
        id: 'airbyte',
        name: 'Airbyte',
        vendor: 'Community',
        description: 'ELT pipelines with connectors to sync your data.',
        category: 'Data',
      },
      {
        id: 'adguard-home',
        name: 'AdGuard Home',
        vendor: 'Community',
        description: 'Network-wide ads and trackers blocking with DNS server.',
        category: 'Security',
      },
      {
        id: 'airflow',
        name: 'Apache Airflow',
        vendor: 'Community',
        description: 'Orchestrate workflows and scheduled pipelines.',
        category: 'Data',
      },
      {
        id: 'ansible-awx',
        name: 'AWX',
        vendor: 'Community',
        description: 'Open source upstream project for Ansible Automation Platform.',
        category: 'DevOps',
      },
      {
        id: 'argo-cd',
        name: 'Argo CD',
        vendor: 'Community',
        description: 'GitOps continuous delivery for Kubernetes.',
        category: 'DevOps',
      },
      {
        id: 'arangodb',
        name: 'ArangoDB',
        vendor: 'Community',
        description: 'Multi-model database for graphs, documents, and key-value.',
        category: 'Database',
      },
      {
        id: 'backstage',
        name: 'Backstage',
        vendor: 'Community',
        description: 'Developer portal to manage services and ownership.',
        category: 'Developer Tools',
      },
      {
        id: 'caddy',
        name: 'Caddy',
        vendor: 'Community',
        description: 'Modern web server with automatic HTTPS.',
        category: 'Networking',
      },
      {
        id: 'calcom',
        name: 'Cal.com',
        vendor: 'Community',
        description: 'Scheduling infrastructure for individuals and teams.',
        category: 'Productivity',
      },
      {
        id: 'clickhouse',
        name: 'ClickHouse',
        vendor: 'Community',
        description: 'Fast analytical database for real-time reporting.',
        category: 'Database',
      },
      {
        id: 'code-server',
        name: 'code-server',
        vendor: 'Community',
        description: 'Run VS Code in your browser on remote compute.',
        category: 'Developer Tools',
      },
      {
        id: 'consul',
        name: 'Consul',
        vendor: 'Community',
        description: 'Service discovery, config, and service mesh.',
        category: 'Networking',
      },
      {
        id: 'directus',
        name: 'Directus',
        vendor: 'Community',
        description: 'Instant APIs and app for your SQL database.',
        category: 'Developer Tools',
      },
      {
        id: 'django',
        name: 'Django',
        vendor: 'Community',
        description: 'Batteries-included web framework starter.',
        category: 'Web',
      },
      {
        id: 'elasticsearch',
        name: 'Elasticsearch',
        vendor: 'Community',
        description: 'Search and analytics engine for logs and content.',
        category: 'Search',
      },
      {
        id: 'gitlab',
        name: 'GitLab',
        vendor: 'Community',
        description: 'All-in-one DevOps platform for CI/CD and code hosting.',
        category: 'DevOps',
      },
      {
        id: 'github-runner',
        name: 'GitHub Actions Runner',
        vendor: 'Community',
        description: 'Self-hosted runner for GitHub Actions workflows.',
        category: 'DevOps',
      },
      {
        id: 'harbor',
        name: 'Harbor',
        vendor: 'Community',
        description: 'Private container registry with policy and scanning.',
        category: 'DevOps',
      },
      {
        id: 'heimdall',
        name: 'Heimdall',
        vendor: 'Community',
        description: 'Simple dashboard for all your services.',
        category: 'Productivity',
      },
      {
        id: 'jellyfin',
        name: 'Jellyfin',
        vendor: 'Community',
        description: 'Media server for streaming your content.',
        category: 'Media',
      },
      {
        id: 'jupyterhub',
        name: 'JupyterHub',
        vendor: 'Community',
        description: 'Multi-user Jupyter notebooks for teams.',
        category: 'Data',
      },
      {
        id: 'keycloak',
        name: 'Keycloak',
        vendor: 'Community',
        description: 'Identity and access management with SSO.',
        category: 'Security',
      },
      {
        id: 'kibana',
        name: 'Kibana',
        vendor: 'Community',
        description: 'Visualize and explore Elasticsearch data.',
        category: 'Search',
      },
      {
        id: 'kong',
        name: 'Kong',
        vendor: 'Community',
        description: 'API gateway for routing, auth, and rate limits.',
        category: 'Networking',
      },
      {
        id: 'kafka',
        name: 'Kafka',
        vendor: 'Community',
        description: 'Distributed streaming platform for event-driven systems.',
        category: 'Messaging',
      },
      {
        id: 'loki',
        name: 'Loki',
        vendor: 'Community',
        description: 'Log aggregation for Grafana.',
        category: 'Monitoring',
      },
      {
        id: 'metabase',
        name: 'Metabase',
        vendor: 'Community',
        description: 'BI and analytics dashboards for your data.',
        category: 'Analytics',
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        vendor: 'Community',
        description: 'Document database for flexible schemas.',
        category: 'Database',
      },
      {
        id: 'mysql',
        name: 'MySQL',
        vendor: 'Community',
        description: 'Popular relational database for web apps.',
        category: 'Database',
      },
      {
        id: 'nats',
        name: 'NATS',
        vendor: 'Community',
        description: 'High performance messaging for microservices.',
        category: 'Messaging',
      },
      {
        id: 'nginx',
        name: 'NGINX',
        vendor: 'Community',
        description: 'Web server and reverse proxy for production traffic.',
        category: 'Networking',
      },
      {
        id: 'open-webui',
        name: 'Open WebUI',
        vendor: 'Community',
        description: 'Web UI for LLMs and local inference stacks.',
        category: 'AI',
      },
      {
        id: 'opensearch',
        name: 'OpenSearch',
        vendor: 'Community',
        description: 'Search and analytics suite for logs and text.',
        category: 'Search',
      },
      {
        id: 'pgadmin',
        name: 'pgAdmin',
        vendor: 'Community',
        description: 'Admin UI for managing PostgreSQL databases.',
        category: 'Database',
      },
      {
        id: 'rabbitmq',
        name: 'RabbitMQ',
        vendor: 'Community',
        description: 'Message broker for queues and pub/sub.',
        category: 'Messaging',
      },
      {
        id: 'redpanda',
        name: 'Redpanda',
        vendor: 'Community',
        description: 'Kafka-compatible streaming with a simpler ops model.',
        category: 'Messaging',
      },
      {
        id: 'sentry',
        name: 'Sentry',
        vendor: 'Community',
        description: 'Error tracking and performance monitoring for apps.',
        category: 'Monitoring',
      },
      {
        id: 'sonarqube',
        name: 'SonarQube',
        vendor: 'Community',
        description: 'Code quality and security analysis for projects.',
        category: 'Developer Tools',
      },
      {
        id: 'superset',
        name: 'Apache Superset',
        vendor: 'Community',
        description: 'Data exploration and visualization platform.',
        category: 'Analytics',
      },
      {
        id: 'temporal',
        name: 'Temporal',
        vendor: 'Community',
        description: 'Durable execution for workflows and long-running jobs.',
        category: 'Automation',
      },
      {
        id: 'trivy',
        name: 'Trivy',
        vendor: 'Community',
        description: 'Vulnerability scanner for containers and dependencies.',
        category: 'Security',
      },
      {
        id: 'weaviate',
        name: 'Weaviate',
        vendor: 'Community',
        description: 'Vector database for semantic search applications.',
        category: 'AI',
      },
      {
        id: 'nextcloud',
        name: 'Nextcloud',
        vendor: 'Community',
        description: 'File sync, sharing, and collaboration suite.',
        category: 'Productivity',
      },
      {
        id: 'mattermost',
        name: 'Mattermost',
        vendor: 'Community',
        description: 'Team messaging for secure collaboration.',
        category: 'Productivity',
      },
      {
        id: 'portainer',
        name: 'Portainer',
        vendor: 'Community',
        description: 'Simple UI for container management.',
        category: 'DevOps',
      },
      {
        id: 'jenkins',
        name: 'Jenkins',
        vendor: 'Community',
        description: 'CI/CD automation server for builds and pipelines.',
        category: 'DevOps',
      },
      {
        id: 'traefik',
        name: 'Traefik',
        vendor: 'Community',
        description: 'Edge router and reverse proxy for microservices.',
        category: 'Networking',
      },
      {
        id: 'strapi',
        name: 'Strapi',
        vendor: 'Community',
        description: 'Headless CMS to build APIs fast.',
        category: 'Web',
      },
      {
        id: 'ghost',
        name: 'Ghost',
        vendor: 'Community',
        description: 'Modern publishing platform for blogs and newsletters.',
        category: 'Web',
      },
      {
        id: 'hasura',
        name: 'Hasura',
        vendor: 'Community',
        description: 'Instant GraphQL API on top of your database.',
        category: 'Developer Tools',
      },
      {
        id: 'duckdb',
        name: 'DuckDB',
        vendor: 'Community',
        description: 'Fast embedded analytics database.',
        category: 'Database',
      },
      {
        id: 'vector',
        name: 'Vector',
        vendor: 'Community',
        description: 'High-performance observability data pipeline.',
        category: 'Monitoring',
      },
      {
        id: 'meilisearch',
        name: 'Meilisearch',
        vendor: 'Community',
        description: 'Fast, developer-friendly search engine.',
        category: 'Search',
      },
      {
        id: 'qdrant',
        name: 'Qdrant',
        vendor: 'Community',
        description: 'Vector search engine for embeddings and RAG.',
        category: 'AI',
      },
      {
        id: 'ollama',
        name: 'Ollama',
        vendor: 'Community',
        description: 'Run and manage LLMs locally with a simple runtime.',
        category: 'AI',
      },
      {
        id: 'whoami',
        name: 'Whoami',
        vendor: 'Community',
        description: 'Tiny app for testing routing, headers, and networking.',
        category: 'Networking',
      },
    ],
    []
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const app of apps) set.add(app.category);
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [apps]);

  const filteredApps = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = apps.filter((app) => {
      const matchesQuery =
        q.length === 0 ||
        app.name.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.vendor.toLowerCase().includes(q);

      const matchesCategory = category === 'All' || app.category === category;

      return matchesQuery && matchesCategory;
    });

    if (!hideDuplicates) return rows;

    const seen = new Set<string>();
    return rows.filter((app) => {
      const key = app.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [apps, category, hideDuplicates, query]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans transition-colors duration-300">
      <Nav />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Applications</h1>
                <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
                  {filteredApps.length} apps
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)] transition-colors">
                  <Plus size={16} />
                  Start Server/App
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)] transition-colors">
                  <Upload size={16} />
                  Import Compose File
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)] transition-colors">
                  <FolderOpen size={16} />
                  Sources
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-[360px]">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-tertiary)]"
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search apps"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-tertiary)] focus:outline-none focus:border-[rgba(var(--accent-rgb),0.45)] transition-colors"
                  />
                </div>

                <div className="relative">
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-tertiary)]"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="appearance-none w-full sm:w-[240px] px-4 pr-9 py-2.5 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] focus:outline-none focus:border-[rgba(var(--accent-rgb),0.45)] transition-colors"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="inline-flex items-center gap-2 text-sm text-[color:var(--text-secondary)] select-none">
                <input
                  type="checkbox"
                  checked={hideDuplicates}
                  onChange={(e) => setHideDuplicates(e.target.checked)}
                  className="h-4 w-4 rounded border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]"
                />
                Filter duplicates
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="group rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-transform hover:-translate-y-0.5 hover:border-[rgba(var(--accent-rgb),0.35)]"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={dashboardIconUrlFor(app.id)}
                      alt={`${app.name} logo`}
                      className="w-8 h-8 object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = logoDataUriFor(app.name);
                        e.currentTarget.className = 'w-11 h-11 object-cover';
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 className="font-semibold truncate">{app.name}</h3>
                      <span className="text-xs text-[color:var(--text-tertiary)] truncate">@ {app.vendor}</span>
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--text-secondary)] leading-relaxed line-clamp-1">
                      {app.description}
                    </div>
                    <div className="mt-1 text-xs italic text-[color:var(--text-tertiary)] truncate">
                      {app.category}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[color:var(--accent)] text-white text-sm font-semibold hover:bg-[color:var(--accent-hover)] transition-colors">
                    Deploy now
                    <Rocket size={16} />
                  </button>

                  <button className="text-sm font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredApps.length === 0 && (
            <div className="mt-12 text-center text-[color:var(--text-secondary)]">
              No apps found.
            </div>
          )}

          <section className="mt-16 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-12 shadow-[0_18px_55px_rgba(0,0,0,0.10)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Powerful Marketplace App - Description - In 1 Click...
                </h2>
                <p className="mt-2 text-sm md:text-base text-[color:var(--text-secondary)]">
                  Pick an app, review the defaults, and deploy instantly. Every card is pre-configured for a clean
                  start with sensible settings, secure networking, and a fast path from idea to running service.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[color:var(--accent)] text-white text-sm font-semibold hover:bg-[color:var(--accent-hover)] transition-colors">
                  Deploy in 1 Click
                  <Rocket size={16} />
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)] transition-colors">
                  Browse categories
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] p-4">
                <div className="text-sm font-semibold">Logos included</div>
                <div className="mt-1 text-sm text-[color:var(--text-secondary)]">
                  Each app card has its own recognizable logo for faster scanning.
                </div>
              </div>
              <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] p-4">
                <div className="text-sm font-semibold">Curated templates</div>
                <div className="mt-1 text-sm text-[color:var(--text-secondary)]">
                  Deploy common stacks with sane defaults and consistent networking.
                </div>
              </div>
              <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] p-4">
                <div className="text-sm font-semibold">One-click deploy</div>
                <div className="mt-1 text-sm text-[color:var(--text-secondary)]">
                  Launch faster with a single action and iterate from a working baseline.
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
