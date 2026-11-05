import React, { useState } from 'react';
import { Gift, Heart, Users, Sparkles, Filter, Check, ShoppingBag, Leaf, Sliders } from 'lucide-react';

const GIFT_SUGGESTIONS = [
  {
    id: 'g-1',
    title: 'Handcrafted Terracotta Diya Set with Herbal Essential Oils',
    category: 'parents',
    budget: '500-1000',
    type: 'Handmade & Eco',
    priceEstimate: '₹650 – ₹850',
    desc: 'Support local potters with a set of 12 hand-molded clay diyas paired with pure rose or sandalwood aroma oils for sacred evening lighting.',
    tip: 'Include a personalized handwritten greeting card expressing gratitude for their blessings.'
  },
  {
    id: 'g-2',
    title: 'Silver Lakshmi-Ganesha Auspicious Coins & Shlokas',
    category: 'parents',
    budget: 'above-2500',
    type: 'Sacred Heritage',
    priceEstimate: '₹2,800 – ₹4,500',
    desc: 'Hallmarked 999 fine silver coins with sacred embossed icons of Lakshmi and Ganesha, representing long-lasting blessings.',
    tip: 'Wrap in red velvet pouches tied with golden zari ribbons.'
  },
  {
    id: 'g-3',
    title: 'Artisanal Gourmet Dry Fruit Hamper in Brass Box',
    category: 'colleagues',
    budget: '1000-2500',
    type: 'Corporate & Gourmet',
    priceEstimate: '₹1,400 – ₹2,200',
    desc: 'An assortment of roasted California almonds, Kashmiri walnuts, Afghan figs, and Persian pistachios in an embossed brass box.',
    tip: 'Ideal for professional associates and clients seeking elegance without perishables.'
  },
  {
    id: 'g-4',
    title: 'Personalized Photo Diwali Lamp / Moon Light',
    category: 'siblings',
    budget: '500-1000',
    type: 'Personalized',
    priceEstimate: '₹750 – ₹950',
    desc: '3D printed custom acrylic lamp engraved with childhood sibling photos that glows warmly on their study desk.',
    tip: 'Pick an embarrassing or endearing festive photo from childhood!'
  },
  {
    id: 'g-5',
    title: 'Handmade Scented Soy Wax Candles in Coconut Shells',
    category: 'friends',
    budget: 'below-500',
    type: 'Eco-Friendly DIY',
    priceEstimate: '₹350 – ₹450',
    desc: 'Eco-friendly natural soy wax candles infused with cardamom and cinnamon, poured into polished reclaimed coconut shells.',
    tip: 'Completely biodegradable, zero paraffin smoke, and smells heavenly.'
  },
  {
    id: 'g-6',
    title: 'Traditional Pure Brass Urli with Floating Tea Lights',
    category: 'family',
    budget: '1000-2500',
    type: 'Home Decor',
    priceEstimate: '₹1,600 – ₹2,400',
    desc: 'A heavy hand-hammered brass bowl to fill with water, fragrant rose petals, and floating diyas for entryway aesthetics.',
    tip: 'A gift that beautifies their home for festivals for decades to come.'
  },
  {
    id: 'g-7',
    title: 'Organic Herbal Tea & Raw Forest Honey Gift Casket',
    category: 'colleagues',
    budget: '500-1000',
    type: 'Wellness',
    priceEstimate: '₹700 – ₹900',
    desc: 'A wellness collection of Kashmiri Kahwa, Tulsi ginger infusion, and wild forest raw honey jars in sustainable jute packaging.',
    tip: 'A healthy and refreshing alternative to high-sugar sweets.'
  },
  {
    id: 'g-8',
    title: 'Handloom Silk Festive Dupatta / Kurta Stole',
    category: 'siblings',
    budget: '1000-2500',
    type: 'Fashion & Handloom',
    priceEstimate: '₹1,200 – ₹1,800',
    desc: 'Chanderi or Banarasi silk stole in auspicious festive colors (royal violet, emerald green, or mustard yellow).',
    tip: 'Pairs wonderfully with any traditional festival outfit.'
  }
];

export default function Gifts() {
  const [recipientFilter, setRecipientFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');

  const filteredGifts = GIFT_SUGGESTIONS.filter((gift) => {
    const matchesRecipient = recipientFilter === 'all' || gift.category === recipientFilter;
    const matchesBudget = budgetFilter === 'all' || gift.budget === budgetFilter;
    return matchesRecipient && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Thoughtful Festive Gifting</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Diwali Gift Discovery Corner 🎁
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            Thoughtfully curated gift inspirations for family, friends, and colleagues. Discover eco-friendly, handmade, and cultural keepsakes filtered by your budget.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#241039]/80 border border-[#F5C75E]/30 rounded-2xl p-6 mb-10 shadow-xl space-y-4">
          
          {/* Recipient Filter */}
          <div>
            <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-2">
              Who are you gifting?
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Recipients' },
                { id: 'parents', label: 'Parents 👵👴' },
                { id: 'friends', label: 'Friends 🎉' },
                { id: 'siblings', label: 'Siblings 👫' },
                { id: 'colleagues', label: 'Colleagues 💼' },
                { id: 'family', label: 'Family 👨‍👩‍👧‍👦' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRecipientFilter(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    recipientFilter === item.id
                      ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E] shadow-sm'
                      : 'bg-[#160B26] text-[#FFF4DD]/70 border-white/10 hover:border-white/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Filter */}
          <div className="pt-2 border-t border-[#F5C75E]/15">
            <label className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-2">
              Filter by Budget:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Any Budget' },
                { id: 'below-500', label: 'Below ₹500' },
                { id: '500-1000', label: '₹500 – ₹1,000' },
                { id: '1000-2500', label: '₹1,000 – ₹2,500' },
                { id: 'above-2500', label: 'Above ₹2,500' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setBudgetFilter(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    budgetFilter === item.id
                      ? 'bg-[#F28C28] text-white border-[#F28C28] shadow-sm'
                      : 'bg-[#160B26] text-[#FFF4DD]/70 border-white/10 hover:border-white/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGifts.map((gift) => (
            <div
              key={gift.id}
              className="p-6 rounded-2xl bg-[#241039]/80 border border-[#F5C75E]/30 shadow-xl hover:border-[#F5C75E] transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#160B26] border border-[#F5C75E]/30 text-[10px] font-bold text-[#F5C75E]">
                    {gift.type}
                  </span>
                  <span className="font-bold text-xs text-[#F28C28]">
                    {gift.priceEstimate}
                  </span>
                </div>

                <h3 className="font-serif-heading font-bold text-lg text-[#FFF4DD] mb-2 leading-snug">
                  {gift.title}
                </h3>

                <p className="text-xs text-[#FFF4DD]/80 leading-relaxed mb-4">
                  {gift.desc}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#160B26] border border-white/10 text-[11px] text-[#FFF4DD]/70">
                💡 <span className="font-semibold text-amber-300">Gifting Tip:</span> {gift.tip}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

