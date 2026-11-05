import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { GREETING_CATEGORIES, MESSAGE_STYLES, WISH_TEMPLATES } from '../data/wishes';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  Download,
  Share2,
  MessageCircle,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  Type,
  Palette,
  Eye,
  Trash2,
  Heart
} from 'lucide-react';

const CARD_TEMPLATES = [
  {
    id: 'royal-purple',
    name: 'Shahi Royal Purple & Gold',
    bgStart: '#241039',
    bgEnd: '#120621',
    borderColor: '#F5C75E',
    textColor: '#FFF4DD',
    accentColor: '#F5C75E',
  },
  {
    id: 'crimson-sindoor',
    name: 'Auspicious Crimson Sindoor',
    bgStart: '#7F1D1D',
    bgEnd: '#360909',
    borderColor: '#F5C75E',
    textColor: '#FFFBEB',
    accentColor: '#FBBF24',
  },
  {
    id: 'midnight-fireworks',
    name: 'Midnight Black & Golden Glow',
    bgStart: '#0D0714',
    bgEnd: '#000000',
    borderColor: '#F28C28',
    textColor: '#FFF4DD',
    accentColor: '#F5C75E',
  },
  {
    id: 'marigold-amber',
    name: 'Festive Marigold Sunset',
    bgStart: '#78350F',
    bgEnd: '#2E1065',
    borderColor: '#FDE047',
    textColor: '#FFFDF5',
    accentColor: '#F59E0B',
  },
];

