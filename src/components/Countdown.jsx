import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, Edit2, Check, Sparkles } from 'lucide-react';

export default function Countdown() {
  const { t, showToast } = useApp();
  // Default to upcoming Diwali date: November 8, 2026 18:00
  const [targetDateStr, setTargetDateStr] = useLocalStorage('diwali_target_date', '2026-11-08T18:00');
  const [isEditing, setIsEditing] = useState(false);
  const [inputDate, setInputDate] = useState(targetDateStr);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isArrived: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDateStr) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isArrived: false,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isArrived: true,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const handleSaveDate = (e) => {
    e.preventDefault();
    if (!inputDate) return;
    setTargetDateStr(inputDate);
    setIsEditing(false);
    showToast("Festival date successfully updated! 📅", "success");
  };

  const timeUnits = [
    { label: t.countdown.days, value: timeLeft.days },
    { label: t.countdown.hours, value: timeLeft.hours },
    { label: t.countdown.minutes, value: timeLeft.minutes },
    { label: t.countdown.seconds, value: timeLeft.seconds },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#241039]/90 via-[#160B26]/90 to-[#241039]/90 border border-[#F5C75E]/30 p-6 md:p-8 shadow-2xl gold-glow-box">
      {/* Decorative Traditional Toran Accent at top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F28C28] via-[#F5C75E] to-[#F28C28]" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#160B26] border border-[#F5C75E]/40 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C75E]" />
            <span>Mahaparva Countdown</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#FFF4DD] flex items-center justify-center md:justify-start gap-2">
            <span>{t.countdown.title}</span>
            <Clock className="w-5 h-5 text-[#F5C75E]" />
          </h3>
          <p className="text-xs sm:text-sm text-[#FFF4DD]/70">
            Targeting: {new Date(targetDateStr).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div>
          {isEditing ? (
            <form onSubmit={handleSaveDate} className="flex items-center gap-2 bg-[#160B26]/90 p-2 rounded-xl border border-[#F5C75E]/40">
              <input
                type="datetime-local"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="bg-transparent text-sm text-[#FFF4DD] focus:outline-none px-2"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-[#F5C75E] text-[#160B26] font-semibold hover:bg-amber-400 transition"
                title="Save Date"
              >
                <Check className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#160B26] border border-[#F5C75E]/40 text-xs font-medium text-[#F5C75E] hover:bg-[#241039] transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.countdown.changeDate}</span>
              <Edit2 className="w-3 h-3 text-[#FFF4DD]/60" />
            </button>
          )}
        </div>
      </div>

      {timeLeft.isArrived ? (
        <div className="text-center py-6">
          <p className="text-3xl md:text-4xl font-extrabold text-[#F5C75E] font-royal animate-pulse">
            🎉 Happy Diwali! Shubh Deepawali! 🪔
          </p>
          <p className="text-sm text-[#FFF4DD]/80 mt-2">The grand celebration has commenced across every home.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {timeUnits.map((unit, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#160B26]/80 border border-[#F5C75E]/25 shadow-inner hover:border-[#F5C75E]/60 transition"
            >
              <span className="text-3xl sm:text-5xl font-black font-royal text-[#F5C75E] gold-glow">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#FFF4DD]/70 font-medium mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

