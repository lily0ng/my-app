import { useMemo, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Globe,
  HardDrive,
  Info,
  Layers,
  Network,
  Rocket,
  Server,
  Shield,
  Zap,
} from 'lucide-react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import {
  dashboardIconUrlFor,
  logoDataUriFor,
  marketplaceAppsCatalog,
  type MarketplaceApp,
} from './MarketplaceAppsPage';

type VmRequirements = {
  vcpu: number;
  memoryGb: number;
  storageGb: number;
  notes?: string;
  network?: {
    inboundPorts?: number[];
    protocols?: string[];
  };
};

type MarketplaceAppDetails = {
  purpose: string[];
  overview: string;
  vm: VmRequirements;
  readyToDeploy: {
    status: 'ready' | 'review';
    title: string;
    bullets: string[];
  };
  recommendedFor: string[];
  securityNotes: string[];
  operationalNotes: string[];
  links?: { label: string; href: string }[];
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const detailsFor = (app: MarketplaceApp): MarketplaceAppDetails => {
  const category = app.category.toLowerCase();

  const defaults: MarketplaceAppDetails = (() => {
    if (category.includes('database')) {
      return {
        purpose: ['Durable data storage', 'Reliable reads/writes for applications', 'Backups and restore workflows'],
        overview:
          'A data layer is the foundation for most production workloads. This template helps you stand up a clean baseline and scale as traffic and retention grow.',
        vm: {
          vcpu: 2,
          memoryGb: 4,
          storageGb: 50,
          network: { inboundPorts: [5432], protocols: ['TCP'] },
          notes: 'Start small for dev/test and scale CPU/RAM for concurrency. Increase storage for retention and backups.',
        },
        readyToDeploy: {
          status: 'review',
          title: 'Ready to deploy to 1CNG (review settings)',
          bullets: [
            'Confirm storage class and backup policy',
            'Restrict inbound access to trusted networks',
            'Set initial admin credentials and rotation policy',
          ],
        },
        recommendedFor: ['Production data stores', 'Internal tools', 'Stateful services'],
        securityNotes: ['Restrict inbound exposure', 'Enable encryption at rest where supported', 'Use secrets management for credentials'],
        operationalNotes: ['Monitor disk usage', 'Enable backups/snapshots', 'Set resource limits for noisy neighbors'],
      } satisfies MarketplaceAppDetails;
    }

    if (category.includes('monitoring') || category.includes('observability')) {
      return {
        purpose: ['Service health visibility', 'Dashboards and alerting', 'Performance and reliability tracking'],
        overview:
          'Observability apps help you see what is happening across services, nodes, and networks. This detail view highlights common sizing and deployment considerations.',
        vm: {
          vcpu: 2,
          memoryGb: 4,
          storageGb: 30,
          network: { inboundPorts: [3000], protocols: ['TCP'] },
          notes: 'Increase memory and storage as you retain more metrics/logs. Consider external storage for long retention.',
        },
        readyToDeploy: {
          status: 'ready',
          title: 'Ready to deploy to 1CNG',
          bullets: ['Sane defaults for internal access', 'Persistent volumes enabled', 'Health endpoints and ports documented'],
        },
        recommendedFor: ['SRE teams', 'Platform engineering', 'Ops dashboards'],
        securityNotes: ['Put behind SSO or a reverse proxy', 'Limit admin roles', 'Audit API tokens'],
        operationalNotes: ['Configure retention windows', 'Define alert routes and on-call policies', 'Pin versions for predictable upgrades'],
      } satisfies MarketplaceAppDetails;
    }

    if (category.includes('security')) {
      return {
        purpose: ['Access control', 'Secrets and credentials handling', 'Reducing blast radius of incidents'],
        overview:
          'Security applications are the control plane for identity, secrets, and policy. The key is a secure-by-default baseline and clear operational procedures.',
        vm: {
          vcpu: 2,
          memoryGb: 4,
          storageGb: 20,
          network: { inboundPorts: [8200], protocols: ['TCP'] },
          notes: 'For production, consider HA and secure storage. Keep access tightly restricted and audited.',
        },
        readyToDeploy: {
          status: 'review',
          title: 'Ready to deploy to 1CNG (security review)',
          bullets: ['Configure TLS', 'Lock down inbound access', 'Define admin bootstrap + recovery procedure'],
        },
        recommendedFor: ['Security teams', 'Platform identity', 'Workload protection'],
        securityNotes: ['Enforce TLS', 'Use least privilege', 'Keep audit logs enabled'],
        operationalNotes: ['Document recovery steps', 'Rotate keys on a schedule', 'Test restore and failover'],
      } satisfies MarketplaceAppDetails;
    }

    if (category.includes('devops') || category.includes('developer tools')) {
      return {
        purpose: ['Developer productivity', 'Automation and CI/CD', 'Code and artifact workflows'],
        overview:
          'Developer tools reduce cycle time and standardize how teams build, test, and release services. The right defaults help teams ship safely and consistently.',
        vm: {
          vcpu: 2,
          memoryGb: 4,
          storageGb: 25,
          network: { inboundPorts: [3000, 8080], protocols: ['TCP'] },
          notes: 'Storage needs depend on repos, artifacts, and retention. For production, separate data volumes from app compute.',
        },
        readyToDeploy: {
          status: 'ready',
          title: 'Ready to deploy to 1CNG',
          bullets: ['Template networking pre-configured', 'Persistent volumes for state', 'Upgrade path documented'],
        },
        recommendedFor: ['Engineering teams', 'CI/CD pipelines', 'Internal platforms'],
        securityNotes: ['Enable SSO where possible', 'Restrict admin access', 'Use SSH keys/tokens carefully'],
        operationalNotes: ['Plan upgrade windows', 'Enable backups for stateful data', 'Monitor CPU usage during peak activity'],
      } satisfies MarketplaceAppDetails;
    }

    return {
      purpose: ['Self-hosted service deployment', 'Team enablement', 'A starting point you can customize'],
      overview:
        'This marketplace template provides a clear baseline for deploying the application on 1CNG. Review resource sizing, networking, and persistence before production rollout.',
      vm: {
        vcpu: 2,
        memoryGb: 2,
        storageGb: 20,
        network: { inboundPorts: [80, 443], protocols: ['TCP'] },
        notes: 'This is a suggested starter profile. Adjust based on traffic, concurrency, and data retention.',
      },
      readyToDeploy: {
        status: 'review',
        title: 'Ready to deploy to 1CNG (review settings)',
        bullets: ['Confirm inbound ports', 'Select storage/persistence', 'Validate environment variables'],
      },
      recommendedFor: ['Internal tools', 'Small-to-medium services'],
      securityNotes: ['Restrict exposure to trusted networks', 'Use strong admin credentials', 'Apply regular updates'],
      operationalNotes: ['Add monitoring/alerts', 'Pin versions', 'Test rollback'],
    } satisfies MarketplaceAppDetails;
  })();

  const byId: Partial<Record<string, Partial<MarketplaceAppDetails>>> = {
    grafana: {
      vm: { vcpu: 2, memoryGb: 4, storageGb: 20, network: { inboundPorts: [3000], protocols: ['TCP'] } },
      purpose: ['Dashboards for metrics/logs/traces', 'Team shared visibility', 'Alerting and incident response workflows'],
      overview:
        'Grafana provides a unified dashboard layer across metrics and logs. It is most effective when paired with a metrics backend (Prometheus, Mimir, etc.) and centralized authentication.',
      readyToDeploy: {
        status: 'ready',
        title: 'Ready to deploy to 1CNG',
        bullets: ['UI port and health checks pre-defined', 'Persisted configuration and dashboards', 'Recommended reverse-proxy/SSO placement'],
      },
      operationalNotes: ['Back up dashboards and data sources', 'Use folder + team permissions', 'Keep plugins minimal and curated'],
    },
    prometheus: {
      vm: { vcpu: 2, memoryGb: 4, storageGb: 50, network: { inboundPorts: [9090], protocols: ['TCP'] } },
      purpose: ['Metrics collection + alert rules', 'Service-level visibility', 'Capacity planning and reliability'],
      overview:
        'Prometheus scrapes metrics on an interval and stores time-series data locally. Storage and memory requirements grow with scrape targets, label cardinality, and retention period.',
      readyToDeploy: {
        status: 'review',
        title: 'Ready to deploy to 1CNG (review retention)',
        bullets: ['Set retention window', 'Confirm persistent volume size', 'Restrict UI access'],
      },
      operationalNotes: ['Watch label cardinality', 'Define scrape jobs deliberately', 'Externalize long-term retention if needed'],
    },
    postgres: {
      vm: { vcpu: 2, memoryGb: 4, storageGb: 80, network: { inboundPorts: [5432], protocols: ['TCP'] } },
      purpose: ['Relational database for apps', 'Transactional workloads', 'Reliable data integrity'],
      overview:
        'PostgreSQL is a widely used relational database. For production, plan for backups, WAL/log retention, and controlled network access.',
      readyToDeploy: {
        status: 'review',
        title: 'Ready to deploy to 1CNG (review storage + backups)',
        bullets: ['Confirm disk performance and size', 'Set backup schedule', 'Lock down inbound access'],
      },
    },
    redis: {
      vm: { vcpu: 2, memoryGb: 4, storageGb: 10, network: { inboundPorts: [6379], protocols: ['TCP'] } },
      purpose: ['Caching layer', 'Rate-limits and sessions', 'Queues and ephemeral state'],
      overview:
        'Redis is a high-performance in-memory store. Size memory based on dataset + headroom. Restrict network access, as Redis is typically not exposed publicly.',
      readyToDeploy: {
        status: 'review',
        title: 'Ready to deploy to 1CNG (review persistence mode)',
        bullets: ['Choose persistence strategy', 'Set memory limits', 'Restrict inbound access'],
      },
      operationalNotes: ['Set eviction policies', 'Monitor memory fragmentation', 'Consider replicas for high availability'],
    },
    gitea: {
      vm: { vcpu: 2, memoryGb: 2, storageGb: 40, network: { inboundPorts: [3000, 22], protocols: ['TCP'] } },
      purpose: ['Self-hosted Git service', 'Internal code hosting', 'Team collaboration'],
      overview:
        'Gitea is a lightweight Git service ideal for internal repositories. Plan persistent storage for repositories and attachments, and protect access with SSO or trusted networks.',
      readyToDeploy: {
        status: 'ready',
        title: 'Ready to deploy to 1CNG',
        bullets: ['Repo data persisted', 'HTTP + optional SSH ports listed', 'Works well behind a reverse proxy'],
      },
    },
    minio: {
      vm: { vcpu: 2, memoryGb: 4, storageGb: 100, network: { inboundPorts: [9000, 9001], protocols: ['TCP'] } },
      purpose: ['S3-compatible object storage', 'Artifacts, backups, and datasets', 'Internal storage APIs'],
      overview:
        'MinIO provides S3-compatible object storage. Storage sizing depends on datasets and retention, and production deployments should consider redundancy and lifecycle policies.',
      readyToDeploy: {
        status: 'review',
        title: 'Ready to deploy to 1CNG (review storage topology)',
        bullets: ['Confirm disk size and redundancy', 'Set access keys securely', 'Restrict admin console exposure'],
      },
    },
    vault: {
      vm: { vcpu: 2, memoryGb: 4, storageGb: 20, network: { inboundPorts: [8200], protocols: ['TCP'] } },
      purpose: ['Central secrets management', 'Dynamic credentials', 'Policy-based access control'],
      overview:
        'Vault is a secrets and encryption service. Production requires careful planning: storage backend, unseal strategy, backup/restore, and strict access controls.',
      readyToDeploy: {
        status: 'review',
        title: 'Ready to deploy to 1CNG (security review)',
        bullets: ['Configure TLS and auth methods', 'Define unseal/recovery runbooks', 'Restrict UI and API to trusted networks'],
      },
      securityNotes: ['Treat root tokens as break-glass only', 'Enable audit devices', 'Prefer short-lived credentials'],
    },
    n8n: {
      vm: { vcpu: 2, memoryGb: 4, storageGb: 20, network: { inboundPorts: [5678], protocols: ['TCP'] } },
      purpose: ['Workflow automation', 'Integrations and internal tooling', 'Event-driven operations'],
      overview:
        'n8n enables automation across systems. Plan for secrets management, credential access, and workflow versioning. Restrict UI access to trusted users.',
      readyToDeploy: {
        status: 'ready',
        title: 'Ready to deploy to 1CNG',
        bullets: ['Workflow state persisted', 'HTTP port documented', 'Safe baseline for internal access'],
      },
    },
    supabase: {
      vm: { vcpu: 4, memoryGb: 8, storageGb: 80, network: { inboundPorts: [80, 443], protocols: ['TCP'] } },
      purpose: ['Backend platform (auth + APIs + Postgres)', 'Rapid app development', 'Self-hosted developer experience'],
      overview:
        'Supabase bundles multiple services. It is best treated as a small platform: size for peak load, ensure persistence, and confirm network and auth configuration before production.',
      readyToDeploy: {
        status: 'review',
        title: 'Ready to deploy to 1CNG (review multi-service sizing)',
        bullets: ['Confirm CPU/RAM headroom', 'Validate environment variables', 'Restrict admin surfaces'],
      },
      operationalNotes: ['Plan upgrades carefully', 'Back up Postgres and configuration', 'Monitor all sub-services as a unit'],
    },
    'argo-cd': {
      vm: { vcpu: 2, memoryGb: 4, storageGb: 20, network: { inboundPorts: [8080], protocols: ['TCP'] } },
      purpose: ['GitOps continuous delivery', 'Cluster sync + drift detection', 'Declarative deployments'],
      overview:
        'Argo CD syncs desired state from Git to your runtime. For production, connect it to SSO, protect admin access, and maintain clear repo ownership.',
      readyToDeploy: {
        status: 'ready',
        title: 'Ready to deploy to 1CNG',
        bullets: ['Web UI exposed as an internal service', 'Persistent state enabled', 'Clear onboarding path for repositories'],
      },
    },
    keycloak: {
      vm: { vcpu: 2, memoryGb: 4, storageGb: 20, network: { inboundPorts: [8080], protocols: ['TCP'] } },
      purpose: ['SSO and identity provider', 'OAuth/OIDC integrations', 'Centralized authentication'],
      overview:
        'Keycloak provides identity and access management for apps. For production, plan for persistence, backups, and high availability depending on your SSO criticality.',
      readyToDeploy: {
        status: 'review',
        title: 'Ready to deploy to 1CNG (review identity settings)',
        bullets: ['Configure TLS and trusted domains', 'Persist database and config', 'Restrict admin console access'],
      },
    },
  };

  const override = byId[app.id] ?? {};

  const merged: MarketplaceAppDetails = {
    purpose: override.purpose ?? defaults.purpose,
    overview: override.overview ?? defaults.overview,
    vm: {
      vcpu: override.vm?.vcpu ?? defaults.vm.vcpu,
      memoryGb: override.vm?.memoryGb ?? defaults.vm.memoryGb,
      storageGb: override.vm?.storageGb ?? defaults.vm.storageGb,
      network: override.vm?.network ?? defaults.vm.network,
      notes: override.vm?.notes ?? defaults.vm.notes,
    },
    readyToDeploy: override.readyToDeploy ?? defaults.readyToDeploy,
    recommendedFor: override.recommendedFor ?? defaults.recommendedFor,
    securityNotes: override.securityNotes ?? defaults.securityNotes,
    operationalNotes: override.operationalNotes ?? defaults.operationalNotes,
    links: override.links ?? defaults.links,
  };

  merged.vm.vcpu = clamp(merged.vm.vcpu, 1, 64);
  merged.vm.memoryGb = clamp(merged.vm.memoryGb, 1, 512);
  merged.vm.storageGb = clamp(merged.vm.storageGb, 5, 10000);

  return merged;
};

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] px-2.5 py-1 text-xs font-semibold text-[color:var(--text-secondary)]">
      {children}
    </span>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  helper,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  options: string[];
  helper?: string;
}) {
  return (
    <div>
      <div className="text-xs font-semibold text-[color:var(--text-secondary)]">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none focus:ring-2 focus:ring-[rgba(var(--accent-rgb),0.25)]"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {helper ? <div className="mt-2 text-xs text-[color:var(--text-tertiary)]">{helper}</div> : null}
    </div>
  );
}

