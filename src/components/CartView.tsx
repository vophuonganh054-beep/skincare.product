import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onContinueShopping: () => void;
  onClearCart: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onClearCart,
}) => {
  const [voucherCode, setVoucherCode] = useState('GLANZ2025');
  const [isVoucherApplied, setIsVoucherApplied] = useState(true);
  const [voucherDiscount, setVoucherDiscount] = useState(50000);
  const [voucherError, setVoucherError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 800000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 30000;
  const finalDiscount = isVoucherApplied && subtotal > 0 ? voucherDiscount : 0;
  const total = Math.max(0, subtotal - finalDiscount + shippingFee);

  const handleApplyVoucher = () => {
    if (voucherCode.trim().toUpperCase() === 'GLANZ2025') {
      setIsVoucherApplied(true);
      setVoucherDiscount(50000);
      setVoucherError('');
    } else if (voucherCode.trim().toUpperCase() === 'VIP20') {
      setIsVoucherApplied(true);
      setVoucherDiscount(Math.round(subtotal * 0.2));
      setVoucherError('');
    } else {
      setIsVoucherApplied(false);
      setVoucherError('Mã ưu đãi không hợp lệ hoặc đã hết hạn.');
    }
  };

  const handleCompleteOrder = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  if (checkoutSuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-[#8A9A86]/20 border border-[#8A9A86] flex items-center justify-center text-[#3C4B3A] mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#74584D]">
          GLANZ BOUTIQUE
        </span>
        <h2 className="font-serif text-[26px] font-medium text-[#1C1C19] mt-1 mb-2">
          Đặt Hàng Thành Công
        </h2>
        <p className="text-[13px] text-[#202022]/70 max-w-xs leading-relaxed mb-6">
          Cảm ơn quý khách đã tin chọn GLANZ. Chuyên viên nghi thức chăm sóc da sẽ liên hệ xác nhận và đóng gói hộp quà thơm hương hoa tuyết nhung trong vòng 15 phút.
        </p>
        <div className="p-4 rounded-2xl bg-white border border-[#202022]/10 w-full text-left text-[12px] space-y-1.5 mb-6">
          <div className="flex justify-between text-[#202022]/60">
            <span>Mã đơn hàng:</span>
            <span className="font-semibold text-[#1C1C19]">#GLZ-89421</span>
          </div>
          <div className="flex justify-between text-[#202022]/60">
            <span>Phương thức:</span>
            <span className="text-[#1C1C19]">Giao hàng bảo mật cao cấp</span>
          </div>
          <div className="flex justify-between text-[#202022]/60">
            <span>Tổng thanh toán:</span>
            <span className="font-bold text-[#1C1C19]">{formatPrice(total)}</span>
          </div>
        </div>
        <button
          onClick={() => {
            setCheckoutSuccess(false);
            onContinueShopping();
          }}
          className="px-6 py-3 rounded-full bg-[#08080A] text-white text-[11.5px] font-bold tracking-[0.12em] uppercase cursor-pointer hover:bg-[#202022]"
        >
          Tiếp Tục Mua Sắm
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#202022]/10 flex items-center justify-center text-[#202022]/40 mb-4">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h3 className="font-serif text-[21px] font-normal text-[#1C1C19] mb-1">
          Giỏ Hàng Của Bạn Đang Trống
        </h3>
        <p className="text-[12.5px] text-[#202022]/60 max-w-xs mb-6">
          Hãy khám phá các nghi thức chăm sóc da tinh khiết từ GLANZ để bắt đầu hành trình dưỡng sáng làn da.
        </p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-3 rounded-full bg-[#08080A] text-white text-[11px] font-bold tracking-[0.12em] uppercase hover:bg-[#202022] active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          Khám Phá Sản Phẩm Ngay
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-3.5 py-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#202022]/8 mb-4">
        <div>
          <h2 className="font-serif text-[22px] font-normal text-[#1C1C19]">
            Giỏ Hàng Của Bạn
          </h2>
          <span className="text-[11px] text-[#202022]/60">
            {cartItems.reduce((acc, it) => acc + it.quantity, 0)} món trong giỏ
          </span>
        </div>
        <button
          onClick={onClearCart}
          className="text-[11px] text-[#ba1a1a] hover:underline cursor-pointer"
        >
          Xóa tất cả
        </button>
      </div>

      {/* Free Shipping Progress bar */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#202022]/8 mb-4 shadow-xs">
        <div className="flex items-center justify-between text-[11.5px] mb-1.5">
          {amountToFreeShipping === 0 ? (
            <span className="font-semibold text-[#3C4B3A] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#8A9A86]" />
              Đạt tiêu chuẩn Miễn Phí Giao Hàng & Tặng Thìa Bạc!
            </span>
          ) : (
            <span className="text-[#202022]/75">
              Mua thêm <strong className="text-[#1C1C19]">{formatPrice(amountToFreeShipping)}</strong> để nhận Freeship
            </span>
          )}
          <span className="font-bold text-[11px] text-[#74584D]">
            {Math.round(progressToFreeShipping)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#FAF7F2] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D8B4A6] to-[#74584D] rounded-full transition-all duration-500"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      {/* Product list */}
      <div className="space-y-3 mb-6">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="bg-white rounded-2xl p-3 border border-[#202022]/7 flex items-center gap-3 shadow-xs"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#202022]/5">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <div>
                  <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#74584D]">
                    {item.product.brand} • {item.product.size}
                  </span>
                  <h4 className="font-serif text-[13.5px] font-medium text-[#1C1C19] line-clamp-1">
                    {item.product.name}
                  </h4>
                </div>
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-[#202022]/40 hover:text-[#ba1a1a] p-1 cursor-pointer transition-colors"
                  aria-label="Xóa món"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#202022]/5">
                <span className="font-semibold text-[13.5px] text-[#1C1C19]">
                  {formatPrice(item.product.price)}
                </span>

                {/* Stepper */}
                <div className="flex items-center border border-[#202022]/15 rounded-full bg-[#FAF7F2] px-2 py-0.5">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, -1)}
                    className="w-5 h-5 flex items-center justify-center text-[#202022] hover:bg-white rounded-full text-[13px] font-semibold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-[12px] font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, 1)}
                    className="w-5 h-5 flex items-center justify-center text-[#202022] hover:bg-white rounded-full text-[13px] font-semibold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Voucher Code */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#202022]/7 mb-5">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#202022]/70 mb-2">
          Mã Ưu Đãi / Voucher Tri Ân
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            placeholder="Nhập mã GLANZ2025"
            className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#202022]/10 text-[12px] font-medium uppercase tracking-wider text-[#1C1C19] focus:outline-none focus:border-[#D8B4A6]"
          />
          <button
            onClick={handleApplyVoucher}
            className="px-4 py-2 rounded-xl bg-[#08080A] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#202022] active:scale-95 transition-all cursor-pointer"
          >
            Áp Dụng
          </button>
        </div>
        {isVoucherApplied && (
          <p className="text-[11px] text-[#3C4B3A] mt-1.5 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-[#8A9A86]" />
            Đã áp dụng mã: Giảm {formatPrice(finalDiscount)}
          </p>
        )}
        {voucherError && (
          <p className="text-[11px] text-[#ba1a1a] mt-1.5">{voucherError}</p>
        )}
      </div>

      {/* Pricing Breakdown */}
      <div className="bg-white rounded-2xl p-4 border border-[#202022]/7 space-y-2 text-[12.5px] mb-6">
        <div className="flex justify-between text-[#202022]/70">
          <span>Tạm tính</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {finalDiscount > 0 && (
          <div className="flex justify-between text-[#74584D] font-medium">
            <span>Ưu đãi voucher ({voucherCode.toUpperCase()})</span>
            <span>-{formatPrice(finalDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between text-[#202022]/70">
          <span>Phí vận chuyển bảo mật</span>
          <span>{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</span>
        </div>
        <div className="flex justify-between items-baseline pt-2.5 border-t border-[#202022]/10 font-serif text-[17px] font-semibold text-[#1C1C19]">
          <span>Tổng thanh toán</span>
          <span className="text-[20px] text-[#1C1C19]">{formatPrice(total)}</span>
        </div>
        <div className="pt-2 text-[10.5px] text-[#202022]/50 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8A9A86]" />
          <span>Cam kết 100% hàng chính hãng, đổi trả trong 7 ngày.</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        id="btn-cart-checkout"
        onClick={() => setIsCheckingOut(true)}
        className="w-full py-3.5 px-6 rounded-full bg-[#08080A] text-white text-[12px] font-bold tracking-[0.14em] uppercase flex items-center justify-center gap-2 hover:bg-[#202022] active:scale-98 transition-all shadow-md cursor-pointer"
      >
        <span>Tiến Hành Thanh Toán ({formatPrice(total)})</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Checkout Drawer / Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 animate-in fade-in">
          <div className="w-full max-w-md bg-[#FAF7F2] rounded-t-[32px] p-5 shadow-2xl border-t border-[#202022]/10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-[#202022]/8 mb-4">
              <h3 className="font-serif text-[19px] font-medium text-[#1C1C19]">
                Xác Nhận Đơn Hàng
              </h3>
              <button
                onClick={() => setIsCheckingOut(false)}
                className="text-[12px] text-[#202022]/60 hover:text-[#202022]"
              >
                Đóng
              </button>
            </div>

            <div className="space-y-3 text-[12px] mb-5">
              <div className="bg-white p-3 rounded-xl border border-[#202022]/6">
                <span className="block text-[10px] uppercase font-bold text-[#74584D]">
                  Địa Chỉ Nhận Hàng (VIP Concierge)
                </span>
                <p className="font-semibold text-[#1C1C19] mt-0.5">Võ Phương Anh • 0908 ••• 688</p>
                <p className="text-[#202022]/70">Tòa Landmark 81, P. 22, Quận Bình Thạnh, TP. Hồ Chí Minh</p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#202022]/6">
                <span className="block text-[10px] uppercase font-bold text-[#74584D] mb-1.5">
                  Phương Thức Thanh Toán
                </span>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#FAF7F2] cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="accent-[#08080A]" />
                    <span className="font-medium text-[#1C1C19]">Thanh toán khi nhận hàng (COD kiểm tra trước)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FAF7F2] cursor-pointer">
                    <input type="radio" name="payment" className="accent-[#08080A]" />
                    <span className="text-[#202022]/80">Chuyển khoản Ngân hàng / Quét mã VietQR</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FAF7F2] cursor-pointer">
                    <input type="radio" name="payment" className="accent-[#08080A]" />
                    <span className="text-[#202022]/80">Thẻ Visa / MasterCard / Apple Pay</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleCompleteOrder}
              className="w-full py-3.5 rounded-full bg-[#08080A] text-white text-[12px] font-bold tracking-[0.12em] uppercase hover:bg-[#202022] cursor-pointer shadow-md"
            >
              Hoàn Tất Đặt Hàng ({formatPrice(total)})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
