import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Heart,
  Sparkles,
  Flame,
  Palette,
  Image as ImageIcon,
  Award,
  Trophy,
  Trash2,
  Download,
  Edit2,
  Check,
  RotateCcw
} from 'lucide-react';

const AVATAR_OPTIONS = ['🪔', '👑', '🌸', '🎆', '🐘', '🪷', '✨', '🍬'];

export default function Profile() {
  const {
    profile,
    setProfile,
    litDiyas,
    sessionDiyaCount,
    savedGreetings,
    setSavedGreetings,
    savedRangolis,
    setSavedRangolis,
    savedLanterns,
    setSavedLanterns,
    favoriteRecipes,
    ecoChallenges,
    gameScores,
    showToast,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name || 'Festive Friend');
  const [editAvatar, setEditAvatar] = useState(profile.avatar || '🪔');
  const [editCity, setEditCity] = useState(profile.city || 'New Delhi');
  const [editBio, setEditBio] = useState(profile.bio || 'Lighting up happiness!');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({
      ...profile,
      name: editName.trim() || 'Festive Friend',
      avatar: editAvatar,
      city: editCity.trim(),
      bio: editBio.trim(),
    });
    setIsEditing(false);
    showToast("Festive profile updated! 🌟", "success");
  };

  const handleClearAllData = () => {
    if (window.confirm("Are you sure you want to reset your saved Diwali creations and progress?")) {
      setSavedGreetings([]);
      setSavedRangolis([]);
      setSavedLanterns([]);
      showToast("Personal creations reset.", "info");
    }
  };

  const ecoCompletedCount = Object.values(ecoChallenges).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Profile Summary Card */}
        <div className="bg-gradient-to-r from-[#241039] via-[#1E0B36] to-[#241039] border-2 border-[#F5C75E]/40 rounded-3xl p-6 sm:p-10 shadow-2xl mb-12 gold-glow-box">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#F28C28] to-[#F5C75E] p-1 shadow-lg">
                <div className="w-full h-full bg-[#160B26] rounded-[14px] flex items-center justify-center text-5xl">
                  {profile.avatar || '🪔'}
                </div>
              </div>

              {/* Bio & Details */}
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="font-royal text-2xl sm:text-4xl font-bold text-[#F5C75E]">
                    {profile.name}
                  </h1>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#160B26] border border-[#F5C75E]/30 text-amber-300">
                    {profile.city || 'India'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#FFF4DD]/80 max-w-md">
                  {profile.bio}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-[#F5C75E]">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#F28C28]" />
                    <span>{litDiyas.length + sessionDiyaCount} Diyas Lit</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{ecoCompletedCount} Eco Badges</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-300" />
                    <span>Best Trivia: {gameScores.triviaBest || 0}/5</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-xl bg-[#160B26] border border-[#F5C75E]/40 text-xs font-semibold text-[#F5C75E] hover:bg-[#241039] transition flex items-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? "Cancel Edit" : "Edit Profile"}</span>
              </button>
            </div>

          </div>

          {/* Edit Form Drawer */}
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="mt-8 pt-6 border-t border-[#F5C75E]/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1">
                  Choose Avatar Icon
                </label>
                <div className="flex gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => setEditAvatar(av)}
                      className={`w-10 h-10 rounded-xl text-xl border transition ${
                        editAvatar === av ? 'bg-[#F5C75E] border-white scale-110' : 'bg-[#160B26] border-white/10'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1">
                  Your Festive Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3 py-2 text-xs text-[#FFF4DD]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3 py-2 text-xs text-[#FFF4DD]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1">
                  Festive Motto / Bio
                </label>
                <input
                  type="text"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3 py-2 text-xs text-[#FFF4DD]"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#F5C75E] text-[#160B26] font-bold text-xs hover:bg-amber-400 transition"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}
        </div>

        {/* SAVED CREATIONS SECTIONS */}
        <div className="space-y-12">
          
          {/* 1. Saved Greeting Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-heading font-bold text-2xl text-[#F5C75E] flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-rose-400" />
                <span>My Saved Greeting Cards ({savedGreetings.length})</span>
              </h3>
            </div>

            {savedGreetings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {savedGreetings.map((card) => (
                  <div key={card.id} className="p-4 rounded-2xl bg-[#241039]/80 border border-[#F5C75E]/30 shadow-lg">
                    {card.dataUrl && (
                      <img src={card.dataUrl} alt="Greeting Card" className="w-full h-44 object-cover rounded-xl mb-3 border border-white/10" />
                    )}
                    <h4 className="font-bold text-xs text-[#F5C75E] truncate">To: {card.receiver}</h4>
                    <p className="text-[10px] text-[#FFF4DD]/60 mb-3 truncate">By: {card.sender}</p>
                    <a
                      href={card.dataUrl}
                      download={`diwali-greeting-${card.id}.png`}
                      className="w-full py-1.5 rounded-lg bg-[#160B26] border border-[#F5C75E]/30 text-xs font-semibold text-[#F5C75E] hover:bg-[#241039] transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#241039]/50 border border-dashed border-white/20 text-center text-xs text-[#FFF4DD]/60">
                You haven't saved any greeting cards yet. Head over to the Greeting Studio to create your first one! 💌
              </div>
            )}
          </div>

          {/* 2. Saved Rangolis */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-heading font-bold text-2xl text-[#F5C75E] flex items-center gap-2">
                <Palette className="w-5 h-5 text-emerald-400" />
                <span>My Rangoli Artworks ({savedRangolis.length})</span>
              </h3>
            </div>

            {savedRangolis.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {savedRangolis.map((art) => (
                  <div key={art.id} className="p-3 rounded-2xl bg-[#241039]/80 border border-[#F5C75E]/30 shadow-lg text-center">
                    <img src={art.dataUrl} alt="Rangoli" className="w-full aspect-square object-cover rounded-xl mb-2 border border-white/10" />
                    <span className="text-[10px] text-amber-200 block mb-2">{art.symmetry}-Way Symmetry</span>
                    <a
                      href={art.dataUrl}
                      download={`rangoli-${art.id}.png`}
                      className="w-full py-1.5 rounded-lg bg-[#160B26] border border-[#F5C75E]/30 text-xs font-semibold text-[#F5C75E] hover:bg-[#241039] transition flex items-center justify-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save PNG</span>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#241039]/50 border border-dashed border-white/20 text-center text-xs text-[#FFF4DD]/60">
                No rangoli artwork created yet. Experiment with radial symmetry in the Rangoli Creator Studio! 🎨
              </div>
            )}
          </div>

          {/* 3. Saved Lanterns */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-heading font-bold text-2xl text-[#F5C75E] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F28C28]" />
                <span>My Akash Kandils ({savedLanterns.length})</span>
              </h3>
            </div>

            {savedLanterns.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {savedLanterns.map((l) => (
                  <div key={l.id} className="p-3 rounded-2xl bg-[#241039]/80 border border-[#F5C75E]/30 shadow-lg text-center">
                    <img src={l.dataUrl} alt="Lantern" className="w-full h-44 object-cover rounded-xl mb-2 border border-white/10" />
                    <span className="text-[10px] text-amber-200 block mb-2 truncate">"{l.text}"</span>
                    <a
                      href={l.dataUrl}
                      download={`lantern-${l.id}.png`}
                      className="w-full py-1.5 rounded-lg bg-[#160B26] border border-[#F5C75E]/30 text-xs font-semibold text-[#F5C75E] hover:bg-[#241039] transition flex items-center justify-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save PNG</span>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#241039]/50 border border-dashed border-white/20 text-center text-xs text-[#FFF4DD]/60">
                No digital lanterns designed yet. Design your traditional Akash Kandil in the Lantern Designer! 🏮
              </div>
            )}
          </div>

          {/* Data Management */}
          <div className="pt-8 border-t border-[#F5C75E]/20 flex items-center justify-between">
            <span className="text-xs text-[#FFF4DD]/60">
              Data is saved locally in your browser storage.
            </span>
            <button
              onClick={handleClearAllData}
              className="px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-bold hover:bg-rose-900 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Saved Creations</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

