import React from 'react';
import { Home, LayoutGrid, Heart, ShoppingBag, User } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  cartCount: number;
  wishlistCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  cartCount,
  wishlistCount,
}) => {
  const tabs = [
    {
      id: 'home' as ActiveTab,
      label: 'TRANG CHỦ',
      icon: Home,
    },
    {
      id: 'categories' as ActiveTab,
      label: 'DANH MỤC',
      icon: LayoutGrid,
    },
    {
      id: 'wishlist' as ActiveTab,
      label: 'YÊU THÍCH',
      icon: Heart,
      badge: wishlistCount > 0 ? wishlistCount : null,
    },
    {
      id: 'cart' as ActiveTab,
      label: 'GIỎ HÀNG',
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : null,
    },
    {
      id: 'account' as ActiveTab,
      label: 'TÀI KHOẢN',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-xl border-t border-[#202022]/8 py-1.5 transition-all">
      <div className="max-w-md mx-auto px-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer relative ${
                isActive
                  ? 'text-[#08080A] font-semibold'
                  : 'text-[#202022]/50 hover:text-[#202022]/80'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-[21px] h-[21px] transition-transform ${
                    isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.6]'
                  }`}
                />
                {tab.badge !== null && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[#08080A] text-white text-[9px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[9.5px] uppercase tracking-[0.08em] mt-1">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
