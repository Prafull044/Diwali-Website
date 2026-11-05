import React, { useEffect, useRef, useState } from 'react';
import { FireworksEngine, COLOR_PALETTES, FIREWORK_TYPES } from '../utils/fireworksEngine';
import { useApp } from '../context/AppContext';
import { Volume2, VolumeX, FastForward, Play, Sparkles } from 'lucide-react';

export default function FireworksIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const { soundEnabled, toggleSound, t } = useApp();
  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const [hasStartedTransition, setHasStartedTransition] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create high-octane fireworks engine for intro
    const engine = new FireworksEngine(canvas, {
      soundEnabled,
      autoLaunch: true,
      launchInterval: 900, // Frequent celebrations for grand intro
      sizeMultiplier: 1.25,
      speedMultiplier: 1.1,
    });
    engineRef.current = engine;
    engine.start();

    // Launch multiple grand openers
    setTimeout(() => engine.launchRandom(), 200);
    setTimeout(() => engine.launchRandom(), 600);
    setTimeout(() => engine.launchRandom(), 1100);

    // 15 seconds countdown timer
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      if (engineRef.current) {
        engineRef.current.destroy();
      }
    };
  }, []);

  // Update engine sound state if changed
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setSoundEnabled(soundEnabled);
    }
  }, [soundEnabled]);

  const handleFinish = () => {
    if (hasStartedTransition) return;
    setHasStartedTransition(true);
    setTimeout(() => {
      if (engineRef.current) {
        engineRef.current.destroy();
      }
      onComplete();
    }, 600);
  };

  const handleReplay = () => {
    setSecondsRemaining(15);
    setHasStartedTransition(false);
    if (engineRef.current) {
      engineRef.current.start();
      engineRef.current.launchRandom();
    }
  };

  // Interactive manual click to launch where visitor clicks on the night sky
  const handleCanvasClick = (e) => {
    if (!engineRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const startX = rect.width * (0.3 + Math.random() * 0.4);
    const startY = rect.height;
    const types = Object.values(FIREWORK_TYPES);
    const type = types[Math.floor(Math.random() * types.length)];
    const palettes = Object.keys(COLOR_PALETTES);
    const palette = palettes[Math.floor(Math.random() * palettes.length)];

    engineRef.current.launch(startX, startY, x, y, type, palette);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between overflow-hidden transition-opacity duration-700 ${
        hasStartedTransition ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Immersive Black Night Sky Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full cursor-crosshair"
      />

      {/* Top Controls Bar */}
      <div className="relative z-20 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5C75E] animate-ping" />
          <span className="text-xs uppercase tracking-widest text-[#F5C75E]/90 font-medium">
            Diwali Sky Simulation ({secondsRemaining}s)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#241039]/80 border border-[#F5C75E]/40 text-[#FFF4DD] hover:bg-[#241039] hover:border-[#F5C75E] transition-all text-xs font-medium cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#F5C75E]" />
                <span className="hidden sm:inline">{t.intro.soundOn}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden sm:inline">{t.intro.soundOff}</span>
              </>
            )}
          </button>

          <button
            onClick={handleReplay}
            aria-label="Replay Intro"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-amber-500/30 text-amber-200 hover:border-amber-400 text-xs font-medium transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#F5C75E]" />
            <span className="hidden sm:inline">{t.intro.replay}</span>
          </button>

          <button
            onClick={handleFinish}
            aria-label="Skip Intro"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-semibold text-xs tracking-wide hover:shadow-[0_0_15px_rgba(245,199,94,0.6)] transition-all cursor-pointer"
          >
            <span>{t.intro.skip}</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Central Golden Festive Message */}
      <div className="relative z-20 text-center px-4 max-w-3xl mx-auto my-auto pointer-events-none select-none">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#241039]/70 border border-[#F5C75E]/30 mb-4 animate-pulse">
          <Sparkles className="w-4 h-4 text-[#F5C75E]" />
          <span className="text-xs uppercase tracking-widest text-[#F5C75E] font-semibold">
            ✨ Shubh Deepawali ✨
          </span>
          <Sparkles className="w-4 h-4 text-[#F5C75E]" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 font-royal animate-shimmer drop-shadow-[0_4px_20px_rgba(245,199,94,0.4)]">
          {t.intro.welcome}
        </h1>

        <p className="text-lg sm:text-2xl md:text-3xl font-serif text-[#FFF4DD] italic mb-6 text-shadow">
          "{t.intro.subtext}"
        </p>

        <p className="text-xs sm:text-sm text-amber-200/70 max-w-md mx-auto">
          Tap or click anywhere on the sky to burst custom fireworks
        </p>
      </div>

      {/* Bottom Enter Celebration CTA */}
      <div className="relative z-20 p-6 text-center bg-gradient-to-t from-black/90 to-transparent">
        <button
          onClick={handleFinish}
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F5C75E] via-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-base md:text-lg shadow-[0_0_25px_rgba(245,199,94,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>{t.intro.enter}</span>
          <Sparkles className="w-5 h-5 text-[#160B26]" />
        </button>
      </div>
    </div>
  );
}

