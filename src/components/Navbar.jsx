import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp, AVAILABLE_THEMES } from '../context/AppContext';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Music,
  Globe,
  Menu,
  X,
  Heart,
  Palette,
  Flame,
  Bomb,
  BookOpen,
  Gift,
  Leaf,
  CalendarCheck,
  Gamepad2,
  Image as ImageIcon,
  Home,
  User,
  Coffee,
  SunMedium,
  Paintbrush
} from 'lucide-react';

export default function Navbar({ onOpenFireworksIntro }) {
  const {
    t,
    language,
    setLanguage,
    theme,
    setTheme,
    soundEnabled,
    toggleSound,
    ambientPlaying,
    handleToggleAmbient,
    sessionDiyaCount
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t.nav.home, icon: Home },
    { to: '/diya-studio', label: t.nav.diyaStudio, icon: Flame },
    { to: '/fireworks-arena', label: t.nav.fireworks, icon: Bomb },
    { to: '/wishes-studio', label: t.nav.wishes, icon: Heart },
    { to: '/rangoli-studio', label: t.nav.rangoli, icon: Palette },
    { to: '/planner', label: t.nav.planner, icon: CalendarCheck },
    { to: '/puja-guide', label: t.nav.puja, icon: SunMedium },
    { to: '/recipes', label: t.nav.recipes, icon: Coffee },
    { to: '/games', label: t.nav.games, icon: Gamepad2 },
    { to: '/lantern-designer', label: t.nav.lanterns, icon: Sparkles },
    { to: '/home-designer', label: t.nav.homeDecor, icon: ImageIcon },
    { to: '/memory-wall', label: t.nav.memoryWall, icon: BookOpen },
    { to: '/gifts', label: t.nav.gifts, icon: Gift },
    { to: '/green-diwali', label: t.nav.greenDiwali, icon: Leaf },
    { to: '/profile', label: t.nav.profile, icon: User },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#160B26]/95 backdrop-blur-md border-b border-[#F5C75E]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F28C28] to-[#F5C75E] p-0.5 shadow-[0_0_15px_rgba(245,199,94,0.4)] group-hover:scale-105 transition">
              <div className="w-full h-full bg-[#241039] rounded-[10px] flex items-center justify-center text-xl">
                🪔
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-royal text-xl sm:text-2xl font-bold tracking-tight text-[#F5C75E] gold-glow leading-none">
                {t.brand}
              </span>
              <span className="text-[10px] text-[#FFF4DD]/60 tracking-widest uppercase">
                Festival Platform
              </span>
            </div>
          </Link>

          {/* Desktop Main Nav (Featured primary items) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                location.pathname === '/'
                  ? 'bg-[#241039] text-[#F5C75E] border border-[#F5C75E]/40'
                  : 'text-[#FFF4DD]/80 hover:text-[#F5C75E] hover:bg-[#241039]/50'
              }`}
            >
              {t.nav.home}
            </Link>

            <Link
              to="/diya-studio"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition ${
                location.pathname === '/diya-studio'
                  ? 'bg-[#241039] text-[#F5C75E] border border-[#F5C75E]/40'
                  : 'text-[#FFF4DD]/80 hover:text-[#F5C75E] hover:bg-[#241039]/50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>{t.nav.diyaStudio}</span>
              {sessionDiyaCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#F28C28] text-white text-[10px] font-bold rounded-full">
                  {sessionDiyaCount}
                </span>
              )}
            </Link>

            <Link
              to="/fireworks-arena"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition ${
                location.pathname === '/fireworks-arena'
                  ? 'bg-[#241039] text-[#F5C75E] border border-[#F5C75E]/40'
                  : 'text-[#FFF4DD]/80 hover:text-[#F5C75E] hover:bg-[#241039]/50'
              }`}
            >
              <Bomb className="w-3.5 h-3.5 text-[#F5C75E]" />
              <span>{t.nav.fireworks}</span>
            </Link>

            <Link
              to="/wishes-studio"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition ${
                location.pathname === '/wishes-studio'
                  ? 'bg-[#241039] text-[#F5C75E] border border-[#F5C75E]/40'
                  : 'text-[#FFF4DD]/80 hover:text-[#F5C75E] hover:bg-[#241039]/50'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.nav.wishes}</span>
            </Link>

            <Link
              to="/rangoli-studio"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition ${
                location.pathname === '/rangoli-studio'
                  ? 'bg-[#241039] text-[#F5C75E] border border-[#F5C75E]/40'
                  : 'text-[#FFF4DD]/80 hover:text-[#F5C75E] hover:bg-[#241039]/50'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.nav.rangoli}</span>
            </Link>

            <Link
              to="/games"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition ${
                location.pathname === '/games'
                  ? 'bg-[#241039] text-[#F5C75E] border border-[#F5C75E]/40'
                  : 'text-[#FFF4DD]/80 hover:text-[#F5C75E] hover:bg-[#241039]/50'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.nav.games}</span>
            </Link>

            <Link
              to="/profile"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition ${
                location.pathname === '/profile'
                  ? 'bg-[#241039] text-[#F5C75E] border border-[#F5C75E]/40'
                  : 'text-[#FFF4DD]/80 hover:text-[#F5C75E] hover:bg-[#241039]/50'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#F5C75E]" />
              <span>{t.nav.profile}</span>
            </Link>
          </nav>

          {/* Right Action Controls: Intro Replay, Music, Sound, Language */}
          <div className="flex items-center gap-2">
            {/* Replay Intro fireworks button */}
            {onOpenFireworksIntro && (
              <button
                onClick={onOpenFireworksIntro}
                title="Watch Fireworks Intro"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#241039] border border-[#F5C75E]/30 text-xs font-medium text-[#F5C75E] hover:border-[#F5C75E] transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F5C75E]" />
                <span className="hidden md:inline">Intro Show</span>
              </button>
            )}

            {/* Ambient Festive Music Toggle */}
            <button
              onClick={handleToggleAmbient}
              title={ambientPlaying ? "Pause Festive Music" : "Play Festive Indian Ambient Music"}
              className={`p-2 rounded-lg border transition ${
                ambientPlaying
                  ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E] shadow-[0_0_10px_rgba(245,199,94,0.5)]'
                  : 'bg-[#241039] text-[#FFF4DD]/80 border-[#F5C75E]/30 hover:text-[#F5C75E]'
              }`}
            >
              <Music className="w-4 h-4" />
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
              className="p-2 rounded-lg bg-[#241039] border border-[#F5C75E]/30 text-[#FFF4DD]/80 hover:text-[#F5C75E] transition cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#F5C75E]" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-400" />
              )}
            </button>

            {/* Festive Color Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setThemeMenuOpen(!themeMenuOpen);
                  setLangMenuOpen(false);
                }}
                title="Change Website Color Combination"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#241039] border border-[#F5C75E]/40 text-xs font-semibold text-[#F5C75E] hover:border-[#F5C75E] transition cursor-pointer shadow-sm"
              >
                <Paintbrush className="w-3.5 h-3.5 text-[#F5C75E]" />
                <span className="hidden sm:inline">Theme</span>
              </button>

              {themeMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#241039] border border-[#F5C75E]/50 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-[#F5C75E]/20 text-[10px] font-bold uppercase tracking-wider text-[#F5C75E]">
                    Festive Color Combination
                  </div>
                  {AVAILABLE_THEMES.map((th) => {
                    const isSelected = theme === th.id;
                    return (
                      <button
                        key={th.id}
                        onClick={() => {
                          setTheme(th.id);
                          setThemeMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium transition flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'text-[#F5C75E] bg-[#160B26]'
                            : 'text-[#FFF4DD]/80 hover:bg-[#160B26]/70 hover:text-[#F5C75E]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/50"
                              style={{ backgroundColor: th.primaryDot }}
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/50"
                              style={{ backgroundColor: th.accentDot }}
                            />
                          </div>
                          <div>
                            <span className="font-bold block">{th.name}</span>
                            <span className="text-[10px] text-[#FFF4DD]/60 block">{th.desc}</span>
                          </div>
                        </div>
                        {isSelected && <span className="text-[#F5C75E] font-bold">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#241039] border border-[#F5C75E]/30 text-xs font-medium text-[#FFF4DD] hover:border-[#F5C75E] transition"
              >
                <Globe className="w-3.5 h-3.5 text-[#F5C75E]" />
                <span className="uppercase">{language}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-[#241039] border border-[#F5C75E]/40 shadow-2xl py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium transition flex items-center justify-between ${
                        language === l.code
                          ? 'text-[#F5C75E] bg-[#160B26]'
                          : 'text-[#FFF4DD]/80 hover:bg-[#160B26]/60 hover:text-[#F5C75E]'
                      }`}
                    >
                      <span>{l.label}</span>
                      {language === l.code && <span className="text-[#F5C75E]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-lg bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#160B26] border-b border-[#F5C75E]/20 px-4 pt-2 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Mobile Theme Switcher */}
          <div className="p-3 rounded-2xl bg-[#241039] border border-[#F5C75E]/30">
            <span className="text-[10px] uppercase font-bold text-[#F5C75E] tracking-wider block mb-2">
              Color Palette:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_THEMES.map((th) => (
                <button
                  key={th.id}
                  onClick={() => {
                    setTheme(th.id);
                  }}
                  className={`p-2 rounded-xl text-left border text-xs font-semibold flex items-center gap-2 ${
                    theme === th.id
                      ? 'bg-[#160B26] border-[#F5C75E] text-[#F5C75E]'
                      : 'border-white/10 text-[#FFF4DD]/70'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: th.accentDot }}
                  />
                  <span className="truncate">{th.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((item) => {
              const IconComp = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition ${
                    isActive
                      ? 'bg-[#241039] text-[#F5C75E] border border-[#F5C75E]/40'
                      : 'text-[#FFF4DD]/80 hover:bg-[#241039]/60 hover:text-[#F5C75E]'
                  }`}
                >
                  <IconComp className="w-4 h-4 text-[#F5C75E]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

