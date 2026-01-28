import React, { Children, Component } from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Shield, Smartphone, Globe, BoxIcon } from 'lucide-react';
const features = [
{
  icon: Layers,
  title: 'Layered Depth',
  description:
  'Create immersive experiences with multi-layered glass panels and intelligent z-indexing.'
},
{
  icon: Zap,
  title: 'Performance First',
  description:
  'Optimized blur effects that maintain 60fps scrolling even on mobile devices.'
},
{
  icon: Shield,
  title: 'Secure by Design',
  description:
  'Built-in security patterns ensuring your beautiful interface is also robust.'
},
{
  icon: BoxIcon,
  title: 'Modular Components',
  description:
  'Pre-built glass components that snap together perfectly for any layout.'
},
{
  icon: Smartphone,
  title: 'Fully Responsive',
  description:
  'Glass effects that adapt gracefully to any screen size or orientation.'
},
{
  icon: Globe,
  title: 'Global Theming',
  description:
  'Control blur intensity, opacity, and colors from a single configuration file.'
}];

const container = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const item = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0
  }
};
export function FeatureCards() {
  return (
    <section className="relative z-10 px-4 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Crystal Clear Features
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Everything you need to build stunning glass-morphic interfaces that
          stand out.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          margin: '-100px'
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {features.map((feature, index) =>
        <motion.div
          key={index}
          variants={item}
          whileHover={{
            y: -8,
            boxShadow: '0 12px 48px 0 rgba(0, 0, 0, 0.5)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)'
          }}
          className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-glass transition-colors duration-300">

            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-accent-green/20 group-hover:text-accent-green transition-colors duration-300">
              <feature.icon size={24} />
            </div>

            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent-green transition-colors">
              {feature.title}
            </h3>

            <p className="text-white/60 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>);

}