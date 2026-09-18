import React, { useState } from 'react';
import { Search, X, TrendingUp, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const popularKeywords = ['Serum ngọc trai', 'Kem phục hồi', 'Toner hữu cơ', 'Mặt nạ sinh học', 'Niacinamide'];

  const results = searchTerm.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-xs p-3 pt-6 animate-in fade-in">
      <div
        id="search-modal-container"
        className="w-full max-w-md bg-[#FAF7F2] rounded-3xl p-4 shadow-2xl border border-[#202022]/10 max-h-[85vh] flex flex-col"
      >
        {/* Search input header */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#202022]/8">
          <Search className="w-5 h-5 text-[#202022]/50 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm tinh chất, kem dưỡng, mặt nạ..."
            className="flex-1 bg-transparent text-[14px] text-[#1C1C19] placeholder:text-[#202022]/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#202022]/10 flex items-center justify-center text-[#202022]/70 hover:text-[#1C1C19] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-3 overflow-y-auto flex-1">
          {searchTerm.trim() === '' ? (
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#74584D] mb-2.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Từ khóa tìm kiếm thịnh hành
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {popularKeywords.map((kw, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchTerm(kw)}
                    className="px-3 py-1.5 rounded-full bg-white border border-[#202022]/8 text-[11.5px] text-[#202022]/80 hover:border-[#D8B4A6] hover:text-[#74584D] cursor-pointer transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>

              <div className="text-[11px] font-bold uppercase tracking-wider text-[#202022]/50 mb-2">
                Gợi ý cho bạn
              </div>
              <div className="space-y-2">
                {products.slice(0, 2).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white border border-[#202022]/5 hover:border-[#D8B4A6]/50 cursor-pointer transition-all"
                  >
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif text-[13px] font-medium text-[#1C1C19] line-clamp-1">{p.name}</h5>
                      <p className="text-[11px] text-[#202022]/60">{p.subtitle}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#202022]/30" />
                  </div>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-[#202022]/50 block mb-1">
                Tìm thấy {results.length} kết quả
              </span>
              {results.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#202022]/7 hover:border-[#D8B4A6] cursor-pointer transition-all"
                >
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-[13.5px] font-medium text-[#1C1C19] line-clamp-1">{p.name}</h5>
                    <p className="text-[11px] text-[#202022]/65 line-clamp-1">{p.subtitle}</p>
                    <span className="text-[12px] font-semibold text-[#74584D]">
                      {new Intl.NumberFormat('vi-VN').format(p.price)}đ
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-[12.5px] text-[#202022]/60">
              Không tìm thấy sản phẩm nào khớp với &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
