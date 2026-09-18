export interface Product {
  id: string;
  name: string;
  subtitle: string;
  badge: string; // e.g. "BÁN CHẠY", "TÁI SINH", "CẤP ẨM", "HỘP 5 MIẾNG"
  badgeType?: 'bestseller' | 'regenerate' | 'hydrate' | 'mask' | 'new';
  brand: string; // "GLANZ"
  size: string; // "30ML", "50G", "150ML", "5 MIẾNG"
  price: number;
  originalPrice?: number;
  rating: number;
  soldCount: string; // "1.8k", "1.2k", "950", "780"
  note?: string; // "Tặng kèm thìa bạc", "Nguyên bản 100%", "Thạch Collagen"
  category: 'serum' | 'cream' | 'toner' | 'mask';
  categoryName: string;
  image: string;
  galleryImages: string[];
  description: string;
  skinType: string;
  routineStep: string;
  keyIngredients: string[];
  clinicalProof: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export type ActiveTab = 'home' | 'categories' | 'wishlist' | 'cart' | 'account';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  tier: string;
  skinType: string;
  skinConcerns: string[];
  memberPoints: number;
  ordersCount: number;
}
