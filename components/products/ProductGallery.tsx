// src/components/product/ProductGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/data";

export default function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);

  // Use same image multiple times as thumbnails (demo data only has 1 image)
  const images = Array.from({ length: 5 }, () => product.image);

  return (
    <div className="flex flex-col gap-3">

      {/* Main image */}
      <div className="relative w-full h-[280px] sm:h-[320px] bg-gray-50 border border-gray-100 rounded overflow-hidden">
        <Image
          src={images[selected]}
          alt={product.title}
          className="object-contain p-6"
          priority
        />
        {product.discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`relative w-14 h-14 flex-shrink-0 border-2 rounded overflow-hidden transition-colors ${
              i === selected
                ? "border-blue-500"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <Image
              src={img}
              alt={`${product.title} ${i + 1}`}
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}