import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import Diya, { DIYA_STYLES } from '../components/Diya';
import { Sparkles, Download, RotateCcw, Heart, Send, CheckCircle2, Flame, Award } from 'lucide-react';

export default function DiyaStudio() {
  const { litDiyas, sessionDiyaCount, lightDiya, showToast } = useApp();
  const [selectedStyle, setSelectedStyle] = useState('TERRACOTTA');
  const [personalName, setPersonalName] = useState('');
  const [blessingMessage, setBlessingMessage] = useState('May peace, prosperity, and radiant joy brighten your home!');
  const [isMainDiyaLit, setIsMainDiyaLit] = useState(false);
  const canvasDownloadRef = useRef(null);

  const handleLightMainDiya = () => {
    if (!isMainDiyaLit) {
      setIsMainDiyaLit(true);
      const nameToSave = personalName.trim() || 'Festive Soul';
      lightDiya({
        styleKey: selectedStyle,
        name: nameToSave,
        blessing: blessingMessage,
        styleName: DIYA_STYLES[selectedStyle].name,
      });
      showToast(`🪔 Beautiful diya lit for ${nameToSave}!`, "festive");
    } else {
      setIsMainDiyaLit(false);
      showToast("Diya flame extinguished.", "info");
    }
  };

  const handleQuickLightWall = (e) => {
    e.preventDefault();
    const nameToSave = personalName.trim() || 'Beloved Friend';
    lightDiya({
      styleKey: selectedStyle,
      name: nameToSave,
      blessing: blessingMessage,
      styleName: DIYA_STYLES[selectedStyle].name,
    });
    setIsMainDiyaLit(true);
    showToast(`🪔 Added your personalized diya to the Wall of Light!`, "festive");
    setPersonalName('');
  };

  // Canvas Image Download Generator
  const downloadDiyaCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Gradient background
    const bgGrad = ctx.createRadialGradient(400, 380, 50, 400, 400, 500);
    bgGrad.addColorStop(0, '#3C125E');
    bgGrad.addColorStop(0.6, '#1E0B36');
    bgGrad.addColorStop(1, '#0C0517');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 800);

    // Golden decorative border
    ctx.strokeStyle = '#F5C75E';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 740, 740);
    ctx.strokeStyle = 'rgba(245, 199, 94, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(42, 42, 716, 716);

    // Corner decorative rosettes
    const corners = [[30, 30], [770, 30], [30, 770], [770, 770]];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = '#F28C28';
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#F5C75E';
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Header Title
    ctx.font = 'bold 36px "Cinzel Decorative", serif';
    ctx.fillStyle = '#F5C75E';
    ctx.textAlign = 'center';
    ctx.fillText('SHUBH DEEPAWALI', 400, 110);

    ctx.font = '20px "Outfit", sans-serif';
    ctx.fillStyle = '#FFF4DD';
    ctx.fillText('Virtual Diya Blessing from the Heart', 400, 150);

    // Diya Flame Glow
    const flameGlow = ctx.createRadialGradient(400, 350, 10, 400, 350, 120);
    flameGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    flameGlow.addColorStop(0.3, 'rgba(245, 199, 94, 0.8)');
    flameGlow.addColorStop(0.7, 'rgba(242, 140, 40, 0.4)');
    flameGlow.addColorStop(1, 'rgba(242, 140, 40, 0)');
    ctx.fillStyle = flameGlow;
    ctx.beginPath();
    ctx.arc(400, 350, 120, 0, Math.PI * 2);
    ctx.fill();

    // Diya Flame
    ctx.fillStyle = '#FFF4DD';
    ctx.beginPath();
    ctx.moveTo(400, 270);
    ctx.bezierCurveTo(365, 330, 360, 390, 400, 410);
    ctx.bezierCurveTo(440, 390, 435, 330, 400, 270);
    ctx.fill();

    // Diya Clay Body
    ctx.fillStyle = DIYA_STYLES[selectedStyle].bodyColor;
    ctx.beginPath();
    ctx.moveTo(220, 450);
    ctx.quadraticCurveTo(400, 600, 580, 450);
    ctx.quadraticCurveTo(530, 580, 270, 580);
    ctx.fill();

    // Diya Rim
    ctx.fillStyle = DIYA_STYLES[selectedStyle].rimColor;
    ctx.beginPath();
    ctx.ellipse(400, 450, 180, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dedication & Personal Name
    const displayName = personalName.trim() || 'Beloved Friend';
    ctx.font = 'bold 28px "Playfair Display", serif';
    ctx.fillStyle = '#F5C75E';
    ctx.fillText(`Dedicated by: ${displayName}`, 400, 650);

    ctx.font = 'italic 18px "Outfit", sans-serif';
    ctx.fillStyle = '#FFF4DD';
    ctx.fillText(`"${blessingMessage}"`, 400, 690);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = 'rgba(245, 199, 94, 0.7)';
    ctx.fillText('Diwali Magic ✨ Festival Platform', 400, 740);

    // Trigger download
    const link = document.createElement('a');
    link.download = `diwali-diya-${displayName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    showToast("Diya artwork downloaded! 📥", "success");
  };

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Light & Goodness</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Virtual Diya Lighting Studio 🪔
          </h1>
          <p className="text-base sm:text-lg text-[#FFF4DD]/80">
            Select an authentic handcrafted Indian diya style, strike the holy flame, customize your personal prayer, and contribute your light to the global Diya Wall.
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Style Selection & Customization (5 cols) */}
          <div className="lg:col-span-5 bg-[#241039]/80 backdrop-blur-md border border-[#F5C75E]/30 rounded-2xl p-6 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold font-serif-heading text-[#F5C75E] flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#F28C28]" />
              <span>Choose Handcrafted Diya</span>
            </h3>

            {/* Diya Styles Palette */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(DIYA_STYLES).map(([key, style]) => {
                const isSelected = selectedStyle === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedStyle(key)}
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#160B26] border-[#F5C75E] shadow-[0_0_15px_rgba(245,199,94,0.3)]'
                        : 'bg-black/20 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full border-2 border-amber-300/40 shrink-0"
                      style={{ backgroundColor: style.bodyColor }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#FFF4DD]">{style.name}</h4>
                      <span className="text-[10px] text-[#FFF4DD]/60">Traditional Finish</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Personalization Inputs */}
            <form onSubmit={handleQuickLightWall} className="space-y-4 pt-4 border-t border-[#F5C75E]/20">
              <div>
                <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1.5">
                  Your Name or Family Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aarav Sharma & Family"
                  value={personalName}
                  onChange={(e) => setPersonalName(e.target.value)}
                  className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E]"
                  maxLength={40}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1.5">
                  Festive Blessing / Prayer
                </label>
                <textarea
                  rows={2}
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3.5 py-2 text-xs text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E]"
                  maxLength={120}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-sm shadow-[0_0_15px_rgba(245,199,94,0.4)] hover:scale-[1.02] active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Dedicate & Add to Wall</span>
                </button>

                <button
                  type="button"
                  onClick={downloadDiyaCard}
                  className="py-3 px-4 rounded-xl bg-[#160B26] border border-[#F5C75E]/40 text-[#F5C75E] hover:bg-[#241039] text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Card</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Interactive Diya Podium & Sacred Altar (7 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#241039] via-[#1E0B36] to-[#120621] border border-[#F5C75E]/30 rounded-2xl p-8 sm:p-12 text-center shadow-2xl flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden">
            
            {/* Subtle Mandala Background Graphic */}
            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
              <div className="w-[480px] h-[480px] rounded-full border-8 border-dashed border-[#F5C75E] animate-spin" style={{ animationDuration: '90s' }} />
            </div>

            {/* Sacred Altar Floor Ring */}
            <div className="relative z-10 flex flex-col items-center">
              
              {/* Giant Interactive Diya */}
              <div className="relative mb-6">
                <Diya
                  size="xl"
                  isLit={isMainDiyaLit}
                  styleKey={selectedStyle}
                  onToggle={handleLightMainDiya}
                  name={personalName.trim() || undefined}
                />
              </div>

              {/* Status Message */}
              <div className="max-w-md">
                <h3 className="text-2xl font-bold font-serif-heading text-[#F5C75E] mb-2">
                  {isMainDiyaLit ? "The Sacred Flame Burns Bright" : "The Diya Awaits Your Holy Touch"}
                </h3>
                <p className="text-xs sm:text-sm text-[#FFF4DD]/80 italic">
                  {isMainDiyaLit
                    ? `"${blessingMessage}"`
                    : "Click or tap on the diya to ignite the auspicious flame and dispel darkness."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleLightMainDiya}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isMainDiyaLit
                      ? 'bg-[#160B26] border border-amber-500/40 text-amber-300 hover:border-amber-400'
                      : 'bg-gradient-to-r from-[#F5C75E] to-[#F28C28] text-[#160B26] shadow-[0_0_20px_rgba(245,199,94,0.6)]'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  <span>{isMainDiyaLit ? "Extinguish Diya" : "Light The Diya"}</span>
                </button>

                <button
                  onClick={downloadDiyaCard}
                  className="px-5 py-2.5 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-xs font-semibold text-[#FFF4DD] hover:border-[#F5C75E] transition cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-[#F5C75E]" />
                  <span>Export Image</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* GLOBAL DIYA WALL & COUNTERS */}
        <div className="bg-[#241039]/90 border border-[#F5C75E]/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#F5C75E]/20">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F5C75E] uppercase tracking-wider mb-1">
                <Award className="w-4 h-4" />
                <span>Sacred Community Wall</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#FFF4DD]">
                The Virtual Diya Wall of Light 🌟
              </h3>
              <p className="text-xs sm:text-sm text-[#FFF4DD]/70">
                Each diya represents prayers of goodwill, harmony, and joy.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-2 rounded-xl bg-[#160B26] border border-[#F5C75E]/30">
                <span className="block text-2xl font-black font-royal text-[#F5C75E]">
                  {sessionDiyaCount}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#FFF4DD]/60">
                  Your Session Diyas
                </span>
              </div>

              <div className="text-center px-4 py-2 rounded-xl bg-[#160B26] border border-[#F5C75E]/30">
                <span className="block text-2xl font-black font-royal text-[#F28C28]">
                  {litDiyas.length + 108}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#FFF4DD]/60">
                  Total Lamps Glowing
                </span>
              </div>
            </div>
          </div>

          {/* Diya Wall Grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Show recently lit diyas + demo community diyas */}
            {litDiyas.length > 0 ? (
              litDiyas.map((diya) => (
                <div
                  key={diya.id}
                  className="flex flex-col items-center p-3 rounded-xl bg-[#160B26]/60 border border-[#F5C75E]/20 hover:border-[#F5C75E]/60 transition text-center"
                >
                  <Diya size="sm" isLit={true} styleKey={diya.styleKey || 'TERRACOTTA'} interactive={false} />
                  <span className="mt-2 text-xs font-bold text-[#F5C75E] truncate max-w-[110px]">
                    {diya.name || 'Festive Soul'}
                  </span>
                  <span className="text-[10px] text-[#FFF4DD]/50 truncate max-w-[110px]">
                    {diya.blessing || 'Shubh Deepawali'}
                  </span>
                </div>
              ))
            ) : null}

            {/* Default Festive Community Lamps */}
            {[
              { name: 'Kavita & Rakesh', blessing: 'Peace & Good Health', style: 'GOLDEN_ROYAL' },
              { name: 'Dadi & Grandchildren', blessing: 'Sweets & Laughter', style: 'TERRACOTTA' },
              { name: 'Rohan & Ananya', blessing: 'Love and Prosperity', style: 'PEACOCK' },
              { name: 'Mehra Family', blessing: 'Abundant Blessings', style: 'KUNDAN_RUBY' },
              { name: 'Dr. Vikram Patel', blessing: 'Healing for the World', style: 'PURPLE_MAJESTY' },
              { name: 'Siddharth & Friends', blessing: 'Bright Futures Ahead', style: 'GOLDEN_ROYAL' },
            ].map((d, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-3 rounded-xl bg-[#160B26]/60 border border-[#F5C75E]/20 hover:border-[#F5C75E]/60 transition text-center"
              >
                <Diya size="sm" isLit={true} styleKey={d.style} interactive={false} />
                <span className="mt-2 text-xs font-bold text-[#F5C75E] truncate max-w-[110px]">
                  {d.name}
                </span>
                <span className="text-[10px] text-[#FFF4DD]/50 truncate max-w-[110px]">
                  {d.blessing}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

