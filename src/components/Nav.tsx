import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Cpu,
  Layers,
  Terminal,
  Code2,
  Database,
  ArrowUpRight,
  Mic,
  Shield,
  Activity,
  Image as ImageIcon,
  Briefcase,
  BookOpen,
  Play,
  Zap,
  BoxIcon,
  Sun,
  Moon } from
'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/images/Logo.png';
export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  useLocation();
  const productItems = [
  {
    name: 'Cloud Compute',
    icon: Cpu,
    desc: 'Deploy powerful virtual machines in seconds with scalable resources to meet your business needs.',
    path: '/product/inference'
  },
  {
    name: 'Kubernetes',
    icon: Layers,
    desc: 'Automate deployment, scaling, and management of containerized applications with our fully managed Kubernetes service.',
    path: '/product/training'
  },
  {
    name: 'Load Balancer',
    icon: Activity,
    desc: 'Distribute traffic efficiently across multiple instances to ensure high availability and optimal performance.',
    path: '/product/batch'
  },
  {
    name: 'Block Storage',
    icon: Database,
    desc: 'Attach high-performance, scalable storage to your cloud instances for flexible data management.',
    path: '/product/sandboxes'
  },
  {
    name: 'Local Dev Experience',
    icon: Terminal,
    desc: 'Develop against the cloud as if it were your laptop. Hot reloading included.',
    path: '/product/notebooks'
  },
  {
    name: 'Any GPU, Instantly',
    icon: Zap,
    desc: 'Access H100s, A100s, and more without quotas or capacity planning.',
    path: '/product/core-platform'
  }];

  const solutionItems = [
  {
    name: 'Audio Transcription',
    icon: Mic,
    desc: 'Speech to text at scale',
    path: '/solutions/audio-transcription'
  },
  {
    name: 'LLM Inference',
    icon: Zap,
    desc: 'Low-latency inference at scale',
    path: '/solutions/llm-inference'
  },
  {
    name: 'Coding Agents',
    icon: Shield,
    desc: 'Secure code execution',
    path: '/solutions/coding-agents'
  },
  {
    name: 'Computational Bio',
    icon: Activity,
    desc: 'Accelerate scientific workloads',
    path: '/solutions/computational-bio'
  },
  {
    name: 'Image Generation',
    icon: ImageIcon,
    desc: 'High-performance generation',
    path: '/solutions/image-generation'
  },
  {
    name: 'Industry Solutions',
    icon: Briefcase,
    desc: 'Reference architectures by vertical',
    path: '/solutions/industry-solutions'
  }];

  const resourceTools = [
  {
    name: 'Playground',
    icon: Play,
    desc: 'Explore Modal in the browser',
    path: '/resources/playground'
  },
  {
    name: 'Marketplace Apps',
    icon: BoxIcon,
    desc: 'Browse apps and deploy in one click',
    path: '/resources/marketplace-apps'
  },
  {
    name: 'GPU Glossary',
    icon: BookOpen,
    desc: 'A fast guide to GPU concepts',
    path: '/resources/gpu-glossary'
  },
  {
    name: 'LLM Engine Advisor',
    icon: Zap,
    desc: 'Pick the right model',
    path: '/resources/llm-engine-advisor'
  }];

  const resourceLinks = [
  {
    name: 'SLA',
    icon: BookOpen,
    desc: 'Service reliability commitments',
    path: '/resources/sla'
  },
  {
    name: 'Startup Credits',
    icon: Layers,
    desc: 'Get credits to start building',
    path: '/resources/startup-credits'
  },
  {
    name: 'Events',
    icon: Activity,
    desc: 'Talks, meetups, and community',
    path: '/resources/events'
  },
  {
    name: 'Partners',
    icon: BoxIcon,
    desc: 'Integrations and ecosystem partners',
    path: '/resources/partners'
  },
  {
    name: 'Slack Community',
    icon: Shield,
    desc: 'Join the developer community',
    path: '/resources/community'
  }];

  const companyLinks = [
  {
    name: 'About',
    icon: Terminal,
    desc: 'Learn about the team and mission',
    path: '/resources/about'
  },
  {
    name: 'Careers',
    icon: Cpu,
    desc: 'We’re hiring across engineering',
    path: '/resources/careers'
  }];

  const resourceItems = [...resourceTools, ...resourceLinks, ...companyLinks];

  const docItems = [
  {
    name: 'Getting Started',
    icon: Play,
    desc: 'Start building in minutes',
    path: '/docs'
  },
  {
    name: 'API Reference',
    icon: Code2,
    desc: 'Complete API documentation',
    path: '/docs/guides/api/'
  },
  {
    name: 'Examples',
    icon: BoxIcon,
    desc: 'Copy-pasteable code snippets',
    path: '/docs/examples/'
  },
  {
    name: 'Guides',
    icon: BookOpen,
    desc: 'Deep dives into core concepts',
    path: '/docs/guides'
  }];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 transition-colors duration-300">
      <div className="mx-auto pointer-events-auto w-full max-w-6xl rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)]/80 backdrop-blur-xl shadow-[0_14px_40px_rgba(0,0,0,0.18)]">
        <div className="w-full px-5 h-12 flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo}
                alt="Logo"
                className="h-8 w-auto max-w-[220px] block"
                loading="eager"
              />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-1 h-full">
          {/* Product Dropdown */}
          <Dropdown
            title="Product"
            id="product"
            activeId={activeDropdown}
            setActive={setActiveDropdown}>

            <div className="w-[600px] p-2 grid grid-cols-2 gap-2">
              {productItems.map((item) =>
              <DropdownItem key={item.name} item={item} />
              )}
            </div>
          </Dropdown>

          {/* Solutions Dropdown */}
          <Dropdown
            title="Solutions"
            id="solutions"
            activeId={activeDropdown}
            setActive={setActiveDropdown}>

            <div className="w-[600px] p-2 grid grid-cols-2 gap-2">
              {solutionItems.map((item) =>
              <DropdownItem key={item.name} item={item} />
              )}
            </div>
          </Dropdown>

          {/* Resources Dropdown */}
          <Dropdown
            title="Resources"
            id="resources"
            activeId={activeDropdown}
            setActive={setActiveDropdown}>

            <div className="w-[700px] p-2 grid grid-cols-2 gap-2">
              {resourceItems.map((item) =>
              <DropdownItem key={item.name} item={item} />
              )}
            </div>
          </Dropdown>

          <Link
            to="/customers"
            className="px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors">

            Customers
          </Link>
          <Link
            to="/pricing"
            className="px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors">

            Pricing
          </Link>

          <Link
            to="/contact"
            className="px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors">

            Contact
          </Link>

          {/* Docs Dropdown */}
          <Dropdown
            title="Docs"
            id="docs"
            activeId={activeDropdown}
            setActive={setActiveDropdown}>

            <div className="w-[500px] p-2 grid grid-cols-2 gap-2">
              {docItems.map((item) =>
              <DropdownItem key={item.name} item={item} />
              )}
            </div>
          </Dropdown>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[color:var(--bg-secondary)] hover:bg-[color:var(--bg-secondary)]/80 border border-[color:var(--border-color)] transition-all duration-200 flex items-center justify-center"
            title="Toggle theme">
            {theme === 'dark' ? (
              <Sun size={18} className="text-[color:var(--text-secondary)]" />
            ) : (
              <Moon size={18} className="text-[color:var(--text-secondary)]" />
            )}
          </button>
          
          <Link
            to="/login"
            className="text-sm font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors">

            Log In
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1.5 rounded-full bg-[color:var(--accent)] text-white text-sm font-semibold transition-colors flex items-center gap-1 hover:bg-[color:var(--accent-hover)]">
            Sign Up
            <ArrowUpRight size={16} />
          </Link>
        </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
              onClick={() => setIsOpen(!isOpen)}>

              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen &&
          <motion.div
            initial={{
              opacity: 0,
              y: -6
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -6
            }}
            className="md:hidden mt-2 overflow-hidden rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)]/90 backdrop-blur-xl shadow-[0_14px_40px_rgba(0,0,0,0.18)] transition-colors duration-300">

              <div className="px-6 py-4 space-y-4">
                <Link
                to="/product/inference"
                className="block text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]">

                  Product
                </Link>
                <Link
                to="/solutions"
                className="block text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]">

                  Solutions
                </Link>
                <Link
                to="/resources"
                className="block text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]">

                  Resources
                </Link>
                <Link
                to="/customers"
                className="block text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]">

                  Customers
                </Link>
                <Link
                to="/pricing"
                className="block text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]">

                  Pricing
                </Link>
                <Link
                to="/contact"
                className="block text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]">

                  Contact
                </Link>
                <Link to="/docs" className="block text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]">
                  Docs
                </Link>
                <div className="pt-4 border-t border-[color:var(--border-color)] flex gap-4">
                  <Link to="/login" className="flex-1 py-2 rounded bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)] font-medium text-center border border-[color:var(--border-color)]">
                    Log In
                  </Link>
                  <Link to="/signup" className="flex-1 py-2 rounded bg-[color:var(--accent)] text-white font-bold text-center">
                    Sign Up
                  </Link>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
    </nav>);

}
function Dropdown({
  title,
  id,
  activeId,
  setActive,
  children






}: {title: string;id: string;activeId: string | null;setActive: (id: string | null) => void;children: React.ReactNode;}) {
  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => setActive(id)}
      onMouseLeave={() => setActive(null)}>

      <button
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${activeId === id ? 'text-[color:var(--text-primary)]' : 'text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]'}`}>

        {title}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${activeId === id ? 'rotate-180' : ''}`} />

      </button>

      <AnimatePresence>
        {activeId === id &&
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: 10
          }}
          transition={{
            duration: 0.15
          }}
          className="absolute top-full left-0 pt-2">

            <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-lg shadow-2xl overflow-hidden">
              {children}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
function DropdownItem({ item }: {item: any;}) {
  return (
    <Link
      to={item.path}
      className="flex items-start gap-3 p-3 rounded-md hover:bg-[rgba(var(--accent-rgb),0.08)] transition-colors group">

      <div className="mt-0.5 text-[color:var(--text-tertiary)] group-hover:text-[color:var(--accent)] transition-colors">
        <item.icon size={20} />
      </div>
      <div>
        <div className="font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors text-sm">
          {item.name}
        </div>
        <p className="text-xs text-[color:var(--text-secondary)] mt-1 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </Link>);

}