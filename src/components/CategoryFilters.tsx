import React from 'react';
import { CATEGORIES } from '../data/products';

interface CategoryFiltersProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  productCount: number;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  activeCategory,
  onSelectCategory,
  productCount,
}) => {
  return (
    <div className="mx-3.5 mt-5 mb-3">
      {/* Title + Count row */}
      <div className="flex items-baseline justify-between mb-3 px-1">
        <h3 className="font-serif text-[21px] font-normal tracking-tight text-[#1C1C19]">
          Danh Mục Sản Phẩm
        </h3>
        <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#202022]/60">
          {productCount} SẢN PHẨM
        </span>
      </div>

      {/* Horizontal pill list matching screenshot */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#08080A] text-white shadow-xs'
                  : 'bg-[#EBE8E3]/80 hover:bg-[#E5E2DD] text-[#202022]/80'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
