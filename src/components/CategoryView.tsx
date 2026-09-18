import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, Layers, Droplets, Sun, Activity } from 'lucide-react';

interface CategoryViewProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const [selectedConcern, setSelectedConcern] = useState<string>('all');

  const rituals = [
    { id: 'all', name: 'Tất Cả', icon: Layers },
    { id: 'brightening', name: 'Dưỡng Sáng Ngọc Trai', icon: Sparkles },
    { id: 'hydrating', name: 'Cấp Ẩm Sâu', icon: Droplets },
    { id: 'antiaging', name: 'Tái Sinh Trẻ Hóa', icon: Activity },
    { id: 'protection', name: 'Bảo Vệ Hàng Rào Da', icon: Sun },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedConcern === 'all') return true;
    if (selectedConcern === 'brightening') return p.category === 'serum';
    if (selectedConcern === 'hydrating') return p.category === 'toner' || p.category === 'mask';
    if (selectedConcern === 'antiaging') return p.category === 'cream' || p.category === 'mask';
    if (selectedConcern === 'protection') return p.category === 'cream' || p.category === 'toner';
    return true;
  });

  return (
    <div className="max-w-md mx-auto px-3.5 py-4 pb-24">
      {/* Title */}
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#74584D]">
          DANH MỤC NGHI THỨC
        </span>
        <h2 className="font-serif text-[23px] font-normal text-[#1C1C19] mt-0.5">
          Liệu Trình Theo Nhu Cầu Da
        </h2>
        <p className="text-[12px] text-[#202022]/65 mt-1">
          Các giải pháp tinh khiết được bào chế theo tiêu chuẩn viện nghiên cứu da liễu Thụy Sĩ.
        </p>
      </div>

      {/* Routine Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4 -mx-1 px-1">
        {rituals.map((r) => {
          const Icon = r.icon;
          const isActive = selectedConcern === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setSelectedConcern(r.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-semibold tracking-wide transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#08080A] text-white shadow-xs'
                  : 'bg-white border border-[#202022]/10 text-[#202022]/70 hover:bg-[#FAF7F2]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2-column Grid matching aesthetic */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};
