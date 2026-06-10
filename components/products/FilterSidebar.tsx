// src/components/products/FilterSidebar.tsx
"use client";

import { useState } from "react";

const categories = ["Mobile accessory", "Electronics", "Smartphones", "Gaming", "Modern tech"];
const brands     = ["Samsung", "Apple", "Huawei", "Poco", "Lenovo", "Xiaomi", "Razer"];
const features   = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
const conditions = ["Any", "Brand new", "Refurbished", "Old items"];

interface FilterState {
  brands: string[];
  features: string[];
  condition: string;
  rating: number | null;
  minPrice: number;
  maxPrice: number;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose?: () => void;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && children}
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, onClose }: Props) {
  const toggle = (key: "brands" | "features", val: string) => {
    const arr = filters[key];
    onChange({
      ...filters,
      [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded p-4 h-fit">

      {/* Mobile close button */}
      {onClose && (
        <div className="flex items-center justify-between mb-4 md:hidden">
          <span className="text-sm font-semibold text-gray-800">Filters</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Category */}
      <Section title="Category">
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                {cat}
              </a>
            </li>
          ))}
          <li>
            <a href="#" className="text-xs text-blue-500 hover:underline font-medium">
              See all
            </a>
          </li>
        </ul>
      </Section>

      {/* Brands */}
      <Section title="Brands">
        <ul className="space-y-2">
          {brands.map((brand) => (
            <li key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onChange={() => toggle("brands", brand)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </Section>

      {/* Features */}
      <Section title="Features">
        <ul className="space-y-2">
          {features.map((feat) => (
            <li key={feat} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`feat-${feat}`}
                checked={filters.features.includes(feat)}
                onChange={() => toggle("features", feat)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <label
                htmlFor={`feat-${feat}`}
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                {feat}
              </label>
            </li>
          ))}
        </ul>
      </Section>

      {/* Price Range */}
      <Section title="Price range">
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) =>
              onChange({ ...filters, minPrice: Number(e.target.value) })
            }
            placeholder="Min"
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-400"
          />
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: Number(e.target.value) })
            }
            placeholder="Max"
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-400"
          />
        </div>
        <button
          onClick={() => onChange({ ...filters })}
          className="w-full border border-blue-600 text-blue-600 text-sm py-1.5 rounded hover:bg-blue-50 transition-colors font-medium"
        >
          Apply
        </button>
      </Section>

      {/* Condition */}
      <Section title="Condition">
        <ul className="space-y-2">
          {conditions.map((cond) => (
            <li key={cond} className="flex items-center gap-2">
              <input
                type="radio"
                id={`cond-${cond}`}
                name="condition"
                checked={filters.condition === cond}
                onChange={() => onChange({ ...filters, condition: cond })}
                className="w-4 h-4 accent-blue-600"
              />
              <label
                htmlFor={`cond-${cond}`}
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                {cond}
              </label>
            </li>
          ))}
        </ul>
      </Section>

      {/* Ratings */}
      <Section title="Ratings">
        <ul className="space-y-2">
          {[5, 4, 3, 2].map((star) => (
            <li key={star} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`star-${star}`}
                checked={filters.rating === star}
                onChange={() =>
                  onChange({
                    ...filters,
                    rating: filters.rating === star ? null : star,
                  })
                }
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <label
                htmlFor={`star-${star}`}
                className="flex items-center gap-1 cursor-pointer select-none"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${i < star ? "fill-yellow-400" : "fill-gray-200"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500">& up</span>
              </label>
            </li>
          ))}
        </ul>
      </Section>

    </div>
  );
}