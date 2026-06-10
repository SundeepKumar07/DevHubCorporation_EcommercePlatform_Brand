// src/components/product/AddToCartButton.tsx
"use client";

import { useState } from "react";
import { Product } from "@/data/data";

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const [qty, setQty]     = useState(1);

  const handleAdd = () => {
    // Store in localStorage for cart page
    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const existing = cart.find((i: any) => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: product.id, qty, price: product.price, title: product.title, image: product.image.src });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-2">
      {/* Qty selector */}
      <div className="flex items-center border border-gray-200 rounded overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors text-lg font-medium"
        >
          −
        </button>
        <span className="flex-1 text-center text-sm font-semibold text-gray-800 py-2">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors text-lg font-medium"
        >
          +
        </button>
      </div>

      {/* Add to cart */}
      <button
        onClick={handleAdd}
        className={`w-full py-2.5 rounded text-sm font-semibold transition-all duration-200 ${
          added
            ? "bg-green-500 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {added ? "✓ Added to cart!" : "Add to cart"}
      </button>
    </div>
  );
}