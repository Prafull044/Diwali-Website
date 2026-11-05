import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Home, Download, Eye, RotateCcw, Check } from 'lucide-react';

export default function HomeDesigner() {
  const { showToast } = useApp();

  // Decoration Items Toggles
  const [hasFairyLights, setHasFairyLights] = useState(true);
  const [hasToran, setHasToran] = useState(true);
  const [hasDiyas, setHasDiyas] = useState(true);
  const [hasRangoli, setHasRangoli] = useState(true);
  const [hasLantern, setHasLantern] = useState(true);
  const [hasUrli, setHasUrli] = useState(true);

  const [lightingVibe, setLightingVibe] = useState('warm'); // 'warm', 'royal', 'festive'

  const handleDownloadScene = () => {
    showToast("Festive Home Scene saved as image! 🏡", "festive");
  };

  const handleReset = () => {
    setHasFairyLights(true);
    setHasToran(true);
    setHasDiyas(true);
    setHasRangoli(true);
    setHasLantern(true);
    setHasUrli(true);
    showToast("Reset to full festive decoration!", "info");
  };

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Home className="w-3.5 h-3.5" />
            <span>Virtual Festive Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Festive Home Decoration Designer 🏡
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            Virtually decorate a traditional Indian doorway and verandah. Toggle glowing fairy lights, marigold torans, earthen floor diyas, brass urlis, and colourful rangolis.
          </p>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Side Panel (4 cols) */}
          <div className="lg:col-span-4 bg-[#241039]/90 border border-[#F5C75E]/30 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5C75E]/20">
              <h3 className="font-serif-heading font-bold text-lg text-[#F5C75E]">
                Decoration Elements
              </h3>
              <button
                onClick={handleReset}
                className="text-xs text-[#FFF4DD]/60 hover:text-[#F5C75E] flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Item Toggles */}
            <div className="space-y-3">
              {[
                { label: 'Ceiling Fairy Lights ✨', state: hasFairyLights, setter: setHasFairyLights },
                { label: 'Marigold & Mango Toran 🌿', state: hasToran, setter: setHasToran },
                { label: 'Verandah Earthen Diyas 🪔', state: hasDiyas, setter: setHasDiyas },
                { label: 'Entrance Floor Rangoli 🌸', state: hasRangoli, setter: setHasRangoli },
                { label: 'Hanging Akash Kandil 🏮', state: hasLantern, setter: setHasLantern },
                { label: 'Brass Urli with Floating Flowers 🪷', state: hasUrli, setter: setHasUrli },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => item.setter(!item.state)}
                  className={`p-3 rounded-xl border flex items-center justify-between transition cursor-pointer select-none ${
                    item.state
                      ? 'bg-[#160B26] border-[#F5C75E] text-[#F5C75E]'
                      : 'bg-black/20 border-white/10 text-[#FFF4DD]/50'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs ${
                    item.state ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E]' : 'border-zinc-600'
                  }`}>
                    {item.state && '✓'}
                  </div>
                </div>
              ))}
            </div>

            {/* Lighting Ambience */}
            <div>
              <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-2">
                Evening Lighting Ambience
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'warm', label: 'Golden Glow' },
                  { id: 'royal', label: 'Royal Violet' },
                  { id: 'festive', label: 'Amber Flame' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLightingVibe(l.id)}
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      lightingVibe === l.id
                        ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E]'
                        : 'bg-[#160B26] text-[#FFF4DD]/70 border-white/10'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleDownloadScene}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-sm shadow hover:scale-[1.01] transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Save Festive Home Look</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Home Scene Preview (8 cols) */}
          <div className="lg:col-span-8 bg-[#160B26] border-2 border-[#F5C75E]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden min-h-[560px] flex flex-col justify-between gold-glow-box">
            
            {/* Top Ceiling Fairy Lights */}
            {hasFairyLights && (
              <div className="absolute top-0 left-0 right-0 py-2 flex justify-around px-4 bg-gradient-to-b from-amber-400/20 to-transparent">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-amber-200/50" />
                    <div className={`w-3 h-3 rounded-full blur-[1px] animate-pulse ${
                      i % 3 === 0 ? 'bg-[#F5C75E] shadow-[0_0_8px_#F5C75E]' : i % 3 === 1 ? 'bg-[#F28C28] shadow-[0_0_8px_#F28C28]' : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                    }`} style={{ animationDelay: `${i * 0.15}s` }} />
                  </div>
                ))}
              </div>
            )}

            {/* Doorway Frame & Toran */}
            <div className="relative z-10 w-full max-w-lg mx-auto mt-8 flex flex-col items-center">
              
              {/* Marigold Toran Garland */}
              {hasToran && (
                <div className="w-full flex justify-between items-center px-2 py-1 bg-gradient-to-r from-amber-500 via-[#F5C75E] to-amber-500 rounded-full border border-amber-300 shadow-lg text-sm sm:text-base">
                  <span>🍃</span>
                  <span>🌼</span>
                  <span>🍃</span>
                  <span>🌼</span>
                  <span>🍃</span>
                  <span>🌼</span>
                  <span>🍃</span>
                  <span>🌼</span>
                  <span>🍃</span>
                </div>
              )}

              {/* Wooden Carved Doorway Graphic */}
              <div className="w-full h-64 sm:h-72 rounded-t-3xl border-4 border-amber-900 bg-gradient-to-b from-[#2E1202] to-[#1A0A02] relative flex items-center justify-center shadow-2xl mt-2 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#F5C75E]/30" />
                
                {/* Traditional Door Paneling */}
                <div className="w-3/4 h-5/6 border-2 border-amber-800/80 rounded-t-2xl flex items-center justify-center p-4">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl mb-2 text-[#F5C75E] font-royal">
                      शुभ लाभ
                    </div>
                    <div className="text-xs tracking-widest text-[#FFF4DD]/60 uppercase">
                      Welcome Home
                    </div>
                  </div>
                </div>

                {/* Hanging Akash Kandil on upper right corner */}
                {hasLantern && (
                  <div className="absolute top-2 right-4 text-3xl sm:text-4xl animate-float">
                    🏮
                  </div>
                )}
              </div>

            </div>

            {/* Ground Verandah Floor Level */}
            <div className="relative z-10 w-full pt-4 border-t-2 border-[#F5C75E]/40 flex flex-col items-center justify-end">
              
              {/* Central Floor Rangoli */}
              {hasRangoli && (
                <div className="mb-4 text-center">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full border-2 border-dashed border-[#F5C75E] bg-gradient-to-tr from-purple-900/60 to-rose-900/60 flex items-center justify-center text-4xl sm:text-5xl shadow-[0_0_20px_rgba(245,199,94,0.4)]">
                    🌸
                  </div>
                  <span className="text-[10px] text-[#F5C75E] tracking-widest uppercase mt-1 block">
                    Kolam Floor Art
                  </span>
                </div>
              )}

              {/* Floor Items Row: Diyas and Brass Urli */}
              <div className="w-full flex items-center justify-between px-6 py-2">
                {/* Left Diyas */}
                {hasDiyas ? (
                  <div className="flex items-center gap-2 text-2xl animate-pulse">
                    <span>🪔</span>
                    <span>🪔</span>
                  </div>
                ) : <div />}

                {/* Center Floating Urli */}
                {hasUrli && (
                  <div className="text-center px-4 py-2 rounded-2xl bg-amber-950/60 border border-amber-500/40 shadow-lg">
                    <span className="text-2xl">🪷</span>
                    <span className="text-[10px] text-amber-200 block">Brass Urli with Floating Petals</span>
                  </div>
                )}

                {/* Right Diyas */}
                {hasDiyas ? (
                  <div className="flex items-center gap-2 text-2xl animate-pulse">
                    <span>🪔</span>
                    <span>🪔</span>
                  </div>
                ) : <div />}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

