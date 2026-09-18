import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl border border-[#202022]/7 overflow-hidden flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(216,180,166,0.18)] hover:border-[#D8B4A6]/60 transition-all duration-300 group"
    >
      {/* Top Image + Badges Container */}
      <div className="relative w-full aspect-[1/1.05] bg-[#F6F3EE] overflow-hidden">
        {/* Click to open product detail */}
        <button
          onClick={() => onSelectProduct(product)}
          className="w-full h-full text-left cursor-pointer"
          aria-label={`Xem chi tiết ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </button>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between pointer-events-none">
          {/* Badge pill matching screenshot */}
          <div className="pointer-events-auto px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-[#202022]/10 text-[9px] font-bold tracking-[0.1em] text-[#202022] uppercase shadow-xs">
            {product.badge}
          </div>

          {/* Heart wishlist button */}
          <button
            id={`btn-wishlist-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="pointer-events-auto w-7 h-7 rounded-full bg-white/90 backdrop-blur-md border border-[#202022]/10 flex items-center justify-center text-[#202022] hover:bg-white active:scale-90 transition-all shadow-xs"
            aria-label="Thêm vào yêu thích"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isWishlisted
                  ? 'fill-[#ba1a1a] text-[#ba1a1a]'
                  : 'text-[#202022]/70 hover:text-[#202022]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Info Container matching screenshot */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-1.5">
        <div
          onClick={() => onSelectProduct(product)}
          className="cursor-pointer"
        >
          {/* Brand and Size */}
          <div className="text-[10px] tracking-[0.14em] uppercase text-[#202022]/60 font-semibold mb-0.5">
            {product.brand} • {product.size}
          </div>

          {/* Product Name */}
          <h4 className="font-serif text-[14px] leading-snug font-medium text-[#1C1C19] line-clamp-1 group-hover:text-[#74584D] transition-colors">
            {product.name}
          </h4>

          {/* Subtitle / Key benefit */}
          <p className="text-[11px] leading-[15px] text-[#202022]/65 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Rating & Sold count */}
          <div className="flex items-center gap-1.5 mt-1.5 text-[10.5px] text-[#202022]/70">
            <span className="flex items-center text-[#9E6B30] font-semibold">
              <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37] mr-0.5" />
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[#202022]/30">|</span>
            <span>Đã bán {product.soldCount}</span>
          </div>
        </div>

        {/* Bottom Price & Add to Cart button */}
        <div className="flex items-end justify-between pt-1 border-t border-[#202022]/5 mt-1">
          <div className="flex flex-col">
            <span className="font-semibold text-[14.5px] text-[#1C1C19] tracking-tight">
              {formatPrice(product.price)}
            </span>

            {/* Sub-text: Original price strikethrough or special note */}
            {product.originalPrice ? (
              <span className="text-[10.5px] text-[#202022]/45 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            ) : product.note ? (
              <span className="text-[10px] text-[#74584D] font-medium tracking-tight">
                {product.note}
              </span>
            ) : (
              <span className="text-[10px] text-[#8A9A86] font-medium">Chính hãng</span>
            )}
          </div>

          {/* Black circle Cart Add button */}
          <button
            id={`btn-add-cart-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-9 h-9 rounded-full bg-[#08080A] text-white flex items-center justify-center hover:bg-[#202022] active:scale-90 transition-all shadow-xs cursor-pointer"
            aria-label={`Thêm ${product.name} vào giỏ`}
          >
            <ShoppingCart className="w-4 h-4 stroke-[1.8]" />
          </button>
        </div>
      </div>
    </div>
  );
};
