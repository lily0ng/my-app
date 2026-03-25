import { useState, useMemo } from "react";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import {
  Calculator,
  Cpu,
  HardDrive,
  Network,
  Database,
  Check,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  Info,
  X,
  Clock,
  Calendar,
  TrendingUp,
  Sparkles,
  Shield,
  Server,
} from "lucide-react";

// Types
type BillingPeriod = "hourly" | "monthly" | "yearly";

type CPUPlan = {
  id: string;
  name: string;
  vcpu: number;
  memory: number;
  hourlyPrice: number;
  monthlyPrice: number;
};

type StoragePlan = {
  id: string;
  name: string;
  type: string;
  sizeGB: number;
  monthlyPrice: number;
  hourlyPrice: number;
};

type NetworkOption = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
};

type BackupOption = {
  id: string;
  name: string;
  retention: string;
  description: string;
  multiplier: number;
};

// CPU Plans data from screenshot
const cpuPlans: CPUPlan[] = [
  { id: "bl1", name: "BL1", vcpu: 1, memory: 4, hourlyPrice: 72, monthlyPrice: 52560 },
  { id: "bl2", name: "BL2", vcpu: 2, memory: 8, hourlyPrice: 145, monthlyPrice: 105704 },
  { id: "bl4", name: "BL4", vcpu: 4, memory: 16, hourlyPrice: 290, monthlyPrice: 211700 },
  { id: "bl8", name: "BL8", vcpu: 8, memory: 32, hourlyPrice: 579, monthlyPrice: 422670 },
  { id: "bl12", name: "BL12", vcpu: 12, memory: 48, hourlyPrice: 869, monthlyPrice: 634370 },
  { id: "bl16", name: "BL16", vcpu: 16, memory: 64, hourlyPrice: 1158, monthlyPrice: 845340 },
  { id: "bl24", name: "BL24", vcpu: 24, memory: 96, hourlyPrice: 1738, monthlyPrice: 1268870 },
];

// Storage plans from screenshot
const storagePlans: StoragePlan[] = [
  { id: "custom", name: "BS1.nvme", type: "NVMe", sizeGB: 0, monthlyPrice: 0, hourlyPrice: 0 },
  { id: "nano", name: "I/O-Nano", type: "NVMe", sizeGB: 50, monthlyPrice: 14600, hourlyPrice: 20 },
  { id: "micro", name: "I/O-Micro", type: "NVMe", sizeGB: 100, monthlyPrice: 29200, hourlyPrice: 40 },
  { id: "2xmicro", name: "I/O-2xMicro", type: "NVMe", sizeGB: 250, monthlyPrice: 73000, hourlyPrice: 100 },
  { id: "4xmicro", name: "I/O-4xMicro", type: "NVMe", sizeGB: 500, monthlyPrice: 146000, hourlyPrice: 200 },
  { id: "large", name: "I/O-Large", type: "NVMe", sizeGB: 1000, monthlyPrice: 292000, hourlyPrice: 400 },
];

// Network options from screenshot
const networkOptions: NetworkOption[] = [
  { id: "isolated", name: "Isolated Network", description: "A simple, pre-configured network that includes built-in cloud firewall protection, port forwarding, and remote access VPNs for easy external connectivity.", monthlyPrice: 0 },
  { id: "vpc", name: "VPC Network", description: "An advanced network option offering full control over traffic routing, VPN gateways, site-to-site VPN connections, and traffic segregation for enhanced security.", monthlyPrice: 9900 },
  { id: "l2", name: "L2 Network", description: "Create a default L2 Network under selected region.", monthlyPrice: 4900 },
];

// Backup options from screenshot
const backupOptions: BackupOption[] = [
  { id: "daily", name: "Daily", retention: "Each backup is kept for 7 days", description: "Daily automatic backups with 7-day retention", multiplier: 0.15 },
  { id: "weekly", name: "Weekly", retention: "Each backup is kept for 7 weeks", description: "Weekly automatic backups with 7-week retention", multiplier: 0.08 },
  { id: "monthly", name: "Monthly", retention: "Each backup is kept for 7 months", description: "Monthly automatic backups with 7-month retention", multiplier: 0.03 },
  { id: "disabled", name: "Disable Backups", retention: "", description: "You risk losing all your data", multiplier: 0 },
];

const formatCurrency = (value: number, currency: string = "K") => {
  if (value === 0) return "-";
  return `${currency} ${value.toLocaleString()}`;
};

