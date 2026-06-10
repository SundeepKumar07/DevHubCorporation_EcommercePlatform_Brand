// src/components/RecommendedItems.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/data";
import Link from "next/link";

export default function RecommendedItems() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">

      {/* ── Section Header ── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Recommended items
        </h2>
        <Link
          href="/products"
          className="text-sm text-blue-600 hover:underline"
        >
          See all →
        </Link>
      </div>

      {/* ── Product Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="relative bg-white border border-gray-200 rounded group hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col overflow-hidden"
          >
            {/* Wishlist button */}
            <button
              onClick={(e) => toggleWishlist(e, product.id)}
              className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 hover:border-red-200 transition-colors"
              aria-label="Save to wishlist"
            >
              <svg
                className={`w-4 h-4 transition-colors ${
                  wishlist.includes(product.id)
                    ? "fill-red-500 stroke-red-500"
                    : "fill-none stroke-gray-400 group-hover:stroke-red-400"
                }`}
                viewBox="0 0 24 24"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                />
              </svg>
            </button>

            {/* Discount badge */}
            {product.discount && (
              <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                -{product.discount}%
              </span>
            )}

            {/* Product Image */}
            <div className="relative w-full h-[150px] sm:h-[160px] bg-gray-50 p-3">
              <Image
                src={product.image}
                alt={product.title}
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Card Body */}
            <div className="p-3 flex flex-col flex-1">
              {/* Price */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                )}
              </div>

              {/* Name */}
              <p className="text-xs text-gray-600 leading-snug line-clamp-2 mb-2 flex-1">
                {product.title}
              </p>

              {/* Rating + Shipping */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3 fill-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[10px] text-gray-500">
                    {product.rating}
                  </span>
                </div>
                {product.shipping === "Free Shipping" && (
                  <span className="text-[10px] text-green-600 font-medium">
                    Free shipping
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}