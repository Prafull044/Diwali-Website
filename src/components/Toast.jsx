import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#F5C75E] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-300 shrink-0" />,
    festive: <Sparkles className="w-5 h-5 text-[#F5C75E] shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-500 max-w-sm pointer-events-none">
      <div className="bg-[#241039]/95 backdrop-blur-md border border-[#F5C75E]/40 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-[#FFF4DD] gold-glow-box">
        {icons[toast.type] || icons.success}
        <p className="text-sm font-medium tracking-wide leading-snug">{toast.message}</p>
      </div>
    </div>
  );
}

