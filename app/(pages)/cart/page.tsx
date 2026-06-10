// src/app/cart/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CartItem {
  id: number;
  qty: number;
  price: number;
  title: string;
  brand: string;
}

interface SavedItem {
  id: number;
}

// ── Trust badge component ──
function TrustBadge({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-500">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [cartItems, setCartItems]   = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [coupon, setCoupon]         = useState("");
  const [discount, setDiscount]     = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [mounted, setMounted]       = useState(false);

  // ── Load from localStorage ──
  useEffect(() => {
    setMounted(true);
    try {
      const stored = JSON.parse(localStorage.getItem("cart") ?? "[]");
      // If empty, load demo items from products
      if (stored.length === 0) {
        const demo: CartItem[] = products.slice(0, 3).map((p) => ({
          id:    p.id,
          qty:   p.id === 1 ? 2 : p.id === 2 ? 1 : 3,
          price: p.price,
          title: p.title,
          brand: p.brand,
        }));
        setCartItems(demo);
      } else {
        setCartItems(stored);
      }
      const storedSaved = JSON.parse(localStorage.getItem("saved") ?? "[]");
      if (storedSaved.length === 0) {
        setSavedItems(products.slice(3, 7).map((p) => ({ id: p.id })));
      } else {
        setSavedItems(storedSaved);
      }
    } catch {
      setCartItems([]);
    }
  }, []);

  // ── Persist to localStorage ──
  const persist = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const persistSaved = (items: SavedItem[]) => {
    setSavedItems(items);
    localStorage.setItem("saved", JSON.stringify(items));
  };

  // ── Cart actions ──
  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return;
    persist(cartItems.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const removeItem = (id: number) => {
    persist(cartItems.filter((i) => i.id !== id));
  };

  const saveForLater = (id: number) => {
    removeItem(id);
    if (!savedItems.find((s) => s.id === id)) {
      persistSaved([...savedItems, { id }]);
    }
  };

  const moveToCart = (id: number) => {
    persistSaved(savedItems.filter((s) => s.id !== id));
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const existing = cartItems.find((i) => i.id === id);
    if (existing) {
      persist(cartItems.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      persist([
        ...cartItems,
        { id, qty: 1, price: product.price, title: product.title, brand: product.brand },
      ]);
    }
  };

  const removeAll = () => {
    persist([]);
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(10);
      setCouponApplied(true);
    } else if (coupon.toUpperCase() === "INTERN20") {
      setDiscount(20);
      setCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponApplied(false);
      alert("Invalid coupon code.");
    }
  };

  // ── Calculations ──
  const subtotal    = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountAmt = Math.round(subtotal * (discount / 100));
  const tax         = Math.round(subtotal * 0.05);
  const total       = subtotal - discountAmt + tax;

  // Get full product data for saved items
  const savedProducts = savedItems
    .map((s) => products.find((p) => p.id === s.id))
    .filter(Boolean);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

        {/* ── Mobile back button ── */}
        <Link
          href="/products"
          className="lg:hidden inline-flex items-center gap-1 text-gray-600 text-sm mb-4 hover:text-blue-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Continue shopping
        </Link>

        {/* ── Page title ── */}
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
          My cart ({cartItems.length})
        </h1>

        {cartItems.length === 0 ? (
          /* ── Empty cart ── */
          <div className="bg-white border border-gray-200 rounded p-12 text-center">
            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 text-sm mb-4">Your cart is empty.</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-blue-700 transition-colors"
            >
              Shop now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

            {/* ── Left: Cart items ── */}
            <div className="flex-1 min-w-0 space-y-3">

              {cartItems.map((item) => {
                const product = products.find((p) => p.id === item.id);
                if (!product) return null;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded p-3 sm:p-4"
                  >
                    <div className="flex gap-3 sm:gap-4">

                      {/* Product image */}
                      <Link href={`/products/${item.id}`} className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] flex-shrink-0 bg-gray-50 border border-gray-100 rounded overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.title}
                          priority
                          className="object-contain p-2"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <Link href={`/products/${item.id}`}>
                              <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                {item.title}
                              </h3>
                            </Link>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-gray-500">
                              <span>Brand: <span className="text-gray-700">{item.brand}</span></span>
                              <span>·</span>
                              <span>Condition: <span className="text-gray-700">Brand new</span></span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Seller: <span className="text-gray-600">{item.brand} Store</span>
                            </p>
                          </div>

                          {/* Price — desktop */}
                          <p className="hidden sm:block text-base font-bold text-gray-900 flex-shrink-0">
                            ${(item.price * item.qty).toLocaleString()}
                          </p>
                        </div>

                        {/* Qty + actions row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mt-3">

                          {/* Qty stepper */}
                          <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors border-r border-gray-200 text-lg font-medium"
                            >
                              −
                            </button>
                            <span className="w-10 text-center text-sm font-semibold text-gray-800">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors border-l border-gray-200 text-lg font-medium"
                            >
                              +
                            </button>
                          </div>

                          {/* Price — mobile */}
                          <p className="sm:hidden text-sm font-bold text-gray-900">
                            ${(item.price * item.qty).toLocaleString()}
                          </p>

                          {/* Action buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-xs text-red-500 hover:text-red-600 border border-red-200 hover:border-red-300 px-2.5 py-1 rounded transition-colors"
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => saveForLater(item.id)}
                              className="text-xs text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 px-2.5 py-1 rounded transition-colors"
                            >
                              Save for later
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ── Bottom actions ── */}
              <div className="flex items-center justify-between">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 bg-white rounded px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to shop
                </Link>
                <button
                  onClick={removeAll}
                  className="text-sm text-red-500 hover:text-red-600 border border-red-200 bg-white rounded px-4 py-2 hover:bg-red-50 transition-colors"
                >
                  Remove all
                </button>
              </div>

              {/* ── Trust badges ── */}
              <div className="bg-white border border-gray-200 rounded p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <TrustBadge
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    }
                    title="Secure payment"
                    subtitle="Your data is always protected"
                  />
                  <TrustBadge
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                      </svg>
                    }
                    title="Customer support"
                    subtitle="24/7 support available"
                  />
                  <TrustBadge
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    }
                    title="Free delivery"
                    subtitle="On all orders over $50"
                  />
                </div>
              </div>

              {/* ── Saved for later ── */}
              {savedProducts.length > 0 && (
                <div className="bg-white border border-gray-200 rounded p-4">
                  <h2 className="text-sm font-semibold text-gray-800 mb-4">
                    Saved for later ({savedProducts.length})
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {savedProducts.map((p) => {
                      if (!p) return null;
                      return (
                        <div
                          key={p.id}
                          className="border border-gray-100 rounded p-3 flex flex-col items-center text-center group"
                        >
                          <div className="relative w-full h-[80px] mb-2">
                            <Image
                              src={p.image}
                              alt={p.title}
                              priority
                              className="object-contain group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <p className="text-xs font-bold text-gray-900 mb-1">
                            ${p.price}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-snug">
                            {p.title}
                          </p>
                          <div className="flex flex-col gap-1.5 w-full">
                            <button
                              onClick={() => moveToCart(p.id)}
                              className="w-full flex items-center justify-center gap-1 text-xs text-blue-600 border border-blue-200 rounded py-1.5 hover:bg-blue-50 transition-colors font-medium"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              Move to cart
                            </button>
                            <button
                              onClick={() => persistSaved(savedItems.filter((s) => s.id !== p.id))}
                              className="w-full text-xs text-red-400 hover:text-red-500 transition-colors py-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* ── Right: Order summary ── */}
            <div className="lg:w-[300px] xl:w-[320px] flex-shrink-0 lg:sticky lg:top-4 lg:self-start space-y-3">

              {/* Coupon */}
              <div className="bg-white border border-gray-200 rounded p-4">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Have a coupon?
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Add coupon"
                    className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-blue-400 transition-colors placeholder-gray-400"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors flex-shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-green-600 mt-2 font-medium">
                    ✓ Coupon applied — {discount}% off!
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Try: <span className="font-mono text-gray-500">SAVE10</span> or <span className="font-mono text-gray-500">INTERN20</span>
                </p>
              </div>

              {/* Order summary */}
              <div className="bg-white border border-gray-200 rounded p-4">
                <h2 className="text-sm font-semibold text-gray-800 mb-4">
                  Order summary
                </h2>

                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Subtotal ({cartItems.reduce((s, i) => s + i.qty, 0)} items)
                    </span>
                    <span className="font-medium text-gray-900">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>

                  {discountAmt > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Discount ({discount}%)</span>
                      <span className="font-medium text-red-500">
                        -${discountAmt.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium text-gray-900">
                      +${tax.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>

                  <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <Link
                  href="/checkout"
                  className="block w-full text-center bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-3 rounded transition-colors"
                >
                  Checkout ({cartItems.reduce((s, i) => s + i.qty, 0)} items)
                </Link>

                {/* Payment icons */}
                <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                  {[
                    { label: "Visa",       bg: "bg-blue-700",  text: "VISA",       textColor: "text-white",  size: "text-xs" },
                    { label: "Mastercard", bg: "bg-red-600",   text: "MC",         textColor: "text-white",  size: "text-xs" },
                    { label: "PayPal",     bg: "bg-blue-500",  text: "PayPal",     textColor: "text-white",  size: "text-[10px]" },
                    { label: "Apple Pay",  bg: "bg-gray-900",  text: "Apple Pay",  textColor: "text-white",  size: "text-[9px]" },
                    { label: "Discover",   bg: "bg-orange-500", text: "DISC",      textColor: "text-white",  size: "text-[10px]" },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className={`${card.bg} ${card.textColor} ${card.size} font-bold px-2 py-1 rounded`}
                      title={card.label}
                    >
                      {card.text}
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-2">
                  Secure SSL encrypted payment
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ── Super discount banner ── */}
        <div className="bg-blue-600 rounded p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6">
          <div>
            <p className="text-white font-bold text-base sm:text-lg">
              Super discount on more than 100 USD
            </p>
            <p className="text-blue-100 text-sm mt-0.5">
              Have you ever finally just write dummy info
            </p>
          </div>
          <Link
            href="/products"
            className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors flex-shrink-0"
          >
            Shop now
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
}