// src/components/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { heroBanners } from "@/data/data";
import Link from "next/link";

const categories = [
  "Automobiles",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools, equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
  "More category",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroBanners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex gap-3 h-[360px]">

        {/* ── Left: Category Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-[220px] flex-shrink-0 bg-white border border-gray-200 rounded overflow-hidden">
          {categories.map((cat, i) => (
            <Link key={i}
              href="#"
              className="flex items-center justify-between px-4 py-[10px] text-sm text-gray-700 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {cat}
              {cat === "More category" ? null : (
                <span className="text-gray-300 text-xs">›</span>
              )}
            </Link>
          ))}
        </aside>

        {/* ── Center: Banner Carousel ── */}
        <div className="relative flex-1 rounded overflow-hidden bg-gray-100 min-w-0">
          {heroBanners.map((banner, i) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                className="object-cover"
                priority={i === 0}
              />
              {/* Gradient overlay + text */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex flex-col justify-center px-8">
                <p className="text-white/80 text-sm mb-1 font-normal">
                  Latest trending
                </p>
                <h2 className="text-white text-2xl lg:text-[28px] font-bold leading-tight mb-5 max-w-[260px]">
                  {banner.title}
                </h2>
                <button className="bg-white text-gray-800 text-sm font-medium px-6 py-2 rounded w-fit hover:bg-gray-100 transition-colors">
                  Learn more
                </button>
              </div>
            </div>
          ))}

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-white w-5"
                    : "bg-white/50 w-2 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Right: Cards ── */}
        <div className="hidden lg:flex flex-col gap-3 w-[200px] flex-shrink-0">

          {/* User greeting card */}
          <div className="bg-white border border-gray-200 rounded p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 leading-tight">Hi, user</p>
                <p className="text-xs text-gray-500 leading-tight">let's get started</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white text-sm py-1.5 rounded mb-2 hover:bg-blue-700 transition-colors font-medium">
              Join now
            </button>
            <button className="border border-blue-600 text-blue-600 text-sm py-1.5 rounded hover:bg-blue-50 transition-colors font-medium">
              Log in
            </button>
          </div>

          {/* $10 Off promo card */}
          <div className="bg-orange-400 rounded p-4 text-white flex-1 flex flex-col justify-center">
            <p className="text-sm font-bold leading-tight">Get US $10 off</p>
            <p className="text-xs opacity-90 mt-1 leading-snug">
              with a new supplier
            </p>
          </div>

          {/* Send quotes card */}
          <div className="bg-blue-500 rounded p-4 text-white flex-1 flex flex-col justify-center">
            <p className="text-sm font-bold leading-snug">
              Send quotes with supplier preferences
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}