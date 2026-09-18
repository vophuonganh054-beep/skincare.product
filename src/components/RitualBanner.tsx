import React from 'react';
import { Flower2, ShieldCheck } from 'lucide-react';

interface RitualBannerProps {
  onOpenRitualGuide?: () => void;
}

export const RitualBanner: React.FC<RitualBannerProps> = ({ onOpenRitualGuide }) => {
  return (
    <div className="mx-3.5 my-3">
      <div
        id="card-glanz-ritual"
        onClick={onOpenRitualGuide}
        className="w-full bg-white rounded-2xl p-3.5 px-4 flex items-center justify-between border border-[#202022]/6 shadow-[0_4px_16px_-4px_rgba(216,180,166,0.15)] hover:border-[#D8B4A6]/50 transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          {/* Flower icon in soft circle */}
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#202022]/8 flex items-center justify-center shrink-0 text-[#202022] group-hover:bg-[#D8B4A6]/15 group-hover:text-[#74584D] transition-colors">
            <Flower2 className="w-5 h-5 stroke-[1.6]" />
          </div>

          <div className="flex flex-col">
            <h3 className="font-serif text-[15px] leading-tight font-medium text-[#1C1C19]">
              Nghi Thức Dưỡng Sáng Tự Nhiên
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-[#202022]/70">
              <span>100% Thuần Chay</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#8A9A86] inline" />
                Chuẩn Da Liễu Thụy Sĩ
              </span>
            </div>
          </div>
        </div>

        {/* Right Label */}
        <div className="text-right pl-2 border-l border-[#202022]/8">
          <span className="block text-[8.5px] uppercase tracking-[0.2em] text-[#202022]/50 font-bold">
            GLANZ
          </span>
          <span className="block text-[10px] uppercase tracking-[0.16em] text-[#202022] font-semibold">
            RITUAL
          </span>
        </div>
      </div>
    </div>
  );
};
