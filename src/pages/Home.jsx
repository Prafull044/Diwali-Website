import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Countdown from '../components/Countdown';
import Diya from '../components/Diya';
import {
  Sparkles,
  Flame,
  Palette,
  Heart,
  Bomb,
  CalendarCheck,
  Gamepad2,
  BookOpen,
  Coffee,
  Leaf,
  SunMedium,
  Gift,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function Home({ onOpenFireworksIntro }) {
  const { t, sessionDiyaCount } = useApp();
  const [heroDiyas, setHeroDiyas] = useState([true, true, true]);

  const toggleHeroDiya = (index) => {
    setHeroDiyas((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const featureActivities = [
    {
      title: 'Virtual Diya Lighting Studio',
      desc: 'Strike authentic terracotta, brass, and peacock lamps. Personalize a prayer and illuminate the global Diya Wall.',
      to: '/diya-studio',
      icon: '🪔',
      accent: 'from-amber-500/20 to-orange-500/20',
      badge: 'Interactive',
    },
    {
      title: 'Diwali Fireworks Arena',
      desc: 'Night sky simulator featuring 10 particle firework types, launch velocities, color spectrums, and audio synthesis.',
      to: '/fireworks-arena',
      icon: '🎆',
      accent: 'from-purple-500/20 to-indigo-500/20',
      badge: 'Night Sky Physics',
    },
    {
      title: 'Personalized Photo Greeting Studio',
      desc: 'Craft royal Diwali cards with your family photos, custom wishes, and 1-click sharing to WhatsApp.',
      to: '/wishes-studio',
      icon: '💌',
      accent: 'from-rose-500/20 to-pink-500/20',
      badge: 'WhatsApp Ready',
    },
    {
      title: 'Digital Rangoli Creator',
      desc: 'Create captivating floral mandalas with 4-fold, 8-fold, and 12-fold symmetry using authentic festive powder hues.',
      to: '/rangoli-studio',
      icon: '🎨',
      accent: 'from-emerald-500/20 to-teal-500/20',
      badge: 'Symmetry Engine',
    },
    {
      title: 'Celebration & Budget Planner',
      desc: 'Tailored preparation checklists, 5-day traditional schedules, and expense trackers for your ideal Diwali.',
      to: '/planner',
      icon: '📋',
      accent: 'from-amber-600/20 to-yellow-600/20',
      badge: 'Smart Tracker',
    },
    {
      title: 'Festival Games Zone',
      desc: 'Play cultural trivia quizzes, memory card matches, and word scrambles to earn celebratory badges.',
      to: '/games',
      icon: '🎮',
      accent: 'from-blue-500/20 to-purple-500/20',
      badge: 'Play & Score',
    },
  ];

  const festivalHighlights = [
    {
      title: 'Sacred Lakshmi Puja',
      desc: 'Step-by-step puja preparation, puja samagri checklist, and the interactive Digital Puja Thali.',
      to: '/puja-guide',
      icon: '🙏',
    },
    {
      title: 'Traditional Sweets & Faral',
      desc: 'Master the craft of melt-in-mouth Kaju Katli, golden Besan Laddoos, and crispy butter Chaklis.',
      to: '/recipes',
      icon: '🍬',
    },
    {
      title: 'Digital Akash Kandil Designer',
      desc: 'Design vibrant traditional sky lanterns with customizable streamers to grace your home.',
      to: '/lantern-designer',
      icon: '🏮',
    },
    {
      title: 'Green Diwali Challenge',
      desc: 'Pledge towards eco-friendly earthen diyas, organic rangolis, and animal-friendly digital celebrations.',
      to: '/green-diwali',
      icon: '🌱',
    },
  ];

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#F5C75E]/20 bg-gradient-to-b from-[#241039] via-[#1A0B2E] to-[#160B26]">
        
        {/* Subtle decorative background lights glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F5C75E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#160B26] border border-[#F5C75E]/40 text-[#F5C75E] text-xs font-semibold uppercase tracking-widest mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Premier Digital Diwali Festival Experience</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-royal text-[#F5C75E] gold-glow tracking-tight leading-[1.1] mb-6 animate-shimmer">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl text-[#FFF4DD]/85 font-serif max-w-3xl mx-auto mb-10 leading-relaxed">
            "{t.hero.subtitle}"
          </p>

          {/* Interactive Hero Diyas Triad */}
          <div className="flex items-center justify-center gap-8 sm:gap-14 mb-10">
            <Diya
              size="md"
              isLit={heroDiyas[0]}
              styleKey="TERRACOTTA"
              onToggle={() => toggleHeroDiya(0)}
              name="Peace"
            />
            <Diya
              size="lg"
              isLit={heroDiyas[1]}
              styleKey="GOLDEN_ROYAL"
              onToggle={() => toggleHeroDiya(1)}
              name="Prosperity"
            />
            <Diya
              size="md"
              isLit={heroDiyas[2]}
              styleKey="PEACOCK"
              onToggle={() => toggleHeroDiya(2)}
              name="Joy"
            />
          </div>

          {/* Hero Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/diya-studio"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F5C75E] to-[#F28C28] text-[#160B26] font-bold text-base shadow-[0_0_25px_rgba(245,199,94,0.5)] hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
            >
              <span>{t.hero.startCelebrating}</span>
              <Sparkles className="w-4 h-4" />
            </Link>

            <Link
              to="/fireworks-arena"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#241039] border border-[#F5C75E]/50 text-[#F5C75E] hover:bg-[#160B26] font-bold text-base transition flex items-center justify-center gap-2"
            >
              <Bomb className="w-4 h-4" />
              <span>{t.hero.launchFireworks}</span>
            </Link>
          </div>

        </div>
      </section>

      {/* DIWALI COUNTDOWN SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <Countdown />
      </section>

      {/* FEATURED ACTIVITIES GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Immersive Festival Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            {t.activities.title}
          </h2>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            {t.activities.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureActivities.map((act, idx) => (
            <Link
              key={idx}
              to={act.to}
              className="p-8 rounded-3xl bg-[#241039]/80 border border-[#F5C75E]/30 hover:border-[#F5C75E] shadow-xl hover:shadow-[0_0_20px_rgba(245,199,94,0.3)] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {act.icon}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#160B26] border border-[#F5C75E]/30 text-[10px] font-bold text-[#F5C75E]">
                    {act.badge}
                  </span>
                </div>

                <h3 className="font-serif-heading font-bold text-xl text-[#FFF4DD] group-hover:text-[#F5C75E] transition-colors mb-2">
                  {act.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#FFF4DD]/70 leading-relaxed mb-6">
                  {act.desc}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F5C75E] group-hover:translate-x-1 transition-transform">
                <span>Enter Studio</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FESTIVAL HIGHLIGHTS SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#160B26] via-[#241039]/60 to-[#160B26] border-y border-[#F5C75E]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#F5C75E] mb-3">
              Essential Diwali Traditions & Guides
            </h2>
            <p className="text-xs sm:text-sm text-[#FFF4DD]/70">
              Deepen your connection to the sacred rituals, culinary wonders, and home aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {festivalHighlights.map((hl, idx) => (
              <Link
                key={idx}
                to={hl.to}
                className="p-6 rounded-2xl bg-[#160B26] border border-white/10 hover:border-[#F5C75E]/60 transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl mb-3 block">{hl.icon}</span>
                  <h4 className="font-serif-heading font-bold text-base text-[#FFF4DD] mb-2">
                    {hl.title}
                  </h4>
                  <p className="text-xs text-[#FFF4DD]/70 leading-relaxed mb-4">
                    {hl.desc}
                  </p>
                </div>
                <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                  <span>Explore Guide</span> →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#241039] via-[#3C125E] to-[#241039] border-2 border-[#F5C75E]/40 shadow-2xl gold-glow-box">
          <span className="text-4xl mb-3 block">🪔</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-royal text-[#F5C75E] mb-4">
            Spread the Light of Diwali Everywhere
          </h2>
          <p className="text-sm text-[#FFF4DD]/80 max-w-xl mx-auto mb-8">
            Create a personalized photo card, send wishes to friends across the globe, and illuminate virtual diyas together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/wishes-studio"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-sm shadow hover:scale-105 transition"
            >
              Create Greeting Card 💌
            </Link>
            <Link
              to="/memory-wall"
              className="px-6 py-3 rounded-full bg-[#160B26] border border-[#F5C75E]/40 text-[#F5C75E] hover:bg-[#241039] font-bold text-sm transition"
            >
              Visit Memory Wall 📜
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

