import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Heart,
  Plus,
  Upload,
  Sparkles,
  Calendar,
  User,
  Filter,
  Image as ImageIcon,
  Flame,
  X
} from 'lucide-react';

export default function MemoryWall() {
  const { memories, setMemories, showToast } = useApp();

  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('Tradition');
  const [newCaption, setNewCaption] = useState('');
  const [newImage, setNewImage] = useState(null);

  const categories = ['All', 'Tradition', 'Art', 'Food', 'Family', 'Lights'];

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaption.trim()) {
      showToast("Please provide both a title and caption for your memory.", "error");
      return;
    }

    const memoryItem = {
      id: `mem-${Date.now()}`,
      title: newTitle.trim(),
      author: newAuthor.trim() || 'Festive Friend',
      category: newCategory,
      caption: newCaption.trim(),
      date: new Date().toISOString().split('T')[0],
      likes: 1,
      image: newImage,
      isLocalUserEntry: true,
    };

    setMemories([memoryItem, ...memories]);
    setShowAddModal(false);
    setNewTitle('');
    setNewAuthor('');
    setNewCaption('');
    setNewImage(null);
    showToast("Memory pinned to the Diwali Wall! 🪔", "festive");
  };

  const handleLike = (id) => {
    setMemories(
      memories.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
    showToast("Sent festive love! ❤️", "success");
  };

  const filteredMemories = memories.filter((m) =>
    filterCategory === 'All' ? true : m.category === filterCategory
  );

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Shared Moments & Festive Stories</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Diwali Memory Wall 📜
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            Share cherished snapshots, family traditions, and heartfelt moments of celebration. Preserved locally in your browser storage for instant recall.
          </p>

          {/* Honest architectural notice as per requirement */}
          <div className="mt-4 inline-block px-4 py-1.5 rounded-xl bg-[#241039] border border-[#F5C75E]/30 text-[11px] text-[#FFF4DD]/70">
            ℹ️ <span className="text-[#F5C75E] font-semibold">Local Storage Demo:</span> Your memories are safely stored on this device. Backend multi-user cloud sync can be connected seamlessly in the future.
          </div>
        </div>

        {/* Filter and Add Bar */}
        <div className="bg-[#241039]/80 border border-[#F5C75E]/30 rounded-2xl p-4 sm:p-6 mb-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition whitespace-nowrap cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E]'
                    : 'bg-[#160B26] text-[#FFF4DD]/70 border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-xs sm:text-sm shadow hover:scale-105 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post a Diwali Memory</span>
          </button>
        </div>

        {/* Memories Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((item) => (
            <div
              key={item.id}
              className="bg-[#241039]/85 border border-[#F5C75E]/30 rounded-2xl overflow-hidden shadow-xl hover:border-[#F5C75E] transition flex flex-col justify-between"
            >
              <div>
                {/* Image if available or decorative banner */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover border-b border-[#F5C75E]/20"
                  />
                ) : (
                  <div className="h-32 bg-gradient-to-br from-[#160B26] via-[#3C125E] to-[#160B26] flex items-center justify-center text-4xl border-b border-[#F5C75E]/20">
                    🪔
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#160B26] border border-[#F5C75E]/30 text-[10px] font-bold text-[#F5C75E]">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-[#FFF4DD]/50">{item.date}</span>
                  </div>

                  <h3 className="font-serif-heading font-bold text-lg text-[#FFF4DD] mb-2 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#FFF4DD]/80 leading-relaxed mb-4">
                    "{item.caption}"
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-2 border-t border-[#F5C75E]/15 flex items-center justify-between">
                <span className="text-xs text-[#FFF4DD]/60 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#F5C75E]" />
                  <span>{item.author}</span>
                </span>

                <button
                  onClick={() => handleLike(item.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#160B26] border border-rose-500/30 text-rose-300 hover:bg-rose-950/40 text-xs font-semibold transition cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                  <span>{item.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Add New Memory */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#241039] border border-[#F5C75E]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative gold-glow-box">
              
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#160B26] text-[#FFF4DD] hover:border-[#F5C75E]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-royal text-2xl font-bold text-[#F5C75E] mb-4">
                Share a Diwali Memory 🪔
              </h3>

              <form onSubmit={handleAddMemory} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1">
                    Memory Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Making Gulab Jamuns with Grandmom"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3.5 py-2 text-xs text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Riya Verma"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3.5 py-2 text-xs text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3 py-2 text-xs text-[#FFF4DD] focus:outline-none"
                    >
                      {categories.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1">
                    Heartfelt Story / Caption
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about this special moment..."
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl p-3 text-xs text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E]"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-1">
                    Upload Photo (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-xs text-[#FFF4DD]/70 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#160B26] file:text-[#F5C75E]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl border border-white/20 text-xs hover:border-white/40"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-xs hover:scale-105 transition"
                  >
                    Post Memory ✨
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

