import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sparkles, Heart, Share2, MessageCircle, Copy, Check } from 'lucide-react';

export default function Footer() {
  const { t, showToast } = useApp();
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    showToast("Website link copied to clipboard! 📋", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent("Celebrate the magic of Diwali with realistic fireworks, virtual diya lighting, rangoli art, and personalized photo greeting cards on Diwali Magic ✨: " + window.location.origin);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <footer className="relative bg-[#10071C] border-t border-[#F5C75E]/20 pt-16 pb-12 overflow-hidden">
      {/* Decorative Golden Arch / Toran Pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F5C75E]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪔</span>
              <span className="font-royal text-2xl font-bold text-[#F5C75E] gold-glow">
                Diwali Magic ✨
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#FFF4DD]/70 leading-relaxed">
              {t.footer.aboutText}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#F5C75E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Light up happiness everywhere</span>
            </div>
          </div>

          {/* Col 2: Experiences */}
          <div>
            <h4 className="font-serif-heading text-base font-semibold text-[#F5C75E] mb-4">
              Celebration Studios
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FFF4DD]/70">
              <li>
                <Link to="/diya-studio" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>🪔</span> {t.nav.diyaStudio}
                </Link>
              </li>
              <li>
                <Link to="/fireworks-arena" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>🎆</span> {t.nav.fireworks}
                </Link>
              </li>
              <li>
                <Link to="/wishes-studio" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>💌</span> {t.nav.wishes}
                </Link>
              </li>
              <li>
                <Link to="/rangoli-studio" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>🎨</span> {t.nav.rangoli}
                </Link>
              </li>
              <li>
                <Link to="/lantern-designer" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>🏮</span> {t.nav.lanterns}
                </Link>
              </li>
              <li>
                <Link to="/home-designer" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>🏡</span> {t.nav.homeDecor}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Traditions & Guides */}
          <div>
            <h4 className="font-serif-heading text-base font-semibold text-[#F5C75E] mb-4">
              Traditions & Planning
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FFF4DD]/70">
              <li>
                <Link to="/puja-guide" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>🙏</span> {t.nav.puja}
                </Link>
              </li>
              <li>
                <Link to="/planner" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>📋</span> {t.nav.planner}
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>🍬</span> {t.nav.recipes}
                </Link>
              </li>
              <li>
                <Link to="/traditions" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>📜</span> {t.nav.traditions}
                </Link>
              </li>
              <li>
                <Link to="/gifts" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>🎁</span> {t.nav.gifts}
                </Link>
              </li>
              <li>
                <Link to="/green-diwali" className="hover:text-[#F5C75E] transition flex items-center gap-1.5">
                  <span>🌱</span> {t.nav.greenDiwali}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Share */}
          <div>
            <h4 className="font-serif-heading text-base font-semibold text-[#F5C75E] mb-4">
              Share the Joy
            </h4>
            <p className="text-xs text-[#FFF4DD]/70 mb-4">
              Share Diwali Magic with your loved ones and invite them to celebrate together.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-medium transition cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241039] border border-[#F5C75E]/40 hover:bg-[#160B26] text-[#FFF4DD] text-xs font-medium transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#F5C75E]" />}
                <span>{copied ? "Copied" : "Copy Link"}</span>
              </button>
            </div>
            <div className="pt-2">
              <Link
                to="/memory-wall"
                className="inline-flex items-center gap-1.5 text-xs text-[#F5C75E] hover:underline"
              >
                <span>Visit the Diwali Memory Wall</span> →
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F5C75E]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF4DD]/50">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#F28C28]">
              <span>Made with</span>
              <Heart className="w-3 h-3 fill-current text-rose-500" />
              <span>for Diwali worldwide</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
