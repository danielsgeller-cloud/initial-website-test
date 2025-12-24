"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, CartState } from "@/lib/cart/types";
import { readCartFromStorage, writeCartToStorage } from "@/lib/cart/storage";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotalCents: number;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });

  useEffect(() => {
    setState(readCartFromStorage());
  }, []);

  useEffect(() => {
    writeCartToStorage(state);
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((n, it) => n + (it.quantity || 0), 0);
    const subtotalCents = state.items.reduce((n, it) => n + (it.priceCents || 0) * (it.quantity || 0), 0);

    function addItem(item: Omit<CartItem, "quantity">, qty: number = 1) {
      setState((prev) => {
        const existing = prev.items.find((x) => x.id === item.id);
        if (existing) {
          return {
            items: prev.items.map((x) =>
              x.id === item.id ? { ...x, quantity: Math.min(999, (x.quantity || 0) + qty) } : x
            ),
          };
        }
        return { items: [...prev.items, { ...item, quantity: Math.min(999, qty) }] };
      });
    }

    function setQty(id: string, qty: number) {
      const q = Math.max(0, Math.min(999, Math.floor(qty)));
      setState((prev) => ({
        items: q === 0 ? prev.items.filter((x) => x.id !== id) : prev.items.map((x) => (x.id === id ? { ...x, quantity: q } : x)),
      }));
    }

    function removeItem(id: string) {
      setState((prev) => ({ items: prev.items.filter((x) => x.id !== id) }));
    }

    function clear() {
      setState({ items: [] });
    }

    return { items: state.items, itemCount, subtotalCents, addItem, setQty, removeItem, clear };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
