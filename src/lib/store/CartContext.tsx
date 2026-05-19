// src/lib/store/CartContext.tsx
"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { Product, CartItem, Cart } from "@/types";

// ── Action Types ───────────────────────────────────
type CartAction =
  | { type: "ADD_ITEM";    payload: { product: Product; quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: number }                   }
  | { type: "UPDATE_QTY";  payload: { productId: number; quantity: number } }
  | { type: "CLEAR_CART"                                                    }
  | { type: "LOAD_CART";   payload: CartItem[]                              };

// ── Reducer ────────────────────────────────────────
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {

    case "ADD_ITEM": {
      const { product, quantity = 1 } = action.payload;
      const existing = state.find((i) => i.product.id === product.id);

      if (existing) {
        return state.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(99, i.quantity + quantity) }
            : i
        );
      }
      return [...state, { product, quantity }];
    }

    case "REMOVE_ITEM":
      return state.filter((i) => i.product.id !== action.payload.productId);

    case "UPDATE_QTY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter((i) => i.product.id !== productId);
      }
      return state.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: Math.min(99, quantity) }
          : i
      );
    }

    case "CLEAR_CART":
      return [];

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
}

// ── Context Value Type ─────────────────────────────
interface CartContextValue {
  cart:      Cart;
  items:     CartItem[];
  addItem:   (product: Product, quantity?: number) => void;
  removeItem:(productId: number)                   => void;
  updateQty: (productId: number, quantity: number) => void;
  clearCart: ()                                    => void;
  isInCart:  (productId: number)                   => boolean;
  getItem:   (productId: number) => CartItem | undefined;
}

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY   = "kenakata_cart";

// ── Provider ───────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  // Mount e localStorage restore
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "LOAD_CART", payload: parsed });
        }
      }
    } catch {
      localStorage.removeItem(CART_KEY);
    }
  }, []);

  // items change hoile localStorage sync
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // localStorage full hoile silent fail
    }
  }, [items]);

  // ── Actions ─────────────────────────────────────
  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
  }, []);

  const removeItem = useCallback((productId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  }, []);

  const updateQty = useCallback((productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QTY", payload: { productId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const isInCart = useCallback(
    (productId: number) => items.some((i) => i.product.id === productId),
    [items]
  );

  const getItem = useCallback(
    (productId: number) => items.find((i) => i.product.id === productId),
    [items]
  );

  // ── Computed cart summary ────────────────────────
  const cart = useMemo<Cart>(() => {
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal  = items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
    const shipping  = subtotal > 50 ? 0 : 9.99;
    const tax       = subtotal * 0.08; // 8% tax
    const total     = subtotal + shipping + tax;

    return { items, total, itemCount, subtotal, shipping, tax };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ cart, items, addItem, removeItem, updateQty, clearCart, isInCart, getItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}