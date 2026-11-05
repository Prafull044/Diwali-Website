import React, { useState } from 'react';
import { Sparkles, BookOpen, Clock, Globe, Shield, SunMedium, Compass } from 'lucide-react';

const FIVE_DAYS = [
  {
    day: 'Day 1: Dhanteras (Dhantrayodashi)',
    symbol: '🪙',
    deity: 'Lord Dhanvantari & Goddess Lakshmi',
    story: 'Commemorates the emergence of Lord Dhanvantari carrying the divine vessel of Amrit (nectar of life) and Goddess Lakshmi during the churning of the cosmic ocean (Samudra Manthan). Families clean their homes, purchase auspicious metal utensils, and light 13 diyas for Yama Deepam to pray for good health.',
  },
  {
    day: 'Day 2: Naraka Chaturdashi (Choti Diwali)',
    symbol: '🌅',
    deity: 'Lord Krishna & Satyabhama',
    story: 'Celebrates the liberation of 16,000 captive maidens and the defeat of the tyrant Narakasura by Lord Krishna and Goddess Satyabhama. Pre-dawn ceremonial oil baths (Abhyanga Snan) with scented Ubtan wash away exhaustion and spiritual impurities.',
  },
  {
    day: 'Day 3: Lakshmi Puja (Deepawali)',
    symbol: '🪔',
    deity: 'Goddess Maha Lakshmi & Lord Ganesha',
    story: 'The darkest night of the lunar month (Amavasya) is transformed into the brightest night of the year. The citizens of Ayodhya lit countless rows of clay lamps to welcome Lord Rama, Mother Sita, and Lakshmana back from 14 years of exile. Evening pujas invite divine grace, wisdom, and peace.',
  },
  {
    day: 'Day 4: Govardhan Puja & Annakut',
    symbol: '🏔️',
    deity: 'Lord Krishna (Govardhan Dhari)',
    story: 'Honors the day Lord Krishna lifted Mount Govardhan on his little finger to shield the villagers and cattle of Vrindavan from torrential downpours. Devotees prepare the Annakut (literally "mountain of food") offering 56 gourmet dishes (Chhappan Bhog) in gratitude to nature.',
  },
  {
    day: 'Day 5: Bhai Dooj (Bhau Beej)',
    symbol: '🤝',
    deity: 'Yama & Yami (Yamuna)',
    story: 'Celebrates the unconditional love between brothers and sisters. Lord Yama visited his loving sister Yamuna, who welcomed him with a holy tilak and sumptuous feast. Moved by her warmth, Yama granted a boon that brothers visited by their sisters on this day would be blessed with longevity and safety.',
  },
];

const REGIONAL_PERSPECTIVES = [
  {
    region: 'North India',
    focus: 'Homecoming of Lord Rama to Ayodhya',
    desc: 'Houses glow with hundreds of earthen diyas, intricate sugar toys (Kheel Batashe) are shared, and gambling/card games are playfully played in remembrance of Shiva-Parvati games.',
  },
  {
    region: 'South India',
    focus: 'Krishna\'s Triumph Over Narakasura',
    desc: 'The celebration begins at dawn on Naraka Chaturdashi with a sesame oil bath before sunrise, followed by bursting crackers and tasting Deepavali Lehyam (an ayurvedic digestive medicinal sweet).',
  },
  {
    region: 'Eastern India (Bengal, Assam, Odisha)',
    focus: 'Maha Kali Puja',
    desc: 'Devotees worship Goddess Kali, the fierce destroyer of ego and cosmic darkness, throughout the dark night with hibiscus flowers, sweet treats, and illuminated lamps.',
  },
  {
    region: 'Western India (Gujarat & Maharashtra)',
    focus: 'Bestu Varas (New Year) & Chopda Pujan',
    desc: 'Merchants and entrepreneurs perform Chopda Pujan (sanctifying new account books with vermillion Swastikas). The day after Diwali marks the Gujarati New Year.',
  },
  {
    region: 'Jainism & Sikhism',
    focus: 'Lord Mahavira’s Nirvana & Bandi Chhor Divas',
    desc: 'For Jains, Diwali commemorates the liberation (Moksha) of Tirthankara Mahavira. For Sikhs, Bandi Chhor Divas celebrates Guru Hargobind Ji freeing 52 captive princes from Gwalior Fort.',
  },
];

export default function DiwaliHistory() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Spiritual Roots & Cultural Lore</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Diwali History & Sacred Traditions 📜
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            Journey through millennia of Vedic wisdom, divine epics, and regional celebrations that unite millions of souls across continents in the glow of harmony.
          </p>
        </div>

        {/* 5 Days Interactive Timeline */}
        <div className="mb-14 bg-[#241039]/80 border border-[#F5C75E]/30 rounded-3xl p-6 sm:p-10 shadow-2xl gold-glow-box">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#F5C75E] mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#F28C28]" />
            <span>The Five Auspicious Days of Deepawali</span>
          </h2>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {FIVE_DAYS.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDayIndex(idx)}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  selectedDayIndex === idx
                    ? 'bg-[#F5C75E] text-[#160B26] border-[#F5C75E] shadow-md'
                    : 'bg-[#160B26] text-[#FFF4DD]/70 border-white/10 hover:border-white/30'
                }`}
              >
                <span>{day.symbol}</span>
                <span>Day {idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="bg-[#160B26] border border-[#F5C75E]/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{FIVE_DAYS[selectedDayIndex].symbol}</span>
              <div>
                <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#F5C75E]">
                  {FIVE_DAYS[selectedDayIndex].day}
                </h3>
                <span className="text-xs text-amber-300 font-semibold">
                  Presiding Deities: {FIVE_DAYS[selectedDayIndex].deity}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#FFF4DD]/85 leading-relaxed mt-4">
              {FIVE_DAYS[selectedDayIndex].story}
            </p>
          </div>
        </div>

        {/* Regional Perspectives */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#F5C75E] mb-6 flex items-center gap-3">
            <Compass className="w-6 h-6 text-[#F28C28]" />
            <span>Regional Tapestry & Diverse Traditions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONAL_PERSPECTIVES.map((reg, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#241039]/80 border border-[#F5C75E]/30 shadow-xl hover:border-[#F5C75E] transition"
              >
                <span className="px-3 py-1 rounded-full bg-[#160B26] border border-[#F5C75E]/30 text-xs font-bold text-[#F5C75E] uppercase tracking-wider inline-block mb-3">
                  {reg.region}
                </span>

                <h4 className="font-serif-heading font-bold text-lg text-[#FFF4DD] mb-2 leading-snug">
                  {reg.focus}
                </h4>

                <p className="text-xs sm:text-sm text-[#FFF4DD]/80 leading-relaxed">
                  {reg.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

