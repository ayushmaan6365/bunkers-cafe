import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-[#241811] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2.5 text-xs sm:text-sm font-medium">
        <CheckCircle2 className="w-4 h-4 text-[#C2410C] shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