type DeployStep = 'app' | 'os' | 'vm' | 'network' | 'deploy';

function StepCard({
  icon,
  title,
  active,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'group w-[156px] h-[104px] rounded-2xl border px-4 py-4 transition-colors shadow-[0_6px_18px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center ' +
        (active
          ? 'border-[rgba(var(--accent-rgb),0.45)] bg-[rgba(var(--accent-rgb),0.08)]'
          : 'border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] hover:bg-[color:var(--bg-tertiary)]')
      }
    >
      <div
        className={
          'flex h-10 w-10 items-center justify-center rounded-xl border ' +
          (active
            ? 'border-[rgba(var(--accent-rgb),0.35)] bg-[color:var(--bg-secondary)] text-[color:var(--accent)]'
            : 'border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] text-[color:var(--text-secondary)] group-hover:text-[color:var(--accent)]')
        }
      >
        {icon}
      </div>
      <div className="mt-3 text-[13px] font-semibold leading-tight text-center text-[color:var(--text-primary)]">
        {title}
      </div>
    </button>
  );
}

function SpecRow({
  icon,
  label,
  value,
  sub,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] p-4">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(var(--accent-rgb),0.10)] text-[color:var(--accent)]">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold">{label}</div>
        <div className="mt-0.5 text-sm text-[color:var(--text-secondary)]">{value}</div>
        {sub ? <div className="mt-1 text-xs text-[color:var(--text-tertiary)]">{sub}</div> : null}
      </div>
    </div>
  );
}

