import { useEffect, useMemo, useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
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
} from "lucide-react";
export function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"hour" | "month">("hour");
  const [timePeriod, setTimePeriod] = useState<"hour" | "monthly" | "year">(
    "hour",
  );
  const [computeTier, setComputeTier] = useState<
    "standard" | "developer" | "high-frequency"
  >("standard");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCatalogSection, setActiveCatalogSection] = useState("vx1");
  // Pricing data from pricingcalculator.tsx (converted to USD for display)
  const cpuPlansUSD = [
    {
      id: "bl1",
      name: "BL1",
      vcpu: 1,
      memory: 4,
      hourlyPrice: 0.072,
      monthlyPrice: 52.56,
    },
    {
      id: "bl2",
      name: "BL2",
      vcpu: 2,
      memory: 8,
      hourlyPrice: 0.145,
      monthlyPrice: 105.7,
    },
    {
      id: "bl4",
      name: "BL4",
      vcpu: 4,
      memory: 16,
      hourlyPrice: 0.29,
      monthlyPrice: 211.7,
    },
    {
      id: "bl8",
      name: "BL8",
      vcpu: 8,
      memory: 32,
      hourlyPrice: 0.579,
      monthlyPrice: 422.67,
    },
    {
      id: "bl12",
      name: "BL12",
      vcpu: 12,
      memory: 48,
      hourlyPrice: 0.869,
      monthlyPrice: 634.37,
    },
    {
      id: "bl16",
      name: "BL16",
      vcpu: 16,
      memory: 64,
      hourlyPrice: 1.158,
      monthlyPrice: 845.34,
    },
    {
      id: "bl24",
      name: "BL24",
      vcpu: 24,
      memory: 96,
      hourlyPrice: 1.738,
      monthlyPrice: 1268.87,
    },
  ];

  const computeTierData = {
    standard: [
      {
        vcpus: "1 vCPU",
        memory: "2 GB",
        bandwidth: "2.00 TB",
        storage: "Block Storage",
        baseHourlyPrice: 0.015,
      },
      {
        vcpus: "2 vCPUs",
        memory: "4 GB",
        bandwidth: "3.00 TB",
        storage: "Block Storage",
        baseHourlyPrice: 0.03,
      },
      {
        vcpus: "4 vCPUs",
        memory: "8 GB",
        bandwidth: "4.00 TB",
        storage: "Block Storage",
        baseHourlyPrice: 0.06,
      },
      {
        vcpus: "8 vCPUs",
        memory: "16 GB",
        bandwidth: "5.00 TB",
        storage: "Block Storage",
        baseHourlyPrice: 0.12,
      },
      {
        vcpus: "16 vCPUs",
        memory: "32 GB",
        bandwidth: "6.00 TB",
        storage: "Block Storage",
        baseHourlyPrice: 0.24,
      },
      {
        vcpus: "32 vCPUs",
        memory: "64 GB",
        bandwidth: "7.00 TB",
        storage: "Block Storage",
        baseHourlyPrice: 0.48,
      },
    ],
    developer: [
      {
        vcpus: "2 vCPUs",
        memory: "8 GB",
        bandwidth: "4.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 0.045,
      },
      {
        vcpus: "4 vCPUs",
        memory: "16 GB",
        bandwidth: "6.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 0.09,
      },
      {
        vcpus: "8 vCPUs",
        memory: "32 GB",
        bandwidth: "8.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 0.18,
      },
      {
        vcpus: "16 vCPUs",
        memory: "64 GB",
        bandwidth: "10.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 0.36,
      },
      {
        vcpus: "32 vCPUs",
        memory: "128 GB",
        bandwidth: "12.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 0.72,
      },
      {
        vcpus: "64 vCPUs",
        memory: "256 GB",
        bandwidth: "15.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 1.44,
      },
    ],
    "high-frequency": [
      {
        vcpus: "4 vCPUs",
        memory: "16 GB",
        bandwidth: "8.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 0.085,
      },
      {
        vcpus: "8 vCPUs",
        memory: "32 GB",
        bandwidth: "12.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 0.17,
      },
      {
        vcpus: "16 vCPUs",
        memory: "64 GB",
        bandwidth: "16.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 0.34,
      },
      {
        vcpus: "32 vCPUs",
        memory: "128 GB",
        bandwidth: "20.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 0.68,
      },
      {
        vcpus: "64 vCPUs",
        memory: "256 GB",
        bandwidth: "25.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 1.36,
      },
      {
        vcpus: "96 vCPUs",
        memory: "384 GB",
        bandwidth: "30.00 TB",
        storage: "NVMe SSD",
        baseHourlyPrice: 2.04,
      },
    ],
  };

  const formatPriceForTimePeriod = (baseHourlyPrice: number) => {
    switch (timePeriod) {
      case "hour":
        return `$${baseHourlyPrice.toFixed(3)} / hr`;
      case "monthly":
        const monthlyPrice = baseHourlyPrice * 730; // Average hours per month
        return `$${monthlyPrice.toFixed(0)} / mo`;
      case "year":
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
        id: "Extra CPU Optimized",
        title: "Extra CPU Optimized",
        description:
          "VMs optimized for affordable core infrastructure workloads.",
        Icon: Server,
        heroTitle: "Extra CPU Optimized",
        heroDescription: [
          "Experience ultra-fast NVMe SSD storage with the flexibility to choose the exact size you need. Scale effortlessly and enjoy high performance, low latency, and maximum efficiency for your workloads.",
        ],
        groups: [
          {
            title: "Pay as you go",
            columns: [
              { key: "extra_cpu", label: "Extra CPU Optimized" },
              { key: "vcpu", label: "vCPU (cores)" },
              { key: "ram", label: "Ram (GiB)" },
              { key: "hour", label: "MMK/Hour" },
              { key: "month", label: "MMK/Month" },
            ],
            rows: [
              {
                extra_cpu: "eCO1",
                vcpu: "1",
                ram: "1",
                hour: "24",
                month: "17,812",
              },
              {
                extra_cpu: "eCO2",
                vcpu: "2",
                ram: "2",
                hour: "49",
                month: "35,624",
              },
              {
                extra_cpu: "eCO4",
                vcpu: "4",
                ram: "4",
                hour: "98",
                month: "71,248",
              },
              {
                extra_cpu: "eCO8",
                vcpu: "8",
                ram: "8",
                hour: "195",
                month: "142,496",
              },
              {
                extra_cpu: "eCO12",
                vcpu: "12",
                ram: "12",
                hour: "293",
                month: "213,744",
              },

              {
                extra_cpu: "eCO16",
                vcpu: "16",
                ram: "16",
                hour: "390",
                month: "284,992",
              },
              {
                extra_cpu: "eCO24",
                vcpu: "24",
                ram: "24",
                hour: "586",
                month: "427,488",
              },
            ],
          },
          {
            title: "Reserved Instances",
            columns: [
              { key: "extra_cpu", label: "Extra CPU Optimized" },
              { key: "vcpu", label: "vCPU (cores)" },
              { key: "ram", label: "Ram (GiB)" },
              { key: "reserved", label: "Reserved 1 Year" },
            ],
            rows: [
              {
                extra_cpu: "eCO1",
                vcpu: "1",
                ram: "1",
                reserved: "178,120",
              },
              {
                extra_cpu: "eCO2",
                vcpu: "2",
                ram: "2",
                reserved: "356,240",
              },
              {
                extra_cpu: "eCO4",
                vcpu: "4",
                ram: "4",
                reserved: "712,480",
              },
              {
                extra_cpu: "eCO8",
                vcpu: "8",
                ram: "8",
                reserved: "1,424,960",
              },
              {
                extra_cpu: "eCO12",
                vcpu: "12",
                ram: "12",
                reserved: "2,137,440",
              },
              {
                extra_cpu: "eCO16",
                vcpu: "16",
                ram: "16",
                reserved: "2,849,920",
              },
              {
                extra_cpu: "eCO24",
                vcpu: "24",
                ram: "24",
                reserved: "4,274,880",
              },
            ],
          },
        ],
      },
      {
        id: "CPU Optimized",
        title: "CPU Optimized",
        description: "Easy-to-use, affordable VMs for many common workloads.",
        Icon: Server,
        heroTitle: "CPU Optimized",
        heroDescription: [
          "Experience ultra-fast NVMe SSD storage with the flexibility to choose the exact size you need. Scale effortlessly and enjoy high performance, low latency, and maximum efficiency for your workloads.",
        ],
        groups: [
          {
            title: "Pay as you go",
            columns: [
              { key: "cpu", label: "CPU Optimized" },
              { key: "vcpu", label: "vCPU (cores)" },
              { key: "ram", label: "Ram (GiB)" },
              { key: "hour", label: "MMK/Hour" },
              { key: "month", label: "MMK/Month" },
            ],
            rows: [
              {
                cpu: "CO1",
                vcpu: "1",
                ram: "2",
                hour: "40",
                month: "29,492",
              },
              {
                cpu: "CO2",
                vcpu: "2",
                ram: "4",
                hour: "81",
                month: "58,984",
              },
              {
                cpu: "CO4",
                vcpu: "4",
                ram: "8",
                hour: "162",
                month: "117,968",
              },
              {
                cpu: "CO8",
                vcpu: "8",
                ram: "16",
                hour: "323",
                month: "235,936",
              },
              {
                cpu: "CO12",
                vcpu: "12",
                ram: "24",
                hour: "485",
                month: "353,904",
              },
              {
                cpu: "CO16",
                vcpu: "16",
                ram: "32",
                hour: "646",
                month: "471,872",
              },
              {
                cpu: "CO24",
                vcpu: "24",
                ram: "48",
                hour: "970",
                month: "707,808",
              },
            ],
          },
          {
            title: "Reserved Instances",
            columns: [
              { key: "cpu", label: "CPU Optimized" },
              { key: "vcpu", label: "vCPU (cores)" },
              { key: "ram", label: "Ram (GiB)" },
              { key: "reserved", label: "Reserved 1 Year" },
            ],
            rows: [
              {
                cpu: "CO1",
                vcpu: "1",
                ram: "2",
                reserved: "294,920",
              },
              {
                cpu: "CO2",
                vcpu: "2",
                ram: "4",
                reserved: "589,840",
              },
              {
                cpu: "CO4",
                vcpu: "4",
                ram: "8",
                reserved: "1,179,680",
              },
              {
                cpu: "CO8",
                vcpu: "8",
                ram: "16",
                reserved: "2,359,360",
              },
              {
                cpu: "CO12",
                vcpu: "12",
                ram: "24",
                reserved: "3,539,040",
              },
              {
                cpu: "CO16",
                vcpu: "16",
                ram: "32",
                reserved: "4,718,720",
              },
              {
                cpu: "CO24",
                vcpu: "24",
                ram: "48",
                reserved: "7,078,080",
              },
            ],
          },
        ],
        rows: computeTierData[computeTier].map((item) => ({
          vcpus: item.vcpus,
          memory: item.memory,
          bandwidth: item.bandwidth,
          storage: item.storage,
          price: formatPriceForTimePeriod(item.baseHourlyPrice),
        })),
      },
      {
        id: "Balance",
        title: "Balance",
        description:
          "No noisy neighbors on powerful VMs with built-in NVMe SSD.",
        Icon: Cpu,
        heroTitle: "Balance",
        heroDescription: [
          "Experience ultra-fast NVMe SSD storage with the flexibility to choose the exact size you need. Scale effortlessly and enjoy high performance, low latency, and maximum efficiency for your workloads.",
        ],
        groups: [
          {
            title: "Pay as you go",
            columns: [
              { key: "balance", label: "Balance" },
              { key: "vcpu", label: "vCPU (cores)" },
              { key: "ram", label: "Ram (GiB)" },
              { key: "hour", label: "MMK/Hour" },
              { key: "month", label: "MMK/Month" },
            ],
            rows: [
              {
                balance: "BL1",
                vcpu: "1",
                ram: "4",
                hour: "72",
                month: "52,852",
              },
              {
                balance: "BL2",
                vcpu: "2",
                ram: "8",
                hour: "145",
                month: "105,704",
              },
              {
                balance: "BL4",
                vcpu: "4",
                ram: "16",
                hour: "290",
                month: "211,408",
              },
              {
                balance: "BL8",
                vcpu: "8",
                ram: "32",
                hour: "579",
                month: "422,816",
              },
              {
                balance: "BL12",
                vcpu: "12",
                ram: "48",
                hour: "869",
                month: "634,224",
              },
              {
                balance: "BL16",
                vcpu: "16",
                ram: "64",
                hour: "1,158",
                month: "845,632",
              },
              {
                balance: "BL24",
                vcpu: "24",
                ram: "96",
                hour: "1,738",
                month: "1,268,448",
              },
            ],
          },
          {
            title: "Reserved Instances",
            columns: [
              { key: "balance", label: "Balance" },
              { key: "vcpu", label: "vCPU (cores)" },
              { key: "ram", label: "Ram (GiB)" },
              { key: "reserved", label: "Reserved 1 Year" },
            ],
            rows: [
              {
                balance: "BL1",
                vcpu: "1",
                ram: "4",
                reserved: "528,520",
              },
              {
                balance: "BL2",
                vcpu: "2",
                ram: "8",
                reserved: "1,057,040",
              },
              {
                balance: "BL4",
                vcpu: "4",
                ram: "16",
                reserved: "2,114,080",
              },
              {
                balance: "BL8",
                vcpu: "8",
                ram: "32",
                reserved: "4,228,160",
              },
              {
                balance: "BL12",
                vcpu: "12",
                ram: "48",
                reserved: "6,342,240",
              },
              {
                balance: "BL16",
                vcpu: "16",
                ram: "64",
                reserved: "8,456,320",
              },
              {
                balance: "BL24",
                vcpu: "24",
                ram: "96",
                reserved: "12,684,480",
              },
            ],
          },
        ],
      },
      {
        id: "Memory Dense",
        title: "Memory Dense",
        description: "VMs with affordable, virtualized NVIDIA GPUs.",
        Icon: Shield,
        heroTitle: "Memory Dense",
        heroDescription: [
          "Experience ultra-fast NVMe SSD storage with the flexibility to choose the exact size you need. Scale effortlessly and enjoy high performance, low latency, and maximum efficiency for your workloads",
        ],

        groups: [
          {
            title: "Pay as you go",
            columns: [
              { key: "memory", label: "Memory Dense" },
              { key: "vcpu", label: "vCPU (cores)" },
              { key: "ram", label: "Ram (GiB)" },
              { key: "hour", label: "MMK/Hour" },
              { key: "month", label: "MMK/Month" },
            ],
            rows: [
              {
                memory: "MD1",
                vcpu: "1",
                ram: "6",
                hour: "104",
                month: "76,212",
              },
              {
                memory: "MD2",
                vcpu: "2",
                ram: "12",
                hour: "209",
                month: "152,424",
              },
              {
                memory: "MD4",
                vcpu: "4",
                ram: "24",
                hour: "418",
                month: "304,848",
              },
              {
                memory: "MD8",
                vcpu: "8",
                ram: "48",
                hour: "835",
                month: "609,696",
              },
              {
                memory: "MD12",
                vcpu: "12",
                ram: "72",
                hour: "1,253",
                month: "914,544",
              },
              {
                memory: "MD16",
                vcpu: "16",
                ram: "96",
                hour: "1,670",
                month: "1,219,392",
              },
              {
                memory: "MD24",
                vcpu: "24",
                ram: "114",
                hour: "2,506",
                month: "1,829,088",
              },
            ],
          },
          {
            title: "Reserved Instances",
            columns: [
              { key: "memory", label: "Memory Dense" },
              { key: "vcpu", label: "vCPU (cores)" },
              { key: "ram", label: "Ram (GiB)" },
              { key: "reserved", label: "Reserved 1 Year" },
            ],
            rows: [
              {
                memory: "MD1",
                vcpu: "1",
                ram: "6",
                reserved: "762,120",
              },
              {
                memory: "MD2",
                vcpu: "2",
                ram: "12",
                reserved: "1,524,240",
              },
              {
                memory: "MD4",
                vcpu: "4",
                ram: "24",
                reserved: "3,048,480",
              },
              {
                memory: "MD8",
                vcpu: "8",
                ram: "48",
                reserved: "6,056,960",
              },
              {
                memory: "MD12",
                vcpu: "12",
                ram: "72",
                reserved: "9,145,440",
              },
              {
                memory: "MD16",
                vcpu: "16",
                ram: "96",
                reserved: "12,193,920",
              },
              {
                memory: "MD24",
                vcpu: "24",
                ram: "144",
                reserved: "18,290,880",
              },
            ],
          },
        ],
      },
      {
        id: "Extra Memory Dense",
        title: "Extra Memory Dense",
        description: "Single-tenant dedicated servers.",
        Icon: Server,
        heroTitle: "Extra Memory Dense",
        heroDescription: [
          "Experience ultra-fast NVMe SSD storage with the flexibility to choose the exact size you need. Scale effortlessly and enjoy high performance, low latency, and maximum efficiency for your workloads.",
        ],
        groups: [
          {
            title: "Pay as you go",
            columns: [
              { key: "memory_dense", label: "Extra Memory Dense" },
              { key: "vcpu", label: "vCPU (cores)" },
              { key: "ram", label: "Ram (GiB)" },
              { key: "hour", label: "MMK/Hour" },
              { key: "month", label: "MMK/Month" },
            ],
            rows: [
              {
                memory_dense: "eMD1",
                vcpu: "1",
                ram: "8",
                hour: "136",
                month: "99,572",
              },
              {
                memory: "eMD2",
                vcpu: "2",
                ram: "16",
                hour: "273",
                month: "199,144",
              },
              {
                memory: "eMD4",
                vcpu: "4",
                ram: "32",
                hour: "546",
                month: "398,288",
              },
              {
                memory: "eMD8",
                vcpu: "8",
                ram: "64",
                hour: "1,091",
                month: "796,576",
              },
              {
                memory: "eMD12",
                vcpu: "12",
                ram: "96",
                hour: "1,637",
                month: "1,194,864",
              },
              {
                memory: "eMD16",
                vcpu: "16",
                ram: "128",
                hour: "2,182",
                month: "1,593,152",
              },
              {
                memory: "eMD24",
                vcpu: "24",
                ram: "192",
                hour: "3,274",
                month: "2,389,728",
              },
            ],
          },
          {
            title: "Reserved Instances",
            columns: [
              { key: "memory_dense", label: "Extra Memory Dense" },
              { key: "vcpu", label: "vCPU (cores)" },
              { key: "ram", label: "Ram (GiB)" },
              { key: "reserved", label: "Reserved 1 Year" },
            ],
            rows: [
              {
                memory_dense: "eMD1",
                vcpu: "1",
                ram: "8",
                reserved: "995,720",
              },
              {
                memory_dense: "eMD2",
                vcpu: "2",
                ram: "16",
                reserved: "1,991,440",
              },
              {
                memory_dense: "eMD4",
                vcpu: "4",
                ram: "32",
                reserved: "3,982,880",
              },
              {
                memory_dense: "eMD8",
                vcpu: "8",
                ram: "64",
                reserved: "7,965,760",
              },
              {
                memory_dense: "eMD12",
                vcpu: "12",
                ram: "96",
                reserved: "11,948,640",
              },
              {
                memory_dense: "eMD16",
                vcpu: "16",
                ram: "128",
                reserved: "15,931,520",
              },
              {
                memory_dense: "eMD24",
                vcpu: "24",
                ram: "192",
                reserved: "23,897,280",
              },
            ],
          },
        ],
      },
    ],
    [timePeriod, computeTier],
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
        id: "compute",
        name: "Cloud Compute",
        description:
          "General purpose VMs for web apps, APIs, and background jobs.",
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
    ],
    [],
  );

  const [calculatorQuery, setCalculatorQuery] = useState("");
  const [calculatorPickerOpen, setCalculatorPickerOpen] = useState(false);
  const [calculatorServices, setCalculatorServices] = useState<
    CalculatorSelectedService[]
  >([]);

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
    setCatalogHash(templateId);
  };

  const removeCalculatorService = (instanceId: string) => {
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

  const formatMoney = (value: number) => {
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
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
  }, [calculatorServices, calculatorTemplates]);

  const setCatalogHash = (id: string) => {
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;

    const exists = catalogItems.some((item) => item.id === hash);
    if (!exists) return;

    setActiveCatalogSection(hash);
  }, [catalogItems]);

  const activeCatalogItem = useMemo(() => {
    return (
      catalogItems.find((item) => item.id === activeCatalogSection) ??
      catalogItems[0]
    );
  }, [activeCatalogSection, catalogItems]);
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden selection:bg-[#00ff88] selection:text-black">
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
                <button
                  className="px-8 py-4 rounded-full bg-[#00ff88] font-bold hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]"
                  style={{ color: "white" }}
                >
                  Get Started
                </button>
                <button className="px-8 py-4 rounded-full border border-[var(--border-color)] text-[var(--text-primary)] font-bold text-sm hover:bg-[rgba(var(--accent-rgb),0.06)] transition-colors">
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
                    onClick={() => setBillingPeriod("hour")}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingPeriod === "hour" ? "bg-[#00ff88] shadow-lg" : ""}`}
                    style={{ color: "white" }}
                  >
                    Per hour
                  </button>
                  <button
                    onClick={() => setBillingPeriod("month")}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingPeriod === "month" ? "bg-[#00ff88] shadow-lg" : ""}`}
                    style={{ color: "white" }}
                  >
                    Per month
                  </button>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-2 mb-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Compute Offering
                    </h3>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2">
                    <span className="text-gray-300 font-medium">BL1</span>
                    <span className="font-mono text-white font-bold">
                      {billingPeriod === "hour"
                        ? `$${cpuPlansUSD[0].hourlyPrice.toFixed(3)} / hr`
                        : `$${cpuPlansUSD[0].monthlyPrice.toFixed(2)} / mo`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2">
                    <span className="text-gray-300 font-medium">BL2</span>
                    <span className="font-mono text-white font-bold">
                      {billingPeriod === "hour"
                        ? `$${cpuPlansUSD[1].hourlyPrice.toFixed(3)} / hr`
                        : `$${cpuPlansUSD[1].monthlyPrice.toFixed(2)} / mo`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2">
                    <span className="text-gray-300 font-medium">BL4</span>
                    <span className="font-mono text-white font-bold">
                      {billingPeriod === "hour"
                        ? `$${cpuPlansUSD[2].hourlyPrice.toFixed(3)} / hr`
                        : `$${cpuPlansUSD[2].monthlyPrice.toFixed(2)} / mo`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2">
                    <span className="text-gray-300 font-medium">BL8</span>
                    <span className="font-mono text-white font-bold">
                      {billingPeriod === "hour"
                        ? `$${cpuPlansUSD[3].hourlyPrice.toFixed(3)} / hr`
                        : `$${cpuPlansUSD[3].monthlyPrice.toFixed(2)} / mo`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2">
                    <span className="text-gray-300 font-medium">BL12</span>
                    <span className="font-mono text-white font-bold">
                      {billingPeriod === "hour"
                        ? `$${cpuPlansUSD[4].hourlyPrice.toFixed(3)} / hr`
                        : `$${cpuPlansUSD[4].monthlyPrice.toFixed(2)} / mo`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2">
                    <span className="text-gray-300 font-medium">BL16</span>
                    <span className="font-mono text-white font-bold">
                      {billingPeriod === "hour"
                        ? `$${cpuPlansUSD[5].hourlyPrice.toFixed(3)} / hr`
                        : `$${cpuPlansUSD[5].monthlyPrice.toFixed(2)} / mo`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2">
                    <span className="text-gray-300 font-medium">BL24</span>
                    <span className="font-mono text-white font-bold">
                      {billingPeriod === "hour"
                        ? `$${cpuPlansUSD[6].hourlyPrice.toFixed(3)} / hr`
                        : `$${cpuPlansUSD[6].monthlyPrice.toFixed(2)} / mo`}
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
                <button
                  className="w-full py-4 rounded-full bg-[color:var(--accent)] font-bold text-sm mb-8 hover:bg-[color:var(--accent-hover)] transition-colors shadow-[0_0_18px_rgba(var(--accent-rgb),0.14)]"
                  style={{ color: "white" }}
                >
                  Get started with $30 / month free credit
                </button>
                <ul className="space-y-4">
                  {[
                    "$30 / month free credits",
                    "3 workspace seats included",
                    "100 containers + 10 GPU concurrency",
                    "Crons and web endpoints (limited)",
                    "Real-time metrics and logs",
                    "Region selection",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <div className="mt-0.5 rounded-full bg-[color:var(--accent)] p-0.5 shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      {item}
                    </li>
                  ))}
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
                    "$100 / month free credits",
                    "Unlimited seats",
                    "1000 containers + 50 GPU concurrency",
                    "Unlimited crons and web endpoints",
                    "Custom domains",
                    "Static IP proxy",
                    "Deployment rollbacks",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <div className="mt-0.5 rounded-full bg-[color:var(--accent)] p-0.5 shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      {item}
                    </li>
                  ))}
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
                    "Volume-based discounts",
                    "Unlimited seats",
                    "Higher GPU concurrency",
                    "Embedded ML engineering services",
                    "Support via private Slack",
                    "Audit logs, Okta SSO, and HIPAA",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-gray-300"
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
          </div>

          {/* Pricing Catalog */}
          <section className="mb-32">
            <div className="flex items-end justify-between gap-8 mb-10">
              <div>
                <h2 className="text-4xl font-bold">Pricing catalog</h2>
                <p className="mt-2 text-gray-400 max-w-2xl">
                  Explore product categories and pricing details. Select any
                  item on the left to view pricing.
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
                          ? "border-[rgba(var(--accent-rgb),0.55)] bg-[rgba(var(--accent-rgb),0.10)]"
                          : "border-white/10 bg-[#0a0a0a] hover:border-[rgba(var(--accent-rgb),0.35)]"
                      }`}
                    >
                      <div
                        className={`mt-0.5 h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${
                          activeCatalogSection === item.id
                            ? "border-[rgba(var(--accent-rgb),0.45)] bg-[rgba(var(--accent-rgb),0.12)]"
                            : "border-white/10 bg-[#111]"
                        }`}
                      >
                        <item.Icon
                          size={18}
                          className={
                            activeCatalogSection === item.id
                              ? "text-[color:var(--accent)]"
                              : "text-gray-400"
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
                      <activeCatalogItem.Icon
                        size={20}
                        className="text-[color:var(--accent)]"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {activeCatalogItem.heroTitle ?? activeCatalogItem.title}
                      </h3>
                      <div className="mt-4 space-y-3 text-sm md:text-base text-gray-400 leading-relaxed">
                        {(
                          activeCatalogItem.heroDescription ?? [
                            activeCatalogItem.description,
                          ]
                        ).map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                      {activeCatalogItem.useCases && (
                        <div className="mt-4 text-sm text-gray-400">
                          <span className="font-bold text-gray-300">
                            Use cases:
                          </span>{" "}
                          {activeCatalogItem.useCases}
                        </div>
                      )}
                    </div>
                    {activeCatalogItem.id === "cloud-compute" && (
                      <div className="ml-auto shrink-0 flex flex-col items-end gap-2">
                        <div className="bg-[#1a1a1a] rounded-full p-1 flex items-center border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                          {(["hour", "monthly", "year"] as const).map(
                            (period) => (
                              <div
                                key={period}
                                className="relative flex items-stretch"
                              >
                                <button
                                  onClick={() => setTimePeriod(period)}
                                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                                    timePeriod === period
                                      ? "bg-[#3f60c7] shadow-[0_8px_20px_rgba(63,96,199,0.35)]"
                                      : "text-gray-300 hover:text-white"
                                  }`}
                                  style={
                                    timePeriod === period
                                      ? { color: "white" }
                                      : undefined
                                  }
                                >
                                  {period === "hour"
                                    ? "Hours"
                                    : period === "monthly"
                                      ? "Monthly"
                                      : "Year"}
                                </button>
                              </div>
                            ),
                          )}
                        </div>

                        <div className="bg-[#1a1a1a] rounded-full p-1 flex items-center border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                          {(
                            ["standard", "developer", "high-frequency"] as const
                          ).map((tier) => (
                            <div
                              key={tier}
                              className="relative flex items-stretch"
                            >
                              <button
                                onClick={() => setComputeTier(tier)}
                                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                                  computeTier === tier
                                    ? "bg-[#3f60c7] shadow-[0_8px_20px_rgba(63,96,199,0.35)]"
                                    : "text-gray-300 hover:text-white"
                                }`}
                                style={
                                  computeTier === tier
                                    ? { color: "white" }
                                    : undefined
                                }
                              >
                                {tier === "high-frequency"
                                  ? "High Frequency"
                                  : tier === "developer"
                                    ? "Developer"
                                    : "Standard"}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="mt-8 inline-flex items-center justify-center p-4 bg-[color:var(--accent)] text-center"
                    style={{ color: "white" }}
                  >
                    <span className="text-sm sm:text-lg font-bold">
                      NVMe SSD
                    </span>
                    <div className="w-px h-8 bg-secondary mx-3" />
                    <span className="text-xl" />
                    <span className="text-sm sm:text-lg font-bold">
                      292 MMK/GB/Month
                    </span>
                  </div>
                  <div className="mt-10 space-y-10">
                    {Array.isArray(activeCatalogItem.groups) &&
                    activeCatalogItem.groups.length > 0 ? (
                      activeCatalogItem.groups.map((group) => (
                        <div key={group.title}>
                          <div className="flex items-start gap-3 mb-4">
                            <div className="h-8 w-8 rounded-lg border border-white/10 bg-[#111] flex items-center justify-center shrink-0">
                              <activeCatalogItem.Icon
                                size={16}
                                className="text-[color:var(--accent)]"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xl font-bold">
                                {group.title}
                              </div>
                              <div className="mt-1 text-sm text-gray-400">
                                {group.description}
                              </div>
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
                                    <tr
                                      key={idx}
                                      className="hover:bg-white/5 transition-colors"
                                    >
                                      {group.columns.map((c, i) => (
                                        <td
                                          key={c.key}
                                          className={
                                            i === group.columns.length - 1
                                              ? "py-4 px-4 font-mono text-[color:var(--accent)] font-bold whitespace-nowrap"
                                              : "py-4 px-4 text-gray-300 whitespace-nowrap"
                                          }
                                        >
                                          {row[c.key] ?? ""}
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
                                {activeCatalogItem.rows.map(
                                  (
                                    row: Record<string, string>,
                                    idx: number,
                                  ) => (
                                    <tr
                                      key={idx}
                                      className="hover:bg-white/5 transition-colors"
                                    >
                                      {Object.values(row).map((val, i) => (
                                        <td
                                          key={i}
                                          className={
                                            i === Object.values(row).length - 1
                                              ? "py-4 px-4 font-mono text-[color:var(--accent)] font-bold whitespace-nowrap"
                                              : "py-4 px-4 text-gray-300 whitespace-nowrap"
                                          }
                                        >
                                          {val}
                                        </td>
                                      ))}
                                    </tr>
                                  ),
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        No pricing data available.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Calculator */}
          {/* <section className="py-32 px-6 bg-[#050505] -mx-6 mb-32">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <Calculator
                      size={16}
                      className="text-[color:var(--accent)]"
                    />
                    Pricing Calculator
                  </div>
                  <h2 className="mt-3 text-4xl font-bold">
                    Build your estimate
                  </h2>
                  <p className="mt-2 text-gray-400 max-w-2xl">
                    Add services, customize usage, and get an instant monthly
                    estimate across your stack.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setCalculatorPickerOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[color:var(--accent)] font-bold hover:bg-[color:var(--accent-hover)] transition-colors"
                    style={{ color: 'white' }}
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
                      <div className="text-2xl font-bold">
                        Start an estimate
                      </div>
                      <p className="mt-2 text-gray-400">
                        Add one or more services and customize the usage to see
                        monthly totals.
                      </p>
                      <button
                        onClick={() => setCalculatorPickerOpen(true)}
                        className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[color:var(--accent)] font-bold hover:bg-[color:var(--accent-hover)] transition-colors"
                        style={{ color: 'white' }}
                      >
                        <Plus size={18} />
                        Add your first service
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {calculatorServices.map((svc) => {
                        const template = calculatorTemplates.find(
                          (t) => t.id === svc.templateId,
                        );
                        if (!template) return null;
                        const serviceTotal = template.items.reduce(
                          (sum, item) => {
                            const qty = svc.quantities[item.key] ?? 0;
                            return sum + qty * item.monthlyRate;
                          },
                          0,
                        );

                        return (
                          <div
                            key={svc.instanceId}
                            className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 min-w-0">
                                <div className="h-10 w-10 rounded-xl border border-white/10 bg-[#111] flex items-center justify-center shrink-0">
                                  <template.Icon
                                    size={18}
                                    className="text-[color:var(--accent)]"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xl font-bold truncate">
                                    {template.name}
                                  </div>
                                  <div className="mt-1 text-sm text-gray-400">
                                    {template.description}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right">
                                  <div className="text-xs text-gray-500">
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
                                      <div className="font-bold truncate">
                                        {item.label}
                                      </div>
                                      <div className="mt-1 text-xs text-gray-500">
                                        {formatMoney(item.monthlyRate)} /{" "}
                                        {item.unit}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-xs text-gray-500">
                                        Estimated
                                      </div>
                                      <div className="font-mono text-sm text-white">
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
                        Totals are estimates for planning purposes and may vary
                        by region and configuration.
                      </div>
                    </div>

                    {calculatorEstimate.serviceBreakdown.length > 0 && (
                      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                          Services
                        </div>
                        <div className="space-y-3">
                          {calculatorEstimate.serviceBreakdown.map((s) => (
                            <div
                              key={s.instanceId}
                              className="flex items-center justify-between gap-3"
                            >
                              <div className="text-sm text-gray-300 truncate">
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
                          Search and select services to include in your
                          estimate.
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
                        <Search
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />
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
                                  <t.Icon
                                    size={18}
                                    className="text-[color:var(--accent)]"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold truncate">
                                    {t.name}
                                  </div>
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
          </section> */}

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
                      feat: "Monthly Credits",
                      s: "$30",
                      t: "$100",
                      e: "Custom",
                    },
                    {
                      feat: "Concurrency Limit",
                      s: "100",
                      t: "1000",
                      e: "Unlimited",
                    },
                    {
                      feat: "GPU Limit",
                      s: "10",
                      t: "50",
                      e: "Custom",
                    },
                    {
                      feat: "Seats",
                      s: "3",
                      t: "Unlimited",
                      e: "Unlimited",
                    },
                    {
                      feat: "SSO",
                      s: "-",
                      t: "-",
                      e: "Included",
                    },
                    {
                      feat: "Support",
                      s: "Community",
                      t: "Standard",
                      e: "Dedicated Slack",
                    },
                  ].map((row, i) => (
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
                  ))}
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
                  q: "Are there any hidden fees?",
                  a: "No. You only pay for the compute resources you use. There are no seat fees or platform fees.",
                },
                {
                  q: "Do you offer startup credits?",
                  a: "Yes, we have a startup program. Apply to get up to $5,000 in credits.",
                },
                {
                  q: "How does billing work?",
                  a: "We bill monthly based on your usage in the previous month. You can set spending limits to avoid surprises.",
                },
                {
                  q: "Can I pay with invoice?",
                  a: "Yes, Team and Enterprise plans support invoicing.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="border border-white/10 rounded-xl bg-[#0a0a0a] overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-lg">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
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

              <a href="https://portal.1cloudng.com/register" target="blank">
                <button
                  className="px-12 py-5 rounded-full bg-[#00ff88] font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]"
                  style={{ color: "white" }}
                >
                  Sign Up Now
                </button>
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
