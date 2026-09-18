import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

interface WishlistViewProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddAllToCart: () => void;
  onExplore: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onAddAllToCart,
  onExplore,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-md mx-auto px-3.5 py-4 pb-24">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-[#202022]/8 mb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#74584D]">
            BỘ SƯU TẬP CỦA BẠN
          </span>
          <h2 className="font-serif text-[23px] font-normal text-[#1C1C19] mt-0.5">
            Sản Phẩm Yêu Thích
          </h2>
          <span className="text-[11px] text-[#202022]/60">
            {wishlistedProducts.length} sản phẩm được lưu
          </span>
        </div>

        {wishlistedProducts.length > 0 && (
          <button
            onClick={onAddAllToCart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#08080A] text-white text-[11px] font-bold tracking-wider uppercase hover:bg-[#202022] cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Thêm tất cả</span>
          </button>
        )}
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white border border-[#202022]/10 flex items-center justify-center text-[#202022]/40 mb-4">
            <Heart className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-[20px] font-normal text-[#1C1C19] mb-1">
            Chưa Có Sản Phẩm Yêu Thích
          </h3>
          <p className="text-[12.5px] text-[#202022]/60 max-w-xs mb-6">
            Nhấn vào biểu tượng trái tim trên các sản phẩm GLANZ để lưu lại các tinh chất dưỡng da yêu thích của bạn.
          </p>
          <button
            onClick={onExplore}
            className="px-6 py-3 rounded-full bg-[#08080A] text-white text-[11px] font-bold tracking-[0.12em] uppercase hover:bg-[#202022] cursor-pointer"
          >
            Khám Phá Bộ Sưu Tập
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {wishlistedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};
