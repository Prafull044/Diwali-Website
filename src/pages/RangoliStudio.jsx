import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Palette,
  RotateCcw,
  RotateCw,
  Trash2,
  Download,
  Share2,
  Sparkles,
  Save,
  Eraser,
  Brush,
  Grid,
  Circle,
  HelpCircle
} from 'lucide-react';

const RANGOLI_COLORS = [
  { name: 'Gulal Sindoor', hex: '#E63946' },
  { name: 'Haldi Golden', hex: '#F5C75E' },
  { name: 'Marigold Orange', hex: '#F28C28' },
  { name: 'Peacock Indigo', hex: '#1D3557' },
  { name: 'Emerald Green', hex: '#2A9D8F' },
  { name: 'Gulabi Pink', hex: '#FF007F' },
  { name: 'Shahi Violet', hex: '#7209B7' },
  { name: 'Rangoli Rice Flour', hex: '#FFFFFF' },
];

export default function RangoliStudio() {
  const canvasRef = useRef(null);
  const { savedRangolis, setSavedRangolis, showToast } = useApp();

  const [selectedColor, setSelectedColor] = useState('#F5C75E');
  const [brushSize, setBrushSize] = useState(5);
  const [symmetry, setSymmetry] = useState(8); // 1, 4, 8, 12
  const [isEraser, setIsEraser] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);

  // Undo / Redo history
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set high-res canvas coordinates
    canvas.width = 700;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');
    
    // Fill with rich dark royal background
    ctx.fillStyle = '#160B26';
    ctx.fillRect(0, 0, 700, 700);

    // Initial history state
    saveHistoryState();
  }, []);

  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    setHistory((prev) => {
      const next = prev.slice(0, historyStep + 1);
      return [...next, dataUrl];
    });
    setHistoryStep((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (historyStep <= 0) return;
    const prevStep = historyStep - 1;
    const img = new Image();
    img.src = history[prevStep];
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 700, 700);
      ctx.drawImage(img, 0, 0);
      setHistoryStep(prevStep);
      showToast("Undo applied ↩️", "info");
    };
  };

  const handleRedo = () => {
    if (historyStep >= history.length - 1) return;
    const nextStep = historyStep + 1;
    const img = new Image();
    img.src = history[nextStep];
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 700, 700);
      ctx.drawImage(img, 0, 0);
      setHistoryStep(nextStep);
      showToast("Redo applied ↪️", "info");
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#160B26';
    ctx.fillRect(0, 0, 700, 700);
    saveHistoryState();
    showToast("Canvas cleared ✨", "info");
  };

  // Symmetrical Line Drawing
  const drawSegment = (p1, p2) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = 350;
    const centerY = 350;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;

    if (isEraser) {
      ctx.strokeStyle = '#160B26';
    } else {
      ctx.strokeStyle = selectedColor;
      ctx.shadowColor = selectedColor;
      ctx.shadowBlur = 4;
    }

    const segments = symmetry;
    const angleStep = (Math.PI * 2) / segments;

    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep;

      // Coordinate transformation around center
      const rot = (x, y) => {
        const dx = x - centerX;
        const dy = y - centerY;
        const rx = dx * Math.cos(angle) - dy * Math.sin(angle);
        const ry = dx * Math.sin(angle) + dy * Math.cos(angle);
        return { x: centerX + rx, y: centerY + ry };
      };

      const start = rot(p1.x, p1.y);
      const end = rot(p2.x, p2.y);

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      // Mirror reflection for authentic kaleidoscope rangoli
      if (segments > 1) {
        const mirror = (x, y) => {
          const dx = x - centerX;
          const dy = y - centerY;
          // Reflect along x-axis then rotate
          const rx = -dx * Math.cos(angle) - dy * Math.sin(angle);
          const ry = -dx * Math.sin(angle) + dy * Math.cos(angle);
          return { x: centerX + rx, y: centerY + ry };
        };
        const mStart = mirror(p1.x, p1.y);
        const mEnd = mirror(p2.x, p2.y);

        ctx.beginPath();
        ctx.moveTo(mStart.x, mStart.y);
        ctx.lineTo(mEnd.x, mEnd.y);
        ctx.stroke();
      }
    }

    ctx.restore();
  };

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const point = getCanvasCoords(e);
    setLastPoint(point);
    drawSegment(point, point);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const currentPoint = getCanvasCoords(e);
    if (lastPoint) {
      drawSegment(lastPoint, currentPoint);
    }
    setLastPoint(currentPoint);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setLastPoint(null);
      saveHistoryState();
    }
  };

  // Add decorative stamp at center / quadrant
  const addStamp = (stampType) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = 350;
    const cy = 350;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '48px serif';
    
    if (stampType === 'diya') {
      ctx.fillText('🪔', cx, cy);
    } else if (stampType === 'flower') {
      ctx.fillText('🌸', cx, cy);
    } else if (stampType === 'om') {
      ctx.font = 'bold 54px serif';
      ctx.fillStyle = '#F5C75E';
      ctx.fillText('ॐ', cx, cy);
    }
    ctx.restore();
    saveHistoryState();
    showToast(`Added ${stampType} emblem to center! ✨`, "success");
  };

  // Download Rangoli as High-Resolution PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `diwali-rangoli-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast("Rangoli design downloaded as PNG! 🎨", "success");
  };

  // Save to Local Profile
  const handleSaveToProfile = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    const newArt = {
      id: `rangoli-${Date.now()}`,
      dataUrl,
      symmetry,
      date: new Date().toLocaleDateString(),
    };
    setSavedRangolis((prev) => [newArt, ...prev]);
    showToast("Rangoli artwork saved to your Diwali Profile! 💾", "festive");
  };

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Geometry & Powder Art</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Digital Rangoli Creator Studio 🎨
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            Draw mesmerizing symmetrical rangoli patterns with authentic festive powder colors. Choose 4-fold, 8-fold, or 12-fold symmetry to watch your simple strokes transform into majestic mandalas.
          </p>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Side Panel (4 cols) */}
          <div className="lg:col-span-4 bg-[#241039]/90 border border-[#F5C75E]/30 rounded-2xl p-6 shadow-xl space-y-6">
            
            {/* Symmetrical Mode */}
            <div>
              <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-2">
                Symmetry Engine
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 1, label: 'Free' },
                  { value: 4, label: '4-Way' },
                  { value: 8, label: '8-Way' },
                  { value: 12, label: '12-Way' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setSymmetry(item.value)}
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      symmetry === item.value
                        ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E] shadow-[0_0_10px_rgba(245,199,94,0.4)]'
                        : 'bg-[#160B26] text-[#FFF4DD]/80 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rangoli Traditional Color Palette */}
            <div>
              <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-2">
                Festive Powder Color ({selectedColor})
              </label>
              <div className="grid grid-cols-4 gap-3">
                {RANGOLI_COLORS.map((c) => {
                  const isSelected = selectedColor === c.hex && !isEraser;
                  return (
                    <button
                      key={c.hex}
                      onClick={() => {
                        setSelectedColor(c.hex);
                        setIsEraser(false);
                      }}
                      title={c.name}
                      className={`h-11 rounded-xl transition border-2 flex items-center justify-center cursor-pointer ${
                        isSelected ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && (
                        <span className={`text-xs font-black ${c.hex === '#FFFFFF' || c.hex === '#F5C75E' ? 'text-black' : 'text-white'}`}>
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brush Size & Tool Mode */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#F5C75E] uppercase tracking-wider mb-2">
                <span>Brush Stroke Size</span>
                <span>{brushSize}px</span>
              </div>
              <input
                type="range"
                min="2"
                max="24"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full accent-[#F5C75E] cursor-pointer"
              />
            </div>

            {/* Tools (Brush vs Eraser & Guidelines) */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsEraser(false)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 cursor-pointer ${
                  !isEraser
                    ? 'bg-[#160B26] border-[#F5C75E] text-[#F5C75E]'
                    : 'bg-black/30 border-white/10 text-[#FFF4DD]/60 hover:text-white'
                }`}
              >
                <Brush className="w-3.5 h-3.5" />
                <span>Rangoli Brush</span>
              </button>

              <button
                onClick={() => setIsEraser(true)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 cursor-pointer ${
                  isEraser
                    ? 'bg-[#160B26] border-[#F5C75E] text-[#F5C75E]'
                    : 'bg-black/30 border-white/10 text-[#FFF4DD]/60 hover:text-white'
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Eraser</span>
              </button>
            </div>

            {/* Emblems Stamps */}
            <div>
              <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-2">
                Center Emblem Stamps
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => addStamp('diya')}
                  className="py-1.5 rounded-lg bg-[#160B26] border border-[#F5C75E]/30 text-xs font-medium hover:bg-[#241039]"
                >
                  🪔 Diya
                </button>
                <button
                  onClick={() => addStamp('flower')}
                  className="py-1.5 rounded-lg bg-[#160B26] border border-[#F5C75E]/30 text-xs font-medium hover:bg-[#241039]"
                >
                  🌸 Lotus
                </button>
                <button
                  onClick={() => addStamp('om')}
                  className="py-1.5 rounded-lg bg-[#160B26] border border-[#F5C75E]/30 text-xs font-medium hover:bg-[#241039]"
                >
                  ॐ Sacred
                </button>
              </div>
            </div>

            {/* Quick Actions (Undo, Redo, Clear) */}
            <div className="pt-2 border-t border-[#F5C75E]/20 flex items-center justify-between gap-2">
              <button
                onClick={handleUndo}
                disabled={historyStep <= 0}
                className="p-2.5 rounded-xl bg-[#160B26] border border-white/20 text-[#FFF4DD] disabled:opacity-30 hover:border-[#F5C75E] transition"
                title="Undo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyStep >= history.length - 1}
                className="p-2.5 rounded-xl bg-[#160B26] border border-white/20 text-[#FFF4DD] disabled:opacity-30 hover:border-[#F5C75E] transition"
                title="Redo"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleClear}
                className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition"
                title="Clear Canvas"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowGuide(!showGuide)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition ${
                  showGuide ? 'bg-[#160B26] border-[#F5C75E] text-[#F5C75E]' : 'border-white/20 text-[#FFF4DD]/60'
                }`}
              >
                Guide Lines
              </button>
            </div>

            {/* Save & Export Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleSaveToProfile}
                className="w-full py-2.5 rounded-xl bg-[#241039] border border-[#F5C75E] text-[#F5C75E] hover:bg-[#160B26] font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save to Diwali Profile</span>
              </button>

              <button
                onClick={handleDownload}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-extrabold text-sm shadow-[0_0_15px_rgba(245,199,94,0.4)] hover:scale-[1.02] active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download High-Res PNG</span>
              </button>
            </div>

          </div>

          {/* Canvas Board (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            <div className="relative w-full max-w-[560px] aspect-square rounded-2xl overflow-hidden border-2 border-[#F5C75E]/40 shadow-2xl gold-glow-box bg-[#160B26] select-none touch-none">
              
              {/* Optional Mandala Visual Guides Overlay */}
              {showGuide && (
                <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
                  <div className="w-[85%] h-[85%] rounded-full border border-dashed border-[#F5C75E]" />
                  <div className="absolute w-[60%] h-[60%] rounded-full border border-dashed border-[#F5C75E]" />
                  <div className="absolute w-[35%] h-[35%] rounded-full border border-dashed border-[#F5C75E]" />
                  <div className="absolute w-full h-[1px] bg-[#F5C75E]/60" />
                  <div className="absolute h-full w-[1px] bg-[#F5C75E]/60" />
                  <div className="absolute w-full h-[1px] bg-[#F5C75E]/40 rotate-45" />
                  <div className="absolute w-full h-[1px] bg-[#F5C75E]/40 -rotate-45" />
                </div>
              )}

              {/* Drawing Canvas */}
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full cursor-crosshair block"
              />

              {/* Gentle watermarking */}
              <div className="absolute bottom-3 right-3 text-[10px] text-[#F5C75E]/40 font-serif-heading pointer-events-none">
                Diwali Magic ✨ Rangoli
              </div>
            </div>

            <p className="text-xs text-[#FFF4DD]/60 mt-4 text-center">
              💡 Tip: Touch or click and draw smooth curved swirls outwards from the center to create gorgeous floral petals!
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

