import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { playBellSound, playDiyaLightSound, playSparkleSound } from '../utils/soundEffects';
import {
  SunMedium,
  CheckCircle2,
  Circle,
  Bell,
  Flame,
  Flower2,
  Sparkles,
  BookOpen,
  Volume2,
  Award
} from 'lucide-react';

const PUJA_STEPS = [
  {
    step: 1,
    title: 'Pavitrikaran (Sanctification & Self-Purification)',
    shloka: 'ॐ अपवित्रः पवित्रो वा सर्वावस्थां गतोऽपि वा। यः स्मरेत्पुण्डरीकाक्षं स बाह्याभ्यन्तरः शुचिः॥',
    meaning: 'Whether pure or impure, whoever remembers the lotus-eyed Lord attains inner and outer purity.',
    instruction: 'Sprinkle Gangajal (holy water) over yourself and the prayer altar with a flower or mango leaf.',
  },
  {
    step: 2,
    title: 'Ganesha Dhyan & Avahana (Invocating Lord Ganesha)',
    shloka: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    meaning: 'O Lord with the curved trunk and immense aura radiant as ten million suns, remove all obstacles from our endeavors forever.',
    instruction: 'Apply tilak of red vermillion (Sindoor) to Lord Ganesha and offer fresh Durva grass and modak.',
  },
  {
    step: 3,
    title: 'Maha Lakshmi Avahana (Welcoming Goddess of Wealth & Light)',
    shloka: 'ॐ महालक्ष्म्यै च विद्महे विष्णुपत्न्यै च धीमहि। तन्नो लक्ष्मीः प्रचोदयात्॥',
    meaning: 'May we contemplate the great Goddess Lakshmi, the consort of Lord Vishnu. May that radiant Goddess inspire our intellect.',
    instruction: 'Spread clean red cloth on wooden chauki, place silver or brass murtis, and offer lotus or marigold blossoms with devotion.',
  },
  {
    step: 4,
    title: 'Chandan, Kumkum & Akshata Samarpana',
    shloka: 'ॐ अक्षताश्च सुरश्रेष्ठ कुङ्कुमाक्ताः सुशोभिताः। मया निवेदिता भक्त्या गृहाण परमेश्वर॥',
    meaning: 'These unbroken holy grains of rice coated in auspicious vermillion are offered with utmost devotion.',
    instruction: 'Anoint the idols with pure sandalwood paste (Chandan) and offer unbroken rice grains (Akshat).',
  },
  {
    step: 5,
    title: 'Deepa Darshanam & Naivedya (Light & Sacred Sweets Offering)',
    shloka: 'शुभं करोति कल्याणं आरोग्यं धनसंपदाम्। शत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तु ते॥',
    meaning: 'Salutations to the light of the lamp that brings auspiciousness, health, prosperity, and destroys dark thoughts.',
    instruction: 'Light the primary panchamukhi brass lamp with pure cow ghee. Offer fresh batasha, laddoos, fruits, and kheer.',
  },
  {
    step: 6,
    title: 'Maha Lakshmi Aarti & Pushpanjali (Grand Aarti)',
    shloka: 'ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता। तुमको निसदिन सेवत, हर विष्णु विधाता॥',
    meaning: 'Glory to Mother Lakshmi, who is revered perpetually by Lord Vishnu and the cosmic creators.',
    instruction: 'Wave the illuminated Aarti thali in circular clockwise devotion while ringing the sacred bell.',
  },
];

const SAMAGRI_LIST = [
  'Lakshmi & Ganesha Murtis or Idols',
  'Red & Yellow Silk Altar Cloth',
  'Pure Cow Ghee or Sesame Oil',
  'Cotton Wicks (Gol and Lambi Batti)',
  'Earthen Clay Diyas & Brass Thali',
  'Gangajal (Holy Water) & Kalash',
  'Fresh Marigolds & Red Lotus Flowers',
  'Kumkum, Haldi, Chandan & Abir',
  'Akshat (Unbroken White Rice Grains)',
  'Dhoop Sticks & Camphor (Kapur)',
  'Betel Leaves (Paan) & Supari',
  'Bhog / Prasad (Batasha, Ladoo, Fruits)',
  'Silver or Brass Coins for Lakshmi',
];

