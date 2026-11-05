import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RECIPES_DATA } from '../data/recipesData';
import {
  Coffee,
  Heart,
  Clock,
  Users,
  Search,
  Sparkles,
  BookOpen,
  X,
  ChefHat,
  Check
} from 'lucide-react';

export default function Recipes() {
  const { favoriteRecipes, setFavoriteRecipes, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // all, sweet, savory
  const [activeRecipeModal, setActiveRecipeModal] = useState(null);

  const toggleFavorite = (recipeId) => {
    if (favoriteRecipes.includes(recipeId)) {
      setFavoriteRecipes(favoriteRecipes.filter((id) => id !== recipeId));
      showToast("Removed from favorite recipes 💔", "info");
    } else {
      setFavoriteRecipes([...favoriteRecipes, recipeId]);
      showToast("Added to your Diwali Favorites! ❤️", "festive");
    }
  };

  const filteredRecipes = RECIPES_DATA.filter((recipe) => {
    const matchesCategory =
      selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Traditional Festive Faral & Mithai</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Diwali Sweets & Faral Delights 🍬
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            Handcrafted traditional Indian festival recipes from royal cashew katli to crunchy spiral chaklis. Celebrate the sweetest memories with authentic flavor.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-[#241039]/80 border border-[#F5C75E]/30 rounded-2xl p-4 sm:p-6 mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#F5C75E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sweets, chakli, ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Delicacies' },
              { id: 'sweet', label: 'Mithai & Sweets 🍯' },
              { id: 'savory', label: 'Crispy Farsan / Faral 🌀' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E] shadow-[0_0_12px_rgba(245,199,94,0.35)]'
                    : 'bg-[#160B26] text-[#FFF4DD]/70 border-white/10 hover:border-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => {
            const isFav = favoriteRecipes.includes(recipe.id);
            return (
              <div
                key={recipe.id}
                className="bg-[#241039]/85 border border-[#F5C75E]/30 rounded-2xl overflow-hidden shadow-xl hover:border-[#F5C75E] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Recipe Visual Header Card */}
                  <div className="relative h-44 bg-gradient-to-tr from-[#160B26] via-[#2A1042] to-[#160B26] flex items-center justify-center p-6 border-b border-[#F5C75E]/20">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {recipe.icon}
                    </span>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(recipe.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border transition cursor-pointer ${
                        isFav
                          ? 'bg-rose-500/90 text-white border-rose-400 shadow-md'
                          : 'bg-black/40 text-white/70 border-white/20 hover:text-rose-400'
                      }`}
                      title={isFav ? "Remove from favorites" : "Save to favorites"}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    {/* Region Pill */}
                    <span className="absolute bottom-3 left-4 px-2.5 py-0.5 rounded-full bg-black/60 border border-amber-400/30 text-[10px] font-semibold text-amber-200 uppercase tracking-widest">
                      {recipe.region}
                    </span>
                  </div>

                  {/* Body Details */}
                  <div className="p-6">
                    <h3 className="font-serif-heading font-bold text-xl text-[#F5C75E] mb-2 leading-tight">
                      {recipe.name}
                    </h3>
                    <p className="text-xs text-[#FFF4DD]/70 line-clamp-2 mb-4 leading-relaxed">
                      {recipe.desc}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#F5C75E]/15 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-[#FFF4DD]/50 block">Prep Time</span>
                        <span className="font-semibold text-[#FFF4DD] flex items-center justify-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-[#F5C75E]" />
                          {recipe.prepTime}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#FFF4DD]/50 block">Cook Time</span>
                        <span className="font-semibold text-[#FFF4DD] flex items-center justify-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-[#F28C28]" />
                          {recipe.cookTime}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#FFF4DD]/50 block">Servings</span>
                        <span className="font-semibold text-[#FFF4DD] flex items-center justify-center gap-1 mt-0.5">
                          <Users className="w-3 h-3 text-[#F5C75E]" />
                          {recipe.servings}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setActiveRecipeModal(recipe)}
                    className="w-full py-2.5 rounded-xl bg-[#160B26] border border-[#F5C75E]/40 text-[#F5C75E] hover:bg-[#F5C75E] hover:text-[#160B26] font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>View Cooking Steps & Ingredients</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recipe Detail Full Modal */}
        {activeRecipeModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#241039] border border-[#F5C75E]/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative gold-glow-box">
              
              <button
                onClick={() => setActiveRecipeModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#160B26] border border-white/20 text-[#FFF4DD] hover:border-[#F5C75E]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{activeRecipeModal.icon}</span>
                <div>
                  <h3 className="font-royal text-2xl font-bold text-[#F5C75E]">
                    {activeRecipeModal.name}
                  </h3>
                  <span className="text-xs text-amber-300 font-medium">
                    {activeRecipeModal.region} • {activeRecipeModal.difficulty}
                  </span>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="mb-6">
                <h4 className="font-serif-heading font-bold text-base text-[#F5C75E] uppercase tracking-wider mb-2">
                  Ingredients Required:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#160B26] p-4 rounded-xl border border-white/10">
                  {activeRecipeModal.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#FFF4DD]/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5C75E]" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h4 className="font-serif-heading font-bold text-base text-[#F5C75E] uppercase tracking-wider mb-3">
                  Step-by-Step Cooking Method:
                </h4>
                <div className="space-y-3">
                  {activeRecipeModal.instructions.map((step, idx) => (
                    <div key={idx} className="flex gap-3 text-xs sm:text-sm text-[#FFF4DD]/90 leading-relaxed bg-[#160B26]/50 p-3.5 rounded-xl border border-white/5">
                      <span className="w-6 h-6 rounded-full bg-[#F5C75E] text-[#160B26] font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setActiveRecipeModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#F5C75E] text-[#160B26] font-bold text-sm hover:bg-amber-400 transition"
                >
                  Close Recipe
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

