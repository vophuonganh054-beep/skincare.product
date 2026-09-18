import React from 'react';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section className="mx-3.5 mt-8 mb-6">
      <div className="bg-[#F6F3EE] rounded-3xl p-6 sm:p-8 border border-[#202022]/6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        {/* Eyebrow */}
        <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#74584D] mb-2 block">
          CẢM HỨNG NGHỆ THUẬT
        </span>

        {/* Headline */}
        <h3 className="font-serif text-[23px] sm:text-[26px] font-normal tracking-tight text-[#1C1C19] mb-3">
          Sự Thuần Khiết Tột Cùng
        </h3>

        {/* Body paragraph */}
        <p className="text-[12.5px] leading-[20px] text-[#202022]/75 max-w-xs sm:max-w-md mx-auto font-light mb-6 tracking-[0.01em]">
          Mỗi công thức GLANZ được chưng cất tỉ mỉ tại Zurich, phối hợp giữa tinh hoa thảo mộc thượng hạng và công nghệ dưỡng sáng sinh học phân tử giúp đánh thức năng lượng tinh khôi bên trong bạn.
        </p>

        {/* 3 Metric Columns matching screenshot */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#202022]/10">
          <div className="flex flex-col items-center">
            <span className="font-serif text-[21px] sm:text-[24px] font-medium text-[#1C1C19] tracking-tight">
              99.4%
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#202022]/60 font-semibold mt-0.5">
              TỰ NHIÊN
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-[#202022]/10 px-1">
            <span className="font-serif text-[21px] sm:text-[24px] font-medium text-[#1C1C19] tracking-tight whitespace-nowrap">
              28 Ngày
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#202022]/60 font-semibold mt-0.5">
              SÁNG MỊN
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif text-[21px] sm:text-[24px] font-medium text-[#1C1C19] tracking-tight">
              0%
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#202022]/60 font-semibold mt-0.5 leading-tight">
              Paraben Lành Tính
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
