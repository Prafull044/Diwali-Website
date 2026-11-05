import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  DollarSign,
  Sparkles,
  Heart,
  Users,
  Home,
  Utensils,
  Leaf,
  Clock,
  Layers,
  ShoppingBag
} from 'lucide-react';

const CELEBRATION_STYLES = [
  { id: 'family', label: 'Grand Family Reunion', icon: Users, desc: 'Warm multigenerational gatherings, traditional meals, and gift exchanges.' },
  { id: 'traditional', label: 'Spiritual & Vedic Rituals', icon: Sparkles, desc: 'Sacred pujas, chanting, 108 diya lighting, and authentic sweets.' },
  { id: 'eco', label: 'Eco-Friendly Green Diwali', icon: Leaf, desc: 'Handmade clay diyas, zero-chemical rangolis, and community trees.' },
  { id: 'friends', label: 'Festive Friends Soirée', icon: Heart, desc: 'Card games, music, finger foods, and joyful lantern releases.' },
  { id: 'decor', label: 'Home Aesthetics & Lights', icon: Home, desc: 'Fairy lights, marigold floral torans, and vibrant floor kolams.' },
  { id: 'food', label: 'Culinary Sweets & Feasts', icon: Utensils, desc: 'Authentic mithai making, snacks, farsan, and royal family feasts.' },
];

const DEFAULT_SCHEDULE = [
  { day: 'Day 1: Dhanteras', date: 'Auspicious Wealth & Health', desc: 'Clean homes, purchase brass/silver or utensils, light 13 diyas at dusk for Yama Deepam.' },
  { day: 'Day 2: Naraka Chaturdashi / Choti Diwali', date: 'Victory Over Darkness', desc: 'Pre-dawn Abhyanga Snan oil bath, Ubtan application, and decorating doorways with fresh rangoli.' },
  { day: 'Day 3: Lakshmi Puja (Main Diwali)', date: 'The Grand Night of Lights', desc: 'Evening Lakshmi & Ganesha puja, lighting earthen diyas in every room, family feast, and sharing sweets.' },
  { day: 'Day 4: Govardhan Puja / Padwa', date: 'Honor Mother Earth & Nature', desc: 'Annakut offerings (56 food items), celebrating the husband-wife bond, and greeting neighbors.' },
  { day: 'Day 5: Bhai Dooj / Bhau Beej', date: 'Sibling Love & Protection', desc: 'Sisters apply vermillion tilak to brothers, pray for their longevity, and exchange heartfelt gifts.' },
];

