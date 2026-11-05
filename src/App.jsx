import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FireworksIntro from './components/FireworksIntro';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import DiyaStudio from './pages/DiyaStudio';
import FireworksArena from './pages/FireworksArena';
import WishesStudio from './pages/WishesStudio';
import RangoliStudio from './pages/RangoliStudio';
import Planner from './pages/Planner';
import PujaGuide from './pages/PujaGuide';
import Recipes from './pages/Recipes';
import Games from './pages/Games';
import LanternDesigner from './pages/LanternDesigner';
import HomeDesigner from './pages/HomeDesigner';
import MemoryWall from './pages/MemoryWall';
import Gifts from './pages/Gifts';
import GreenDiwali from './pages/GreenDiwali';
import DiwaliHistory from './pages/DiwaliHistory';
import Profile from './pages/Profile';

function MainAppContent() {
  const { hasCompletedIntro, setHasCompletedIntro } = useApp();
  // By default, show fireworks intro upon entry to deliver the breathtaking welcome experience
  const [showIntro, setShowIntro] = useState(() => {
    // Show intro on first entry
    return !sessionStorage.getItem('diwali_intro_watched');
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('diwali_intro_watched', 'true');
    setHasCompletedIntro(true);
  };

  const handleOpenIntroManually = () => {
    setShowIntro(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#160B26] text-[#FFF4DD]">
      {/* 1. Spectacular Automatic Fireworks Intro */}
      {showIntro && (
        <FireworksIntro onComplete={handleIntroComplete} />
      )}

      {/* Global Navigation Bar */}
      <Navbar onOpenFireworksIntro={handleOpenIntroManually} />

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onOpenFireworksIntro={handleOpenIntroManually} />} />
          <Route path="/diya-studio" element={<DiyaStudio />} />
          <Route path="/fireworks-arena" element={<FireworksArena />} />
          <Route path="/wishes-studio" element={<WishesStudio />} />
          <Route path="/rangoli-studio" element={<RangoliStudio />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/puja-guide" element={<PujaGuide />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/games" element={<Games />} />
          <Route path="/lantern-designer" element={<LanternDesigner />} />
          <Route path="/home-designer" element={<HomeDesigner />} />
          <Route path="/memory-wall" element={<MemoryWall />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/green-diwali" element={<GreenDiwali />} />
          <Route path="/traditions" element={<DiwaliHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Responsive Footer */}
      <Footer />

      {/* Toast Notification Container */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <MainAppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
