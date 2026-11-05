import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Download, Palette, Type, Sliders, Save, Check } from 'lucide-react';

const LANTERN_SHAPES = [
  { id: 'star-kandil', name: 'Traditional Star Kandil', icon: '⭐' },
  { id: 'lotus', name: 'Lotus Petal Blossom', icon: '🪷' },
  { id: 'geometric', name: 'Diamond Hexagon', icon: '💎' },
  { id: 'cylinder', name: 'Royal Palace Drum', icon: '🏮' },
];

const LANTERN_PALETTES = [
  { id: 'p1', name: 'Royal Gold & Crimson', primary: '#D90429', accent: '#F5C75E', glow: 'rgba(245, 199, 94, 0.6)' },
  { id: 'p2', name: 'Deep Purple & Amber', primary: '#3C096C', accent: '#F28C28', glow: 'rgba(242, 140, 40, 0.6)' },
  { id: 'p3', name: 'Peacock Teal & Gold', primary: '#005F73', accent: '#EE9B00', glow: 'rgba(238, 155, 0, 0.6)' },
  { id: 'p4', name: 'Sunset Saffron & Pink', primary: '#FF007F', accent: '#F5C75E', glow: 'rgba(255, 0, 127, 0.6)' },
];

export default function LanternDesigner() {
  const { setSavedLanterns, showToast } = useApp();
  const [selectedShape, setSelectedShape] = useState('star-kandil');
  const [selectedPalette, setSelectedPalette] = useState('p1');
  const [customText, setCustomText] = useState('SHUBH DIWALI');
  const [tasselLength, setTasselLength] = useState(8);
  const [glowIntensity, setGlowIntensity] = useState(1);

  const currentColors = LANTERN_PALETTES.find((p) => p.id === selectedPalette) || LANTERN_PALETTES[0];

  // Canvas PNG Generator
  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 700;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');

    // Midnight sky background
    const bg = ctx.createLinearGradient(0, 0, 0, 900);
    bg.addColorStop(0, '#0E0517');
    bg.addColorStop(1, '#05010B');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 700, 900);

    // Subtle stars
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc((i * 123) % 700, (i * 321) % 900, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Hanging string
    ctx.strokeStyle = '#F5C75E';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(350, 0);
    ctx.lineTo(350, 180);
    ctx.stroke();

    // Lantern Glow Halo
    const glow = ctx.createRadialGradient(350, 360, 30, 350, 360, 240);
    glow.addColorStop(0, currentColors.glow);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(350, 360, 240, 0, Math.PI * 2);
    ctx.fill();

    // Main Lantern Body (Octagonal / Star Kandil)
    ctx.fillStyle = currentColors.primary;
    ctx.strokeStyle = currentColors.accent;
    ctx.lineWidth = 5;

    ctx.save();
    ctx.translate(350, 360);

    // Draw diamond center box
    ctx.beginPath();
    ctx.moveTo(0, -120);
    ctx.lineTo(120, 0);
    ctx.lineTo(0, 120);
    ctx.lineTo(-120, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Corner decorative triangles (Kandil spikes)
    const spikes = 4;
    for (let i = 0; i < spikes; i++) {
      ctx.rotate((Math.PI / 2));
      ctx.fillStyle = currentColors.accent;
      ctx.beginPath();
      ctx.moveTo(0, -120);
      ctx.lineTo(40, -170);
      ctx.lineTo(-40, -170);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Tassels (Streamers)
    const tasselCount = 9;
    const spacing = 22;
    const startX = 350 - ((tasselCount - 1) * spacing) / 2;
    ctx.lineWidth = 4;
    ctx.strokeStyle = currentColors.accent;

    for (let t = 0; t < tasselCount; t++) {
      const tx = startX + t * spacing;
      ctx.beginPath();
      ctx.moveTo(tx, 480);
      ctx.quadraticCurveTo(tx + Math.sin(t) * 15, 620, tx, 480 + tasselLength * 22);
      ctx.stroke();
    }

    // Text on Lantern
    ctx.font = 'bold 24px "Cinzel Decorative", serif';
    ctx.fillStyle = '#FFF4DD';
    ctx.textAlign = 'center';
    ctx.fillText(customText, 350, 370);

    // Title & Watermark
    ctx.font = '14px "Outfit", sans-serif';
    ctx.fillStyle = 'rgba(245,199,94,0.7)';
    ctx.fillText('Diwali Magic ✨ Akash Kandil Designer', 350, 850);

    const link = document.createElement('a');
    link.download = `diwali-lantern-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Save to profile
    setSavedLanterns((prev) => [
      {
        id: `lantern-${Date.now()}`,
        shape: selectedShape,
        text: customText,
        dataUrl: canvas.toDataURL('image/png'),
        date: new Date().toLocaleDateString(),
      },
      ...prev,
    ]);

    showToast("Akash Kandil design downloaded! 🏮", "festive");
  };

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Traditional Akash Kandil Art</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Digital Lantern (Kandil) Designer 🏮
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            Design an illuminated traditional Indian sky lantern (Akash Kandil). Customize geometric frames, silk streamers, and festive greetings to illuminate your verandah.
          </p>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls (5 cols) */}
          <div className="lg:col-span-5 bg-[#241039]/90 border border-[#F5C75E]/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Shape Selection */}
            <div>
              <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-2">
                1. Select Kandil Shape
              </label>
              <div className="grid grid-cols-2 gap-3">
                {LANTERN_SHAPES.map((shape) => {
                  const isSelected = selectedShape === shape.id;
                  return (
                    <button
                      key={shape.id}
                      onClick={() => setSelectedShape(shape.id)}
                      className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#160B26] border-[#F5C75E] shadow-[0_0_12px_rgba(245,199,94,0.3)]'
                          : 'bg-black/20 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="text-xl">{shape.icon}</span>
                      <span className="text-xs font-bold text-[#FFF4DD]">{shape.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-2">
                2. Silk & Gold Color Schemes
              </label>
              <div className="grid grid-cols-2 gap-3">
                {LANTERN_PALETTES.map((pal) => {
                  const isSelected = selectedPalette === pal.id;
                  return (
                    <button
                      key={pal.id}
                      onClick={() => setSelectedPalette(pal.id)}
                      className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#160B26] border-[#F5C75E] shadow-[0_0_12px_rgba(245,199,94,0.3)]'
                          : 'bg-black/20 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full border border-white" style={{ backgroundColor: pal.primary }} />
                        <div className="w-5 h-5 rounded-full border border-white" style={{ backgroundColor: pal.accent }} />
                      </div>
                      <span className="text-xs font-bold text-[#FFF4DD]">{pal.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Inscription */}
            <div>
              <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1.5">
                3. Greeting Inscription
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={20}
                placeholder="e.g. SHUBH DIWALI"
                className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#FFF4DD] uppercase tracking-wider focus:outline-none focus:border-[#F5C75E]"
              />
            </div>

            {/* Tassel Length Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#F5C75E] uppercase tracking-wider mb-2">
                <span>Streamer / Tassel Length</span>
                <span>{tasselLength}</span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                value={tasselLength}
                onChange={(e) => setTasselLength(parseInt(e.target.value))}
                className="w-full accent-[#F5C75E] cursor-pointer"
              />
            </div>

            {/* Download Button */}
            <div className="pt-2">
              <button
                onClick={handleDownload}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-sm shadow-[0_0_15px_rgba(245,199,94,0.4)] hover:scale-[1.01] transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Kandil Artwork (PNG)</span>
              </button>
            </div>

          </div>

          {/* Interactive Live Floating Lantern Display (7 cols) */}
          <div className="lg:col-span-7 bg-[#0E0517] border-2 border-[#F5C75E]/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[520px] gold-glow-box">
            
            {/* Hanging String */}
            <div className="w-0.5 h-16 bg-[#F5C75E]/80 mb-1" />

            {/* Floating Animated Lantern */}
            <div className="relative animate-float flex flex-col items-center select-none">
              
              {/* Inner Radiant Glow */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-70 pointer-events-none -z-10"
                style={{ backgroundColor: currentColors.accent }}
              />

              {/* Lantern Shape SVG */}
              <div className="relative flex flex-col items-center">
                <svg
                  className="w-64 h-64 sm:w-72 sm:h-72 drop-shadow-2xl"
                  viewBox="0 0 300 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Central Diamond/Hexagon */}
                  <polygon
                    points="150,30 270,150 150,270 30,150"
                    fill={currentColors.primary}
                    stroke={currentColors.accent}
                    strokeWidth="6"
                  />

                  {/* Top Spike */}
                  <polygon points="150,30 110,0 190,0" fill={currentColors.accent} />
                  {/* Bottom Spike */}
                  <polygon points="150,270 110,300 190,300" fill={currentColors.accent} />
                  {/* Left Spike */}
                  <polygon points="30,150 0,110 0,190" fill={currentColors.accent} />
                  {/* Right Spike */}
                  <polygon points="270,150 300,110 300,190" fill={currentColors.accent} />

                  {/* Inner Lattice Mandala */}
                  <circle cx="150" cy="150" r="50" stroke={currentColors.accent} strokeWidth="3" strokeDasharray="6 4" />
                  <circle cx="150" cy="150" r="25" fill={currentColors.accent} opacity="0.3" />

                  {/* Inscribed Text */}
                  <text
                    x="150"
                    y="155"
                    fill="#FFF4DD"
                    fontFamily="Cinzel Decorative, serif"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {customText}
                  </text>
                </svg>

                {/* Animated Streamer Tassels Hanging Down */}
                <div className="flex justify-center -space-x-1 -mt-4">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 rounded-b-full transition-all duration-300"
                      style={{
                        backgroundColor: i % 2 === 0 ? currentColors.accent : currentColors.primary,
                        height: `${tasselLength * 14 + (i % 3) * 10}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#FFF4DD]/60 mt-10 text-center">
              Watch your Akash Kandil gently sway in the Diwali evening breeze!
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

