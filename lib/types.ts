export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  tags: string[];
  specifications?: Record<string, string>;
  variations?: ProductVariation[];
  mainFeatures?: string[];
  keyFeatures?: string[];
  whatsInTheBox?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  subcategories: Subcategory[];
  productCount: number;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  buttonText: string;
  active: boolean;
  order: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  code?: string;
  startDate: string;
  endDate: string;
  active: boolean;
  applicableCategories?: string[];
  applicableProducts?: string[];
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerImage?: string;
  rating: number;
  comment: string;
  location?: string;
  verified: boolean;
  featured: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "resolved";
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribed: boolean;
  subscribedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  billingAddress?: Address;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ProductVariation {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sku?: string;
}
