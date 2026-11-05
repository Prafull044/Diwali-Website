import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TRANSLATIONS } from '../data/translations';
import { setMuted, getMuted, toggleAmbientMusic, isAmbientMusicActive } from '../utils/soundEffects';

export const AVAILABLE_THEMES = [
  { id: 'crimson-gold', name: 'Shahi Crimson & Gold', desc: 'शाही सिन्दूर व सुवर्ण', primaryDot: '#991B1B', accentDot: '#FFD25A' },
  { id: 'peacock-navy', name: 'Midnight Peacock & Gold', desc: 'मयूर नील व सुवर्ण', primaryDot: '#0F2042', accentDot: '#FFD166' },
  { id: 'saffron-amber', name: 'Vedic Saffron & Amber', desc: 'केसरिया व जाफरानी', primaryDot: '#4D1D08', accentDot: '#FFC043' },
  { id: 'emerald-marigold', name: 'Royal Emerald & Marigold', desc: 'पन्ना व गेंदा', primaryDot: '#0B3B24', accentDot: '#F9C74F' },
  { id: 'royal-purple', name: 'Classic Purple & Gold', desc: 'शाही बैंगनी व सुवर्ण', primaryDot: '#241039', accentDot: '#F5C75E' },
];

const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('diwali_lang', 'en');
  const [theme, setTheme] = useLocalStorage('diwali_theme', 'crimson-gold');
  const [soundEnabled, setSoundEnabled] = useLocalStorage('diwali_sound_enabled', true);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [hasCompletedIntro, setHasCompletedIntro] = useLocalStorage('diwali_intro_seen', false);

  // Apply theme attribute to root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // User Profile
  const [profile, setProfile] = useLocalStorage('diwali_profile', {
    name: 'Festive Friend',
    avatar: '🪔',
    city: 'New Delhi',
    bio: 'Celebrating lights, sweets, and happiness!',
  });

  // Lit Diyas
  const [litDiyas, setLitDiyas] = useLocalStorage('diwali_lit_diyas', []);
  const [sessionDiyaCount, setSessionDiyaCount] = useState(0);

  // Saved Creations
  const [savedGreetings, setSavedGreetings] = useLocalStorage('diwali_saved_greetings', []);
  const [savedRangolis, setSavedRangolis] = useLocalStorage('diwali_saved_rangolis', []);
  const [savedLanterns, setSavedLanterns] = useLocalStorage('diwali_saved_lanterns', []);

  // Planner
  const [plannerState, setPlannerState] = useLocalStorage('diwali_planner', {
    style: 'traditional',
    tasks: {},
    customBudget: 15000,
    budgetSpent: 4200,
  });

  // Eco Challenge
  const [ecoChallenges, setEcoChallenges] = useLocalStorage('diwali_eco_challenges', {});

  // Recipes & Favorites
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('diwali_fav_recipes', ['kaju-katli', 'besan-ladoo']);

  // Memories
  const [memories, setMemories] = useLocalStorage('diwali_memories', [
    {
      id: 'mem-1',
      title: 'Grand Family Diya Lighting',
      caption: 'Lighting 108 earthen diyas with the grandparents on the verandah.',
      author: 'Aarav Sharma',
      date: '2026-11-04',
      likes: 18,
      category: 'Tradition',
      image: null,
    },
    {
      id: 'mem-2',
      title: 'Our First Symmetrical Rangoli',
      caption: 'Took 3 hours with marigold flowers and rice flour, turned out magical!',
      author: 'Priya & Sneha',
      date: '2026-11-05',
      likes: 24,
      category: 'Art',
      image: null,
    }
  ]);

  // Game Scores
  const [gameScores, setGameScores] = useLocalStorage('diwali_game_scores', {
    triviaBest: 0,
    memoryMatches: 0,
    wordsSolved: 0,
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  useEffect(() => {
    setMuted(!soundEnabled);
  }, [soundEnabled]);

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    setMuted(!nextVal);
    showToast(nextVal ? "Sound effects enabled 🔔" : "Sound effects muted 🔇", "info");
  };

  const handleToggleAmbient = () => {
    const active = toggleAmbientMusic();
    setAmbientPlaying(active);
    showToast(active ? "Festive ambient music playing 🎵" : "Ambient music paused ⏸️", "info");
  };

  const handleSetTheme = (newThemeId) => {
    setTheme(newThemeId);
    const th = AVAILABLE_THEMES.find((t) => t.id === newThemeId);
    showToast(`Color combination changed to ${th ? th.name : newThemeId} 🎨`, "festive");
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const lightDiya = (diyaData) => {
    const newDiya = {
      id: `diya-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      ...diyaData,
    };
    setLitDiyas((prev) => [newDiya, ...prev]);
    setSessionDiyaCount((c) => c + 1);
    return newDiya;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme: handleSetTheme,
        t,
        soundEnabled,
        toggleSound,
        ambientPlaying,
        handleToggleAmbient,
        hasCompletedIntro,
        setHasCompletedIntro,
        profile,
        setProfile,
        litDiyas,
        sessionDiyaCount,
        lightDiya,
        savedGreetings,
        setSavedGreetings,
        savedRangolis,
        setSavedRangolis,
        savedLanterns,
        setSavedLanterns,
        plannerState,
        setPlannerState,
        ecoChallenges,
        setEcoChallenges,
        favoriteRecipes,
        setFavoriteRecipes,
        memories,
        setMemories,
        gameScores,
        setGameScores,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
