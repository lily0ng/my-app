import { useEffect, useMemo, useState } from "react";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import {
  Calculator,
  Server,
  Shield,
  Database,
  HardDrive,
  Boxes,
  Globe,
  Layers,
  Network,
  Plus,
  Search,
  Trash2,
  X,
  ArrowRight,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";

// Types
type CalculatorLineItem = {
  key: string;
  label: string;
  unit: string;
  monthlyRate: number;
  defaultQuantity: number;
};

type CalculatorServiceTemplate = {
  id: string;
  name: string;
  description: string;
  Icon: typeof Server;
  items: CalculatorLineItem[];
};

type CalculatorSelectedService = {
  instanceId: string;
  templateId: string;
  quantities: Record<string, number>;
};

// Default service ID - Cloud Compute is pre-selected
const DEFAULT_SERVICE_ID = "compute";

// Service templates configuration
const calculatorTemplates: CalculatorServiceTemplate[] = [
  {
    id: "compute",
    name: "Cloud Compute",
    description: "General purpose VMs for web apps, APIs, and background jobs.",
    Icon: Server,
    items: [
      {
        key: "vcpuHours",
        label: "vCPU-hours",
        unit: "hours",
        monthlyRate: 0.015,
        defaultQuantity: 720,
      },
      {
        key: "memoryGiBHours",
        label: "Memory GiB-hours",
        unit: "GiB-hours",
        monthlyRate: 0.0025,
        defaultQuantity: 720,
      },
      {
        key: "egressGB",
        label: "Data egress",
        unit: "GB",
        monthlyRate: 0.01,
        defaultQuantity: 100,
      },
    ],
  },
  {
    id: "gpu",
    name: "Cloud GPU",
    description: "On-demand GPUs for training, fine-tuning, and inference.",
    Icon: Shield,
    items: [
      {
        key: "gpuHours",
        label: "GPU-hours",
        unit: "hours",
        monthlyRate: 1.1,
        defaultQuantity: 40,
      },
      {
        key: "storageGB",
        label: "Local NVMe",
        unit: "GB",
        monthlyRate: 0.12,
        defaultQuantity: 200,
      },
    ],
  },
  {
    id: "databases",
    name: "Managed Databases",
    description: "Managed Postgres/Redis with backups and monitoring.",
    Icon: Database,
    items: [
      {
        key: "dbHours",
        label: "Database runtime",
        unit: "hours",
        monthlyRate: 0.06,
        defaultQuantity: 720,
      },
      {
        key: "dbStorageGB",
        label: "Storage",
        unit: "GB",
        monthlyRate: 0.12,
        defaultQuantity: 100,
      },
      {
        key: "backupGB",
        label: "Backups",
        unit: "GB",
        monthlyRate: 0.04,
        defaultQuantity: 50,
      },
    ],
  },
  {
    id: "blockStorage",
    name: "Block Storage",
    description: "Persistent volumes for stateful services and databases.",
    Icon: HardDrive,
    items: [
      {
        key: "volumeGB",
        label: "Provisioned storage",
        unit: "GB",
        monthlyRate: 0.1,
        defaultQuantity: 200,
      },
      {
        key: "snapshotsGB",
        label: "Snapshots",
        unit: "GB",
        monthlyRate: 0.05,
        defaultQuantity: 50,
      },
    ],
  },
  {
    id: "objectStorage",
    name: "Object Storage",
    description: "S3-compatible storage for assets, logs, and datasets.",
    Icon: Boxes,
    items: [
      {
        key: "storageGB",
        label: "Storage",
        unit: "GB",
        monthlyRate: 0.02,
        defaultQuantity: 500,
      },
      {
        key: "requestsM",
        label: "Requests",
        unit: "million",
        monthlyRate: 0.4,
        defaultQuantity: 2,
      },
      {
        key: "egressGB",
        label: "Egress",
        unit: "GB",
        monthlyRate: 0.01,
        defaultQuantity: 100,
      },
    ],
  },
  {
    id: "cdn",
    name: "CDN",
    description: "Content delivery with caching and TLS.",
    Icon: Globe,
    items: [
      {
        key: "egressGB",
        label: "Egress",
        unit: "GB",
        monthlyRate: 0.01,
        defaultQuantity: 250,
      },
      {
        key: "requestsM",
        label: "Requests",
        unit: "million",
        monthlyRate: 0.3,
        defaultQuantity: 5,
      },
    ],
  },
  {
    id: "kubernetes",
    name: "Kubernetes Engine",
    description: "Managed Kubernetes control plane + nodes from compute.",
    Icon: Layers,
    items: [
      {
        key: "clusters",
        label: "Clusters",
        unit: "count",
        monthlyRate: 0,
        defaultQuantity: 1,
      },
      {
        key: "nodes",
        label: "Worker nodes",
        unit: "count",
        monthlyRate: 12,
        defaultQuantity: 3,
      },
    ],
  },
  {
    id: "loadBalancers",
    name: "Load Balancers",
    description: "Traffic distribution with health checks and TLS.",
    Icon: Network,
    items: [
      {
        key: "lbs",
        label: "Load balancers",
        unit: "count",
        monthlyRate: 10,
        defaultQuantity: 1,
      },
      {
        key: "processedGB",
        label: "Processed data",
        unit: "GB",
        monthlyRate: 0.008,
        defaultQuantity: 300,
      },
    ],
  },
];

// Filtered templates for selector (excluding default service)
const selectableTemplates = calculatorTemplates.filter(
  (t) => t.id !== DEFAULT_SERVICE_ID,
);

// Format currency helper
const formatMoney = (value: number) => {
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
};

export function PricingCalculatorPage() {
  const [calculatorQuery, setCalculatorQuery] = useState("");
  const [calculatorPickerOpen, setCalculatorPickerOpen] = useState(false);
  const [calculatorServices, setCalculatorServices] = useState<
    CalculatorSelectedService[]
  >([]);
  const [resetKey, setResetKey] = useState(0);

  // Initialize with Cloud Compute as default
  useEffect(() => {
    const defaultTemplate = calculatorTemplates.find(
      (t) => t.id === DEFAULT_SERVICE_ID,
    )!;
    const quantities: Record<string, number> = {};
    defaultTemplate.items.forEach((i) => {
      quantities[i.key] = i.defaultQuantity;
    });
    setCalculatorServices([
      {
        instanceId: `${DEFAULT_SERVICE_ID}-${resetKey}`,
        templateId: DEFAULT_SERVICE_ID,
        quantities,
      },
    ]);
  }, [resetKey]);

  const addCalculatorService = (templateId: string) => {
    const template = calculatorTemplates.find((t) => t.id === templateId);
    if (!template) return;

    const instanceId = `${templateId}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const quantities: Record<string, number> = {};
    template.items.forEach((i) => {
      quantities[i.key] = i.defaultQuantity;
    });

    setCalculatorServices((prev) => [
      ...prev,
      { instanceId, templateId, quantities },
    ]);
    setCalculatorPickerOpen(false);
    setCalculatorQuery("");
  };

  const removeCalculatorService = (instanceId: string) => {
    // Prevent removing the default Cloud Compute service
    const service = calculatorServices.find((s) => s.instanceId === instanceId);
    if (
      service?.templateId === DEFAULT_SERVICE_ID &&
      calculatorServices.filter((s) => s.templateId === DEFAULT_SERVICE_ID)
        .length === 1
    ) {
      return;
    }
    setCalculatorServices((prev) =>
      prev.filter((s) => s.instanceId !== instanceId),
    );
  };

  const updateCalculatorQuantity = (
    instanceId: string,
    key: string,
    value: number,
  ) => {
    setCalculatorServices((prev) =>
      prev.map((s) =>
        s.instanceId === instanceId
          ? {
              ...s,
              quantities: {
                ...s.quantities,
                [key]: Number.isFinite(value) ? value : 0,
              },
            }
          : s,
      ),
    );
  };

  const calculatorEstimate = useMemo(() => {
    const serviceBreakdown = calculatorServices.map((svc) => {
      const template = calculatorTemplates.find((t) => t.id === svc.templateId);
      if (!template)
        return { instanceId: svc.instanceId, name: svc.templateId, total: 0 };

      const total = template.items.reduce((sum, item) => {
        const qty = svc.quantities[item.key] ?? 0;
        return sum + qty * item.monthlyRate;
      }, 0);

      return { instanceId: svc.instanceId, name: template.name, total };
    });

    const total = serviceBreakdown.reduce((sum, s) => sum + s.total, 0);
    return { serviceBreakdown, total };
  }, [calculatorServices]);

  return (
    <div className="relative min-h-screen w-full bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] overflow-hidden font-sans">
      <Nav />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] flex items-center justify-center">
                <Calculator size={20} className="text-[color:var(--accent)]" />
              </div>
              <span className="text-sm font-bold text-[color:var(--text-secondary)] uppercase tracking-wider">
                Pricing Calculator
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Build your cloud estimate
            </h1>
            <p className="text-lg text-[color:var(--text-secondary)] max-w-2xl">
              Cloud Compute is included by default. Add additional services to
              customize your monthly estimate.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={() => setCalculatorPickerOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:bg-[color:var(--accent-hover)] transition-colors"
            >
              <Plus size={18} />
              Add service
            </button>
            <button
              onClick={() => {
                setResetKey((prev) => prev + 1);
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[color:var(--border-color)] text-[color:var(--text-primary)] font-bold hover:bg-[color:var(--bg-secondary)] transition-colors"
            >
              Reset to default
              <X size={18} className="text-[color:var(--text-secondary)]" />
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Services List */}
            <div className="lg:col-span-8 space-y-4">
              {calculatorServices.map((svc) => {
                const template = calculatorTemplates.find(
                  (t) => t.id === svc.templateId,
                );
                if (!template) return null;
                const serviceTotal = template.items.reduce((sum, item) => {
                  const qty = svc.quantities[item.key] ?? 0;
                  return sum + qty * item.monthlyRate;
                }, 0);
                const isDefaultService = svc.templateId === DEFAULT_SERVICE_ID;

                return (
                  <div
                    key={svc.instanceId}
                    className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] flex items-center justify-center shrink-0">
                          <template.Icon
                            size={18}
                            className="text-[color:var(--accent)]"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="text-xl font-bold truncate">
                              {template.name}
                            </div>
                            {isDefaultService && (
                              <span className="inline-flex items-center rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)] text-xs font-bold px-2 py-0.5">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-sm text-[color:var(--text-secondary)]">
                            {template.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-xs text-[color:var(--text-tertiary)]">
                            Monthly subtotal
                          </div>
                          <div className="text-lg font-bold text-[color:var(--accent)]">
                            {formatMoney(serviceTotal)}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            removeCalculatorService(svc.instanceId)
                          }
                          disabled={
                            isDefaultService &&
                            calculatorServices.filter(
                              (s) => s.templateId === DEFAULT_SERVICE_ID,
                            ).length === 1
                          }
                          className={`h-10 w-10 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] flex items-center justify-center transition-colors ${
                            isDefaultService &&
                            calculatorServices.filter(
                              (s) => s.templateId === DEFAULT_SERVICE_ID,
                            ).length === 1
                              ? "opacity-40 cursor-not-allowed"
                              : "hover:bg-[color:var(--border-color)]"
                          }`}
                          title={
                            isDefaultService &&
                            calculatorServices.filter(
                              (s) => s.templateId === DEFAULT_SERVICE_ID,
                            ).length === 1
                              ? "Default service cannot be removed"
                              : "Remove service"
                          }
                        >
                          <Trash2
                            size={16}
                            className="text-[color:var(--text-secondary)]"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {template.items.map((item) => (
                        <div
                          key={item.key}
                          className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="font-bold truncate">
                                {item.label}
                              </div>
                              <div className="mt-1 text-xs text-[color:var(--text-tertiary)]">
                                {formatMoney(item.monthlyRate)} / {item.unit}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-[color:var(--text-tertiary)]">
                                Estimated
                              </div>
                              <div className="font-mono text-sm text-[color:var(--text-primary)]">
                                {formatMoney(
                                  (svc.quantities[item.key] ?? 0) *
                                    item.monthlyRate,
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-3">
                            <input
                              type="number"
                              min={0}
                              value={svc.quantities[item.key] ?? 0}
                              onChange={(e) =>
                                updateCalculatorQuantity(
                                  svc.instanceId,
                                  item.key,
                                  Number(e.target.value),
                                )
                              }
                              className="w-full px-4 py-2.5 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-tertiary)] focus:outline-none focus:border-[color:var(--accent)]"
                            />
                            <div className="text-xs text-[color:var(--text-tertiary)] whitespace-nowrap">
                              {item.unit}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Empty State - Only show if no services somehow */}
              {calculatorServices.length === 0 && (
                <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-10 text-center">
                  <div className="text-2xl font-bold">Start an estimate</div>
                  <p className="mt-2 text-[color:var(--text-secondary)]">
                    Add services to build your custom estimate.
                  </p>
                  <button
                    onClick={() => setCalculatorPickerOpen(true)}
                    className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:bg-[color:var(--accent-hover)] transition-colors"
                  >
                    <Plus size={18} />
                    Add your first service
                  </button>
                </div>
              )}
            </div>

            {/* Sticky Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-4">
                {/* Total Estimate Card */}
                <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles
                      size={16}
                      className="text-[color:var(--accent)]"
                    />
                    <div className="text-sm font-bold text-[color:var(--text-tertiary)] uppercase tracking-wider">
                      Monthly estimate
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-[color:var(--text-primary)]">
                    {formatMoney(calculatorEstimate.total)}
                  </div>
                  <div className="mt-3 text-xs text-[color:var(--text-tertiary)]">
                    Totals are estimates for planning purposes and may vary by
                    region and configuration.
                  </div>
                  <div className="mt-6 pt-4 border-t border-[color:var(--border-color)]">
                    <button className="w-full py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:bg-[color:var(--accent-hover)] transition-colors flex items-center justify-center gap-2">
                      Get started
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Service Breakdown */}
                {calculatorEstimate.serviceBreakdown.length > 0 && (
                  <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-6">
                    <div className="text-sm font-bold text-[color:var(--text-tertiary)] uppercase tracking-wider mb-4">
                      Services breakdown
                    </div>
                    <div className="space-y-3">
                      {calculatorEstimate.serviceBreakdown.map((s) => (
                        <div
                          key={s.instanceId}
                          className="flex items-center justify-between gap-3"
                        >
                          <div className="text-sm text-[color:var(--text-secondary)] truncate">
                            {s.name}
                          </div>
                          <div className="font-mono text-sm text-[color:var(--accent)] font-bold whitespace-nowrap">
                            {formatMoney(s.total)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Info Card */}
                <div className="bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] rounded-2xl p-4">
                  <div className="text-sm font-bold text-[color:var(--text-primary)] mb-2">
                    Need help?
                  </div>
                  <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">
                    Contact our sales team for custom pricing, volume discounts,
                    or enterprise requirements.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* Service Picker Modal */}
          {calculatorPickerOpen && (
            <div className="fixed inset-0 z-50">
              <button
                className="absolute inset-0 bg-black/60"
                onClick={() => setCalculatorPickerOpen(false)}
              />
              <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[min(920px,calc(100%-24px))] bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-[color:var(--border-color)] flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xl font-bold">Add a service</div>
                    <div className="text-sm text-[color:var(--text-secondary)]">
                      Search and select services to include in your estimate.
                    </div>
                  </div>
                  <button
                    onClick={() => setCalculatorPickerOpen(false)}
                    className="h-10 w-10 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] hover:bg-[color:var(--border-color)] transition-colors flex items-center justify-center"
                  >
                    <X
                      size={18}
                      className="text-[color:var(--text-secondary)]"
                    />
                  </button>
                </div>

                <div className="p-6">
                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-tertiary)]"
                    />
                    <input
                      value={calculatorQuery}
                      onChange={(e) => setCalculatorQuery(e.target.value)}
                      placeholder="Search services"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-tertiary)] focus:outline-none focus:border-[color:var(--accent)]"
                      autoFocus
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectableTemplates
                      .filter((t) => {
                        const q = calculatorQuery.trim().toLowerCase();
                        if (!q) return true;
                        return (
                          t.name.toLowerCase().includes(q) ||
                          t.description.toLowerCase().includes(q)
                        );
                      })
                      .map((t) => {
                        const isAlreadyAdded = calculatorServices.some(
                          (s) => s.templateId === t.id,
                        );
                        return (
                          <button
                            key={t.id}
                            onClick={() =>
                              !isAlreadyAdded && addCalculatorService(t.id)
                            }
                            disabled={isAlreadyAdded}
                            className={`text-left p-4 rounded-2xl border transition-colors ${
                              isAlreadyAdded
                                ? "border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)]/50 opacity-50 cursor-not-allowed"
                                : "border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] hover:bg-[color:var(--border-color)] hover:border-[color:var(--accent)]/35"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] flex items-center justify-center shrink-0">
                                <t.Icon
                                  size={18}
                                  className="text-[color:var(--accent)]"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold truncate">
                                  {t.name}
                                </div>
                                <div className="mt-1 text-xs text-[color:var(--text-tertiary)] line-clamp-2">
                                  {t.description}
                                </div>
                                {isAlreadyAdded && (
                                  <div className="mt-1 text-xs text-[color:var(--accent)] font-medium">
                                    Already added
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                  </div>

                  {selectableTemplates.filter((t) => {
                    const q = calculatorQuery.trim().toLowerCase();
                    if (!q) return true;
                    return (
                      t.name.toLowerCase().includes(q) ||
                      t.description.toLowerCase().includes(q)
                    );
                  }).length === 0 && (
                    <div className="text-center py-8 text-[color:var(--text-tertiary)]">
                      No services found matching &quot;{calculatorQuery}&quot;
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Pricing Plans Section */}
      <section className="mt-32 mb-32 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose your plan
          </h2>
          <p className="text-[color:var(--text-secondary)] max-w-2xl mx-auto">
            Start with a 14-day trial. Scale as you grow with Enterprise or
            Reseller options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Trial Plan */}
          <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-8 flex flex-col hover:border-[color:var(--accent)]/35 transition-all duration-300 hover:scale-105 group">
            <h3 className="text-xl font-bold mb-2">Trial</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold">Free</span>
              <span className="text-sm text-[color:var(--text-secondary)]">
                14 days
              </span>
            </div>
            <p className="text-[color:var(--text-secondary)] mb-6 text-sm">
              Full access to all features for 14 days. No credit card required.
            </p>
            <button className="w-full py-3 rounded-full bg-[color:var(--accent)] text-white font-bold text-sm mb-6 hover:bg-[color:var(--accent-hover)] transition-colors">
              Start free trial
            </button>
            <ul className="space-y-3 text-sm">
              {[
                "14-day full feature access",
                "$50 free credits included",
                "All compute types available",
                "Up to 5 team members",
                "Community support",
                "No credit card required",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[color:var(--text-secondary)]"
                >
                  <div className="mt-0.5 rounded-full bg-[color:var(--accent)] p-0.5 shrink-0">
                    <Check size={12} className="text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--accent)]/50 rounded-2xl p-8 flex flex-col hover:border-[color:var(--accent)] transition-all duration-300 hover:scale-105 group relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-[color:var(--accent)]" />
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)] text-xs font-bold px-2 py-1">
                Popular
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">Enterprise</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold">Custom</span>
            </div>
            <p className="text-[color:var(--text-secondary)] mb-6 text-sm">
              For organizations with advanced security, compliance, and support
              needs.
            </p>
            <button className="w-full py-3 rounded-full bg-[color:var(--accent)] text-white font-bold text-sm mb-6 hover:bg-[color:var(--accent-hover)] transition-colors">
              Contact sales
            </button>
            <ul className="space-y-3 text-sm">
              {[
                "Custom pricing & discounts",
                "Unlimited team members",
                "Dedicated account manager",
                "24/7 priority support",
                "SLA guarantees",
                "SSO & advanced security",
                "Custom contracts",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[color:var(--text-secondary)]"
                >
                  <div className="mt-0.5 rounded-full bg-[color:var(--accent)] p-0.5 shrink-0">
                    <Check size={12} className="text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Reseller Plan */}
          <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-8 flex flex-col hover:border-[color:var(--accent)]/35 transition-all duration-300 hover:scale-105 group">
            <h3 className="text-xl font-bold mb-2">Reseller</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold">Partner</span>
            </div>
            <p className="text-[color:var(--text-secondary)] mb-6 text-sm">
              For agencies and partners who want to offer cloud services to
              their clients.
            </p>
            <button className="w-full py-3 rounded-full border border-[color:var(--border-color)] text-[color:var(--text-primary)] font-bold text-sm mb-6 hover:bg-[color:var(--bg-tertiary)] transition-colors flex items-center justify-center gap-2">
              Become a partner <ArrowRight size={16} />
            </button>
            <ul className="space-y-3 text-sm">
              {[
                "White-label solutions",
                "Volume discounts",
                "Multi-tenant dashboard",
                "API access for provisioning",
                "Partner support channel",
                "Revenue sharing options",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[color:var(--text-secondary)]"
                >
                  <div className="mt-0.5 rounded-full bg-[color:var(--accent)] p-0.5 shrink-0">
                    <Check size={12} className="text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">Ready to get started?</h3>
            <p className="text-[color:var(--text-secondary)] mb-6">
              Start your 14-day free trial today. No credit card required.
              Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-full bg-[color:var(--accent)] text-white font-bold hover:bg-[color:var(--accent-hover)] transition-colors">
                Start free trial
              </button>
              <button className="px-8 py-4 rounded-full border border-[color:var(--border-color)] text-[color:var(--text-primary)] font-bold hover:bg-[color:var(--bg-tertiary)] transition-colors">
                Schedule a demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle size={24} className="text-[color:var(--accent)]" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-[color:var(--text-secondary)]">
            Common questions about pricing and billing
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does billing work?",
              a: "We bill monthly based on your usage in the previous month. You can set spending limits to avoid surprises.",
            },
            {
              q: "Are there any hidden fees?",
              a: "No. You only pay for the compute resources you use. There are no seat fees or platform fees.",
            },
            {
              q: "Do you offer startup credits?",
              a: "Yes, we have a startup program. Apply to get up to $5,000 in credits to start building.",
            },
            {
              q: "Can I change my plan later?",
              a: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
            },
            {
              q: "What happens if I exceed my usage?",
              a: "You will be billed for additional usage at the same rates. We recommend setting up alerts to monitor your spending.",
            },
            {
              q: "Do you offer refunds?",
              a: "We offer refunds for unused credits within 30 days of purchase. Contact support for assistance.",
            },
          ].map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FaqItem({ faq }: { faq: { q: string; a: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-xl overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-6 text-left hover:bg-[color:var(--bg-tertiary)] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg">{faq.q}</span>
        {isOpen ? (
          <ChevronUp
            size={20}
            className="text-[color:var(--text-secondary)] shrink-0"
          />
        ) : (
          <ChevronDown
            size={20}
            className="text-[color:var(--text-secondary)] shrink-0"
          />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-[color:var(--text-secondary)] leading-relaxed border-t border-[color:var(--border-color)] pt-4">
          {faq.a}
        </div>
      )}
    </div>
  );
}
