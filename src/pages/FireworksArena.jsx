import React, { useState, useEffect, useRef } from 'react';
import { FireworksEngine, FIREWORK_TYPES, COLOR_PALETTES } from '../utils/fireworksEngine';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sliders,
  Flame,
  Zap,
  Clock,
  Compass,
  Palette
} from 'lucide-react';

const FIREWORK_DETAILS = [
  { id: FIREWORK_TYPES.ROCKET, name: 'Rocket Fireworks', desc: 'High-altitude classic rocket with intense crackling boom', icon: '🚀' },
  { id: FIREWORK_TYPES.FLOWER, name: 'Flower Burst', desc: 'Geometric floral petals blooming in mid-air', icon: '🌸' },
  { id: FIREWORK_TYPES.CHRYSANTHEMUM, name: 'Chrysanthemum', desc: 'Long glowing luminous trails spreading across the sky', icon: '🌼' },
  { id: FIREWORK_TYPES.WILLOW, name: 'Willow Sparks', desc: 'Gracefully drooping golden weeping willow cascades', icon: '✨' },
  { id: FIREWORK_TYPES.CRACKLING, name: 'Crackling Sparkler', desc: 'Secondary popping bursts with sparkling sound', icon: '⚡' },
  { id: FIREWORK_TYPES.PEONY, name: 'Peony Spherical', desc: 'Vibrant pure colored spherical explosion', icon: '💥' },
  { id: FIREWORK_TYPES.RING, name: 'Ring Halo', desc: 'Concentric ring expanding in dark space', icon: '⭕' },
  { id: FIREWORK_TYPES.FOUNTAIN, name: 'Fountain Geyser', desc: 'Ground shower of dazzling festive sparks', icon: '🌋' },
  { id: FIREWORK_TYPES.COMET, name: 'Shooting Comet', desc: 'Blazing streak with trailing stardust', icon: '☄️' },
  { id: FIREWORK_TYPES.MULTICOLOR, name: 'Multi-Color Finale', desc: 'Dazzling grand kaleidoscope rainbow explosion', icon: '🎆' },
];

