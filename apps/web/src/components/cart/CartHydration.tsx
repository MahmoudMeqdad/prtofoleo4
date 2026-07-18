"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

export function CartHydration() {
  useEffect(() => {
    void Promise.resolve(useCartStore.persist.rehydrate()).finally(() => {
      useCartStore.getState().setHydrated(true);
    });
  }, []);
  return null;
}