export function MarketplaceAppDetailsPage() {
  const { appId } = useParams();
  const navigate = useNavigate();

  const app = useMemo(
    () => marketplaceAppsCatalog.find((a) => a.id === appId) ?? null,
    [appId]
  );

  const details = useMemo(() => (app ? detailsFor(app) : null), [app]);

  const [deployOs, setDeployOs] = useState('Ubuntu 22.04 LTS');
  const [deployVmType, setDeployVmType] = useState('General purpose');
  const [deployNetwork, setDeployNetwork] = useState('Private VPC');
  const [deployExposure, setDeployExposure] = useState('Internal');
  const [deployStep, setDeployStep] = useState<DeployStep>('app');

  const scrollToDeploy = () => {
    const el = document.getElementById('deploy-flow');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans transition-colors duration-300">
      <Nav />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-2 text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)] transition-colors"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <Link
                to="/resources/marketplace-apps"
                className="text-sm font-semibold text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
              >
                Marketplace
              </Link>
            </div>

            {!app || !details ? (
              <div className="mt-6 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 shadow-[0_18px_55px_rgba(0,0,0,0.10)]">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(239,68,68,0.12)] text-[rgb(239,68,68)]">
                    <Info size={20} />
                  </div>
                  <div>
                    <div className="text-xl font-semibold">App not found</div>
                    <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                      The application you’re looking for isn’t in the catalog.
                    </div>
                    <Link
                      to="/resources/marketplace-apps"
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[color:var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--accent-hover)] transition-colors"
                    >
                      Browse apps
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-2 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6 md:p-10 shadow-[0_18px_55px_rgba(0,0,0,0.10)]">
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="h-16 w-16 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={dashboardIconUrlFor(app.id)}
                          alt={`${app.name} logo`}
                          className="w-10 h-10 object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = logoDataUriFor(app.name);
                            e.currentTarget.className = 'w-14 h-14 object-cover';
                          }}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{app.name}</h1>
                          <Pill>@ {app.vendor}</Pill>
                          <Pill>{app.category}</Pill>
                        </div>
                        <div className="mt-2 text-sm md:text-base text-[color:var(--text-secondary)] leading-relaxed max-w-3xl">
                          {details.overview}
                        </div>
                        <div className="mt-4 text-sm text-[color:var(--text-secondary)] leading-relaxed max-w-3xl">
                          <span className="font-semibold text-[color:var(--text-primary)]">Quick description: </span>
                          {app.description}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={scrollToDeploy}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--accent-hover)] transition-colors"
                      >
                        Deploy to 1CNG
                        <Rocket size={16} />
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)] transition-colors">
                        View docs
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] p-6 shadow-[0_14px_40px_rgba(0,0,0,0.10)] overflow-hidden relative">
                      <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_top,_rgba(var(--accent-rgb),0.10),transparent_55%)]" />
                      <div className="relative">
                      <div className="text-sm font-semibold">Purpose</div>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {details.purpose.map((p) => (
                          <div
                            key={p}
                            className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3 text-sm"
                          >
                            {p}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 text-sm font-semibold">Recommended for</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {details.recommendedFor.map((x) => (
                          <Pill key={x}>{x}</Pill>
                        ))}
                      </div>
                      </div>
                    </div>

                    <div
                      className="rounded-3xl border border-[color:var(--border-color)] p-6 shadow-[0_14px_40px_rgba(0,0,0,0.10)] overflow-hidden relative"
                      style={{
                        background:
                          details.readyToDeploy.status === 'ready'
                            ? 'rgba(34,197,94,0.10)'
                            : 'rgba(234,179,8,0.12)',
                      }}
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_rgba(var(--accent-rgb),0.10),transparent_55%)]" />
                      <div className="flex items-start gap-3">
                        <div
                          className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl"
                          style={{
                            background:
                              details.readyToDeploy.status === 'ready'
                                ? 'rgba(34,197,94,0.18)'
                                : 'rgba(234,179,8,0.18)',
                            color: details.readyToDeploy.status === 'ready' ? 'rgb(34,197,94)' : 'rgb(234,179,8)',
                          }}
                        >
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{details.readyToDeploy.title}</div>
                          <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                            {details.readyToDeploy.bullets.map((b) => (
                              <div key={b} className="flex items-start gap-2">
                                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color:var(--text-tertiary)]" />
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={scrollToDeploy}
                            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--accent-hover)] transition-colors w-full"
                          >
                            Deploy now
                            <Rocket size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="deploy-flow"
                  className="mt-6 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6 md:p-8 shadow-[0_18px_55px_rgba(0,0,0,0.10)] overflow-hidden relative"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_20%_0%,_rgba(var(--accent-rgb),0.18),transparent_55%)]" />
                  <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(var(--accent-rgb),0.18)_1px,transparent_1px)] [background-size:44px_44px]" />

                  <div className="relative">
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                      <div>
                        <div className="text-xs font-semibold text-[color:var(--text-tertiary)] uppercase tracking-wider">
                          How to deploy
                        </div>
                        <div className="mt-1 text-2xl font-semibold tracking-tight">Deployment blueprint</div>
                        <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed max-w-3xl">
                          A recommended single-node setup flow. Choose OS, sizing, and network exposure before launching.
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Pill>{deployOs}</Pill>
                        <Pill>{deployVmType}</Pill>
                        <Pill>{deployNetwork}</Pill>
                        <Pill>{deployExposure}</Pill>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="w-full">
                        <div className="flex items-center justify-center gap-6 overflow-x-auto pb-2">
                          <StepCard
                            icon={<Layers size={18} />}
                            title="Choose app"
                            active={deployStep === 'app'}
                            onClick={() => setDeployStep('app')}
                          />
                          <ArrowRight size={20} className="shrink-0 text-[color:var(--text-tertiary)]" />
                          <StepCard
                            icon={<Globe size={18} />}
                            title="Select OS"
                            active={deployStep === 'os'}
                            onClick={() => setDeployStep('os')}
                          />
                          <ArrowRight size={20} className="shrink-0 text-[color:var(--text-tertiary)]" />
                          <StepCard
                            icon={<Server size={18} />}
                            title="Select VM type"
                            active={deployStep === 'vm'}
                            onClick={() => setDeployStep('vm')}
                          />
                          <ArrowRight size={20} className="shrink-0 text-[color:var(--text-tertiary)]" />
                          <StepCard
                            icon={<Network size={18} />}
                            title="Network select"
                            active={deployStep === 'network'}
                            onClick={() => setDeployStep('network')}
                          />
                          <ArrowRight size={20} className="shrink-0 text-[color:var(--text-tertiary)]" />
                          <StepCard
                            icon={<Rocket size={18} />}
                            title="Deploy now"
                            active={deployStep === 'deploy'}
                            onClick={() => setDeployStep('deploy')}
                          />
                        </div>

                        <div className="mt-6 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.10)]">
                          {deployStep === 'app' ? (
                            <div>
                              <div className="text-sm font-semibold">Choose app</div>
                              <div className="mt-1 text-sm text-[color:var(--text-secondary)]">
                                Confirm what you’re deploying.
                              </div>
                              <div className="mt-4 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-4">
                                <div className="text-sm font-semibold text-[color:var(--text-primary)]">{app.name}</div>
                                <div className="mt-1 text-xs text-[color:var(--text-tertiary)]">Vendor: {app.vendor}</div>
                                <div className="mt-3 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                                  {app.description}
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {deployStep === 'os' ? (
                            <div>
                              <div className="text-sm font-semibold">Select OS</div>
                              <div className="mt-1 text-sm text-[color:var(--text-secondary)]">
                                Pick a base image for the VM.
                              </div>
                              <div className="mt-4 max-w-xl">
                                <SelectField
                                  label="Operating system"
                                  value={deployOs}
                                  onChange={setDeployOs}
                                  options={['Ubuntu 22.04 LTS', 'Debian 12', 'Rocky Linux 9']}
                                  helper="Ubuntu is a good default for broad compatibility."
                                />
                              </div>
                            </div>
                          ) : null}

                          {deployStep === 'vm' ? (
                            <div>
                              <div className="text-sm font-semibold">Select instance / VM type</div>
                              <div className="mt-1 text-sm text-[color:var(--text-secondary)]">
                                Set CPU/RAM sizing and profile.
                              </div>
                              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                  <SelectField
                                    label="Instance profile"
                                    value={deployVmType}
                                    onChange={setDeployVmType}
                                    options={['General purpose', 'Memory optimized', 'Storage optimized']}
                                    helper={`Recommended baseline: ${details.vm.vcpu} vCPU · ${details.vm.memoryGb} GB RAM · ${details.vm.storageGb} GB disk`}
                                  />
                                </div>
                                <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-4">
                                  <div className="text-sm font-semibold">Baseline resources</div>
                                  <div className="mt-3 grid grid-cols-2 gap-2">
                                    <Pill>{details.vm.vcpu} vCPU</Pill>
                                    <Pill>{details.vm.memoryGb} GB RAM</Pill>
                                    <Pill>{details.vm.storageGb} GB disk</Pill>
                                    <Pill>
                                      {details.vm.network?.inboundPorts?.length
                                        ? `Ports ${details.vm.network.inboundPorts.join(', ')}`
                                        : 'Ports: review'}
                                    </Pill>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {deployStep === 'network' ? (
                            <div>
                              <div className="text-sm font-semibold">Network select</div>
                              <div className="mt-1 text-sm text-[color:var(--text-secondary)]">
                                Decide access and exposure.
                              </div>
                              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <SelectField
                                  label="Network"
                                  value={deployNetwork}
                                  onChange={setDeployNetwork}
                                  options={['Private VPC', 'Shared network', 'Public subnet (advanced)']}
                                />
                                <SelectField
                                  label="Exposure"
                                  value={deployExposure}
                                  onChange={setDeployExposure}
                                  options={['Internal', 'Private + VPN', 'Public (review firewall)']}
                                  helper="For production, prefer private networking and publish only required ports."
                                />
                              </div>
                            </div>
                          ) : null}

                          {deployStep === 'deploy' ? (
                            <div>
                              <div className="text-sm font-semibold">Deploy now</div>
                              <div className="mt-1 text-sm text-[color:var(--text-secondary)]">
                                Launch and verify health.
                              </div>
                              <div className="mt-4 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-4">
                                <div className="text-sm font-semibold">Deployment checklist</div>
                                <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                                  <div className="flex items-start gap-2">
                                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color:var(--text-tertiary)]" />
                                    <span>Confirm environment variables and credentials</span>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color:var(--text-tertiary)]" />
                                    <span>Verify persistence/volumes and backups</span>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color:var(--text-tertiary)]" />
                                    <span>Check health endpoint and inbound ports</span>
                                  </div>
                                </div>

                                <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--accent-hover)] transition-colors">
                                  Deploy now
                                  <Rocket size={16} />
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.10)] overflow-hidden relative">
                    <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_rgba(var(--accent-rgb),0.10),transparent_55%)]" />
                    <div className="relative">
                      <div className="text-lg font-semibold">Maximum requirements (Recommendations)</div>
                      <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                        Recommended upper-sizing guidance for performance headroom and smoother operations.
                      </div>

                      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <SpecRow
                          icon={<Cpu size={18} />}
                          label="Sizing"
                          value={`${details.vm.vcpu} vCPU · ${details.vm.memoryGb} GB RAM`}
                          sub="Scale up CPU/RAM for concurrency and retention."
                        />
                        <SpecRow
                          icon={<HardDrive size={18} />}
                          label="Persistence"
                          value={`${details.vm.storageGb} GB disk`}
                          sub="Use snapshots/backups before upgrades."
                        />
                        <SpecRow
                          icon={<Shield size={18} />}
                          label="Security"
                          value={details.securityNotes[0] ?? 'Restrict access and rotate credentials.'}
                          sub="Prefer SSO/reverse proxy and least privilege."
                        />
                        <SpecRow
                          icon={<Network size={18} />}
                          label="Network"
                          value={
                            details.vm.network?.inboundPorts?.length
                              ? `Publish only: ${details.vm.network.inboundPorts.join(', ')}`
                              : 'Publish only what you need'
                          }
                          sub="Default to private networking."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.10)] overflow-hidden relative">
                    <div className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(ellipse_at_top,_rgba(var(--accent-rgb),0.10),transparent_55%)]" />
                    <div className="relative">
                      <div className="text-lg font-semibold">Ports & protocols</div>
                      <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                        Review inbound access before exposing services.
                      </div>

                      <div className="mt-4 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] p-4">
                        <div className="text-sm font-semibold">Inbound</div>
                        <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                          {details.vm.network?.inboundPorts?.length
                            ? details.vm.network.inboundPorts.join(', ')
                            : 'Review per deployment'}
                        </div>
                        <div className="mt-4 text-sm font-semibold">Protocols</div>
                        <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                          {details.vm.network?.protocols?.length ? details.vm.network.protocols.join(', ') : 'TCP'}
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-[color:var(--text-tertiary)] leading-relaxed">
                        For public exposure, put the service behind a reverse proxy/WAF and restrict admin surfaces.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    <div className="text-lg font-semibold">Minimum requirements</div>
                    <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                      Minimum baseline for a single-node deployment. Scale up based on concurrency, data retention, and your environment.
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <SpecRow icon={<Cpu size={18} />} label="CPU" value={`${details.vm.vcpu} vCPU`} />
                      <SpecRow icon={<Zap size={18} />} label="Memory" value={`${details.vm.memoryGb} GB RAM`} />
                      <SpecRow icon={<HardDrive size={18} />} label="Storage" value={`${details.vm.storageGb} GB disk`} />
                      <SpecRow
                        icon={<Network size={18} />}
                        label="Networking"
                        value={
                          details.vm.network?.inboundPorts?.length
                            ? `Inbound ports: ${details.vm.network.inboundPorts.join(', ')}`
                            : 'Inbound ports: review per deployment'
                        }
                        sub={details.vm.network?.protocols?.length ? `Protocols: ${details.vm.network.protocols.join(', ')}` : undefined}
                      />
                    </div>

                    {details.vm.notes ? (
                      <div className="mt-4 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] p-4 text-sm text-[color:var(--text-secondary)]">
                        {details.vm.notes}
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    <div className="text-lg font-semibold">Operational notes</div>
                    <div className="mt-4 flex flex-col gap-3">
                      <SpecRow icon={<Database size={18} />} label="Operations" value={details.operationalNotes[0] ?? 'Plan upgrades and backups.'} />
                      <SpecRow icon={<Shield size={18} />} label="Security" value={details.securityNotes[0] ?? 'Restrict access and rotate credentials.'} />
                      <SpecRow icon={<Globe size={18} />} label="Exposure" value="Prefer private networking; publish only what you need." />
                    </div>

                    <div className="mt-6">
                      <div className="text-sm font-semibold">More guidance</div>
                      <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                        {details.operationalNotes.slice(1, 4).map((x) => (
                          <div key={x} className="flex items-start gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color:var(--text-tertiary)]" />
                            <span>{x}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-sm font-semibold">Security checklist</div>
                      <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                        {details.securityNotes.slice(0, 4).map((x) => (
                          <div key={x} className="flex items-start gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color:var(--text-tertiary)]" />
                            <span>{x}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
