import React from 'react';
import { UserProfile } from '../types';
import { Crown, Package, Sparkles, ShieldCheck, ChevronRight, Bell, Calendar, Award } from 'lucide-react';

interface AccountViewProps {
  user: UserProfile;
  onOpenOrderHistory?: () => void;
  onOpenSkinConsultation?: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  user,
}) => {
  return (
    <div className="max-w-md mx-auto px-3.5 py-4 pb-24 space-y-4">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-5 border border-[#202022]/8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D8B4A6]/20 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border-2 border-[#D8B4A6] flex items-center justify-center font-serif text-[20px] font-semibold text-[#74584D] shadow-xs">
            PA
          </div>

          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#74584D]/10 text-[#74584D] text-[10px] font-bold uppercase tracking-wider mb-1">
              <Crown className="w-3 h-3 text-[#D8B4A6]" />
              {user.tier}
            </div>
            <h2 className="font-serif text-[20px] font-medium text-[#1C1C19]">
              {user.name}
            </h2>
            <p className="text-[11.5px] text-[#202022]/60">{user.email}</p>
          </div>
        </div>

        {/* Member Metrics */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#202022]/8 text-[12px]">
          <div className="bg-[#FAF7F2] p-2.5 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-[#202022]/50 block">
              Điểm Thưởng Atelier
            </span>
            <span className="font-serif text-[18px] font-semibold text-[#1C1C19]">
              {user.memberPoints.toLocaleString('vi-VN')} pts
            </span>
          </div>

          <div className="bg-[#FAF7F2] p-2.5 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-[#202022]/50 block">
              Đơn Hàng Tích Lũy
            </span>
            <span className="font-serif text-[18px] font-semibold text-[#1C1C19]">
              {user.ordersCount} Đơn
            </span>
          </div>
        </div>
      </div>

      {/* Skin Routine Diagnostic Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#74584D]">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B4A6]" />
            Hồ Sơ Chăm Sóc Da Cá Nhân
          </div>
          <span className="text-[10.5px] text-[#8A9A86] font-semibold flex items-center gap-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Đã đồng bộ
          </span>
        </div>

        <div className="bg-[#FAF7F2] rounded-xl p-3 mb-3 text-[12px]">
          <div className="flex justify-between mb-1">
            <span className="text-[#202022]/60">Phân loại da:</span>
            <strong className="text-[#1C1C19]">{user.skinType}</strong>
          </div>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {user.skinConcerns.map((c, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-white text-[10.5px] text-[#74584D] border border-[#202022]/5"
              >
                #{c}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-[12px]">
          <span className="text-[10.5px] uppercase font-bold text-[#202022]/60 block tracking-wider">
            Nghi Thức Đề Xuất Hôm Nay:
          </span>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#202022]/5">
            <span className="font-medium text-[#1C1C19]">Buổi Sáng: Cân bằng & Dưỡng sáng</span>
            <span className="text-[10.5px] text-[#74584D] font-semibold">Toner → Serum</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#202022]/5">
            <span className="font-medium text-[#1C1C19]">Buổi Tối: Phục hồi chuyên sâu</span>
            <span className="text-[10.5px] text-[#74584D] font-semibold">Mặt nạ → Kem dưỡng</span>
          </div>
        </div>
      </div>

      {/* Recent Order Status */}
      <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#1C1C19]">
            <Package className="w-4 h-4 text-[#74584D]" />
            Đơn Hàng Gần Nhất
          </div>
          <span className="text-[11px] text-[#74584D] hover:underline cursor-pointer">
            Xem lịch sử
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#202022]/5 text-[12px]">
          <div className="flex items-center justify-between font-semibold text-[#1C1C19] mb-1">
            <span>Đơn #GLZ-89241</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#8A9A86]/20 text-[#3C4B3A] font-bold">
              Đang giao hàng
            </span>
          </div>
          <p className="text-[11.5px] text-[#202022]/60">
            GLANZ Radiance Pearl Serum + Tặng thìa bạc massage
          </p>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#202022]/8 text-[11px] text-[#202022]/50">
            <span>Dự kiến giao: Chiều nay</span>
            <span className="text-[#1C1C19] font-bold">450.000đ</span>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="bg-white rounded-2xl border border-[#202022]/8 divide-y divide-[#202022]/6 overflow-hidden shadow-xs text-[13px]">
        <button className="w-full p-3.5 px-4 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors cursor-pointer text-left">
          <div className="flex items-center gap-3">
            <Award className="w-4 h-4 text-[#74584D]" />
            <span>Đặc quyền thành viên Atelier VIP</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#202022]/40" />
        </button>

        <button className="w-full p-3.5 px-4 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors cursor-pointer text-left">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-[#74584D]" />
            <span>Đặt lịch soi da & tư vấn chuyên viên Thụy Sĩ</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#202022]/40" />
        </button>

        <button className="w-full p-3.5 px-4 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors cursor-pointer text-left">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-[#74584D]" />
            <span>Cài đặt nhắc nhở nghi thức dưỡng da</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#202022]/40" />
        </button>
      </div>
    </div>
  );
};
