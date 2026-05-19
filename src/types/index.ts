// src/types/index.ts

export interface Category {
  id: number;
  name: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "customer";
  avatar: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductFilters {
  title?: string;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
  offset?: number;
  limit?: number;
  sortBy?: "price" | "title" | "id";
  sortOrder?: "asc" | "desc";
}
export interface Cart {
  items:     CartItem[];
  total:     number;
  itemCount: number;
  subtotal:  number;
  shipping:  number;
  tax:       number;
}

export interface OrderItem {
  product:  Product;
  quantity: number;
  price:    number;
}

export interface Order {
  id:          string;
  items:       OrderItem[];
  total:       number;
  shipping:    number;
  tax:         number;
  status:      "processing" | "shipped" | "delivered" | "cancelled";
  createdAt:   string;
  deliveredAt?: string;
  address: {
    firstName: string;
    lastName:  string;
    address:   string;
    city:      string;
    state:     string;
    zipCode:   string;
    country:   string;
  };
}

export interface OrderDetails {
  orderId:   string;
  items:     CartItem[];
  total:     number;
  shipping:  number;
  tax:       number;
  formData:  import("@/lib/validations/checkout").CheckoutFormData;
  createdAt: string;
}