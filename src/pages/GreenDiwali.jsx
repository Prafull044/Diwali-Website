import React from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Leaf,
  CheckCircle2,
  Circle,
  Award,
  Sparkles,
  TreePine,
  Recycle,
  Heart,
  Flame,
  ShieldCheck
} from 'lucide-react';

const ECO_CHALLENGES = [
  {
    id: 'eco-1',
    title: 'Switch 100% to Handcrafted Clay Diyas',
    desc: 'Support traditional local potters (Kumhars) by using natural unpainted terracotta earthen lamps with pure mustard or sesame oil.',
    impact: 'Zero toxic plastic waste, sustains rural artisans',
    category: 'Lighting',
    icon: '🪔'
  },
  {
    id: 'eco-2',
    title: 'Adopt Natural Organic Powder Rangoli',
    desc: 'Use turmeric (Haldi), rice flour, crushed marigold petals, and beetroot powder instead of synthetic chemical dyes.',
    impact: 'Protects soil, non-toxic for birds and children',
    category: 'Art',
    icon: '🌸'
  },
  {
    id: 'eco-3',
    title: 'Plant a Festive Tree / Indoor Tulsi Plant',
    desc: 'Plant a sacred sapling (Neem, Tulsi, Peepal, or flowering marigold) as an offering of living light to Mother Earth.',
    impact: 'Absorbs carbon dioxide, cleans post-festival air',
    category: 'Nature',
    icon: '🌱'
  },
  {
    id: 'eco-4',
    title: 'Plastic-Free Festive Gifting',
    desc: 'Wrap gifts in handmade cloth, jute bags, or recycled newspaper tied with biodegradable jute twine instead of plastic glossy rolls.',
    impact: 'Reduces landfill waste by 90% per household',
    category: 'Gifting',
    icon: '🎁'
  },
  {
    id: 'eco-5',
    title: 'Choose Soundless Digital Sky Celebrations',
    desc: 'Celebrate with our digital fireworks simulator and sky lanterns, preserving calm for pets, stray animals, birds, and elderly folks.',
    impact: 'Zero particulate smoke (PM2.5), stress-free for animals',
    category: 'Clean Air',
    icon: '🐾'
  },
  {
    id: 'eco-6',
    title: 'Share Sweets with Community Helpers',
    desc: 'Pack homemade mithai boxes for sanitation workers, security guards, and underprivileged neighborhood families.',
    impact: 'Spreads pure human warmth and inclusion',
    category: 'Karma',
    icon: '🤝'
  }
];

export default function GreenDiwali() {
  const { ecoChallenges, setEcoChallenges, showToast } = useApp();

  const toggleChallenge = (id) => {
    const isNowDone = !ecoChallenges[id];
    const updated = { ...ecoChallenges, [id]: isNowDone };
    setEcoChallenges(updated);

    if (isNowDone) {
      confetti({ particleCount: 50, spread: 60 });
      showToast("Eco Challenge Completed! 🌱 Badge Unlocked!", "festive");
    } else {
      showToast("Challenge reset", "info");
    }
  };

  const completedCount = Object.values(ecoChallenges).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / ECO_CHALLENGES.length) * 100);

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5" />
            <span>Sustainable Festivities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Green Diwali Eco-Challenge 🌱
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            True illumination is protecting the earth, honoring traditional potters, and caring for all sentient beings. Complete challenges to earn the Green Diwali Warrior badge.
          </p>
        </div>

        {/* Progress & Badge Card */}
        <div className="mb-10 bg-gradient-to-r from-[#1b2a1a] via-[#241039] to-[#1b2a1a] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 gold-glow-box">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border-2 border-emerald-400 flex items-center justify-center text-3xl shrink-0">
              {progressPercent === 100 ? '🏅' : progressPercent >= 50 ? '🥈' : '🌱'}
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold">
                {progressPercent === 100 ? 'Master Green Guardian' : 'Eco-Pledge In Progress'}
              </span>
              <h3 className="font-serif-heading font-bold text-2xl text-[#F5C75E]">
                {completedCount} of {ECO_CHALLENGES.length} Eco Challenges Fulfilled
              </h3>
              <p className="text-xs text-[#FFF4DD]/70 mt-1">
                Every mindful action creates cleaner air and brighter joy for all.
              </p>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-emerald-300">
              <span>Impact Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-emerald-500/30">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-[#F5C75E] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECO_CHALLENGES.map((ch) => {
            const isDone = !!ecoChallenges[ch.id];
            return (
              <div
                key={ch.id}
                onClick={() => toggleChallenge(ch.id)}
                className={`p-6 rounded-2xl border transition flex flex-col justify-between cursor-pointer select-none ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-400/80 shadow-[0_0_15px_rgba(46,196,182,0.25)]'
                    : 'bg-[#241039]/80 border-white/10 hover:border-emerald-400/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{ch.icon}</span>
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      {isDone ? (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Pledged</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[#FFF4DD]/50">
                          <Circle className="w-4 h-4" />
                          <span>Take Pledge</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#160B26] border border-white/10 text-[10px] font-semibold text-emerald-300 uppercase tracking-widest inline-block mb-2">
                    {ch.category}
                  </span>

                  <h4 className="font-serif-heading font-bold text-lg text-[#FFF4DD] mb-2 leading-tight">
                    {ch.title}
                  </h4>

                  <p className="text-xs text-[#FFF4DD]/80 leading-relaxed mb-4">
                    {ch.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-emerald-300/90 font-medium">
                  🍃 <span className="font-bold">Eco Impact:</span> {ch.impact}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

