import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import uiDark from '../assets/images/UI Dark Thmes.png';
import uiLight from '../assets/images/UI Light Thmes.png';
interface HeroSectionProps {
  title?: React.ReactNode;
  subtitle?: string;
  badge?: string;
  ctaText?: string;
  secondaryCtaText?: string;
}
export function HeroSection({
  title = (
    <>
      Experience depth in <br />
      <span className="relative inline-block">
        digital space
        <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-hover)] rounded-full opacity-80 blur-[2px]" />
      </span>
    </>
  ),
  subtitle = 'Elevate your interface with our premium glass-morphism components. Designed for depth, clarity, and modern aesthetics.',
  badge = 'Next Generation UI Design',
  ctaText = 'Start Building',
  secondaryCtaText = 'View Documentation',
}: HeroSectionProps) {
  const { theme } = useTheme();

  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-16 z-10 bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] transition-colors duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[rgba(var(--accent-rgb),0.12)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0)] pointer-events-none transition-colors duration-300" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(var(--accent-rgb),0.22)_1px,transparent_1px)] [background-size:44px_44px] [background-position:0_0] pointer-events-none" />
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
        className="w-full relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.4,
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-[color:var(--bg-secondary)]/70 border border-[color:var(--border-color)] backdrop-blur-md"
          >
            <Sparkles size={16} className="text-[color:var(--accent)]" />
            <span className="text-sm font-medium text-[color:var(--text-secondary)]">
              {badge}
            </span>
          </motion.div>

          <div className="w-full max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 leading-[1.05]">
              {title}
            </h1>

            <p className="text-base md:text-lg text-[color:var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: '0 0 22px rgba(var(--accent-rgb),0.18)'
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[color:var(--accent)] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors hover:bg-[color:var(--accent-hover)]"
            >
              {ctaText}
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.03,
                backgroundColor: 'rgba(var(--accent-rgb),0.06)'
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[color:var(--border-color)] text-[color:var(--text-primary)] font-medium text-sm transition-colors"
            >
              {secondaryCtaText}
            </motion.button>
          </div>

          <div className="mt-14 hidden md:block w-full max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-10 bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.14),transparent_60%)] blur-2xl" />
              <div className="absolute -inset-6 bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.10),transparent_65%)] blur-xl" />
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="ui-preview-frame relative rounded-3xl bg-[rgba(0,0,0,0.08)] shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
              >
                <img
                  src={theme === 'dark' ? uiDark : uiLight}
                  alt="Product UI"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}