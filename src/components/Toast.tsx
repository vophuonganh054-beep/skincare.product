import React, { useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-top-3 duration-200">
      <div className="px-4 py-2.5 rounded-full bg-[#08080A]/95 text-white text-[12px] font-medium tracking-wide shadow-xl flex items-center gap-2 border border-white/10 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-[#D8B4A6]" />
        <span>{message}</span>
        <Check className="w-3.5 h-3.5 text-[#8A9A86] ml-0.5" />
      </div>
    </div>
  );
};
