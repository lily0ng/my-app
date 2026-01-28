import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
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
        <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-accent-green to-emerald-600 rounded-full opacity-80 blur-[2px]" />
      </span>
    </>
  ),
  subtitle = 'Elevate your interface with our premium glass-morphism components. Designed for depth, clarity, and modern aesthetics.',
  badge = 'Next Generation UI Design',
  ctaText = 'Start Building',
  secondaryCtaText = 'View Documentation',
}: HeroSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className={`relative min-h-[80vh] flex items-center justify-center px-4 pt-32 pb-10 z-10 transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white'
          : 'bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 text-slate-900'
      }`}
    >
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
        className="max-w-5xl w-full"
      >
        <div
          className={`relative backdrop-blur-xl rounded-3xl p-8 md:p-16 shadow-glass overflow-hidden group border transition-colors duration-300 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          {/* Subtle shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: 0.4,
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md border transition-colors duration-300 ${
                isDark
                  ? 'bg-white/5 border-white/10'
                  : 'bg-emerald-50 border-emerald-100'
              }`}
            >
              <Sparkles
                size={16}
                className={isDark ? 'text-accent-green' : 'text-emerald-500'}
              />
              <span
                className={`text-sm font-medium ${
                  isDark ? 'text-white/80' : 'text-slate-800'
                }`}
              >
                {badge}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              {title}
            </h1>

            <p
              className={`text-lg md:text-xl max-w-2xl mb-10 leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-white/60' : 'text-slate-600'
              }`}
            >
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(0, 255, 136, 0.4)'
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-green-glow transition-all ${
                  isDark
                    ? 'bg-accent-green text-black'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                {ctaText}
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-md transition-all border ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white hover:border-white/20'
                    : 'bg-white border-slate-200 text-slate-900 hover:border-slate-300'
                }`}
              >
                {secondaryCtaText}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}