export default function PujaGuide() {
  const { showToast } = useApp();
  const [activeStep, setActiveStep] = useState(1);
  const [samagriChecked, setSamagriChecked] = useState({});

  // Digital Thali Interactive State
  const [isThaliDiyaLit, setIsThaliDiyaLit] = useState(true);
  const [flowerShowerCount, setFlowerShowerCount] = useState(0);
  const [offeredPrasad, setOfferedPrasad] = useState(false);
  const [offeredWater, setOfferedWater] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);

  const toggleSamagri = (index) => {
    setSamagriChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleRingBell = () => {
    playBellSound();
    setBellRinging(true);
    showToast("Sacred temple bell rung! 🔔", "festive");
    setTimeout(() => setBellRinging(false), 800);
  };

  const handleOfferFlowers = () => {
    playSparkleSound();
    setFlowerShowerCount((c) => c + 1);
    showToast("Offered fresh fragrant blossoms to deities! 🌸", "festive");
  };

  const handleOfferPrasad = () => {
    setOfferedPrasad(true);
    playSparkleSound();
    showToast("Offered holy Naivedya (Bhog) prasad! 🍬", "success");
  };

  const handleOfferWater = () => {
    setOfferedWater(true);
    playSparkleSound();
    showToast("Offered holy Gangajal purification! 💧", "success");
  };

  const handleToggleThaliDiya = () => {
    setIsThaliDiyaLit(!isThaliDiyaLit);
    if (!isThaliDiyaLit) playDiyaLightSound();
    showToast(isThaliDiyaLit ? "Thali diya extinguished" : "Aarti flame kindled! 🪔", "info");
  };

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <SunMedium className="w-3.5 h-3.5" />
            <span>Spiritual Vedic Traditions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Virtual Lakshmi-Ganesha Puja Guide 🙏
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            A respectful, authentic guide to the sacred Diwali evening puja. Follow the chronological Vidhi, recite consecrated mantras, and participate in the interactive Digital Puja Thali.
          </p>
        </div>

        {/* INTERACTIVE DIGITAL PUJA THALI */}
        <div className="mb-14 bg-gradient-to-b from-[#241039] via-[#1E0B36] to-[#120621] border-2 border-[#F5C75E]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center gold-glow-box">
          <div className="max-w-xl mx-auto mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#F5C75E] mb-1">
              Interactive Digital Puja Thali
            </h2>
            <p className="text-xs text-[#FFF4DD]/70">
              Engage with sacred offerings: Ring the temple bell, shower floral petals, offer holy water, and kindle the aarti flame.
            </p>
          </div>

          {/* Golden Thali Plate Representation */}
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 mx-auto rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F5C75E] to-[#E5A93B] p-3 shadow-2xl border-4 border-[#F28C28]/80 flex items-center justify-center">
            
            {/* Inner Brass Rim */}
            <div className="w-full h-full rounded-full bg-[#2A0E3D] border-4 border-amber-300/60 p-4 relative flex items-center justify-center shadow-inner overflow-hidden">
              
              {/* Central Sacred Swastika / Om */}
              <div className="text-3xl font-royal text-[#F5C75E]/40 select-none pointer-events-none">
                卐
              </div>

              {/* Central Aarti Diya */}
              <div
                onClick={handleToggleThaliDiya}
                className="absolute z-20 cursor-pointer hover:scale-110 transition active:scale-95"
                title="Click to toggle flame"
              >
                <div className="text-4xl relative">
                  {isThaliDiyaLit && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl animate-flame">
                      🔥
                    </span>
                  )}
                  🪔
                </div>
              </div>

              {/* Thali Items arranged in circle */}
              {/* 1. Kumkum Bowl */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center" title="Kumkum">
                <div className="w-7 h-7 rounded-full bg-rose-600 border border-amber-300 shadow mx-auto" />
                <span className="text-[9px] text-[#F5C75E]">Kumkum</span>
              </div>

              {/* 2. Chandan */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center" title="Chandan">
                <div className="w-7 h-7 rounded-full bg-amber-200 border border-amber-400 shadow mx-auto" />
                <span className="text-[9px] text-[#F5C75E]">Chandan</span>
              </div>

              {/* 3. Sweets Prasad */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-center" title="Modak Prasad">
                <span className="text-xl block">🍬</span>
                <span className="text-[9px] text-[#F5C75E]">{offeredPrasad ? 'Offered' : 'Prasad'}</span>
              </div>

              {/* 4. Kalash Water */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-center" title="Gangajal">
                <span className="text-xl block">🏺</span>
                <span className="text-[9px] text-[#F5C75E]">{offeredWater ? 'Purified' : 'Jal'}</span>
              </div>

              {/* Showered Flower Petals Overlay */}
              {flowerShowerCount > 0 && (
                <div className="absolute inset-0 pointer-events-none flex flex-wrap items-center justify-around p-4 opacity-80 animate-pulse">
                  {[...Array(Math.min(flowerShowerCount * 3, 15))].map((_, idx) => (
                    <span key={idx} className="text-lg">🌸</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Puja Control Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRingBell}
              className={`px-4 py-2.5 rounded-xl border font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                bellRinging
                  ? 'bg-amber-400 text-[#160B26] border-amber-300 scale-105'
                  : 'bg-[#160B26] border-[#F5C75E]/40 text-[#F5C75E] hover:bg-[#241039]'
              }`}
            >
              <Bell className="w-4 h-4 text-[#F5C75E]" />
              <span>Ring Temple Bell 🔔</span>
            </button>

            <button
              onClick={handleOfferFlowers}
              className="px-4 py-2.5 rounded-xl bg-[#160B26] border border-[#F5C75E]/40 text-[#F5C75E] hover:bg-[#241039] font-bold text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <Flower2 className="w-4 h-4 text-pink-400" />
              <span>Shower Flowers ({flowerShowerCount}) 🌸</span>
            </button>

            <button
              onClick={handleOfferPrasad}
              className="px-4 py-2.5 rounded-xl bg-[#160B26] border border-[#F5C75E]/40 text-[#F5C75E] hover:bg-[#241039] font-bold text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <span>Offer Bhog Prasad 🍬</span>
            </button>

            <button
              onClick={handleOfferWater}
              className="px-4 py-2.5 rounded-xl bg-[#160B26] border border-[#F5C75E]/40 text-[#F5C75E] hover:bg-[#241039] font-bold text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <span>Offer Gangajal 💧</span>
            </button>
          </div>
        </div>

        {/* STEP-BY-STEP PUJA VIDHI & SAMAGRI GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Chronological Vidhi (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-[#F5C75E] flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>Chronological Puja Vidhi & Mantras</span>
            </h3>

            <div className="space-y-4">
              {PUJA_STEPS.map((s) => (
                <div
                  key={s.step}
                  className={`p-6 rounded-2xl border transition ${
                    activeStep === s.step
                      ? 'bg-[#241039] border-[#F5C75E] shadow-xl'
                      : 'bg-[#160B26] border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#160B26] text-[#F5C75E] border border-[#F5C75E]/30 text-xs font-bold">
                      Step {s.step}
                    </span>
                    <button
                      onClick={() => setActiveStep(s.step)}
                      className="text-xs text-amber-300 font-semibold hover:underline"
                    >
                      {activeStep === s.step ? 'Active Ritual' : 'Focus Step'}
                    </button>
                  </div>

                  <h4 className="font-serif-heading font-bold text-lg text-[#FFF4DD] mb-2">
                    {s.title}
                  </h4>

                  {/* Sacred Sanskrit Shloka */}
                  <div className="p-4 rounded-xl bg-[#160B26]/80 border border-[#F5C75E]/20 my-3 text-center">
                    <p className="font-festive text-base sm:text-lg text-[#F5C75E] leading-relaxed">
                      {s.shloka}
                    </p>
                    <p className="text-xs text-[#FFF4DD]/70 italic mt-2">
                      Translation: "{s.meaning}"
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#FFF4DD]/85 leading-relaxed">
                    <span className="font-bold text-[#F28C28]">Ritual Action: </span>
                    {s.instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Puja Samagri Checklist (4 cols) */}
          <div className="lg:col-span-4 bg-[#241039]/90 border border-[#F5C75E]/30 rounded-2xl p-6 shadow-xl sticky top-24">
            <div className="pb-4 mb-4 border-b border-[#F5C75E]/20 flex items-center justify-between">
              <h4 className="font-serif-heading font-bold text-lg text-[#F5C75E]">
                Puja Samagri Checklist
              </h4>
              <span className="text-xs text-[#FFF4DD]/60">
                {Object.values(samagriChecked).filter(Boolean).length}/{SAMAGRI_LIST.length}
              </span>
            </div>

            <p className="text-xs text-[#FFF4DD]/70 mb-4">
              Tick items as you gather them for the auspicious evening worship.
            </p>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {SAMAGRI_LIST.map((item, idx) => {
                const checked = !!samagriChecked[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleSamagri(idx)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition cursor-pointer select-none text-xs ${
                      checked
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : 'bg-[#160B26] border-white/10 text-[#FFF4DD] hover:border-[#F5C75E]/30'
                    }`}
                  >
                    {checked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#F5C75E]/60 shrink-0" />
                    )}
                    <span className={checked ? 'line-through opacity-70' : ''}>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

