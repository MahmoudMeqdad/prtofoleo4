"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { addCartLine, updateCartLineQuantity, type CartItem } from "./cart-types";

interface CartState {
  items: CartItem[];
  hydrated: boolean;
  drawerOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  setDrawerOpen: (open: boolean) => void;
  setHydrated: (ready: boolean) => void;
}

const safeStorage = {
  getItem(name: string) {
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem(name: string, value: string) {
    try {
      window.localStorage.setItem(name, value);
    } catch {}
  },
  removeItem(name: string) {
    try {
      window.localStorage.removeItem(name);
    } catch {}
  },
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,
      drawerOpen: false,
      addItem: (item) => set((state) => ({ items: addCartLine(state.items, item) })),
      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((item) => item.key !== key) })),
      updateQuantity: (key, quantity) =>
        set((state) => ({ items: updateCartLineQuantity(state.items, key, quantity) })),
      clearCart: () => set({ items: [] }),
      setDrawerOpen: (drawerOpen) => set({ drawerOpen }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "velvet-kids-cart-v1",
      version: 1,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    },
  ),
);

export function getCartItemCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