export default function WishesStudio() {
  const { showToast, setSavedGreetings } = useApp();
  const canvasRef = useRef(null);

  // Workflow State
  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Category, 3: Wishes, 4: Photo, 5: Card Style, 6: Preview & Share
  const [senderName, setSenderName] = useState('Priya Sharma');
  const [receiverName, setReceiverName] = useState('Sharma Family');
  const [category, setCategory] = useState('family');
  const [messageStyle, setMessageStyle] = useState('traditional');
  const [greetingMessage, setGreetingMessage] = useState(
    WISH_TEMPLATES.family.traditional
  );

  // Photo State
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoScale, setPhotoScale] = useState(1);
  const [photoOffset, setPhotoOffset] = useState({ x: 0, y: 0 });

  // Customization
  const [selectedTemplate, setSelectedTemplate] = useState('royal-purple');
  const [bannerHeader, setBannerHeader] = useState('SHUBH DEEPAWALI');
  const [showDiyasOnCard, setShowDiyasOnCard] = useState(true);
  const [showMarigolds, setShowMarigolds] = useState(true);

  // UI state
  const [copiedText, setCopiedText] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-update message when category or message style changes
  useEffect(() => {
    const defaultTemplate =
      WISH_TEMPLATES[category]?.[messageStyle] ||
      WISH_TEMPLATES.family.traditional;
    setGreetingMessage(defaultTemplate);
  }, [category, messageStyle]);

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) {
      showToast("Please select a valid image file (JPG, PNG, or WebP)", "error");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      showToast("Photo size exceeds 8MB. Please choose a smaller file.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoUrl(event.target.result);
      showToast("Photo uploaded successfully! 📸", "success");
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoUrl(null);
    setPhotoScale(1);
    setPhotoOffset({ x: 0, y: 0 });
    showToast("Photo removed", "info");
  };

  // Render high-res greeting card on Canvas
  const drawCardOnCanvas = (targetCanvas, forExport = false) => {
    if (!targetCanvas) return;
    const ctx = targetCanvas.getContext('2d');
    const width = 800;
    const height = 1000;
    targetCanvas.width = width;
    targetCanvas.height = height;

    const tpl =
      CARD_TEMPLATES.find((t) => t.id === selectedTemplate) ||
      CARD_TEMPLATES[0];

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, tpl.bgStart);
    bgGrad.addColorStop(1, tpl.bgEnd);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle background festive sparkle particles
    ctx.fillStyle = 'rgba(245, 199, 94, 0.15)';
    for (let i = 0; i < 40; i++) {
      const rx = (i * 137.5) % width;
      const ry = (i * 243.2) % height;
      ctx.beginPath();
      ctx.arc(rx, ry, (i % 3) + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Ornate Golden Borders
    ctx.strokeStyle = tpl.borderColor;
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = 'rgba(245, 199, 94, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(44, 44, width - 88, height - 88);

    // Decorative corner florets
    const corners = [
      [30, 30],
      [width - 30, 30],
      [30, height - 30],
      [width - 30, height - 30],
    ];
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

    // 3. Header Banners
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px "Outfit", sans-serif';
    ctx.fillStyle = '#F28C28';
    ctx.letterSpacing = '4px';
    ctx.fillText('✨ A FESTIVAL OF LIGHTS CELEBRATION ✨', width / 2, 85);

    ctx.font = 'bold 44px "Cinzel Decorative", serif';
    ctx.fillStyle = tpl.borderColor;
    ctx.fillText(bannerHeader, width / 2, 140);

    // 4. Receiver Tag
    ctx.font = 'italic 24px "Playfair Display", serif';
    ctx.fillStyle = '#FFF4DD';
    ctx.fillText(`Dearest ${receiverName || 'Loved Ones'},`, width / 2, 185);

    // 5. User Uploaded Photo or Festive Illustration
    const photoBoxY = 220;
    const photoBoxH = 360;
    const photoBoxW = 540;
    const photoBoxX = (width - photoBoxW) / 2;

    if (photoUrl) {
      // Photo frame shadow
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillRect(photoBoxX + 6, photoBoxY + 6, photoBoxW, photoBoxH);

      // Photo frame outer border
      ctx.strokeStyle = tpl.borderColor;
      ctx.lineWidth = 4;
      ctx.strokeRect(photoBoxX, photoBoxY, photoBoxW, photoBoxH);

      // Draw user image clipped
      ctx.save();
      ctx.beginPath();
      ctx.rect(photoBoxX + 2, photoBoxY + 2, photoBoxW - 4, photoBoxH - 4);
      ctx.clip();

      const img = new Image();
      img.src = photoUrl;
      if (img.complete) {
        // Draw centered and scaled
        const imgAspect = img.width / img.height;
        const boxAspect = photoBoxW / photoBoxH;
        let dw = photoBoxW * photoScale;
        let dh = photoBoxH * photoScale;
        if (imgAspect > boxAspect) {
          dw = photoBoxH * imgAspect * photoScale;
        } else {
          dh = (photoBoxW / imgAspect) * photoScale;
        }
        const dx = photoBoxX + (photoBoxW - dw) / 2 + photoOffset.x;
        const dy = photoBoxY + (photoBoxH - dh) / 2 + photoOffset.y;
        ctx.drawImage(img, dx, dy, dw, dh);
      }
      ctx.restore();
    } else {
      // Elegant Default Decorative Diya Mandala Artwork
      ctx.fillStyle = 'rgba(36, 16, 57, 0.4)';
      ctx.fillRect(photoBoxX, photoBoxY, photoBoxW, photoBoxH);
      ctx.strokeStyle = 'rgba(245, 199, 94, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(photoBoxX, photoBoxY, photoBoxW, photoBoxH);

      // Central Diya & Auspicious Mandala
      ctx.font = '96px serif';
      ctx.fillText('🪔', width / 2, photoBoxY + 190);

      ctx.font = '22px "Playfair Display", serif';
      ctx.fillStyle = '#F5C75E';
      ctx.fillText('May Your Days Radiate With Light & Joy', width / 2, photoBoxY + 270);
    }

    // 6. Wishes Text (multi-line wrapping)
    ctx.font = '20px "Outfit", sans-serif';
    ctx.fillStyle = tpl.textColor;
    ctx.textAlign = 'center';

    const maxTextWidth = 640;
    const words = greetingMessage.split(' ');
    let line = '';
    let currentY = 640;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTextWidth && n > 0) {
        ctx.fillText(line, width / 2, currentY);
        line = words[n] + ' ';
        currentY += 32;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, width / 2, currentY);

    // 7. Sender Signature
    const sigY = Math.max(currentY + 50, 830);
    ctx.font = 'italic 18px "Playfair Display", serif';
    ctx.fillStyle = '#FFF4DD';
    ctx.fillText('With warmest festive regards & blessings,', width / 2, sigY);

    ctx.font = 'bold 30px "Cinzel Decorative", serif';
    ctx.fillStyle = tpl.accentColor;
    ctx.fillText(`— ${senderName || 'Your Well-Wisher'} —`, width / 2, sigY + 44);

    // 8. Footer Watermark
    ctx.font = '13px "Outfit", sans-serif';
    ctx.fillStyle = 'rgba(245, 199, 94, 0.7)';
    ctx.fillText('✨ Created with Diwali Magic • Festival Platform ✨', width / 2, 940);
  };

  // Redraw preview whenever fields change
  useEffect(() => {
    drawCardOnCanvas(canvasRef.current);
  }, [
    senderName,
    receiverName,
    greetingMessage,
    selectedTemplate,
    photoUrl,
    photoScale,
    photoOffset,
    bannerHeader,
  ]);

  // Download Image
  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    drawCardOnCanvas(canvas, true);

    const link = document.createElement('a');
    link.download = `diwali-greeting-${(receiverName || 'card').toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Also persist card to saved greetings in profile
    const savedCard = {
      id: `card-${Date.now()}`,
      sender: senderName,
      receiver: receiverName,
      message: greetingMessage,
      template: selectedTemplate,
      date: new Date().toLocaleDateString(),
      dataUrl: canvas.toDataURL('image/png'),
    };
    setSavedGreetings((prev) => [savedCard, ...prev]);

    showToast("Greeting card downloaded in high resolution! 💌", "success");
  };

  // WhatsApp Sharing & Web Share API
  const handleWhatsAppShare = async () => {
    const greetingText = `🪔 *Shubh Deepawali!* 🪔\n\nDearest ${receiverName},\n\n${greetingMessage}\n\nWith love and blessings,\n— *${senderName}*\n\n✨ Celebrate the festival with me on Diwali Magic: ${window.location.origin}`;

    // Try Web Share API with image file if supported
    if (navigator.canShare) {
      try {
        const canvas = document.createElement('canvas');
        drawCardOnCanvas(canvas, true);
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'diwali-greeting.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'Diwali Greeting Card ✨',
              text: greetingText,
              files: [file],
            });
            showToast("Shared greeting card directly! 🌟", "success");
            return;
          }
        }, 'image/png');
      } catch (err) {
        // Fallback to text link
      }
    }

    // Direct WhatsApp Web / Mobile URL
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(greetingText)}`;
    window.open(url, '_blank');
    showToast("Opening WhatsApp! Your personalized card is also ready to attach.", "festive");
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(greetingMessage);
    setCopiedText(true);
    showToast("Greeting message copied to clipboard! 📋", "info");
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Card Studio & Photo Customizer</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Personalized Diwali Wishes & Greeting Studio 💌
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            Create exquisite royal Diwali greeting cards featuring your family photos, personalized festive messages, and instant WhatsApp sharing.
          </p>
        </div>

        {/* 7-Step Navigation Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { step: 1, label: 'Details' },
            { step: 2, label: 'Category' },
            { step: 3, label: 'Wishes' },
            { step: 4, label: 'Photo' },
            { step: 5, label: 'Card Theme' },
            { step: 6, label: 'Export & Share' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setCurrentStep(item.step)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                currentStep === item.step
                  ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E] shadow-[0_0_12px_rgba(245,199,94,0.4)]'
                  : currentStep > item.step
                  ? 'bg-[#241039] border-[#F5C75E]/40 text-[#F5C75E]'
                  : 'bg-[#160B26] border-white/10 text-[#FFF4DD]/60'
              }`}
            >
              <span>{item.step}.</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Controls (Step-by-step editor, 5 cols) */}
          <div className="lg:col-span-6 bg-[#241039]/90 border border-[#F5C75E]/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Step 1: Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-serif-heading text-[#F5C75E] flex items-center gap-2">
                  <Type className="w-5 h-5 text-[#F28C28]" />
                  <span>Step 1: Enter Greeting Details</span>
                </h3>
                
                <div>
                  <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1.5">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Aarav & Family"
                    className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1.5">
                    Recipient Name / Group
                  </label>
                  <input
                    type="text"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="e.g. Verma Family / Dearest Rohan"
                    className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1.5">
                    Header Greeting Title
                  </label>
                  <input
                    type="text"
                    value={bannerHeader}
                    onChange={(e) => setBannerHeader(e.target.value)}
                    placeholder="e.g. SHUBH DEEPAWALI"
                    className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E]"
                  />
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-sm shadow transition hover:scale-[1.01]"
                  >
                    Next: Choose Relationship Category →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Relationship Category */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-serif-heading text-[#F5C75E] flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-400" />
                  <span>Step 2: Who is this greeting for?</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {GREETING_CATEGORIES.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setCategory(cat.id);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-[#160B26] border-[#F5C75E] shadow-[0_0_12px_rgba(245,199,94,0.3)]'
                            : 'bg-black/20 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-xs font-bold text-[#FFF4DD]">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="py-2.5 px-4 rounded-xl border border-white/20 text-xs font-semibold hover:border-white/40"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-sm shadow transition hover:scale-[1.01]"
                  >
                    Next: Select & Edit Message →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Wishes Generator */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-serif-heading text-[#F5C75E] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#F5C75E]" />
                  <span>Step 3: Festive Message Tone & Style</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {MESSAGE_STYLES.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setMessageStyle(st.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                        messageStyle === st.id
                          ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E]'
                          : 'bg-[#160B26] text-[#FFF4DD]/80 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider">
                      Personalize Message
                    </label>
                    <button
                      onClick={handleCopyMessage}
                      className="text-xs text-amber-300 flex items-center gap-1 hover:underline"
                    >
                      {copiedText ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedText ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={greetingMessage}
                    onChange={(e) => setGreetingMessage(e.target.value)}
                    className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl p-3 text-xs sm:text-sm text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E] leading-relaxed"
                    maxLength={320}
                  />
                  <span className="text-[10px] text-[#FFF4DD]/50 float-right">
                    {greetingMessage.length}/320 characters
                  </span>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="py-2.5 px-4 rounded-xl border border-white/20 text-xs font-semibold hover:border-white/40"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-sm shadow transition hover:scale-[1.01]"
                  >
                    Next: Add Festive Photo →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Photo Upload & Adjustment */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-serif-heading text-[#F5C75E] flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-emerald-400" />
                  <span>Step 4: Upload Family Photo</span>
                </h3>

                <div className="p-6 border-2 border-dashed border-[#F5C75E]/40 rounded-2xl bg-[#160B26]/60 text-center flex flex-col items-center justify-center">
                  {photoUrl ? (
                    <div className="space-y-3 w-full">
                      <img
                        src={photoUrl}
                        alt="Uploaded preview"
                        className="w-44 h-32 object-cover rounded-xl mx-auto border-2 border-[#F5C75E]"
                      />
                      <div className="flex items-center justify-center gap-3">
                        <label className="px-3 py-1.5 rounded-lg bg-[#241039] border border-[#F5C75E]/30 text-xs font-semibold text-[#F5C75E] hover:border-[#F5C75E] transition cursor-pointer">
                          <span>Replace Photo</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          onClick={removePhoto}
                          className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs font-semibold text-rose-300 hover:bg-rose-900 transition flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>

                      {/* Photo Scale Slider */}
                      <div className="pt-2 text-left max-w-xs mx-auto">
                        <div className="flex justify-between text-xs text-[#F5C75E] mb-1">
                          <span>Zoom Photo</span>
                          <span>{photoScale.toFixed(1)}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.8"
                          max="2.5"
                          step="0.1"
                          value={photoScale}
                          onChange={(e) => setPhotoScale(parseFloat(e.target.value))}
                          className="w-full accent-[#F5C75E]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="w-14 h-14 rounded-full bg-[#241039] border border-[#F5C75E]/30 flex items-center justify-center mx-auto mb-3 text-2xl">
                        📸
                      </div>
                      <p className="text-sm font-semibold text-[#FFF4DD] mb-1">
                        Select a festive photo from your device
                      </p>
                      <p className="text-xs text-[#FFF4DD]/60 mb-4">
                        Supports JPG, PNG, and WebP (up to 8MB)
                      </p>
                      <label className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-xs shadow hover:scale-105 transition cursor-pointer inline-flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        <span>Choose Photo</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="py-2.5 px-4 rounded-xl border border-white/20 text-xs font-semibold hover:border-white/40"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-sm shadow transition hover:scale-[1.01]"
                  >
                    Next: Card Theme & Frames →
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Card Theme Selection */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-serif-heading text-[#F5C75E] flex items-center gap-2">
                  <Palette className="w-5 h-5 text-amber-400" />
                  <span>Step 5: Card Theme & Ornaments</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CARD_TEMPLATES.map((tpl) => {
                    const isSelected = selectedTemplate === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
                          isSelected
                            ? 'border-[#F5C75E] shadow-[0_0_15px_rgba(245,199,94,0.35)]'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${tpl.bgStart}, ${tpl.bgEnd})`,
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded-full border-2 border-white/60 shrink-0"
                          style={{ backgroundColor: tpl.accentColor }}
                        />
                        <span className="text-xs font-bold text-white">{tpl.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="py-2.5 px-4 rounded-xl border border-white/20 text-xs font-semibold hover:border-white/40"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(6)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-sm shadow transition hover:scale-[1.01]"
                  >
                    Next: Final Preview & Share →
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Final Export & WhatsApp Share */}
            {currentStep === 6 && (
              <div className="space-y-5">
                <h3 className="text-xl font-bold font-serif-heading text-[#F5C75E] flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#F5C75E]" />
                  <span>Step 6: Ready to Share & Download</span>
                </h3>

                <p className="text-xs text-[#FFF4DD]/80 leading-relaxed">
                  Your personalized greeting card is rendered in pristine high quality. Share directly to WhatsApp with your friends and family or download the PNG to keep forever.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppShare}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Share Card to WhatsApp</span>
                  </button>

                  <button
                    onClick={handleDownloadImage}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition hover:scale-[1.01] cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download High-Res Card Image</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#160B26] border border-[#F5C75E]/20 text-xs text-[#FFF4DD]/70">
                  💡 <span className="font-semibold text-[#F5C75E]">WhatsApp Tip:</span> When you click Share to WhatsApp, your personalized festive blessing will be pre-filled. You can also download the card image and attach it to your chat!
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="w-full py-2 rounded-xl border border-white/20 text-xs text-[#FFF4DD]/70 hover:text-white"
                  >
                    Start Over / Create Another Card
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Live Interactive Card Preview (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="flex items-center justify-between w-full max-w-[420px] mb-3 px-1">
              <span className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Card Preview</span>
              </span>
              <button
                onClick={handleDownloadImage}
                className="text-xs text-amber-300 hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Quick Save</span>
              </button>
            </div>

            {/* Live Canvas Element */}
            <div className="w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#F5C75E]/50 shadow-2xl gold-glow-box bg-[#160B26]">
              <canvas
                ref={canvasRef}
                className="w-full h-full block object-contain"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