export default function Planner() {
  const { plannerState, setPlannerState, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('checklists'); // 'checklists', 'schedule', 'budget'
  const [newBudgetCategory, setNewBudgetCategory] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState('');
  const [customItemText, setCustomItemText] = useState('');
  const [customCategory, setCustomCategory] = useState('Preparation');

  const defaultTasks = {
    'Prep-1': { id: 'Prep-1', cat: 'Preparation', text: 'Deep clean living room, prayer room, and balconies' },
    'Prep-2': { id: 'Prep-2', cat: 'Preparation', text: 'Inspect and untangle electric fairy lights and cables' },
    'Prep-3': { id: 'Prep-3', cat: 'Preparation', text: 'Prepare traditional brass and silver puja utensils' },
    'Shop-1': { id: 'Shop-1', cat: 'Shopping', text: 'Buy handcrafted earthen clay diyas and cotton wicks (Batti)' },
    'Shop-2': { id: 'Shop-2', cat: 'Shopping', text: 'Purchase organic rangoli colors and fresh marigold flowers' },
    'Shop-3': { id: 'Shop-3', cat: 'Shopping', text: 'Stock dry fruits (Almonds, Cashews, Pistachios) for gifting' },
    'Shop-4': { id: 'Shop-4', cat: 'Shopping', text: 'Purchase sesame oil or pure ghee for lighting holy lamps' },
    'Decor-1': { id: 'Decor-1', cat: 'Decoration', text: 'Hang fresh mango leaf and marigold flower torans at doorway' },
    'Decor-2': { id: 'Decor-2', cat: 'Decoration', text: 'Create an intricate entrance rangoli with lotus motifs' },
    'Decor-3': { id: 'Decor-3', cat: 'Decoration', text: 'Suspend traditional colorful Akash Kandil (lantern) on balcony' },
    'Puja-1': { id: 'Puja-1', cat: 'Puja', text: 'Arrange Lakshmi-Ganesha murti with red cloth and raw rice' },
    'Puja-2': { id: 'Puja-2', cat: 'Puja', text: 'Set up panchamrit, kumkum, betel leaves, and silver coin' },
    'Puja-3': { id: 'Puja-3', cat: 'Puja', text: 'Prepare Aarti thali with camphor (Kapur) and scented flowers' },
  };

  const tasks = { ...defaultTasks, ...(plannerState.customTasks || {}) };
  const completedTasks = plannerState.tasks || {};

  const toggleTask = (id) => {
    const nextCompleted = { ...completedTasks, [id]: !completedTasks[id] };
    setPlannerState((prev) => ({
      ...prev,
      tasks: nextCompleted,
    }));
    showToast(nextCompleted[id] ? "Task marked completed! ✅" : "Task unchecked", "info");
  };

  const addCustomTask = (e) => {
    e.preventDefault();
    if (!customItemText.trim()) return;
    const id = `custom-${Date.now()}`;
    const newTask = { id, cat: customCategory, text: customItemText.trim() };

    setPlannerState((prev) => ({
      ...prev,
      customTasks: { ...(prev.customTasks || {}), [id]: newTask },
    }));
    setCustomItemText('');
    showToast("New checklist task added! 📝", "success");
  };

  const handleStyleChange = (styleId) => {
    setPlannerState((prev) => ({ ...prev, style: styleId }));
    showToast("Celebration style preferences updated! ✨", "festive");
  };

  // Budget Items
  const budgetItems = plannerState.budgetItems || [
    { id: 'b1', name: 'Puja Samagri & Diyas', budgeted: 2500, spent: 1800 },
    { id: 'b2', name: 'Mithai & Dry Fruits', budgeted: 4500, spent: 3200 },
    { id: 'b3', name: 'Festive Clothing & Gifts', budgeted: 8000, spent: 7500 },
    { id: 'b4', name: 'Home Decoration & Torans', budgeted: 3000, spent: 2400 },
  ];

  const totalBudgeted = budgetItems.reduce((acc, curr) => acc + curr.budgeted, 0);
  const totalSpent = budgetItems.reduce((acc, curr) => acc + curr.spent, 0);

  const addBudgetItem = (e) => {
    e.preventDefault();
    if (!newBudgetCategory || !newBudgetAmount) return;
    const item = {
      id: `b-${Date.now()}`,
      name: newBudgetCategory,
      budgeted: parseFloat(newBudgetAmount),
      spent: 0,
    };
    setPlannerState((prev) => ({
      ...prev,
      budgetItems: [...(prev.budgetItems || budgetItems), item],
    }));
    setNewBudgetCategory('');
    setNewBudgetAmount('');
    showToast("Budget allocation added! 💰", "success");
  };

  const updateSpent = (id, spentAmount) => {
    const updated = (plannerState.budgetItems || budgetItems).map((b) =>
      b.id === id ? { ...b, spent: parseFloat(spentAmount) || 0 } : b
    );
    setPlannerState((prev) => ({ ...prev, budgetItems: updated }));
  };

  const categories = ['Preparation', 'Shopping', 'Decoration', 'Puja'];

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Festival Coordination & Budgets</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Diwali Celebration Planner 📋
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            Personalize your festival journey with tailored preparation checklists, 5-day traditional schedules, and interactive budget tracking.
          </p>
        </div>

        {/* Celebration Style Selector */}
        <div className="mb-10 bg-[#241039]/80 border border-[#F5C75E]/30 rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-semibold text-[#F5C75E] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>What type of celebration do you prefer?</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CELEBRATION_STYLES.map((st) => {
              const IconComp = st.icon;
              const isSelected = plannerState.style === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => handleStyleChange(st.id)}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#160B26] border-[#F5C75E] shadow-[0_0_12px_rgba(245,199,94,0.3)]'
                      : 'bg-black/20 border-white/10 hover:border-white/30'
                  }`}
                >
                  <IconComp className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#F5C75E]' : 'text-amber-300/70'}`} />
                  <div>
                    <h4 className="text-xs font-bold text-[#FFF4DD]">{st.label}</h4>
                    <span className="text-[10px] text-[#FFF4DD]/60 line-clamp-2 mt-0.5">{st.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs: Checklists vs 5-Day Schedule vs Budget */}
        <div className="flex border-b border-[#F5C75E]/20 mb-8">
          {[
            { id: 'checklists', label: 'Festival Checklists', icon: CalendarCheck },
            { id: 'schedule', label: '5-Day Festival Schedule', icon: Clock },
            { id: 'budget', label: 'Budget & Expense Tracker', icon: DollarSign },
          ].map((tab) => {
            const IconC = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-5 text-sm font-bold border-b-2 flex items-center gap-2 transition cursor-pointer ${
                  isActive
                    ? 'border-[#F5C75E] text-[#F5C75E]'
                    : 'border-transparent text-[#FFF4DD]/60 hover:text-[#FFF4DD]'
                }`}
              >
                <IconC className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Checklists */}
        {activeTab === 'checklists' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat) => {
                const catTasks = Object.values(tasks).filter((t) => t.cat === cat);
                return (
                  <div key={cat} className="bg-[#241039]/80 border border-[#F5C75E]/30 rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F5C75E]/20">
                      <h4 className="font-serif-heading font-bold text-lg text-[#F5C75E]">
                        {cat} Checklist
                      </h4>
                      <span className="text-xs text-[#FFF4DD]/60">
                        {catTasks.filter((t) => completedTasks[t.id]).length} / {catTasks.length} done
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {catTasks.map((t) => {
                        const isDone = !!completedTasks[t.id];
                        return (
                          <div
                            key={t.id}
                            onClick={() => toggleTask(t.id)}
                            className={`p-3 rounded-xl border flex items-center gap-3 transition cursor-pointer select-none ${
                              isDone
                                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                : 'bg-[#160B26] border-white/10 text-[#FFF4DD] hover:border-[#F5C75E]/40'
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-[#F5C75E]/60 shrink-0" />
                            )}
                            <span className={`text-xs sm:text-sm font-medium ${isDone ? 'line-through opacity-70' : ''}`}>
                              {t.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Custom Item */}
            <form onSubmit={addCustomTask} className="p-4 rounded-2xl bg-[#241039]/60 border border-[#F5C75E]/20 flex flex-col sm:flex-row gap-3">
              <select
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3 py-2 text-xs text-[#FFF4DD] focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Add your own custom festival checklist item..."
                value={customItemText}
                onChange={(e) => setCustomItemText(e.target.value)}
                className="flex-1 bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E]"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#F5C75E] text-[#160B26] font-bold text-xs sm:text-sm hover:bg-amber-400 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: 5-Day Festival Schedule */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            {DEFAULT_SCHEDULE.map((sch, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#241039]/80 border border-[#F5C75E]/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#F5C75E] transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#F28C28] to-[#F5C75E] text-[#160B26] flex items-center justify-center font-royal font-black text-lg shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-serif-heading font-bold text-lg text-[#F5C75E]">
                      {sch.day}
                    </h4>
                    <span className="text-xs text-amber-200/80 font-medium">{sch.date}</span>
                    <p className="text-xs sm:text-sm text-[#FFF4DD]/80 mt-1 leading-relaxed">
                      {sch.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Budget & Expense Tracker */}
        {activeTab === 'budget' && (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#241039] border border-[#F5C75E]/30">
                <span className="text-xs uppercase tracking-wider text-[#FFF4DD]/70">Total Budget</span>
                <span className="block text-3xl font-black font-royal text-[#F5C75E] mt-1">₹{totalBudgeted.toLocaleString()}</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#241039] border border-[#F5C75E]/30">
                <span className="text-xs uppercase tracking-wider text-[#FFF4DD]/70">Total Spent</span>
                <span className="block text-3xl font-black font-royal text-[#F28C28] mt-1">₹{totalSpent.toLocaleString()}</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#241039] border border-[#F5C75E]/30">
                <span className="text-xs uppercase tracking-wider text-[#FFF4DD]/70">Remaining Balance</span>
                <span className={`block text-3xl font-black font-royal mt-1 ${totalBudgeted - totalSpent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ₹{(totalBudgeted - totalSpent).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Budget Breakdown Table */}
            <div className="bg-[#241039]/80 border border-[#F5C75E]/30 rounded-2xl p-6 shadow-xl">
              <h3 className="font-serif-heading font-bold text-lg text-[#F5C75E] mb-4">
                Expense Categories & Allocations
              </h3>
              <div className="space-y-4">
                {(plannerState.budgetItems || budgetItems).map((item) => {
                  const percent = Math.min(Math.round((item.spent / (item.budgeted || 1)) * 100), 100);
                  return (
                    <div key={item.id} className="p-4 rounded-xl bg-[#160B26] border border-white/10 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="font-bold text-sm text-[#FFF4DD]">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#FFF4DD]/60">Budget: ₹{item.budgeted}</span>
                          <span className="text-xs text-amber-300 font-semibold">Spent:</span>
                          <input
                            type="number"
                            value={item.spent}
                            onChange={(e) => updateSpent(item.id, e.target.value)}
                            className="w-24 bg-[#241039] border border-[#F5C75E]/40 rounded-lg px-2 py-1 text-xs text-[#FFF4DD] focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="w-full bg-[#241039] h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#F5C75E] to-[#F28C28] transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Category */}
              <form onSubmit={addBudgetItem} className="mt-6 flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#F5C75E]/20">
                <input
                  type="text"
                  placeholder="New category name (e.g. Dry fruits, Firecrackers)..."
                  value={newBudgetCategory}
                  onChange={(e) => setNewBudgetCategory(e.target.value)}
                  className="flex-1 bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3.5 py-2 text-xs text-[#FFF4DD]"
                />
                <input
                  type="number"
                  placeholder="Budget ₹"
                  value={newBudgetAmount}
                  onChange={(e) => setNewBudgetAmount(e.target.value)}
                  className="w-36 bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-3.5 py-2 text-xs text-[#FFF4DD]"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F5C75E] text-[#160B26] font-bold text-xs hover:bg-amber-400 transition cursor-pointer"
                >
                  Add Budget
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

