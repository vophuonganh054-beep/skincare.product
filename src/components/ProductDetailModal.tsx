import React, { useState } from 'react';
import { X, Star, Heart, ShieldCheck, Sparkles, Check, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'ingredients' | 'routine'>('info');

  if (!isOpen || !product) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const images = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="product-detail-modal"
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-t-[32px] sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col no-scrollbar border border-[#202022]/10"
      >
        {/* Sticky Close Button */}
        <div className="sticky top-0 right-0 z-20 flex justify-between items-center p-4 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#202022]/5">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#74584D]">
            {product.brand} RITUAL
          </span>
          <button
            id="btn-close-product-detail"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 border border-[#202022]/10 flex items-center justify-center text-[#202022] hover:bg-white active:scale-95 transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Section */}
        <div className="relative w-full bg-[#F6F3EE] p-4 flex flex-col items-center">
          <div className="w-full aspect-square max-w-[320px] rounded-2xl overflow-hidden shadow-xs relative bg-white">
            <img
              src={images[selectedImgIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-[0.1em] text-[#202022] uppercase border border-[#202022]/10">
              {product.badge}
            </div>
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#202022] shadow-xs cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted
                    ? 'fill-[#ba1a1a] text-[#ba1a1a]'
                    : 'text-[#202022]/60'
                }`}
              />
            </button>
          </div>

          {/* Thumbnail indicators */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 mt-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImgIndex === idx
                      ? 'border-[#08080A] scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#74584D] tracking-wider uppercase">
              <span>{product.brand}</span>
              <span>•</span>
              <span>Dung tích: {product.size}</span>
            </div>

            <h2 className="font-serif text-[22px] sm:text-[24px] font-normal text-[#1C1C19] mt-1 leading-snug">
              {product.name}
            </h2>

            <p className="text-[13px] text-[#202022]/70 mt-1">
              {product.subtitle}
            </p>

            {/* Rating & Sold info */}
            <div className="flex items-center gap-3 mt-2.5 text-[12px] text-[#202022]/80">
              <div className="flex items-center gap-1 font-semibold text-[#9E6B30]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                <span>{product.rating.toFixed(1)} / 5.0</span>
              </div>
              <span className="text-[#202022]/20">•</span>
              <span>Đã kiểm nghiệm da liễu Thụy Sĩ</span>
              <span className="text-[#202022]/20">•</span>
              <span>{product.soldCount}+ đã mua</span>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-2.5 mt-3 pt-3 border-t border-[#202022]/8">
              <span className="font-serif text-[26px] font-semibold text-[#1C1C19]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[14px] text-[#202022]/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a] text-[10.5px] font-bold">
                  Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {product.note && (
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-[#D8B4A6]/20 text-[#74584D] text-[11px] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Đặc quyền: {product.note}
              </div>
            )}
          </div>

          {/* Feature Highlights Tabs */}
          <div className="border border-[#202022]/8 rounded-2xl bg-white p-3.5">
            <div className="flex items-center gap-2 border-b border-[#202022]/6 pb-2.5 mb-3">
              <button
                onClick={() => setActiveTab('info')}
                className={`text-[11px] font-bold tracking-[0.08em] uppercase pb-1 cursor-pointer transition-all ${
                  activeTab === 'info'
                    ? 'text-[#08080A] border-b-2 border-[#08080A]'
                    : 'text-[#202022]/50 hover:text-[#202022]'
                }`}
              >
                Hiệu Quả Lâm Sàng
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`text-[11px] font-bold tracking-[0.08em] uppercase pb-1 cursor-pointer transition-all ${
                  activeTab === 'ingredients'
                    ? 'text-[#08080A] border-b-2 border-[#08080A]'
                    : 'text-[#202022]/50 hover:text-[#202022]'
                }`}
              >
                Thành Phần Vàng
              </button>
              <button
                onClick={() => setActiveTab('routine')}
                className={`text-[11px] font-bold tracking-[0.08em] uppercase pb-1 cursor-pointer transition-all ${
                  activeTab === 'routine'
                    ? 'text-[#08080A] border-b-2 border-[#08080A]'
                    : 'text-[#202022]/50 hover:text-[#202022]'
                }`}
              >
                Nghi Thức
              </button>
            </div>

            {activeTab === 'info' && (
              <div className="space-y-2 text-[12.5px] leading-relaxed text-[#202022]/80">
                <p>{product.description}</p>
                <div className="p-2.5 rounded-xl bg-[#8A9A86]/10 border border-[#8A9A86]/20 flex items-start gap-2 text-[#3C4B3A]">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="text-[12px]">{product.clinicalProof}</span>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-1.5">
                <p className="text-[11.5px] text-[#202022]/60 mb-1">
                  Công thức 100% thuần chay, không cồn khô, không dầu khoáng:
                </p>
                {product.keyIngredients.map((ing, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px] text-[#202022]/85">
                    <Check className="w-3.5 h-3.5 text-[#8A9A86]" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'routine' && (
              <div className="space-y-2 text-[12px] text-[#202022]/80">
                <div className="font-semibold text-[#74584D]">{product.routineStep}</div>
                <p>
                  Thoa nhẹ nhàng từ 3-4 giọt tinh chất lên da mặt và cổ sau bước làm sạch. Dùng lòng bàn tay ấm áp vỗ nhẹ để dưỡng chất thẩm thấu sâu vào tế bào biểu bì.
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#202022]/60 pt-1">
                  <span>Khuyên dùng: Sáng & Tối hàng ngày</span>
                </div>
              </div>
            )}
          </div>

          {/* Quantity and Actions Bar */}
          <div className="flex items-center gap-3 pt-2">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#202022]/15 rounded-full bg-white px-2 py-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center text-[#202022] hover:bg-[#202022]/5 rounded-full text-[16px] font-medium cursor-pointer"
              >
                -
              </button>
              <span className="w-7 text-center font-semibold text-[13px]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center text-[#202022] hover:bg-[#202022]/5 rounded-full text-[16px] font-medium cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              id="btn-modal-add-to-cart"
              onClick={() => {
                onAddToCart(product, quantity);
                onClose();
              }}
              className="flex-1 py-3.5 px-4 rounded-full bg-[#08080A] text-white text-[12px] font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 hover:bg-[#202022] active:scale-98 transition-all shadow-md cursor-pointer"
            >
              <span>Thêm Vào Giỏ Hàng</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
