// src/app/products/page.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/data";

const ITEMS_PER_PAGE = 9;

// ── Types ──────────────────────────────────────────
interface FilterState {
  brands: string[];
  condition: string;
  rating: number | null;
  minPrice: number;
  maxPrice: number;
}

const defaultFilters: FilterState = {
  brands:    [],
  condition: "Any",
  rating:    null,
  minPrice:  0,
  maxPrice:  999999,
};

// ── Helpers ────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < Math.round(rating) ? "fill-yellow-400" : "fill-gray-200"}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const brands     = ["Samsung", "Apple", "Huawei", "Poco", "Lenovo", "Xiaomi", "Razer", "Sony", "Canon", "ASUS"];
const conditions = ["Any", "Brand new", "Refurbished", "Old items"];

// ── Filter Sidebar ─────────────────────────────────
function FilterSidebar({
  filters,
  onChange,
  onClose,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onClose?: () => void;
}) {
  const [openSections, setOpenSections] = useState({
    category: true,
    brands: true,
    price: true,
    condition: true,
    rating: true,
  });

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleBrand = (brand: string) => {
    const arr = filters.brands;
    onChange({
      ...filters,
      brands: arr.includes(brand) ? arr.filter((b) => b !== brand) : [...arr, brand],
    });
  };

  return (
    <div className="w-full bg-white">
      {/* Mobile header */}
      {onClose && (
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
          <span className="font-semibold text-gray-800">Filters</span>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="p-4 space-y-1">

        {/* Category */}
        <div className="border-b border-gray-100 pb-4">
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-sm font-semibold text-gray-800">Category</span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${openSections.category ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSections.category && (
            <ul className="space-y-2.5">
              {["Mobile accessory", "Electronics", "Smartphones", "Gaming", "Modern tech"].map((cat) => (
                <li key={cat}>
                  <a href="#" className="text-sm text-blue-600 hover:underline">{cat}</a>
                </li>
              ))}
              <li><a href="#" className="text-xs text-blue-500 font-medium hover:underline">See all</a></li>
            </ul>
          )}
        </div>

        {/* Brands */}
        <div className="border-b border-gray-100 py-4">
          <button
            onClick={() => toggleSection("brands")}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-sm font-semibold text-gray-800">Brands</span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${openSections.brands ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSections.brands && (
            <ul className="space-y-2.5">
              {brands.slice(0, 5).map((brand) => (
                <li key={brand} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`b-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <label htmlFor={`b-${brand}`} className="text-sm text-gray-700 cursor-pointer select-none">{brand}</label>
                </li>
              ))}
              <li><a href="#" className="text-xs text-blue-500 font-medium hover:underline">See all</a></li>
            </ul>
          )}
        </div>

        {/* Price range */}
        <div className="border-b border-gray-100 py-4">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-sm font-semibold text-gray-800">Price range</span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${openSections.price ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSections.price && (
            <div>
              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ""}
                  onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-400"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice === 999999 ? "" : filters.maxPrice}
                  onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) || 999999 })}
                  className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <button className="w-full border border-blue-600 text-blue-600 text-sm py-1.5 rounded hover:bg-blue-50 transition-colors font-medium">
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Condition */}
        <div className="border-b border-gray-100 py-4">
          <button
            onClick={() => toggleSection("condition")}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-sm font-semibold text-gray-800">Condition</span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${openSections.condition ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSections.condition && (
            <ul className="space-y-2.5">
              {conditions.map((cond) => (
                <li key={cond} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`c-${cond}`}
                    name="condition"
                    checked={filters.condition === cond}
                    onChange={() => onChange({ ...filters, condition: cond })}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <label htmlFor={`c-${cond}`} className="text-sm text-gray-700 cursor-pointer select-none">{cond}</label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Ratings */}
        <div className="py-4">
          <button
            onClick={() => toggleSection("rating")}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-sm font-semibold text-gray-800">Ratings</span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${openSections.rating ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSections.rating && (
            <ul className="space-y-2.5">
              {[5, 4, 3, 2].map((star) => (
                <li key={star} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`r-${star}`}
                    checked={filters.rating === star}
                    onChange={() => onChange({ ...filters, rating: filters.rating === star ? null : star })}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <label htmlFor={`r-${star}`} className="flex items-center gap-1 cursor-pointer select-none">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < star ? "fill-yellow-400" : "fill-gray-200"}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">& up</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────
export default function ProductsPage() {
  const [filters, setFilters]           = useState<FilterState>(defaultFilters);
  const [view, setView]                 = useState<"grid" | "list">("list");
  const [sort, setSort]                 = useState("featured");
  const [page, setPage]                 = useState(1);
  const [verifiedOnly, setVerified]     = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // ── Filter logic ──
  const filtered = useMemo(() => {
    let r = [...products];
    if (filters.brands.length)    r = r.filter((p) => filters.brands.includes(p.brand));
    if (filters.rating)           r = r.filter((p) => p.rating >= filters.rating!);
    if (filters.minPrice > 0)     r = r.filter((p) => p.price >= filters.minPrice);
    if (filters.maxPrice < 999999) r = r.filter((p) => p.price <= filters.maxPrice);
    if (verifiedOnly)             r = r.filter((p) => p.featured);
    if (sort === "price-asc")     r.sort((a, b) => a.price - b.price);
    if (sort === "price-desc")    r.sort((a, b) => b.price - a.price);
    if (sort === "rating")        r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [filters, verifiedOnly, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const activeChips = [
    ...filters.brands.map((b) => ({
      label: b,
      clear: () => setFilters({ ...filters, brands: filters.brands.filter((x) => x !== b) }),
    })),
    ...(filters.rating
      ? [{ label: `${filters.rating}★ & up`, clear: () => setFilters({ ...filters, rating: null }) }]
      : []),
  ];

  const clearAll = () => { setFilters(defaultFilters); setPage(1); };

  const handleFilterChange = (f: FilterState) => { setFilters(f); setPage(1); };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mb-4 flex-wrap">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-800 font-medium">All Products</span>
        </nav>

        <div className="flex gap-4">

          {/* ── Sidebar — desktop only (lg+) ── */}
          <aside className="hidden lg:block w-[220px] flex-shrink-0 self-start sticky top-4">
            <div className="bg-white border border-gray-200 rounded overflow-hidden">
              <FilterSidebar filters={filters} onChange={handleFilterChange} />
            </div>
          </aside>

          {/* ── Mobile Filter Drawer ── */}
          {showMobileFilter && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowMobileFilter(false)}
              />
              {/* Drawer */}
              <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-xl overflow-y-auto">
                <FilterSidebar
                  filters={filters}
                  onChange={handleFilterChange}
                  onClose={() => setShowMobileFilter(false)}
                />
              </div>
            </div>
          )}

          {/* ── Right: Content ── */}
          <div className="flex-1 min-w-0">

            {/* ── Top bar ── */}
            <div className="bg-white border border-gray-200 rounded px-3 sm:px-4 py-3 flex flex-wrap items-center gap-2 sm:gap-3 mb-3">

              {/* Filter button — mobile & tablet */}
              <button
                onClick={() => setShowMobileFilter(true)}
                className="lg:hidden flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded px-3 py-1.5 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                <span className="hidden sm:inline">Filter</span>
              </button>

              {/* Result count */}
              <p className="text-sm text-gray-600 flex-1">
                <span className="font-semibold text-gray-900">{filtered.length}</span> items found
              </p>

              {/* Verified only — hidden on very small screens */}
              <label className="hidden sm:flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => setVerified(!verifiedOnly)}
                  className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${verifiedOnly ? "bg-blue-600" : "bg-gray-200"}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 ${verifiedOnly ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-sm text-gray-600">Verified only</span>
              </label>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="border border-gray-200 rounded px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-blue-400 bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              {/* Grid / List toggle */}
              <div className="flex border border-gray-200 rounded overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 transition-colors ${view === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-50"}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 transition-colors ${view === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-50"}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Active filter chips ── */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {activeChips.map((chip) => (
                  <span key={chip.label} className="flex items-center gap-1.5 bg-white border border-gray-200 text-sm text-gray-700 px-3 py-1 rounded-full">
                    {chip.label}
                    <button onClick={chip.clear} className="text-gray-400 hover:text-red-500 transition-colors leading-none">×</button>
                  </span>
                ))}
                <button onClick={clearAll} className="text-sm text-blue-600 hover:underline">
                  Clear all filter
                </button>
              </div>
            )}

            {/* ── GRID VIEW ── */}
            {view === "grid" && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {paginated.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md hover:border-blue-200 transition-all group"
                  >
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="relative h-[140px] sm:h-[160px] bg-gray-50">
                        {product.discount && (
                          <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            -{product.discount}%
                          </span>
                        )}
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain p-3 group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-gray-900">${product.price}</span>
                          {product.oldPrice && (
                            <span className="text-xs text-gray-400 line-through">${product.oldPrice}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2 leading-snug">
                          {product.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Stars rating={product.rating} />
                            <span className="text-[10px] text-gray-400">{product.rating}</span>
                          </div>
                          {product.shipping === "Free Shipping" && (
                            <span className="text-[10px] text-green-600 font-medium hidden sm:block">
                              Free shipping
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* ── LIST VIEW ── */}
            {view === "list" && (
              <div className="flex flex-col gap-3">
                {paginated.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md hover:border-blue-200 transition-all group"
                  >
                    <div className="flex flex-row">

                      {/* Image */}
                      <Link
                        href={`/products/${product.id}`}
                        className="relative w-[120px] sm:w-[180px] md:w-[200px] flex-shrink-0 bg-gray-50"
                      >
                        {product.discount && (
                          <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            -{product.discount}%
                          </span>
                        )}
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain p-3 group-hover:scale-105 transition-transform duration-200"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 p-3 sm:p-4 flex flex-col min-w-0">

                        <Link href={`/products/${product.id}`}>
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {product.title}
                          </h3>
                        </Link>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-base sm:text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.oldPrice && (
                            <span className="text-xs sm:text-sm text-gray-400 line-through">
                              ${product.oldPrice}
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                          <Stars rating={product.rating} />
                          <span className="text-xs text-gray-500">{product.rating}</span>
                          <span className="text-gray-300 text-xs">·</span>
                          <span className="text-xs text-gray-500">{product.reviews} reviews</span>
                          {product.shipping === "Free Shipping" && (
                            <>
                              <span className="text-gray-300 text-xs hidden sm:inline">·</span>
                              <span className="text-xs text-green-600 font-medium hidden sm:inline">
                                Free Shipping
                              </span>
                            </>
                          )}
                        </div>

                        {/* Description — hidden on mobile */}
                        <p className="hidden sm:block text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
                          {product.description}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-auto">
                          <Link
                            href={`/products/${product.id}`}
                            className="border border-blue-600 text-blue-600 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded hover:bg-blue-50 transition-colors"
                          >
                            View details
                          </Link>
                          <button className="border border-gray-200 text-gray-400 p-1.5 rounded hover:border-red-300 hover:text-red-400 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Empty state ── */}
            {paginated.length === 0 && (
              <div className="bg-white border border-gray-200 rounded p-12 text-center">
                <p className="text-gray-500 text-sm mb-3">No products match your filters.</p>
                <button onClick={clearAll} className="text-blue-600 text-sm hover:underline">
                  Clear all filters
                </button>
              </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-between mt-4 bg-white border border-gray-200 rounded px-3 sm:px-4 py-3 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Show</span>
                  <select className="border border-gray-200 rounded px-2 py-1 text-sm outline-none bg-white">
                    <option>9</option>
                    <option>18</option>
                    <option>27</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                        page === i + 1
                          ? "bg-blue-600 text-white border border-blue-600"
                          : "border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}