import React from 'react';
import { Search, Bell, ShoppingBag, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenCart: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenSearch,
  onOpenNotifications,
  onOpenCart,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#202022]/6 transition-all duration-300">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Search button */}
        <button
          id="btn-header-search"
          onClick={onOpenSearch}
          className="w-10 h-10 flex items-center justify-center rounded-full text-[#202022] hover:bg-[#202022]/5 active:scale-95 transition-all"
          aria-label="Tìm kiếm sản phẩm"
        >
          <Search className="w-5 h-5 stroke-[1.75]" />
        </button>

        {/* Center Logo matching screenshot */}
        <button
          id="btn-header-logo"
          onClick={onGoHome}
          className="flex flex-col items-center justify-center text-center cursor-pointer group"
        >
          <div className="flex items-center gap-1 text-[#202022]">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B4A6] fill-[#D8B4A6]" />
            <span className="font-serif tracking-[0.22em] text-[18px] font-medium uppercase text-[#202022]">
              GLANZ
            </span>
          </div>
          <span className="text-[8.5px] uppercase tracking-[0.26em] text-[#202022]/60 font-medium -mt-0.5">
            SKINCARE • PURE ESSENCE
          </span>
        </button>

        {/* Right actions: Bell & Shopping Bag */}
        <div className="flex items-center gap-1">
          <button
            id="btn-header-bell"
            onClick={onOpenNotifications}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#202022] hover:bg-[#202022]/5 active:scale-95 transition-all"
            aria-label="Thông báo"
          >
            <Bell className="w-5 h-5 stroke-[1.75]" />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#D8B4A6] ring-2 ring-[#FAF7F2]" />
          </button>

          <button
            id="btn-header-cart"
            onClick={onOpenCart}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#202022] hover:bg-[#202022]/5 active:scale-95 transition-all"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#08080A] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
