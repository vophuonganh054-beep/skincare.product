import React from 'react';
import { X, Sparkles, Package, ShieldAlert } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'promo',
      icon: Sparkles,
      title: 'Đặc quyền Mùa Lễ Hội 2025',
      body: 'Nhận ngay thìa bạc massage khi mua đơn hàng từ 480.000đ. Nhập mã GLANZ2025 để được giảm 50.000đ.',
      time: '15 phút trước',
      unread: true,
    },
    {
      id: 2,
      type: 'order',
      icon: Package,
      title: 'Đơn hàng #GLZ-89241 đang trên đường giao',
      body: 'Gói hàng thơm thảo mộc đã rời kho boutique Zurich Hub và đang được chuyển phát tận tay quý khách.',
      time: '2 giờ trước',
      unread: true,
    },
    {
      id: 3,
      type: 'routine',
      icon: ShieldAlert,
      title: 'Nhắc nhở nghi thức buổi tối',
      body: 'Đừng quên bước khóa ẩm với Kem Dưỡng Tái Sinh GLANZ trước 22:30 để kích hoạt tái tạo màng ẩm.',
      time: 'Hôm qua',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-xs p-3 pt-8 animate-in fade-in">
      <div
        id="notification-modal-container"
        className="w-full max-w-md bg-[#FAF7F2] rounded-3xl p-4 shadow-2xl border border-[#202022]/10 max-h-[85vh] flex flex-col"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#202022]/8">
          <div>
            <h3 className="font-serif text-[18px] font-medium text-[#1C1C19]">
              Thông Báo & Nhắc Nhở
            </h3>
            <span className="text-[11px] text-[#202022]/60">2 thông báo mới</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#202022]/10 flex items-center justify-center text-[#202022]/70 hover:text-[#1C1C19] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-3 space-y-2.5 overflow-y-auto flex-1">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`p-3 rounded-2xl border transition-all ${
                  n.unread
                    ? 'bg-white border-[#D8B4A6]/60 shadow-xs'
                    : 'bg-white/60 border-[#202022]/5 opacity-80'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#202022]/8 flex items-center justify-center text-[#74584D] shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-serif text-[13.5px] font-medium text-[#1C1C19]">
                        {n.title}
                      </h4>
                      {n.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#D8B4A6] shrink-0" />
                      )}
                    </div>
                    <p className="text-[12px] text-[#202022]/70 leading-relaxed">
                      {n.body}
                    </p>
                    <span className="text-[10.5px] text-[#202022]/40 mt-1 block">
                      {n.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
