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
  BookOpen,
  Users,
  Calendar,
  MessageSquare,
  Briefcase,
  FileText,
  Play,
  Zap,
  BoxIcon,
  Sun,
  Moon } from
'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const productItems = [
  {
    name: 'Inference',
    icon: Cpu,
    desc: 'Deploy inference for LLMs, audio, image/video generation.',
    path: '/product/inference'
  },
  {
    name: 'Training',
    icon: Layers,
    desc: 'Fine-tune custom and open-source models instantly.',
    path: '/product/training'
  },
  {
    name: 'Batch',
    icon: Database,
    desc: 'Scale to thousands of containers on-demand.',
    path: '/product/batch'
  },
  {
    name: 'Sandboxes',
    icon: BoxIcon,
    desc: 'Secure, ephemeral environments for running untrusted code.',
    path: '/product/sandboxes'
  },
  {
    name: 'Notebooks',
    icon: Code2,
    desc: 'Collaborate on code and data in real-time.',
    path: '/product/notebooks'
  },
  {
    name: 'Core Platform',
    icon: Terminal,
    desc: 'Our proprietary infra stack powering all our products.',
    path: '/product/core-platform'
  }];

  const solutionItems = [
  {
    name: 'Audio Transcription',
    icon: Mic,
    desc: 'Speech to text at scale',
    path: '/solutions'
  },
  {
    name: 'LLM Inference',
    icon: Zap,
    desc: 'Low-latency inference at scale',
    path: '/solutions'
  },
  {
    name: 'Coding Agents',
    icon: Shield,
    desc: 'Secure code execution',
    path: '/solutions'
  },
  {
    name: 'Computational Bio',
    icon: Activity,
    desc: 'Accelerate scientific workloads',
    path: '/solutions'
  },
  {
    name: 'Image + Video Inference',
    icon: ImageIcon,
    desc: 'High-performance generation',
    path: '/solutions'
  }];

  const resourceTools = [
  {
    name: 'Playground',
    desc: 'Explore Modal in the browser',
    path: '/resources'
  },
  {
    name: 'GPU Glossary',
    desc: 'A fast guide to GPU concepts',
    path: '/resources'
  },
  {
    name: 'LLM Engine Advisor',
    desc: 'Pick the right model',
    path: '/resources'
  }];

  const resourceLinks = [
  {
    name: 'Blog',
    path: '/resources'
  },
  {
    name: 'Startup Credits',
    path: '/resources'
  },
  {
    name: 'Events',
    path: '/resources'
  },
  {
    name: 'Partners',
    path: '/resources'
  },
  {
    name: 'Slack Community',
    path: '/resources'
  }];

  const companyLinks = [
  {
    name: 'About',
    path: '/resources'
  },
  {
    name: 'Careers',
    path: '/resources'
  }];

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
    path: '/docs'
  },
  {
    name: 'Examples',
    icon: BoxIcon,
    desc: 'Copy-pasteable code snippets',
    path: '/docs'
  },
  {
    name: 'Guides',
    icon: BookOpen,
    desc: 'Deep dives into core concepts',
    path: '/docs'
  }];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-[#f8f9fa] border-b border-white/10 dark:border-white/10 light:border-gray-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-[#00ff88] flex items-center justify-center">
            <span className="font-bold text-black text-lg">1C</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Next-Gen
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 h-full">
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

            <div className="w-[600px] p-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
                {solutionItems.map((item) =>
                <div key={item.name} className="group cursor-pointer">
                    <h4 className="font-semibold text-white group-hover:text-[#00ff88] transition-colors mb-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-white/10">
                <Link
                  to="/solutions"
                  className="text-sm font-medium text-[#00ff88] hover:text-[#00cc6a] flex items-center gap-1">

                  View all examples <ArrowUpRight size={14} />
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  Explore more ways teams use Modal to train models, run
                  workloads, and serve applications.
                </p>
              </div>
            </div>
          </Dropdown>

          {/* Resources Dropdown */}
          <Dropdown
            title="Resources"
            id="resources"
            activeId={activeDropdown}
            setActive={setActiveDropdown}>

            <div className="w-[700px] p-6 grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Tools
                </h4>
                <div className="space-y-4">
                  {resourceTools.map((item) =>
                  <div key={item.name} className="group cursor-pointer">
                      <h5 className="font-semibold text-white group-hover:text-[#00ff88] transition-colors">
                        {item.name}
                      </h5>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Resources
                </h4>
                <div className="space-y-3">
                  {resourceLinks.map((item) =>
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block text-sm text-gray-300 hover:text-white hover:bg-white/5 py-1 px-2 -mx-2 rounded transition-colors">

                      {item.name}
                    </Link>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Company
                </h4>
                <div className="space-y-3">
                  {companyLinks.map((item) =>
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block text-sm text-gray-300 hover:text-white hover:bg-white/5 py-1 px-2 -mx-2 rounded transition-colors">

                      {item.name}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dropdown>

          <Link
            to="/customers"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">

            Customers
          </Link>
          <Link
            to="/pricing"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">

            Pricing
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
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 flex items-center justify-center group"
            title="Toggle theme">
            {theme === 'dark' ? (
              <Sun size={18} className="text-yellow-400 group-hover:text-yellow-300" />
            ) : (
              <Moon size={18} className="text-blue-400 group-hover:text-blue-300" />
            )}
          </button>
          
          <Link
            to="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors">

            Log In
          </Link>
          <button className="px-4 py-1.5 rounded bg-[#00ff88] text-black text-sm font-bold hover:bg-[#00cc6a] transition-colors flex items-center gap-1">
            Sign Up
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}>

          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden">

            <div className="px-6 py-4 space-y-4">
              <Link
              to="/product/inference"
              className="block text-gray-300 hover:text-white">

                Product
              </Link>
              <Link
              to="/solutions"
              className="block text-gray-300 hover:text-white">

                Solutions
              </Link>
              <Link
              to="/resources"
              className="block text-gray-300 hover:text-white">

                Resources
              </Link>
              <Link
              to="/customers"
              className="block text-gray-300 hover:text-white">

                Customers
              </Link>
              <Link
              to="/pricing"
              className="block text-gray-300 hover:text-white">

                Pricing
              </Link>
              <Link to="/docs" className="block text-gray-300 hover:text-white">
                Docs
              </Link>
              <div className="pt-4 border-t border-white/10 flex gap-4">
                <button className="flex-1 py-2 rounded bg-white/5 text-white font-medium">
                  Log In
                </button>
                <button className="flex-1 py-2 rounded bg-[#00ff88] text-black font-bold">
                  Sign Up
                </button>
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
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${activeId === id ? 'text-white' : 'text-gray-300 hover:text-white'}`}>

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

            <div className="bg-[#111] border border-white/10 rounded-lg shadow-2xl overflow-hidden">
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
      className="flex items-start gap-3 p-3 rounded-md hover:bg-white/5 transition-colors group">

      <div className="mt-0.5 text-gray-400 group-hover:text-[#00ff88] transition-colors">
        <item.icon size={20} />
      </div>
      <div>
        <div className="font-semibold text-white group-hover:text-[#00ff88] transition-colors text-sm">
          {item.name}
        </div>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </Link>);

}