export default function FireworksArena() {
  const { soundEnabled, toggleSound, showToast } = useApp();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const engineRef = useRef(null);

  // Control State
  const [selectedTypes, setSelectedTypes] = useState([
    FIREWORK_TYPES.ROCKET,
    FIREWORK_TYPES.CHRYSANTHEMUM,
    FIREWORK_TYPES.WILLOW,
    FIREWORK_TYPES.MULTICOLOR,
  ]);
  const [selectedPalette, setSelectedPalette] = useState('GOLD');
  const [explosionSize, setExplosionSize] = useState(1.2);
  const [launchSpeed, setLaunchSpeed] = useState(1);
  const [launchCount, setLaunchCount] = useState(2);
  const [launchAngle, setLaunchAngle] = useState('arc'); // straight, left, right, arc
  const [autoMode, setAutoMode] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timedShowDuration, setTimedShowDuration] = useState(null); // null, 10, 15, 30, 60
  const [showTimerRemaining, setShowTimerRemaining] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new FireworksEngine(canvas, {
      soundEnabled,
      autoLaunch: autoMode,
      launchInterval: 1400,
      selectedTypes,
      palette: selectedPalette,
      sizeMultiplier: explosionSize,
      speedMultiplier: launchSpeed,
    });
    engineRef.current = engine;
    engine.start();

    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
      }
    };
  }, []);

  // Sync engine settings
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setSoundEnabled(soundEnabled);
      engineRef.current.selectedTypes = selectedTypes;
      engineRef.current.selectedPalette = selectedPalette;
      engineRef.current.sizeMultiplier = explosionSize;
      engineRef.current.speedMultiplier = launchSpeed;
    }
  }, [soundEnabled, selectedTypes, selectedPalette, explosionSize, launchSpeed]);

  // Handle Timed Show
  useEffect(() => {
    let interval = null;
    if (timedShowDuration && showTimerRemaining !== null) {
      interval = setInterval(() => {
        setShowTimerRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            if (engineRef.current) {
              engineRef.current.setAutoLaunch(false);
              setAutoMode(false);
            }
            showToast("Timed fireworks show completed! 🎆", "festive");
            setTimedShowDuration(null);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timedShowDuration, showTimerRemaining]);

  const toggleSelectType = (id) => {
    setSelectedTypes((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) {
          showToast("At least one firework type must remain active", "info");
          return prev;
        }
        return prev.filter((t) => t !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedTypes(FIREWORK_DETAILS.map((f) => f.id));
    showToast("All 10 firework types selected! 💥", "success");
  };

  const handleDeselectAll = () => {
    setSelectedTypes([FIREWORK_TYPES.ROCKET]);
    showToast("Reset to Rocket fireworks", "info");
  };

  const handlePauseResume = () => {
    if (!engineRef.current) return;
    if (isPaused) {
      engineRef.current.resume();
      setIsPaused(false);
      showToast("Fireworks simulation resumed ▶️", "info");
    } else {
      engineRef.current.pause();
      setIsPaused(true);
      showToast("Fireworks simulation paused ⏸️", "info");
    }
  };

  const handleReplay = () => {
    if (!engineRef.current) return;
    engineRef.current.stop();
    engineRef.current.start();
    setIsPaused(false);
    triggerBarrage();
    showToast("Replaying firework celebration 🔄", "festive");
  };

  const toggleAuto = () => {
    const nextVal = !autoMode;
    setAutoMode(nextVal);
    if (engineRef.current) {
      engineRef.current.setAutoLaunch(nextVal);
    }
    showToast(nextVal ? "Auto fireworks enabled 🚀" : "Auto fireworks stopped (manual mode)", "info");
  };

  // Launch currently configured firework volley
  const launchCustom = () => {
    if (!engineRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;

    for (let i = 0; i < launchCount; i++) {
      setTimeout(() => {
        let startX = w * 0.5;
        let targetX = w * (0.2 + Math.random() * 0.6);
        let targetY = h * (0.15 + Math.random() * 0.45);

        if (launchAngle === 'left') {
          startX = w * 0.2;
          targetX = w * (0.1 + Math.random() * 0.4);
        } else if (launchAngle === 'right') {
          startX = w * 0.8;
          targetX = w * (0.5 + Math.random() * 0.4);
        } else if (launchAngle === 'straight') {
          startX = w * (0.3 + Math.random() * 0.4);
          targetX = startX;
        }

        const type = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
        const palette = selectedPalette === 'RANDOM'
          ? Object.keys(COLOR_PALETTES)[Math.floor(Math.random() * Object.keys(COLOR_PALETTES).length)]
          : selectedPalette;

        engineRef.current.launch(startX, h, targetX, targetY, type, palette);
      }, i * 180);
    }
  };

  // Grand Finale Barrage
  const triggerBarrage = () => {
    if (!engineRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;

    showToast("Launching Grand Finale Barrage! 🎇🎆", "festive");

    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const startX = w * (0.1 + (i / 12) * 0.8);
        const targetX = startX + (Math.random() - 0.5) * 120;
        const targetY = h * (0.12 + Math.random() * 0.4);
        const types = Object.values(FIREWORK_TYPES);
        const type = types[i % types.length];
        const palettes = Object.keys(COLOR_PALETTES);
        const palette = palettes[i % palettes.length];

        engineRef.current.launch(startX, h, targetX, targetY, type, palette);
      }, i * 220);
    }
  };

  const startTimedShow = (seconds) => {
    setTimedShowDuration(seconds);
    setShowTimerRemaining(seconds);
    setAutoMode(true);
    if (engineRef.current) {
      engineRef.current.setAutoLaunch(true);
      engineRef.current.launchInterval = 750; // faster action for show
    }
    showToast(`Started ${seconds}-second Spectacular Diwali Fireworks Show! ⏱️`, "festive");
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleCanvasClick = (e) => {
    if (!engineRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const startX = rect.width * (0.3 + Math.random() * 0.4);
    const startY = rect.height;

    const type = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
    const palette = selectedPalette === 'RANDOM'
      ? Object.keys(COLOR_PALETTES)[Math.floor(Math.random() * Object.keys(COLOR_PALETTES).length)]
      : selectedPalette;

    engineRef.current.launch(startX, startY, x, y, type, palette);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFF4DD] pb-16">
      
      {/* Page Header */}
      <div className="bg-gradient-to-b from-[#160B26] to-[#050505] border-b border-[#F5C75E]/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Physics Simulation</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-royal text-[#F5C75E] gold-glow tracking-wide">
              Diwali Fireworks Arena 🎆
            </h1>
            <p className="text-sm text-[#FFF4DD]/80 mt-1">
              Immersive black night sky simulator with 10 realistic firework types, custom trajectories, and audio synthesis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#241039] border border-[#F5C75E]/40 text-[#F5C75E] hover:border-[#F5C75E] transition text-sm font-semibold cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen Sky"}</span>
            </button>
            <button
              onClick={triggerBarrage}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold shadow-[0_0_20px_rgba(245,199,94,0.5)] hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Grand Finale</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Main Canvas Arena Container (100% Black Night Sky) */}
        <div
          ref={containerRef}
          className="relative w-full h-[580px] lg:h-[650px] rounded-2xl overflow-hidden bg-[#050505] border-2 border-[#F5C75E]/30 shadow-2xl gold-glow-box"
        >
          {/* Night Sky Stars & Sparkles Canvas */}
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-full cursor-crosshair block"
          />

          {/* Interactive Floating Quick-Bar */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-200 text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Click sky to burst</span>
              </span>

              {showTimerRemaining !== null && (
                <span className="px-3 py-1.5 rounded-full bg-amber-500/90 text-black text-xs font-bold animate-pulse">
                  Show Time: {showTimerRemaining}s
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Play / Pause */}
              <button
                onClick={handlePauseResume}
                className="p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-[#FFF4DD] hover:border-[#F5C75E] transition"
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
              </button>

              {/* Replay */}
              <button
                onClick={handleReplay}
                className="p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-[#FFF4DD] hover:border-[#F5C75E] transition"
                title="Replay"
              >
                <RotateCcw className="w-4 h-4 text-[#F5C75E]" />
              </button>

              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                className="p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-[#FFF4DD] hover:border-[#F5C75E] transition"
                title={soundEnabled ? "Mute" : "Unmute"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[#F5C75E]" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
              </button>
            </div>
          </div>

          {/* Bottom Floating Launch Button on Canvas */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <button
              onClick={launchCustom}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#F5C75E] to-[#F28C28] text-[#160B26] font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(245,199,94,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Flame className="w-5 h-5" />
              <span>Launch Selected ({selectedTypes.length})</span>
            </button>
          </div>
        </div>

        {/* COMPREHENSIVE FIREWORKS CONTROL PANEL */}
        <div className="mt-8 bg-[#160B26] border border-[#F5C75E]/30 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F5C75E]/20">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-heading text-[#F5C75E] flex items-center gap-2">
                <Sliders className="w-5 h-5" />
                <span>Arena Flight Console & Parameters</span>
              </h2>
              <p className="text-xs text-[#FFF4DD]/70">Customize physics, angles, colors, and durations</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={toggleAuto}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  autoMode
                    ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500'
                    : 'bg-black/40 text-zinc-400 border-zinc-700'
                }`}
              >
                {autoMode ? 'Auto-Launch ON' : 'Manual Mode'}
              </button>
              <button
                onClick={handleSelectAll}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#241039] border border-[#F5C75E]/40 text-[#F5C75E] hover:border-[#F5C75E]"
              >
                Select All 10
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#241039] border border-white/20 text-[#FFF4DD]/70 hover:text-white"
              >
                Clear Selection
              </button>
            </div>
          </div>

          {/* 10 Firework Types Grid */}
          <div className="mt-6">
            <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-3">
              1. Choose Firework Types ({selectedTypes.length} active)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {FIREWORK_DETAILS.map((fw) => {
                const isSelected = selectedTypes.includes(fw.id);
                return (
                  <button
                    key={fw.id}
                    onClick={() => toggleSelectType(fw.id)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#241039] border-[#F5C75E] shadow-[0_0_12px_rgba(245,199,94,0.3)]'
                        : 'bg-black/30 border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xl">{fw.icon}</span>
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
                        isSelected ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E]' : 'border-zinc-500'
                      }`}>
                        {isSelected && '✓'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#FFF4DD] truncate">{fw.name}</h4>
                      <p className="text-[10px] text-[#FFF4DD]/60 line-clamp-2 mt-0.5">{fw.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Controls: Palette, Angle, Duration, Size, Speed */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Color Palette */}
            <div>
              <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Palette className="w-3.5 h-3.5" />
                <span>Color Palette</span>
              </label>
              <select
                value={selectedPalette}
                onChange={(e) => setSelectedPalette(e.target.value)}
                className="w-full bg-[#241039] border border-[#F5C75E]/30 rounded-xl px-3 py-2 text-xs text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E]"
              >
                <option value="GOLD">Royal Golden Radiance</option>
                <option value="ROYAL">Deep Royal Purple & Gold</option>
                <option value="FESTIVE_WARM">Warm Festive Sunset</option>
                <option value="EMERALD_RUBY">Emerald & Ruby Gemstones</option>
                <option value="PEACOCK">Peacock Teal & Blue</option>
                <option value="RAINBOW">Grand Rainbow Festival</option>
                <option value="RANDOM">Surprise Random Colors</option>
              </select>
            </div>

            {/* Launch Angle / Direction */}
            <div>
              <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Launch Direction</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'arc', label: 'Arc' },
                  { id: 'straight', label: 'Center' },
                  { id: 'left', label: 'Left' },
                  { id: 'right', label: 'Right' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLaunchAngle(item.id)}
                    className={`py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                      launchAngle === item.id
                        ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E] font-bold'
                        : 'bg-[#241039] text-[#FFF4DD]/80 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Explosion Size & Speed */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#F5C75E] uppercase tracking-wider mb-2">
                <span>Burst Scale</span>
                <span>{explosionSize}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="2.0"
                step="0.2"
                value={explosionSize}
                onChange={(e) => setExplosionSize(parseFloat(e.target.value))}
                className="w-full accent-[#F5C75E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#FFF4DD]/60 mt-1">
                <span>Compact</span>
                <span>Standard</span>
                <span>Colossal</span>
              </div>
            </div>

            {/* Timed Show Presets */}
            <div>
              <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Timed Diwali Show</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[10, 15, 30, 60].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => startTimedShow(sec)}
                    className="py-1.5 rounded-lg text-xs font-bold bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] hover:bg-[#F5C75E] hover:text-[#160B26] transition cursor-pointer"
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

