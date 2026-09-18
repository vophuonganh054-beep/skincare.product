import { useState, useMemo } from 'react';
import { Product, CartItem, ActiveTab } from './types';
import { INITIAL_PRODUCTS, USER_MOCK } from './data/products';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { RitualBanner } from './components/RitualBanner';
import { CategoryFilters } from './components/CategoryFilters';
import { ProductCard } from './components/ProductCard';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { BottomNav } from './components/BottomNav';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartView } from './components/CartView';
import { CategoryView } from './components/CategoryView';
import { WishlistView } from './components/WishlistView';
import { AccountView } from './components/AccountView';
import { SearchModal } from './components/SearchModal';
import { NotificationModal } from './components/NotificationModal';
import { Toast } from './components/Toast';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  // Products
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Active Category Filter on Home Screen
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Active navigation tab ('home', 'categories', 'wishlist', 'cart', 'account')
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Initial 2 items in cart to match badge "2" in screenshot
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0], // GLANZ Radiance Pearl Serum
      quantity: 1,
    },
    {
      product: INITIAL_PRODUCTS[1], // GLANZ Regenerating Cream
      quantity: 1,
    },
  ]);

  // Wishlisted product IDs
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    INITIAL_PRODUCTS[0].id,
  ]);

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Desktop view toggle: Phone frame vs Responsive expanded
  const [viewMode, setViewMode] = useState<'mobile' | 'expanded'>('mobile');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
  };

  // Filtered products for Home Screen
  const filteredHomeProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Total quantity in cart for header and nav badge
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Đã làm trống giỏ hàng');
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const isAlready = prev.includes(productId);
      if (isAlready) {
        showToast('Đã xóa khỏi danh sách yêu thích');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Đã thêm vào danh sách yêu thích');
        return [...prev, productId];
      }
    });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleAddAllWishlistToCart = () => {
    const wishlisted = products.filter((p) => wishlistIds.includes(p.id));
    wishlisted.forEach((p) => {
      setCartItems((prev) => {
        const exists = prev.find((item) => item.product.id === p.id);
        if (exists) return prev;
        return [...prev, { product: p, quantity: 1 }];
      });
    });
    showToast(`Đã thêm ${wishlisted.length} sản phẩm vào giỏ hàng`);
  };

  return (
    <div className="min-h-screen bg-[#F0EDE9] text-[#1C1C19] flex flex-col items-center justify-start selection:bg-[#D8B4A6]/30">
      {/* Top Device Switcher for Reviewing Experience */}
      <div className="w-full bg-[#1C1C19] text-[#FAF7F2] py-1.5 px-4 flex items-center justify-between text-[11px] shadow-sm z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8A9A86] animate-pulse" />
          <span className="font-serif font-medium tracking-wide">
            GLANZ Atelier Boutique • Thiết kế chuẩn hình mẫu
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 bg-[#202022] p-0.5 rounded-lg border border-white/10">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-white text-[#1C1C19] font-bold shadow-xs'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Màn Hình Chuẩn (Ảnh)</span>
          </button>
          <button
            onClick={() => setViewMode('expanded')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'expanded'
                ? 'bg-white text-[#1C1C19] font-bold shadow-xs'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Mở Rộng Desktop</span>
          </button>
        </div>
      </div>

      {/* Main Container - Mobile Centered Frame matching screenshot or Expanded Desktop */}
      <main
        className={`w-full bg-[#FAF7F2] min-h-screen transition-all duration-300 relative shadow-2xl flex flex-col ${
          viewMode === 'mobile'
            ? 'max-w-[440px] my-0 sm:my-4 sm:rounded-[36px] sm:border sm:border-[#202022]/15 overflow-hidden'
            : 'max-w-4xl my-0 sm:my-6 sm:rounded-3xl sm:border sm:border-[#202022]/15'
        }`}
      >
        {/* Sticky Header matching screenshot */}
        <Header
          cartCount={totalCartCount}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          onOpenCart={() => setActiveTab('cart')}
          onGoHome={() => setActiveTab('home')}
        />

        {/* Tab 1: Trang Chủ (Home Screen matching screenshot 100%) */}
        {activeTab === 'home' && (
          <div className="pb-24 animate-in fade-in duration-200">
            {/* Hero Banner with slider and CTA */}
            <HeroBanner
              onExplore={() => {
                const el = document.getElementById('home-product-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Ritual Ribbon Card */}
            <RitualBanner
              onOpenRitualGuide={() => {
                setActiveTab('categories');
              }}
            />

            {/* Category Filter section */}
            <div id="home-product-section">
              <CategoryFilters
                activeCategory={selectedCategory}
                onSelectCategory={(catId) => setSelectedCategory(catId)}
                productCount={filteredHomeProducts.length}
              />
            </div>

            {/* 2-Column Product Grid matching screenshot */}
            <div className="mx-3.5 grid grid-cols-2 gap-3">
              {filteredHomeProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onSelectProduct={handleSelectProduct}
                />
              ))}
            </div>

            {/* Brand Philosophy Section matching screenshot */}
            <BrandPhilosophy />
          </div>
        )}

        {/* Tab 2: Danh Mục (Category Catalog Screen) */}
        {activeTab === 'categories' && (
          <div className="animate-in fade-in duration-200">
            <CategoryView
              products={products}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onSelectProduct={handleSelectProduct}
            />
          </div>
        )}

        {/* Tab 3: Yêu Thích (Wishlist Screen) */}
        {activeTab === 'wishlist' && (
          <div className="animate-in fade-in duration-200">
            <WishlistView
              products={products}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onSelectProduct={handleSelectProduct}
              onAddAllToCart={handleAddAllWishlistToCart}
              onExplore={() => setActiveTab('home')}
            />
          </div>
        )}

        {/* Tab 4: Giỏ Hàng (Shopping Cart Screen) */}
        {activeTab === 'cart' && (
          <div className="animate-in fade-in duration-200">
            <CartView
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveCartItem}
              onContinueShopping={() => setActiveTab('home')}
              onClearCart={handleClearCart}
            />
          </div>
        )}

        {/* Tab 5: Tài Khoản (Account & Skin Routine Profile Screen) */}
        {activeTab === 'account' && (
          <div className="animate-in fade-in duration-200">
            <AccountView user={USER_MOCK} />
          </div>
        )}

        {/* Fixed 5-tab Bottom Navigation matching screenshot */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
        />

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onAddToCart={handleAddToCart}
          isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={products}
          onSelectProduct={handleSelectProduct}
        />

        {/* Notification Modal */}
        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
        />

        {/* Real-time Toast Feedback */}
        <Toast
          message={toastMessage}
          isVisible={isToastVisible}
          onClose={() => setIsToastVisible(false)}
        />
      </main>
    </div>
  );
}
