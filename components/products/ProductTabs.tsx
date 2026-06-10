// src/components/product/ProductTabs.tsx
"use client";

import { useState } from "react";
import { Product } from "@/data/data";

const tabs = ["Description", "Reviews", "Shipping", "About seller"];

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState("Description");

  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden">

      {/* Tab header */}
      <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-5 py-3 text-sm font-medium flex-shrink-0 border-b-2 transition-colors ${
              active === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5">

        {active === "Description" && (
          <div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {product.description} Lorem ipsum dolor sit amet, consectetur
              adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </p>

            {/* Specs table */}
            <div className="border border-gray-200 rounded overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "Brand",    value: product.brand },
                    { label: "Category", value: product.category },
                    { label: "Rating",   value: `${product.rating} / 5` },
                    { label: "Stock",    value: `${product.stock} units available` },
                    { label: "Shipping", value: product.shipping ?? "Standard delivery" },
                  ].map(({ label, value }, i) => (
                    <tr
                      key={label}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-2.5 text-gray-500 font-medium w-36 border-r border-gray-200">
                        {label}
                      </td>
                      <td className="px-4 py-2.5 text-gray-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active === "Reviews" && (
          <div className="space-y-4">
            {[
              { name: "John D.",  rating: 5, comment: "Excellent product, exactly as described. Fast delivery!" },
              { name: "Sara M.", rating: 4, comment: "Good quality, would recommend to others." },
              { name: "Ali K.",  rating: 5, comment: "Amazing value for money. Very satisfied." },
            ].map((review, i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} className={`w-3 h-3 ${j < review.rating ? "fill-yellow-400" : "fill-gray-200"}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {active === "Shipping" && (
          <div className="space-y-3">
            {[
              { icon: "🚚", title: "Standard delivery", detail: "5–7 business days · Free on orders over $50" },
              { icon: "⚡", title: "Express delivery",  detail: "2–3 business days · $9.99" },
              { icon: "🌍", title: "International",     detail: "10–14 business days · Rates vary by country" },
            ].map((opt) => (
              <div key={opt.title} className="flex items-start gap-3 p-3 border border-gray-100 rounded">
                <span className="text-xl">{opt.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{opt.title}</p>
                  <p className="text-sm text-gray-500">{opt.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {active === "About seller" && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">
                {product.brand.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{product.brand} Trading LLC</p>
                <p className="text-sm text-gray-500">Member since 2018 · Germany</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Response rate", value: "98%" },
                { label: "On-time delivery", value: "96%" },
                { label: "Products", value: "240+" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded p-3 text-center">
                  <p className="text-lg font-bold text-blue-600">{value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}