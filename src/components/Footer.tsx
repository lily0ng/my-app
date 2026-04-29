import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Slack } from 'lucide-react';
import logo from '../assets/images/newlogo.png';
export function Footer() {
  const links = {
    product: [
      {
        name: 'Cloud Compute',
        path: '/product/cloudcompute'
      },
      {
        name: 'Kubernetes',
        path: '/product/kubernetes'
      },
      {
        name: 'Load Balancer',
        path: '/product/loadbalancer'
      },
      {
        name: 'Block Storage',
        path: '/product/blockstorage'
      },
      {
        name: 'DNS Management',
        path: '/product/dnsmanagement'
      },
      {
        name: 'Auto Scaling',
        path: '/'
      }],

    solutions: [
      {
        name: 'Audio Transcription',
        path: '/solutions/audio-transcription'
      },
      {
        name: 'LLM Inference',
        path: '/solutions/llm-inference'
      },
      {
        name: 'Coding Agents',
        path: '/solutions/coding-agents'
      },
      {
        name: 'Computational Bio',
        path: '/solutions/computational-bio'
      },
      {
        name: 'Image Generation',
        path: '/solutions/image-generation'
      }],

    resources: [
      {
        name: 'Docs',
        path: 'https://docs.1cloudng.com/'
      },
      {
        name: 'Tutorial',
        path: '/resources/tutorial'
      },
      {
        name: 'Playground',
        path: '/resources/playground'
      },
      {
        name: 'GPU Glossary',
        path: '/resources/gpu-glossary'
      },
      {
        name: 'Event & News',
        path: '/resources/events'
      },
      {
        name: 'Slack Community',
        path: '/resources/community'
      }],

    company: [
      {
        name: 'About',
        path: '/resources/about'
      },
      {
        name: 'Careers',
        path: '/resources/careers'
      },
      {
        name: 'Customers',
        path: '/customers'
      },
      {
        name: 'Pricing',
        path: '/pricing'
      },
      {
        name: 'Contact',
        path: '/contact'
      }],

    legal: [
      {
        name: 'Privacy',
        path: '/'
      },
      {
        name: 'Terms',
        path: '/'
      },
      {
        name: 'Security',
        path: '/'
      }]

  };
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">
              Product
            </h4>
            <ul className="space-y-3">
              {links.product.map((link) =>
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">

                    {link.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">
              Solutions
            </h4>
            <ul className="space-y-3">
              {links.solutions.map((link) =>
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">

                    {link.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {links.resources.map((link) =>
                <li key={link.name}>
                  {link.path.startsWith('http') ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              )}

            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {links.company.map((link) =>
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">

                    {link.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {links.legal.map((link) =>
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">

                    {link.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              className="h-6 w-auto max-w-[160px] block"
              loading="lazy"
            />
            <span className="text-sm text-gray-500">
              © {new Date().getFullYear()} One Cloud Next-Gen
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors">

              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors">

              <Github size={20} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors">

              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors">

              <Slack size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>);

}