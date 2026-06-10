// src/components/DealsSection.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { dealProducts } from "@/data/data";
import Link from "next/link";

function useCountdown(targetHours: number) {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: targetHours,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function DealsSection() {
  const { days, hours, minutes, seconds } = useCountdown(13);

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="border border-gray-200 rounded bg-white overflow-hidden">
        <div className="flex items-stretch flex-row sm:flec-col">

          {/* ── Left: Label + Timer ── */}
          <div className="flex flex-col justify-center px-6 py-5 min-w-[200px] border-r border-gray-200 flex-shrink-0">
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              Deals and offers
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Hygiene equipments
            </p>

            {/* Countdown */}
            <div className="flex gap-2">
              {[
                { label: "Days", value: days },
                { label: "Hour", value: hours },
                { label: "Min",  value: minutes },
                { label: "Sec",  value: seconds },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center bg-gray-800 text-white rounded px-2 py-1 min-w-[42px]"
                >
                  <span className="text-base font-bold leading-tight">
                    {pad(value)}
                  </span>
                  <span className="text-[10px] opacity-70 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Scrollable product list ── */}
          <div className="flex overflow-x-auto scrollbar-hide flex-1">
            {dealProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="flex flex-col items-center justify-between p-4 border-r border-gray-100 last:border-r-0 min-w-[150px] hover:bg-gray-50 transition-colors flex-shrink-0 group"
              >
                {/* Product image */}
                <div className="relative w-[90px] h-[90px] mb-3">
                  <Image
                    src={product.image}
                    alt={product.title}
                    priority
                    className="object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Product name */}
                <p className="text-xs text-gray-700 text-center leading-snug mb-2 line-clamp-2">
                  {product.title}
                </p>

                {/* Discount badge */}
                {product.discount && (
                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
                    -{product.discount}%
                  </span>
                )}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}