const formatCurrencyWithSymbol = (value: number) => {
  return `K ${value.toLocaleString()}`;
};

export function PricingCalculatorPage() {
  // Billing period toggle
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  // Section toggles (optional inclusion)
  const [includeStorage, setIncludeStorage] = useState(true);
  const [includeNetwork, setIncludeNetwork] = useState(true);
  const [includeBackup, setIncludeBackup] = useState(true);
  const [includePublicIP, setIncludePublicIP] = useState(true);

  // Selections
  const [selectedCPU, setSelectedCPU] = useState<CPUPlan>(cpuPlans[0]);
  const [customStorageSize, setCustomStorageSize] = useState<number>(0);
  const [selectedStorage, setSelectedStorage] = useState<StoragePlan>(storagePlans[2]);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkOption>(networkOptions[0]);
  const [selectedBackup, setSelectedBackup] = useState<BackupOption>(backupOptions[3]);

  // Review modal
  const [showReview, setShowReview] = useState(false);

  // Calculate totals
  const estimate = useMemo(() => {
    const cpuMonthly = selectedCPU.monthlyPrice;
    const cpuHourly = selectedCPU.hourlyPrice;

    let storageMonthly = 0;
    let storageHourly = 0;
    if (includeStorage) {
      if (selectedStorage.id === "custom" && customStorageSize > 0) {
        storageMonthly = (customStorageSize / 100) * 29200;
        storageHourly = (customStorageSize / 100) * 40;
      } else {
        storageMonthly = selectedStorage.monthlyPrice;
        storageHourly = selectedStorage.hourlyPrice;
      }
    }

    const networkMonthly = includeNetwork ? selectedNetwork.monthlyPrice : 0;
    const networkHourly = includeNetwork ? Math.round(selectedNetwork.monthlyPrice / 730) : 0;

    const publicIPMonthly = includePublicIP ? 6570 : 0;
    const publicIPHourly = includePublicIP ? 9 : 0;

    const backupBaseMonthly = cpuMonthly + storageMonthly;
    const backupMonthly = includeBackup ? Math.round(backupBaseMonthly * selectedBackup.multiplier) : 0;
    const backupHourly = includeBackup ? Math.round(backupMonthly / 730) : 0;

    const subtotalMonthly = cpuMonthly + storageMonthly + networkMonthly + publicIPMonthly + backupMonthly;
    const subtotalHourly = cpuHourly + storageHourly + networkHourly + publicIPHourly + backupHourly;

    const taxMonthly = Math.round(subtotalMonthly * 0.05);
    const taxHourly = Math.round(subtotalHourly * 0.05);

    const totalMonthly = subtotalMonthly + taxMonthly;
    const totalHourly = subtotalHourly + taxHourly;
    const totalYearly = totalMonthly * 12;

    return {
      cpu: { monthly: cpuMonthly, hourly: cpuHourly },
      storage: { monthly: storageMonthly, hourly: storageHourly, size: selectedStorage.id === "custom" ? customStorageSize : selectedStorage.sizeGB },
      network: { monthly: networkMonthly, hourly: networkHourly },
      publicIP: { monthly: publicIPMonthly, hourly: publicIPHourly },
      backup: { monthly: backupMonthly, hourly: backupHourly },
      subtotal: { monthly: subtotalMonthly, hourly: subtotalHourly },
      tax: { monthly: taxMonthly, hourly: taxHourly },
      total: { monthly: totalMonthly, hourly: totalHourly, yearly: totalYearly },
    };
  }, [selectedCPU, selectedStorage, customStorageSize, selectedNetwork, selectedBackup, includeStorage, includeNetwork, includeBackup, includePublicIP]);

  const getDisplayPrice = () => {
    switch (billingPeriod) {
      case "hourly":
        return { value: estimate.total.hourly, label: "/Hour" };
      case "monthly":
        return { value: estimate.total.monthly, label: "/Month" };
      case "yearly":
        return { value: estimate.total.yearly, label: "/Year" };
    }
  };

  const displayPrice = getDisplayPrice();

  return (
    <div className="relative min-h-screen w-full bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] overflow-hidden font-sans">
      <Nav />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
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
              Choose a plan based on the amount of CPU, memory, and storage required for your project. The cost will adjust according to the resources you select.
            </p>
          </div>

          {/* Billing Period Toggle */}
          <div className="inline-flex items-center bg-[color:var(--bg-secondary)] rounded-full p-1 mb-8">
            {["hourly", "monthly", "yearly"].map((period) => (
              <button
                key={period}
                onClick={() => setBillingPeriod(period as BillingPeriod)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  billingPeriod === period
                    ? "bg-[color:var(--accent)] text-white shadow-sm"
                    : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Configuration */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Compute Offering Section */}
              <section className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Cpu size={24} className="text-[color:var(--accent)]" />
                    <h2 className="text-xl font-bold">Compute Offering</h2>
                  </div>
                </div>

                {/* CPU Plans Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-[color:var(--text-tertiary)] border-b border-[color:var(--border-color)]">
                        <th className="pb-3 font-medium">Name</th>
                        <th className="pb-3 font-medium">vCPU</th>
                        <th className="pb-3 font-medium">Memory RAM</th>
                        <th className="pb-3 font-medium text-right">Price Hourly</th>
                        <th className="pb-3 font-medium text-right">Price Monthly</th>
                        <th className="pb-3 font-medium text-center">Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cpuPlans.map((plan) => (
                        <tr
                          key={plan.id}
                          onClick={() => setSelectedCPU(plan)}
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedCPU.id === plan.id
                              ? "bg-[color:var(--accent)]/10 border-l-4 border-[color:var(--accent)]"
                              : "hover:bg-[color:var(--bg-tertiary)]/60 border-l-4 border-transparent"
                          }`}
                        >
                          <td className="py-3 px-2">
                            <span className={selectedCPU.id === plan.id ? "text-[color:var(--accent)] font-medium" : "font-medium"}>
                              {plan.name}
                            </span>
                          </td>
                          <td className="py-3 px-2">{plan.vcpu} vCPU</td>
                          <td className="py-3 px-2">{plan.memory}.0 GB</td>
                          <td className="py-3 px-2 text-right">
                            <span className={selectedCPU.id === plan.id ? "text-[color:var(--accent)]" : ""}>
                              K {plan.hourlyPrice.toLocaleString()} /Hour
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <span className={selectedCPU.id === plan.id ? "text-[color:var(--accent)] font-medium" : ""}>
                              K {plan.monthlyPrice.toLocaleString()} /Month
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center">
                            {selectedCPU.id === plan.id && (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[color:var(--accent)]">
                                <Check size={14} className="text-white" />
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Storage Section */}
              <section className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <HardDrive size={24} className="text-[color:var(--accent)]" />
                    <h2 className="text-xl font-bold">Disk Offering</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={includeStorage}
                          onChange={(e) => setIncludeStorage(e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded bg-[color:var(--bg-tertiary)] border-2 border-[color:var(--border-color)] peer-checked:bg-[color:var(--accent)] peer-checked:border-[color:var(--accent)] transition-all duration-200 flex items-center justify-center">
                          <Check size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                        </div>
                      </div>
                      <span className="text-sm text-[color:var(--text-secondary)] group-hover:text-[color:var(--text-primary)] transition-colors">Include storage</span>
                    </label>
                  </div>
                </div>

                {includeStorage && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-[color:var(--text-tertiary)] border-b border-[color:var(--border-color)]">
                          <th className="pb-3 font-medium">Name</th>
                          <th className="pb-3 font-medium">Storage Type</th>
                          <th className="pb-3 font-medium">Size</th>
                          <th className="pb-3 font-medium text-right">Price Hourly</th>
                          <th className="pb-3 font-medium text-right">Price Monthly</th>
                          <th className="pb-3 font-medium text-center">Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {storagePlans.map((plan) => (
                          <tr
                            key={plan.id}
                            onClick={() => setSelectedStorage(plan)}
                            className={`cursor-pointer transition-all duration-200 ${
                              selectedStorage.id === plan.id
                                ? "bg-[color:var(--accent)]/10 border-l-4 border-[color:var(--accent)]"
                                : "hover:bg-[color:var(--bg-tertiary)]/60 border-l-4 border-transparent"
                            }`}
                          >
                            <td className="py-3 px-2">
                              <span className={selectedStorage.id === plan.id ? "text-[color:var(--accent)] font-medium" : "font-medium"}>
                                {plan.name}
                              </span>
                            </td>
                            <td className="py-3 px-2">{plan.type}</td>
                            <td className="py-3 px-2">
                              {plan.id === "custom" ? (
                                <input
                                  type="number"
                                  value={customStorageSize}
                                  onChange={(e) => {
                                    setCustomStorageSize(Number(e.target.value));
                                    setSelectedStorage(plan);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="0"
                                  className="w-24 px-3 py-1 rounded-lg bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] text-sm"
                                />
                              ) : (
                                `${plan.sizeGB}.0 GB`
                              )}
                              {plan.id === "custom" && <span className="ml-2 text-sm text-[color:var(--text-secondary)]">GB</span>}
                            </td>
                            <td className="py-3 px-2 text-right">
                              <span className={selectedStorage.id === plan.id ? "text-[color:var(--accent)]" : ""}>
                                {plan.hourlyPrice > 0 ? `K ${plan.hourlyPrice.toLocaleString()} /Hour` : "-"}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-right">
                              <span className={selectedStorage.id === plan.id ? "text-[color:var(--accent)]" : ""}>
                                {plan.monthlyPrice > 0 ? `K ${plan.monthlyPrice.toLocaleString()} /Month` : "-"}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-center">
                              {selectedStorage.id === plan.id && (
                                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[color:var(--accent)]">
                                  <Check size={14} className="text-white" />
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {!includeStorage && (
                  <div className="text-center py-8 text-[color:var(--text-tertiary)]">
                    Storage is not included in this estimate
                  </div>
                )}
              </section>

              {/* Network Section */}
              <section className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Network size={24} className="text-[color:var(--accent)]" />
                    <h2 className="text-xl font-bold">Choose Network</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={includeNetwork}
                          onChange={(e) => setIncludeNetwork(e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded bg-[color:var(--bg-tertiary)] border-2 border-[color:var(--border-color)] peer-checked:bg-[color:var(--accent)] peer-checked:border-[color:var(--accent)] transition-all duration-200 flex items-center justify-center">
                          <Check size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                        </div>
                      </div>
                      <span className="text-sm text-[color:var(--text-secondary)] group-hover:text-[color:var(--text-primary)] transition-colors">Include network</span>
                    </label>
                  </div>
                </div>

                <p className="text-sm text-[color:var(--text-secondary)] mb-4">
                  Set up or choose a network for your server. This can be an isolated private network, or you can create an elastic network to connect multiple regions.
                </p>

                <div className="bg-[color:var(--bg-tertiary)] rounded-xl p-3 mb-4 flex items-center gap-2">
                  <span className="text-xs text-[color:var(--text-secondary)]">
                    Note: Bandwidth will be charged at K 99/GB/Month.
                  </span>
                </div>

                {includeNetwork && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {networkOptions.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => setSelectedNetwork(option)}
                        className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                          selectedNetwork.id === option.id
                            ? "border-[color:var(--accent)] bg-[color:var(--accent)]/10 shadow-sm"
                            : "border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] hover:border-[color:var(--accent)]/50 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{option.name}</span>
                          </div>
                          {selectedNetwork.id === option.id && (
                            <div className="w-5 h-5 rounded-full bg-[color:var(--accent)] flex items-center justify-center">
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">
                          {option.description}
                        </p>
                        {option.monthlyPrice > 0 && (
                          <p className="mt-2 text-xs text-[color:var(--accent)] font-medium">
                            +K {option.monthlyPrice.toLocaleString()} /Month
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {!includeNetwork && (
                  <div className="text-center py-8 text-[color:var(--text-tertiary)]">
                    Network is not included in this estimate
                  </div>
                )}

                {/* Public IP Toggle */}
                <div className="mt-4 pt-4 border-t border-[color:var(--border-color)]">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={includePublicIP}
                        onChange={(e) => setIncludePublicIP(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 rounded bg-[color:var(--bg-tertiary)] border-2 border-[color:var(--border-color)] peer-checked:bg-[color:var(--accent)] peer-checked:border-[color:var(--accent)] transition-all duration-200 flex items-center justify-center">
                        <Check size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                    <div>
                      <span className="font-medium group-hover:text-[color:var(--text-primary)] transition-colors">Include Public IP</span>
                      <p className="text-xs text-[color:var(--text-secondary)]">
                        Adds K 9/Hour (K 6,570/Month) for public IP allocation
                      </p>
                    </div>
                  </label>
                </div>
              </section>

              {/* Backup Section */}
              <section className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Database size={24} className="text-[color:var(--accent)]" />
                    <h2 className="text-xl font-bold">Automatic Backups</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={includeBackup}
                          onChange={(e) => setIncludeBackup(e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded bg-[color:var(--bg-tertiary)] border-2 border-[color:var(--border-color)] peer-checked:bg-[color:var(--accent)] peer-checked:border-[color:var(--accent)] transition-all duration-200 flex items-center justify-center">
                          <Check size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                        </div>
                      </div>
                      <span className="text-sm text-[color:var(--text-secondary)] group-hover:text-[color:var(--text-primary)] transition-colors">Include backup</span>
                    </label>
                  </div>
                </div>

                <p className="text-sm text-[color:var(--text-secondary)] mb-4">
                  Ensure your data is safe with automatic backups, providing peace of mind in case of accidental deletion, hardware failure, or other unexpected issues.
                </p>

                {includeBackup && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {backupOptions.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => setSelectedBackup(option)}
                        className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                          selectedBackup.id === option.id
                            ? "border-[color:var(--accent)] bg-[color:var(--accent)]/10 shadow-sm"
                            : "border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] hover:border-[color:var(--accent)]/50 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-medium">{option.name}</span>
                          {selectedBackup.id === option.id && (
                            <div className="w-5 h-5 rounded-full bg-[color:var(--accent)] flex items-center justify-center">
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                        {option.retention && (
                          <p className="text-xs text-[color:var(--text-secondary)]">
                            {option.retention}
                          </p>
                        )}
                        {option.id === "disabled" && (
                          <p className="text-xs text-red-500">
                            {option.description}
                          </p>
                        )}
                        {option.multiplier > 0 && (
                          <p className="mt-2 text-xs text-[color:var(--accent)]">
                            +{Math.round(option.multiplier * 100)}% of compute
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {!includeBackup && (
                  <div className="text-center py-8 text-[color:var(--text-tertiary)]">
                    Automatic backups are not included in this estimate
                  </div>
                )}
              </section>
            </div>

            {/* Right Column - Summary Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-4">
                {/* Total Estimate Card */}
                <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-[color:var(--accent)]" />
                    <div className="text-sm font-bold text-[color:var(--text-tertiary)] uppercase tracking-wider">
                      {billingPeriod} Estimate
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-[color:var(--text-primary)]">
                    {formatCurrencyWithSymbol(displayPrice.value)}
                  </div>
                  <div className="text-sm text-[color:var(--text-tertiary)] mt-1">
                    {displayPrice.label}
                  </div>
                  <div className="mt-3 text-xs text-[color:var(--text-tertiary)]">
                    Totals are estimates for planning purposes and may vary by region and configuration.
                  </div>
                  
                  {/* Billing period subtotals */}
                  <div className="mt-4 pt-4 border-t border-[color:var(--border-color)] space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[color:var(--text-secondary)]">Hourly:</span>
                      <span className="font-mono">K {estimate.total.hourly.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[color:var(--text-secondary)]">Monthly:</span>
                      <span className="font-mono">K {estimate.total.monthly.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[color:var(--text-secondary)]">Yearly:</span>
                      <span className="font-mono">K {estimate.total.yearly.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[color:var(--border-color)]">
                    <button 
                      onClick={() => setShowReview(true)}
                      className="w-full py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:bg-[color:var(--accent-hover)] transition-colors flex items-center justify-center gap-2"
                    >
                      Review & Deploy
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Service Breakdown */}
                <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-6">
                  <div className="text-sm font-bold text-[color:var(--text-tertiary)] uppercase tracking-wider mb-4">
                    Services Breakdown
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm text-[color:var(--text-secondary)]">
                        {selectedCPU.name} ({selectedCPU.vcpu} vCPU, {selectedCPU.memory}GB RAM)
                      </div>
                      <div className="font-mono text-sm text-[color:var(--accent)] font-bold">
                        K {estimate.cpu.monthly.toLocaleString()}
                      </div>
                    </div>
                    {includeStorage && (
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm text-[color:var(--text-secondary)]">
                          {selectedStorage.name} ({estimate.storage.size}GB)
                        </div>
                        <div className="font-mono text-sm text-[color:var(--accent)] font-bold">
                          {estimate.storage.monthly > 0 ? `K ${estimate.storage.monthly.toLocaleString()}` : "-"}
                        </div>
                      </div>
                    )}
                    {includeNetwork && (
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm text-[color:var(--text-secondary)]">
                          {selectedNetwork.name}
                        </div>
                        <div className="font-mono text-sm text-[color:var(--accent)] font-bold">
                          {estimate.network.monthly > 0 ? `K ${estimate.network.monthly.toLocaleString()}` : "-"}
                        </div>
                      </div>
                    )}
                    {includePublicIP && (
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm text-[color:var(--text-secondary)]">Public IP</div>
                        <div className="font-mono text-sm text-[color:var(--accent)] font-bold">
                          K {estimate.publicIP.monthly.toLocaleString()}
                        </div>
                      </div>
                    )}
                    {includeBackup && estimate.backup.monthly > 0 && (
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm text-[color:var(--text-secondary)]">
                          {selectedBackup.name} Backup
                        </div>
                        <div className="font-mono text-sm text-[color:var(--accent)] font-bold">
                          K {estimate.backup.monthly.toLocaleString()}
                        </div>
                      </div>
                    )}
                    <div className="pt-3 border-t border-[color:var(--border-color)]">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm text-[color:var(--text-secondary)]">Subtotal</div>
                        <div className="font-mono text-sm font-bold">
                          K {estimate.subtotal.monthly.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 mt-2">
                        <div className="text-sm text-[color:var(--text-secondary)]">Tax (5%)</div>
                        <div className="font-mono text-sm">
                          +K {estimate.tax.monthly.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle size={16} className="text-[color:var(--accent)]" />
                    <div className="text-sm font-bold text-[color:var(--text-primary)]">
                      Need help?
                    </div>
                  </div>
                  <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">
                    Contact our sales team for custom pricing, volume discounts, or enterprise requirements.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Review & Deploy Modal */}
      {showReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowReview(false)} />
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl shadow-2xl">
            <div className="sticky top-0 bg-[color:var(--bg-secondary)] border-b border-[color:var(--border-color)] p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Review & Deploy</h2>
              <button
                onClick={() => setShowReview(false)}
                className="p-2 rounded-xl hover:bg-[color:var(--bg-tertiary)] transition-colors"
              >
                <X size={24} className="text-[color:var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6">
              {/* Summary Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[color:var(--bg-tertiary)] text-[color:var(--text-secondary)]">
                      <th className="text-left p-3 font-medium rounded-tl-lg">Title</th>
                      <th className="text-left p-3 font-medium">From</th>
                      <th className="text-left p-3 font-medium">To</th>
                      <th className="text-right p-3 font-medium">Price</th>
                      <th className="text-right p-3 font-medium">Discount</th>
                      <th className="text-right p-3 font-medium">OTC</th>
                      <th className="text-right p-3 font-medium rounded-tr-lg">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color:var(--border-color)]">
                    {/* CPU Row */}
                    <tr>
                      <td className="p-3">
                        <div className="font-medium">{selectedCPU.name}</div>
                        <div className="text-xs text-[color:var(--text-tertiary)]">
                          {selectedCPU.vcpu} Core, {selectedCPU.memory} GB Memory
                        </div>
                      </td>
                      <td className="p-3 text-[color:var(--text-secondary)]">
                        {new Date().toLocaleDateString("en-GB")} {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="p-3 text-[color:var(--text-secondary)]">
                        {new Date(Date.now() + 60 * 60 * 1000).toLocaleDateString("en-GB")} {new Date(Date.now() + 60 * 60 * 1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="p-3 text-right">K {estimate.cpu.hourly.toLocaleString()}</td>
                      <td className="p-3 text-right">K 0</td>
                      <td className="p-3 text-right">K 0</td>
                      <td className="p-3 text-right font-medium">K {estimate.cpu.hourly.toLocaleString()}</td>
                    </tr>

                    {/* Public IP Row */}
                    {includePublicIP && (
                      <tr>
                        <td className="p-3">
                          <div className="font-medium">Public IP</div>
                        </td>
                        <td className="p-3 text-[color:var(--text-secondary)]">
                          {new Date().toLocaleDateString("en-GB")} {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="p-3 text-[color:var(--text-secondary)]">
                          {new Date(Date.now() + 60 * 60 * 1000).toLocaleDateString("en-GB")} {new Date(Date.now() + 60 * 60 * 1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="p-3 text-right">K {estimate.publicIP.hourly.toLocaleString()}</td>
                        <td className="p-3 text-right">K 0</td>
                        <td className="p-3 text-right">K 0</td>
                        <td className="p-3 text-right font-medium">K {estimate.publicIP.hourly.toLocaleString()}</td>
                      </tr>
                    )}

                    {/* Volume Row */}
                    {includeStorage && (
                      <tr>
                        <td className="p-3">
                          <div className="font-medium">volume</div>
                          <div className="text-xs text-[color:var(--text-tertiary)]">
                            {estimate.storage.size} GB Storage
                          </div>
                        </td>
                        <td className="p-3 text-[color:var(--text-secondary)]">
                          {new Date().toLocaleDateString("en-GB")} {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="p-3 text-[color:var(--text-secondary)]">
                          {new Date(Date.now() + 60 * 60 * 1000).toLocaleDateString("en-GB")} {new Date(Date.now() + 60 * 60 * 1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="p-3 text-right">K {estimate.storage.hourly.toLocaleString()}</td>
                        <td className="p-3 text-right">K 0</td>
                        <td className="p-3 text-right">K 0</td>
                        <td className="p-3 text-right font-medium">K {estimate.storage.hourly.toLocaleString()}</td>
                      </tr>
                    )}

                    {/* Network Row */}
                    {includeNetwork && selectedNetwork.monthlyPrice > 0 && (
                      <tr>
                        <td className="p-3">
                          <div className="font-medium">{selectedNetwork.name}</div>
                        </td>
                        <td className="p-3 text-[color:var(--text-secondary)]">
                          {new Date().toLocaleDateString("en-GB")} {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="p-3 text-[color:var(--text-secondary)]">
                          {new Date(Date.now() + 60 * 60 * 1000).toLocaleDateString("en-GB")} {new Date(Date.now() + 60 * 60 * 1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="p-3 text-right">K {Math.round(selectedNetwork.monthlyPrice / 730).toLocaleString()}</td>
                        <td className="p-3 text-right">K 0</td>
                        <td className="p-3 text-right">K 0</td>
                        <td className="p-3 text-right font-medium">K {Math.round(selectedNetwork.monthlyPrice / 730).toLocaleString()}</td>
                      </tr>
                    )}

                    {/* Backup Row */}
                    {includeBackup && estimate.backup.hourly > 0 && (
                      <tr>
                        <td className="p-3">
                          <div className="font-medium">{selectedBackup.name} Backup</div>
                        </td>
                        <td className="p-3 text-[color:var(--text-secondary)]">
                          {new Date().toLocaleDateString("en-GB")} {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="p-3 text-[color:var(--text-secondary)]">
                          {new Date(Date.now() + 60 * 60 * 1000).toLocaleDateString("en-GB")} {new Date(Date.now() + 60 * 60 * 1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="p-3 text-right">K {estimate.backup.hourly.toLocaleString()}</td>
                        <td className="p-3 text-right">K 0</td>
                        <td className="p-3 text-right">K 0</td>
                        <td className="p-3 text-right font-medium">K {estimate.backup.hourly.toLocaleString()}</td>
                      </tr>
                    )}

                    {/* Totals */}
                    <tr className="bg-[color:var(--bg-tertiary)] font-medium">
                      <td className="p-3 rounded-bl-lg" colSpan={6}>Sub Amount</td>
                      <td className="p-3 text-right rounded-br-lg">K {estimate.subtotal.hourly.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-[color:var(--text-secondary)]" colSpan={6}>Tax (Commercial Tax 5%)</td>
                      <td className="p-3 text-right">+ K {estimate.tax.hourly.toLocaleString()}</td>
                    </tr>
                    <tr className="font-bold text-[color:var(--accent)]">
                      <td className="p-3" colSpan={6}>Net Payable</td>
                      <td className="p-3 text-right">K {(estimate.subtotal.hourly + estimate.tax.hourly).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-[color:var(--text-secondary)]" colSpan={6}>Free Credits Usage</td>
                      <td className="p-3 text-right text-[color:var(--accent)]">
                        - K {(estimate.subtotal.hourly + estimate.tax.hourly).toLocaleString()}
                      </td>
                    </tr>
                    <tr className="font-bold text-lg">
                      <td className="p-3 rounded-bl-lg" colSpan={6}>Payable</td>
                      <td className="p-3 text-right rounded-br-lg">K 0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Deploy Button */}
              <div className="mt-6 pt-6 border-t border-[color:var(--border-color)]">
                <button className="w-full py-4 rounded-full bg-[color:var(--accent)] text-white font-bold hover:bg-[color:var(--accent-hover)] transition-colors">
                  Deploy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

