import { useEffect, useMemo, useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import {
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Boxes,
  Calculator,
  Cpu,
  Database,
  Globe,
  HardDrive,
  Layers,
  Network,
  Plus,
  Search,
  Server,
  Shield,
  Trash2,
  X,
} from 'lucide-react';
export function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'hour' | 'second'>(
    'second'
  );
  const [timePeriod, setTimePeriod] = useState<'hour' | 'monthly' | 'year'>('hour');
  const [computeTier, setComputeTier] = useState<'standard' | 'developer' | 'high-frequency'>('standard');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCatalogSection, setActiveCatalogSection] = useState('vx1');
  const gpuTasks = [
  {
    name: 'Nvidia B200',
    price: 0.001736
  },
  {
    name: 'Nvidia H200',
    price: 0.001261
  },
  {
    name: 'Nvidia H100',
    price: 0.001097
  },
  {
    name: 'Nvidia A100, 80 GB',
    price: 0.000694
  },
  {
    name: 'Nvidia A100, 40 GB',
    price: 0.000583
  },
  {
    name: 'Nvidia L40S',
    price: 0.000542
  },
  {
    name: 'Nvidia A10',
    price: 0.000306
  },
  {
    name: 'Nvidia L4',
    price: 0.000222
  },
  {
    name: 'Nvidia T4',
    price: 0.000164
  }];

  const computeTierData = {
    standard: [
      { vcpus: '1 vCPU', memory: '2 GB', bandwidth: '2.00 TB', storage: 'Block Storage', baseHourlyPrice: 0.015 },
      { vcpus: '2 vCPUs', memory: '4 GB', bandwidth: '3.00 TB', storage: 'Block Storage', baseHourlyPrice: 0.030 },
      { vcpus: '4 vCPUs', memory: '8 GB', bandwidth: '4.00 TB', storage: 'Block Storage', baseHourlyPrice: 0.060 },
      { vcpus: '8 vCPUs', memory: '16 GB', bandwidth: '5.00 TB', storage: 'Block Storage', baseHourlyPrice: 0.120 },
      { vcpus: '16 vCPUs', memory: '32 GB', bandwidth: '6.00 TB', storage: 'Block Storage', baseHourlyPrice: 0.240 },
      { vcpus: '32 vCPUs', memory: '64 GB', bandwidth: '7.00 TB', storage: 'Block Storage', baseHourlyPrice: 0.480 },
    ],
    developer: [
      { vcpus: '2 vCPUs', memory: '8 GB', bandwidth: '4.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 0.045 },
      { vcpus: '4 vCPUs', memory: '16 GB', bandwidth: '6.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 0.090 },
      { vcpus: '8 vCPUs', memory: '32 GB', bandwidth: '8.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 0.180 },
      { vcpus: '16 vCPUs', memory: '64 GB', bandwidth: '10.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 0.360 },
      { vcpus: '32 vCPUs', memory: '128 GB', bandwidth: '12.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 0.720 },
      { vcpus: '64 vCPUs', memory: '256 GB', bandwidth: '15.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 1.440 },
    ],
    'high-frequency': [
      { vcpus: '4 vCPUs', memory: '16 GB', bandwidth: '8.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 0.085 },
      { vcpus: '8 vCPUs', memory: '32 GB', bandwidth: '12.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 0.170 },
      { vcpus: '16 vCPUs', memory: '64 GB', bandwidth: '16.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 0.340 },
      { vcpus: '32 vCPUs', memory: '128 GB', bandwidth: '20.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 0.680 },
      { vcpus: '64 vCPUs', memory: '256 GB', bandwidth: '25.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 1.360 },
      { vcpus: '96 vCPUs', memory: '384 GB', bandwidth: '30.00 TB', storage: 'NVMe SSD', baseHourlyPrice: 2.040 },
    ]
  };

  const formatPrice = (price: number) => {
    if (billingPeriod === 'hour') {
      return `$${(price * 3600).toFixed(2)} / hr`;
    }
    return `$${price.toFixed(6)} / sec`;
  };

  const formatPriceForTimePeriod = (baseHourlyPrice: number) => {
    switch (timePeriod) {
      case 'hour':
        return `$${baseHourlyPrice.toFixed(3)} / hr`;
      case 'monthly':
        const monthlyPrice = baseHourlyPrice * 730; // Average hours per month
        return `$${monthlyPrice.toFixed(0)} / mo`;
      case 'year':
        const yearlyPrice = baseHourlyPrice * 730 * 12;
        return `$${(yearlyPrice / 1000).toFixed(1)}k / yr`;
      default:
        return `$${baseHourlyPrice.toFixed(3)} / hr`;
    }
  };

  type CatalogColumn = { key: string; label: string };
  type CatalogRow = Record<string, string>;
  type CatalogGroup = {
    title: string;
    description: string;
    columns: CatalogColumn[];
    rows: CatalogRow[];
  };
  type CatalogItem = {
    id: string;
    title: string;
    description: string;
    Icon: typeof Server;
    heroTitle?: string;
    heroDescription?: string[];
    useCases?: string;
    groups?: CatalogGroup[];
    columns?: string[];
    rows?: CatalogRow[];
  };

  const catalogItems: CatalogItem[] = useMemo(
    () => [
      {
        id: 'vx1',
        title: 'VX1™',
        description: 'VMs optimized for affordable core infrastructure workloads.',
        Icon: Server,
        heroTitle: 'VX1™',
        heroDescription: [
          'VX1 plans boast up to 82% better performance per dollar compared to leading cost efficiency-optimized compute plans.',
          'VX1 instances support fast storage and networking with dedicated CPU resources and support for features such as virtualization and instant provisioning.',
          'VX1 instances are billed on actual hours used each month and are not capped at 672 hours.',
        ],
        useCases: 'cloud-native and enterprise workloads.',
        groups: [
          {
            title: 'General Purpose',
            description:
              'These virtual machines offer a typical balance of CPU and RAM resources suitable for common workloads.',
            columns: [
              { key: 'vcpus', label: 'vCPUs' },
              { key: 'memory', label: 'Memory' },
              { key: 'bandwidth', label: 'Bandwidth' },
              { key: 'storage', label: 'Storage' },
              { key: 'price', label: 'Hourly Price' },
            ],
            rows: [
              { vcpus: '2 vCPUs', memory: '8 GB', bandwidth: '5.00 TB', storage: 'Block Storage', price: '$0.060 / hr' },
              { vcpus: '4 vCPUs', memory: '16 GB', bandwidth: '6.00 TB', storage: 'Block Storage', price: '$0.120 / hr' },
              { vcpus: '8 vCPUs', memory: '32 GB', bandwidth: '7.00 TB', storage: 'Block Storage', price: '$0.240 / hr' },
              { vcpus: '16 vCPUs', memory: '64 GB', bandwidth: '8.00 TB', storage: 'Block Storage', price: '$0.480 / hr' },
              { vcpus: '32 vCPUs', memory: '128 GB', bandwidth: '9.00 TB', storage: 'Block Storage', price: '$0.960 / hr' },
              { vcpus: '48 vCPUs', memory: '192 GB', bandwidth: '9.00 TB', storage: 'Block Storage', price: '$1.440 / hr' },
              { vcpus: '64 vCPUs', memory: '256 GB', bandwidth: '10.00 TB', storage: 'Block Storage', price: '$1.920 / hr' },
              { vcpus: '96 vCPUs', memory: '384 GB', bandwidth: '10.00 TB', storage: 'Block Storage', price: '$2.880 / hr' },
            ],
          },
          {
            title: 'Memory Optimized',
            description:
              'Higher RAM per core for memory-heavy workloads such as caching, analytics, and in-memory databases.',
            columns: [
              { key: 'vcpus', label: 'vCPUs' },
              { key: 'memory', label: 'Memory' },
              { key: 'bandwidth', label: 'Bandwidth' },
              { key: 'storage', label: 'Storage' },
              { key: 'price', label: 'Hourly Price' },
            ],
            rows: [
              { vcpus: '2 vCPUs', memory: '16 GB', bandwidth: '5.00 TB', storage: '120 GB NVMe', price: '$0.076 / hr' },
              { vcpus: '4 vCPUs', memory: '32 GB', bandwidth: '6.00 TB', storage: '240 GB NVMe', price: '$0.153 / hr' },
              { vcpus: '8 vCPUs', memory: '64 GB', bandwidth: '7.00 TB', storage: '480 GB NVMe', price: '$0.306 / hr' },
              { vcpus: '16 vCPUs', memory: '128 GB', bandwidth: '8.00 TB', storage: '960 GB NVMe', price: '$0.612 / hr' },
              { vcpus: '32 vCPUs', memory: '256 GB', bandwidth: '9.00 TB', storage: '1920 GB NVMe', price: '$1.233 / hr' },
              { vcpus: '48 vCPUs', memory: '384 GB', bandwidth: '9.00 TB', storage: '2880 GB NVMe', price: '$1.835 / hr' },
            ],
          },
        ],
      },
      {
        id: 'cloud-compute',
        title: 'Cloud Compute',
        description: 'Easy-to-use, affordable VMs for many common workloads.',
        Icon: Server,
        heroTitle: 'Cloud Compute',
        heroDescription: [
          'General purpose compute for web apps, APIs, CI/CD runners, and background tasks.',
          'Choose a size that fits your workload and scale as needed.',
        ],
        useCases: 'web apps, microservices, and internal tools.',
        columns: ['vCPUs', 'Memory', 'Bandwidth', 'Storage', timePeriod === 'monthly' ? 'Monthly Price' : timePeriod === 'year' ? 'Yearly Price' : 'Hourly Price'],
        rows: computeTierData[computeTier].map(item => ({
          vcpus: item.vcpus,
          memory: item.memory,
          bandwidth: item.bandwidth,
          storage: item.storage,
          price: formatPriceForTimePeriod(item.baseHourlyPrice)
        })),
      },
      {
        id: 'optimized-cloud-compute',
        title: 'Optimized Cloud Compute',
        description: 'No noisy neighbors on powerful VMs with built-in NVMe SSD.',
        Icon: Cpu,
        heroTitle: 'Optimized Cloud Compute',
        heroDescription: [
          'Compute optimized instances designed for consistent CPU performance.',
          'Ideal for build pipelines, compilers, ETL, and latency-sensitive services.',
        ],
        useCases: 'batch jobs, build pipelines, and high-CPU services.',
        columns: ['vCPUs', 'Memory', 'NVMe', 'Bandwidth', 'Hourly Price'],
        rows: [
          { vcpus: '4 vCPUs', memory: '8 GB', nvme: '160 GB', bandwidth: '6.00 TB', price: '$0.070 / hr' },
          { vcpus: '8 vCPUs', memory: '16 GB', nvme: '320 GB', bandwidth: '8.00 TB', price: '$0.140 / hr' },
          { vcpus: '16 vCPUs', memory: '32 GB', nvme: '640 GB', bandwidth: '10.00 TB', price: '$0.280 / hr' },
          { vcpus: '32 vCPUs', memory: '64 GB', nvme: '1280 GB', bandwidth: '10.00 TB', price: '$0.560 / hr' },
        ],
      },
      {
        id: 'cloud-gpu',
        title: 'Cloud GPU',
        description: 'VMs with affordable, virtualized NVIDIA GPUs.',
        Icon: Shield,
        heroTitle: 'Cloud GPU',
        heroDescription: [
          'Provision GPUs for training, fine-tuning, and production inference.',
          'Pick cost-effective instances for experimentation or scale up for throughput.',
        ],
        useCases: 'training, inference, and batch rendering.',
        columns: ['GPU', 'vCPUs', 'Memory', 'Storage', 'Hourly Price'],
        rows: [
          { gpu: 'T4', vcpus: '8 vCPUs', memory: '32 GB', storage: 'NVMe', price: '$0.65 / hr' },
          { gpu: 'L4', vcpus: '16 vCPUs', memory: '64 GB', storage: 'NVMe', price: '$0.95 / hr' },
          { gpu: 'A10', vcpus: '24 vCPUs', memory: '96 GB', storage: 'NVMe', price: '$1.35 / hr' },
          { gpu: 'A100', vcpus: '32 vCPUs', memory: '192 GB', storage: 'NVMe', price: '$3.20 / hr' },
          { gpu: 'H100', vcpus: '48 vCPUs', memory: '384 GB', storage: 'NVMe', price: '$5.90 / hr' },
        ],
      },
      {
        id: 'bare-metal',
        title: 'Bare Metal',
        description: 'Single-tenant dedicated servers.',
        Icon: Server,
        heroTitle: 'Bare Metal',
        heroDescription: [
          'Dedicated servers for maximum performance, isolation, and compliance requirements.',
          'Run your own hypervisor, storage stack, or specialized networking on dedicated hardware.',
        ],
        useCases: 'compliance, storage systems, and custom networking.',
        columns: ['CPU', 'Memory', 'Storage', 'Network', 'Monthly Price'],
        rows: [
          { cpu: '12 cores', memory: '64 GB', storage: '2× 960 GB NVMe', network: '10 Gbps', price: '$199 / mo' },
          { cpu: '24 cores', memory: '128 GB', storage: '2× 1.92 TB NVMe', network: '10 Gbps', price: '$349 / mo' },
          { cpu: '48 cores', memory: '256 GB', storage: '2× 3.84 TB NVMe', network: '25 Gbps', price: '$699 / mo' },
        ],
      },
      {
        id: 'kubernetes-engine',
        title: 'Kubernetes Engine',
        description: 'Managed Kubernetes clusters.',
        Icon: Layers,
        heroTitle: 'Kubernetes Engine',
        heroDescription: [
          'Provision production-ready Kubernetes clusters with a managed control plane.',
          'Attach compute plans from the catalog and scale nodes as demand grows.',
        ],
        useCases: 'container platforms and multi-service deployments.',
        columns: ['Tier', 'Control plane', 'Included features', 'Monthly Price'],
        rows: [
          { tier: 'Standard', controlplane: 'Managed', features: 'Upgrades, RBAC, API access', price: '$0 / mo' },
          { tier: 'Pro', controlplane: 'HA Managed', features: 'Multi-zone, autoscaling', price: '$99 / mo' },
          { tier: 'Enterprise', controlplane: 'Custom', features: 'Dedicated support + compliance', price: 'Contact sales' },
        ],
      },
      {
        id: 'databases',
        title: 'Databases',
        description: 'Databases that just work right out of the box.',
        Icon: Database,
        heroTitle: 'Databases',
        heroDescription: [
          'Managed Postgres and Redis designed for reliable backups, monitoring, and upgrades.',
          'Start small and scale without re-architecting your platform.',
        ],
        useCases: 'production data stores and caching layers.',
        columns: ['Plan', 'Storage', 'Backups', 'HA', 'Monthly Price'],
        rows: [
          { plan: 'Starter', storage: '20 GB', backups: 'Daily', ha: '—', price: '$15 / mo' },
          { plan: 'Standard', storage: '100 GB', backups: 'Hourly', ha: 'Optional', price: '$59 / mo' },
          { plan: 'Pro', storage: '500 GB', backups: 'Continuous', ha: 'Included', price: '$199 / mo' },
          { plan: 'Enterprise', storage: 'Custom', backups: 'Custom', ha: 'Included', price: 'Contact sales' },
        ],
      },
      {
        id: 'block-storage',
        title: 'Block Storage',
        description: 'Network-attached volumes for persistent workloads.',
        Icon: HardDrive,
        heroTitle: 'Block Storage',
        heroDescription: [
          'Attach durable volumes to instances for predictable performance and simple expansion.',
          'Ideal for databases, stateful services, and shared storage needs.',
        ],
        useCases: 'databases, queues, and persistent workloads.',
        columns: ['Tier', 'IOPS', 'Use case', 'Price'],
        rows: [
          { tier: 'Standard', iops: '3k', use: 'General workloads', price: '$0.10 / GB-mo' },
          { tier: 'Performance', iops: '10k', use: 'Databases + queues', price: '$0.17 / GB-mo' },
          { tier: 'Extreme', iops: '30k', use: 'Latency-sensitive', price: '$0.25 / GB-mo' },
        ],
      },
      {
        id: 'object-storage',
        title: 'Object Storage',
        description: 'S3-compatible asset storage.',
        Icon: Boxes,
        heroTitle: 'Object Storage',
        heroDescription: [
          'Store and serve large datasets, media, logs, and backups with S3-compatible APIs.',
          'Designed for durability and throughput with simple pricing.',
        ],
        useCases: 'backups, datasets, and static assets.',
        columns: ['Metric', 'Included', 'Price'],
        rows: [
          { metric: 'Storage', included: '—', price: '$0.02 / GB-mo' },
          { metric: 'Requests', included: '1M / mo', price: '$0.40 / 1M' },
          { metric: 'Egress', included: '1 TB / mo', price: '$0.01 / GB' },
        ],
      },
      {
        id: 'cdn',
        title: 'CDN',
        description: 'Advanced CDN with push and pull zones.',
        Icon: Globe,
        heroTitle: 'CDN',
        heroDescription: [
          'Deliver content globally with caching, TLS, and simple purge controls.',
          'Reduce latency for static assets and streaming workloads.',
        ],
        useCases: 'static websites, media, and API caching.',
        columns: ['Metric', 'Included', 'Price'],
        rows: [
          { metric: 'Requests', included: '1M / mo', price: '$0.30 / 1M' },
          { metric: 'Egress', included: '1 TB / mo', price: '$0.01 / GB' },
          { metric: 'Rules', included: 'Basic', price: 'Included' },
        ],
      },
      {
        id: 'load-balancers',
        title: 'Load Balancers',
        description: 'Network load balancing service.',
        Icon: Network,
        heroTitle: 'Load Balancers',
        heroDescription: [
          'Distribute traffic across services with health checks, TLS termination, and flexible routing.',
          'Deploy with your compute plans and scale as demand grows.',
        ],
        useCases: 'high availability and traffic routing.',
        columns: ['Tier', 'Health checks', 'TLS', 'Monthly Price'],
        rows: [
          { tier: 'Standard', healthchecks: 'Included', tls: 'Included', price: '$10 / mo' },
          { tier: 'Advanced', healthchecks: 'Custom', tls: 'Included', price: '$25 / mo' },
          { tier: 'Enterprise', healthchecks: 'Custom', tls: 'Custom', price: 'Contact sales' },
        ],
      },
      {
        id: 'add-on-services',
        title: 'Add-on Services',
        description: 'Additional product offerings.',
        Icon: Plus,
        heroTitle: 'Add-on Services',
        heroDescription: [
          'Add capabilities like enhanced support, compliance controls, and enterprise integrations.',
          'Bundle add-ons per environment or across your organization.',
        ],
        useCases: 'security, compliance, and support.',
        columns: ['Add-on', 'What you get', 'Price'],
        rows: [
          { addon: 'Advanced support', what: 'Priority response + guidance', price: 'Contact sales' },
          { addon: 'Compliance pack', what: 'Controls + reporting', price: 'Contact sales' },
          { addon: 'Enterprise SSO', what: 'SAML, SCIM, policy controls', price: 'Contact sales' },
        ],
      },
    ],
    [timePeriod, computeTier]
  );

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

  const calculatorTemplates: CalculatorServiceTemplate[] = useMemo(
    () => [
      {
        id: 'compute',
        name: 'Cloud Compute',
        description: 'General purpose VMs for web apps, APIs, and background jobs.',
        Icon: Server,
        items: [
          { key: 'vcpuHours', label: 'vCPU-hours', unit: 'hours', monthlyRate: 0.015, defaultQuantity: 720 },
          { key: 'memoryGiBHours', label: 'Memory GiB-hours', unit: 'GiB-hours', monthlyRate: 0.0025, defaultQuantity: 720 },
          { key: 'egressGB', label: 'Data egress', unit: 'GB', monthlyRate: 0.01, defaultQuantity: 100 },
        ],
      },
      {
        id: 'gpu',
        name: 'Cloud GPU',
        description: 'On-demand GPUs for training, fine-tuning, and inference.',
        Icon: Shield,
        items: [
          { key: 'gpuHours', label: 'GPU-hours', unit: 'hours', monthlyRate: 1.1, defaultQuantity: 40 },
          { key: 'storageGB', label: 'Local NVMe', unit: 'GB', monthlyRate: 0.12, defaultQuantity: 200 },
        ],
      },
      {
        id: 'databases',
        name: 'Managed Databases',
        description: 'Managed Postgres/Redis with backups and monitoring.',
        Icon: Database,
        items: [
          { key: 'dbHours', label: 'Database runtime', unit: 'hours', monthlyRate: 0.06, defaultQuantity: 720 },
          { key: 'dbStorageGB', label: 'Storage', unit: 'GB', monthlyRate: 0.12, defaultQuantity: 100 },
          { key: 'backupGB', label: 'Backups', unit: 'GB', monthlyRate: 0.04, defaultQuantity: 50 },
        ],
      },
      {
        id: 'blockStorage',
        name: 'Block Storage',
        description: 'Persistent volumes for stateful services and databases.',
        Icon: HardDrive,
        items: [
          { key: 'volumeGB', label: 'Provisioned storage', unit: 'GB', monthlyRate: 0.10, defaultQuantity: 200 },
          { key: 'snapshotsGB', label: 'Snapshots', unit: 'GB', monthlyRate: 0.05, defaultQuantity: 50 },
        ],
      },
      {
        id: 'objectStorage',
        name: 'Object Storage',
        description: 'S3-compatible storage for assets, logs, and datasets.',
        Icon: Boxes,
        items: [
          { key: 'storageGB', label: 'Storage', unit: 'GB', monthlyRate: 0.02, defaultQuantity: 500 },
          { key: 'requestsM', label: 'Requests', unit: 'million', monthlyRate: 0.40, defaultQuantity: 2 },
          { key: 'egressGB', label: 'Egress', unit: 'GB', monthlyRate: 0.01, defaultQuantity: 100 },
        ],
      },
      {
        id: 'cdn',
        name: 'CDN',
        description: 'Content delivery with caching and TLS.',
        Icon: Globe,
        items: [
          { key: 'egressGB', label: 'Egress', unit: 'GB', monthlyRate: 0.01, defaultQuantity: 250 },
          { key: 'requestsM', label: 'Requests', unit: 'million', monthlyRate: 0.30, defaultQuantity: 5 },
        ],
      },
      {
        id: 'kubernetes',
        name: 'Kubernetes Engine',
        description: 'Managed Kubernetes control plane + nodes from compute.',
        Icon: Layers,
        items: [
          { key: 'clusters', label: 'Clusters', unit: 'count', monthlyRate: 0, defaultQuantity: 1 },
          { key: 'nodes', label: 'Worker nodes', unit: 'count', monthlyRate: 12, defaultQuantity: 3 },
        ],
      },
      {
        id: 'loadBalancers',
        name: 'Load Balancers',
        description: 'Traffic distribution with health checks and TLS.',
        Icon: Network,
        items: [
          { key: 'lbs', label: 'Load balancers', unit: 'count', monthlyRate: 10, defaultQuantity: 1 },
          { key: 'processedGB', label: 'Processed data', unit: 'GB', monthlyRate: 0.008, defaultQuantity: 300 },
        ],
      },
    ],
    []
  );

  const [calculatorQuery, setCalculatorQuery] = useState('');
  const [calculatorPickerOpen, setCalculatorPickerOpen] = useState(false);
  const [calculatorServices, setCalculatorServices] = useState<CalculatorSelectedService[]>([]);

  const addCalculatorService = (templateId: string) => {
    const template = calculatorTemplates.find((t) => t.id === templateId);
    if (!template) return;

    const instanceId = `${templateId}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const quantities: Record<string, number> = {};
    template.items.forEach((i) => {
      quantities[i.key] = i.defaultQuantity;
    });

    setCalculatorServices((prev) => [...prev, { instanceId, templateId, quantities }]);
    setCalculatorPickerOpen(false);
    setCalculatorQuery('');
    setCatalogHash(templateId);
  };

  const removeCalculatorService = (instanceId: string) => {
    setCalculatorServices((prev) => prev.filter((s) => s.instanceId !== instanceId));
  };

  const updateCalculatorQuantity = (instanceId: string, key: string, value: number) => {
    setCalculatorServices((prev) =>
      prev.map((s) =>
        s.instanceId === instanceId
          ? { ...s, quantities: { ...s.quantities, [key]: Number.isFinite(value) ? value : 0 } }
          : s
      )
    );
  };

  const formatMoney = (value: number) => {
    return value.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
  };

  const calculatorEstimate = useMemo(() => {
    const serviceBreakdown = calculatorServices.map((svc) => {
      const template = calculatorTemplates.find((t) => t.id === svc.templateId);
      if (!template) return { instanceId: svc.instanceId, name: svc.templateId, total: 0 };

      const total = template.items.reduce((sum, item) => {
        const qty = svc.quantities[item.key] ?? 0;
        return sum + qty * item.monthlyRate;
      }, 0);

      return { instanceId: svc.instanceId, name: template.name, total };
    });

    const total = serviceBreakdown.reduce((sum, s) => sum + s.total, 0);
    return { serviceBreakdown, total };
  }, [calculatorServices, calculatorTemplates]);

  const setCatalogHash = (id: string) => {
    window.history.replaceState(null, '', `#${id}`);
  };

  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (!hash) return;

    const exists = catalogItems.some((item) => item.id === hash);
    if (!exists) return;

    setActiveCatalogSection(hash);
  }, [catalogItems]);

  const activeCatalogItem = useMemo(() => {
    return catalogItems.find((item) => item.id === activeCatalogSection) ?? catalogItems[0];
  }, [activeCatalogSection, catalogItems]);
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Nav />

      <main className="pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            {/* Hero Text */}
            <div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                Pricing as <br />
                <span className="text-[#00ff88]">magical</span> as our <br />
                product
              </h1>
              <p className="text-xl text-gray-400 max-w-lg mb-10 leading-relaxed">
                With Modal, you always pay for what you use and nothing more.
                You never pay for idle resources — just actual compute time, by
                the CPU cycle.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 rounded-full bg-[#00ff88] text-black font-bold hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                  Get Started
                </button>
                <button className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>

            {/* Compute Costs Table */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Compute costs</h2>
                <div className="bg-[#1a1a1a] rounded-full p-1 flex items-center border border-white/10">
                  <button
                    onClick={() => setBillingPeriod('hour')}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingPeriod === 'hour' ? 'bg-[#00ff88] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>

                    Per hour
                  </button>
                  <button
                    onClick={() => setBillingPeriod('second')}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingPeriod === 'second' ? 'bg-[#00ff88] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>

                    Per second
                  </button>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-2 mb-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                      GPU Tasks
                    </h3>
                  </div>
                  {gpuTasks.map((gpu) =>
                  <div
                    key={gpu.name}
                    className="flex justify-between items-center text-sm hover:bg-white/5 p-2 rounded transition-colors">

                      <span className="text-gray-300 font-medium">
                        {gpu.name}
                      </span>
                      <span className="font-mono text-[#00ff88] font-bold">
                        {formatPrice(gpu.price)}
                      </span>
                    </div>
                  )}

                  <div className="border-b border-white/10 pb-2 mb-4 mt-8">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                      CPU & Memory
                    </h3>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2">
                    <span className="text-gray-300 font-medium">
                      Physical core (2 vCPU)
                    </span>
                    <div className="text-right">
                      <span className="font-mono text-white font-bold">
                        {billingPeriod === 'hour' ?
                        '$0.047 / core / hr' :
                        '$0.0000131 / core / sec'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2">
                    <span className="text-gray-300 font-medium">Memory</span>
                    <span className="font-mono text-white font-bold">
                      {billingPeriod === 'hour' ?
                      '$0.008 / GiB / hr' :
                      '$0.00000222 / GiB / sec'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-32">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-12 text-center">
              Pricing Plans
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-10 flex flex-col hover:border-[rgba(var(--accent-rgb),0.35)] transition-all duration-300 hover:scale-105 group">
                <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-bold text-white">$0</span>
                  <span className="text-sm text-gray-400 font-medium">
                    + compute / month
                  </span>
                </div>
                <p className="text-gray-400 mb-8 h-12 leading-relaxed">
                  Built for small teams and independent developers looking to
                  level up.
                </p>
                <button className="w-full py-4 rounded-full bg-[color:var(--accent)] text-white font-bold text-sm mb-8 hover:bg-[color:var(--accent-hover)] transition-colors shadow-[0_0_18px_rgba(var(--accent-rgb),0.14)]">
                  Get started with $30 / month free credit
                </button>
                <ul className="space-y-4">
                  {[
                  '$30 / month free credits',
                  '3 workspace seats included',
                  '100 containers + 10 GPU concurrency',
                  'Crons and web endpoints (limited)',
                  'Real-time metrics and logs',
                  'Region selection'].
                  map((item) =>
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-gray-300">

                      <div className="mt-0.5 rounded-full bg-[color:var(--accent)] p-0.5 shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      {item}
                    </li>
                  )}
                </ul>
              </div>

              {/* Team */}
              <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-10 flex flex-col hover:border-[rgba(var(--accent-rgb),0.35)] transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-[color:var(--accent)]" />
                <h3 className="text-2xl font-bold text-white mb-2">Team</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-bold text-white">$250</span>
                  <span className="text-sm text-gray-400 font-medium">
                    + compute / month
                  </span>
                </div>
                <p className="text-gray-400 mb-8 h-12 leading-relaxed">
                  Built for startups and larger organizations looking to scale
                  quickly.
                </p>
                <button className="w-full py-4 rounded-full border border-white/20 text-white font-bold text-sm mb-8 hover:bg-white/5 transition-colors">
                  Sign in to upgrade
                </button>
                <ul className="space-y-4">
                  {[
                  '$100 / month free credits',
                  'Unlimited seats',
                  '1000 containers + 50 GPU concurrency',
                  'Unlimited crons and web endpoints',
                  'Custom domains',
                  'Static IP proxy',
                  'Deployment rollbacks'].
                  map((item) =>
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-gray-300">

                      <div className="mt-0.5 rounded-full bg-[color:var(--accent)] p-0.5 shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      {item}
                    </li>
                  )}
                </ul>
              </div>

              {/* Enterprise */}
              <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-10 flex flex-col hover:border-[rgba(var(--accent-rgb),0.35)] transition-all duration-300 hover:scale-105 group">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Enterprise
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-bold text-white">Custom</span>
                </div>
                <p className="text-gray-400 mb-8 h-12 leading-relaxed">
                  For organizations prioritizing security, support, and
                  everlasting confidence.
                </p>
                <button className="w-full py-4 rounded-full border border-white/20 text-white font-bold text-sm mb-8 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  Get in touch <ArrowRight size={16} />
                </button>
                <ul className="space-y-4">
                  {[
                  'Volume-based discounts',
                  'Unlimited seats',
                  'Higher GPU concurrency',
                  'Embedded ML engineering services',
                  'Support via private Slack',
                  'Audit logs, Okta SSO, and HIPAA'].
                  map((item) =>
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-gray-300">

                      <div className="mt-0.5 rounded-full bg-[color:var(--accent)] p-0.5 shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      {item}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Catalog */}
          <section className="mb-32">
            <div className="flex items-end justify-between gap-8 mb-10">
              <div>
                <h2 className="text-4xl font-bold">Pricing catalog</h2>
                <p className="mt-2 text-gray-400 max-w-2xl">
                  Explore product categories and pricing details. Select any item on the left to view pricing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-3">
                  {catalogItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveCatalogSection(item.id);
                        setCatalogHash(item.id);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-colors flex items-start gap-3 ${
                        activeCatalogSection === item.id
                          ? 'border-[rgba(var(--accent-rgb),0.55)] bg-[rgba(var(--accent-rgb),0.10)]'
                          : 'border-white/10 bg-[#0a0a0a] hover:border-[rgba(var(--accent-rgb),0.35)]'
                      }`}
                    >
                      <div
                        className={`mt-0.5 h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${
                          activeCatalogSection === item.id
                            ? 'border-[rgba(var(--accent-rgb),0.45)] bg-[rgba(var(--accent-rgb),0.12)]'
                            : 'border-white/10 bg-[#111]'
                        }`}
                      >
                        <item.Icon
                          size={18}
                          className={
                            activeCatalogSection === item.id
                              ? 'text-[color:var(--accent)]'
                              : 'text-gray-400'
                          }
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold truncate">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </aside>

              <div className="lg:col-span-8">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl border border-white/10 bg-[#111] flex items-center justify-center shrink-0">
                      <activeCatalogItem.Icon size={20} className="text-[color:var(--accent)]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {activeCatalogItem.heroTitle ?? activeCatalogItem.title}
                      </h3>
                      <div className="mt-4 space-y-3 text-sm md:text-base text-gray-400 leading-relaxed">
                        {(activeCatalogItem.heroDescription ?? [activeCatalogItem.description]).map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                      {activeCatalogItem.useCases && (
                        <div className="mt-4 text-sm text-gray-400">
                          <span className="font-bold text-gray-300">Use cases:</span>{' '}
                          {activeCatalogItem.useCases}
                        </div>
                      )}
                    </div>
                    {activeCatalogItem.id === 'cloud-compute' && (
                      <div className="ml-auto shrink-0 flex flex-col items-end gap-2">
                        <div className="bg-[#1a1a1a] rounded-full p-1 flex items-center border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                          {(['hour', 'monthly', 'year'] as const).map((period) => (
                            <div key={period} className="relative flex items-stretch">
                              <button
                                onClick={() => setTimePeriod(period)}
                                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                                  timePeriod === period
                                    ? 'bg-[#3f60c7] text-black shadow-[0_8px_20px_rgba(63,96,199,0.35)]'
                                    : 'text-gray-300 hover:text-white'
                                }`}
                              >
                                {period === 'hour' ? 'Hours' : period === 'monthly' ? 'Monthly' : 'Year'}
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="bg-[#1a1a1a] rounded-full p-1 flex items-center border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                          {(['standard', 'developer', 'high-frequency'] as const).map((tier) => (
                            <div key={tier} className="relative flex items-stretch">
                              <button
                                onClick={() => setComputeTier(tier)}
                                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                                  computeTier === tier
                                    ? 'bg-[#3f60c7] text-black shadow-[0_8px_20px_rgba(63,96,199,0.35)]'
                                    : 'text-gray-300 hover:text-white'
                                }`}
                              >
                                {tier === 'high-frequency' ? 'High Frequency' : tier === 'developer' ? 'Developer' : 'Standard'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-10 space-y-10">
                    {Array.isArray(activeCatalogItem.groups) && activeCatalogItem.groups.length > 0 ? (
                      activeCatalogItem.groups.map((group) => (
                        <div key={group.title}>
                          <div className="flex items-start gap-3 mb-4">
                            <div className="h-8 w-8 rounded-lg border border-white/10 bg-[#111] flex items-center justify-center shrink-0">
                              <activeCatalogItem.Icon size={16} className="text-[color:var(--accent)]" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xl font-bold">{group.title}</div>
                              <div className="mt-1 text-sm text-gray-400">{group.description}</div>
                            </div>
                          </div>

                          <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="border-b border-white/10">
                                    {group.columns.map((c) => (
                                      <th
                                        key={c.key}
                                        className="py-4 px-4 text-gray-400 font-medium uppercase tracking-wider text-xs whitespace-nowrap"
                                      >
                                        {c.label}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                  {group.rows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                                      {group.columns.map((c, i) => (
                                        <td
                                          key={c.key}
                                          className={
                                            i === group.columns.length - 1
                                              ? 'py-4 px-4 font-mono text-[color:var(--accent)] font-bold whitespace-nowrap'
                                              : 'py-4 px-4 text-gray-300 whitespace-nowrap'
                                          }
                                        >
                                          {row[c.key] ?? ''}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : activeCatalogItem.columns && activeCatalogItem.rows ? (
                      <div>
                        <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-white/10">
                                  {activeCatalogItem.columns.map((c) => (
                                    <th
                                      key={c}
                                      className="py-4 px-4 text-gray-400 font-medium uppercase tracking-wider text-xs whitespace-nowrap"
                                    >
                                      {c}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {activeCatalogItem.rows.map((row: Record<string, string>, idx: number) => (
                                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                                    {Object.values(row).map((val, i) => (
                                      <td
                                        key={i}
                                        className={
                                          i === Object.values(row).length - 1
                                            ? 'py-4 px-4 font-mono text-[color:var(--accent)] font-bold whitespace-nowrap'
                                            : 'py-4 px-4 text-gray-300 whitespace-nowrap'
                                        }
                                      >
                                        {val}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">No pricing data available.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Calculator */}
          <section className="py-32 px-6 bg-[#050505] -mx-6 mb-32">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <Calculator size={16} className="text-[color:var(--accent)]" />
                    Pricing Calculator
                  </div>
                  <h2 className="mt-3 text-4xl font-bold">Build your estimate</h2>
                  <p className="mt-2 text-gray-400 max-w-2xl">
                    Add services, customize usage, and get an instant monthly estimate across your stack.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setCalculatorPickerOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:bg-[color:var(--accent-hover)] transition-colors"
                  >
                    <Plus size={18} />
                    Add service
                  </button>
                  <button
                    onClick={() => setCalculatorServices([])}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white font-bold hover:bg-white/5 transition-colors"
                  >
                    Clear
                    <X size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                  {calculatorServices.length === 0 ? (
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 text-center">
                      <div className="text-2xl font-bold">Start an estimate</div>
                      <p className="mt-2 text-gray-400">
                        Add one or more services and customize the usage to see monthly totals.
                      </p>
                      <button
                        onClick={() => setCalculatorPickerOpen(true)}
                        className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:bg-[color:var(--accent-hover)] transition-colors"
                      >
                        <Plus size={18} />
                        Add your first service
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {calculatorServices.map((svc) => {
                        const template = calculatorTemplates.find((t) => t.id === svc.templateId);
                        if (!template) return null;
                        const serviceTotal = template.items.reduce((sum, item) => {
                          const qty = svc.quantities[item.key] ?? 0;
                          return sum + qty * item.monthlyRate;
                        }, 0);

                        return (
                          <div
                            key={svc.instanceId}
                            className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 min-w-0">
                                <div className="h-10 w-10 rounded-xl border border-white/10 bg-[#111] flex items-center justify-center shrink-0">
                                  <template.Icon size={18} className="text-[color:var(--accent)]" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xl font-bold truncate">{template.name}</div>
                                  <div className="mt-1 text-sm text-gray-400">{template.description}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right">
                                  <div className="text-xs text-gray-500">Monthly subtotal</div>
                                  <div className="text-lg font-bold text-[color:var(--accent)]">
                                    {formatMoney(serviceTotal)}
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeCalculatorService(svc.instanceId)}
                                  className="h-10 w-10 rounded-xl border border-white/10 bg-[#111] hover:bg-white/5 transition-colors flex items-center justify-center"
                                >
                                  <Trash2 size={16} className="text-gray-400" />
                                </button>
                              </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                              {template.items.map((item) => (
                                <div
                                  key={item.key}
                                  className="rounded-2xl border border-white/10 bg-[#050505] p-4"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                      <div className="font-bold truncate">{item.label}</div>
                                      <div className="mt-1 text-xs text-gray-500">
                                        {formatMoney(item.monthlyRate)} / {item.unit}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-xs text-gray-500">Estimated</div>
                                      <div className="font-mono text-sm text-white">
                                        {formatMoney((svc.quantities[item.key] ?? 0) * item.monthlyRate)}
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
                                          Number(e.target.value)
                                        )
                                      }
                                      className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[rgba(var(--accent-rgb),0.45)]"
                                    />
                                    <div className="text-xs text-gray-500 whitespace-nowrap">
                                      {item.unit}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <aside className="lg:col-span-4">
                  <div className="sticky top-28 space-y-4">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                      <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Monthly estimate
                      </div>
                      <div className="mt-3 text-4xl font-bold text-white">
                        {formatMoney(calculatorEstimate.total)}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Totals are estimates for planning purposes and may vary by region and configuration.
                      </div>
                    </div>

                    {calculatorEstimate.serviceBreakdown.length > 0 && (
                      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                          Services
                        </div>
                        <div className="space-y-3">
                          {calculatorEstimate.serviceBreakdown.map((s) => (
                            <div key={s.instanceId} className="flex items-center justify-between gap-3">
                              <div className="text-sm text-gray-300 truncate">{s.name}</div>
                              <div className="font-mono text-sm text-[color:var(--accent)] font-bold whitespace-nowrap">
                                {formatMoney(s.total)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </aside>
              </div>

              {calculatorPickerOpen && (
                <div className="fixed inset-0 z-50">
                  <button
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setCalculatorPickerOpen(false)}
                  />
                  <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[min(920px,calc(100%-24px))] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-xl font-bold">Add a service</div>
                        <div className="text-sm text-gray-400">
                          Search and select services to include in your estimate.
                        </div>
                      </div>
                      <button
                        onClick={() => setCalculatorPickerOpen(false)}
                        className="h-10 w-10 rounded-xl border border-white/10 bg-[#111] hover:bg-white/5 transition-colors flex items-center justify-center"
                      >
                        <X size={18} className="text-gray-400" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          value={calculatorQuery}
                          onChange={(e) => setCalculatorQuery(e.target.value)}
                          placeholder="Search services"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[rgba(var(--accent-rgb),0.45)]"
                          autoFocus
                        />
                      </div>

                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {calculatorTemplates
                          .filter((t) => {
                            const q = calculatorQuery.trim().toLowerCase();
                            if (!q) return true;
                            return (
                              t.name.toLowerCase().includes(q) ||
                              t.description.toLowerCase().includes(q)
                            );
                          })
                          .map((t) => (
                            <button
                              key={t.id}
                              onClick={() => addCalculatorService(t.id)}
                              className="text-left p-4 rounded-2xl border border-white/10 bg-[#050505] hover:bg-white/5 hover:border-[rgba(var(--accent-rgb),0.35)] transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-xl border border-white/10 bg-[#111] flex items-center justify-center shrink-0">
                                  <t.Icon size={18} className="text-[color:var(--accent)]" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold truncate">{t.name}</div>
                                  <div className="mt-1 text-xs text-gray-500 line-clamp-2">
                                    {t.description}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-32">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Compare Plans
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 px-4 text-gray-400 font-medium uppercase tracking-wider w-1/4">
                      Feature
                    </th>
                    <th className="py-6 px-4 text-white font-bold text-xl w-1/4">
                      Starter
                    </th>
                    <th className="py-6 px-4 text-[#00ff88] font-bold text-xl w-1/4">
                      Team
                    </th>
                    <th className="py-6 px-4 text-white font-bold text-xl w-1/4">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                  {
                    feat: 'Monthly Credits',
                    s: '$30',
                    t: '$100',
                    e: 'Custom'
                  },
                  {
                    feat: 'Concurrency Limit',
                    s: '100',
                    t: '1000',
                    e: 'Unlimited'
                  },
                  {
                    feat: 'GPU Limit',
                    s: '10',
                    t: '50',
                    e: 'Custom'
                  },
                  {
                    feat: 'Seats',
                    s: '3',
                    t: 'Unlimited',
                    e: 'Unlimited'
                  },
                  {
                    feat: 'SSO',
                    s: '-',
                    t: '-',
                    e: 'Included'
                  },
                  {
                    feat: 'Support',
                    s: 'Community',
                    t: 'Standard',
                    e: 'Dedicated Slack'
                  }].
                  map((row, i) =>
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-6 px-4 font-bold text-white">
                        {row.feat}
                      </td>
                      <td className="py-6 px-4 text-gray-300">{row.s}</td>
                      <td className="py-6 px-4 text-[#00ff88] font-bold">
                        {row.t}
                      </td>
                      <td className="py-6 px-4 text-white font-bold">
                        {row.e}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-24 border-t border-white/5">
            <h2 className="text-4xl font-bold mb-12 text-center">FAQ</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
              {
                q: 'Are there any hidden fees?',
                a: 'No. You only pay for the compute resources you use. There are no seat fees or platform fees.'
              },
              {
                q: 'Do you offer startup credits?',
                a: 'Yes, we have a startup program. Apply to get up to $5,000 in credits.'
              },
              {
                q: 'How does billing work?',
                a: 'We bill monthly based on your usage in the previous month. You can set spending limits to avoid surprises.'
              },
              {
                q: 'Can I pay with invoice?',
                a: 'Yes, Team and Enterprise plans support invoicing.'
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
          </section>

          {/* CTA */}
          <section className="py-40 px-6 text-center border-t border-white/5 bg-gradient-to-b from-black to-[#05150d]">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Ready to start?
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Join thousands of developers building the future of AI on Modal.
              </p>
              <button className="px-12 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                Sign Up Now
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>);

}