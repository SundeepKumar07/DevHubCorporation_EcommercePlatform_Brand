// src/components/SendQuote.tsx
"use client";

import { useState } from "react";

export default function SendQuote() {
  const [form, setForm] = useState({
    item: "",
    details: "",
    quantity: "",
    unit: "Pcs",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.item) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ item: "", details: "", quantity: "", unit: "Pcs" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="rounded overflow-hidden flex flex-col md:flex-row min-h-[220px]">

        {/* ── Left: Text Banner ── */}
        <div className="relative bg-blue-600 flex flex-col justify-center px-8 py-10 md:w-[55%] overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-500 opacity-50" />
          <div className="absolute -bottom-10 -right-6 w-52 h-52 rounded-full bg-blue-700 opacity-40" />
          <div className="absolute top-6 right-10 w-20 h-20 rounded-full bg-blue-400 opacity-30" />

          <div className="relative z-10">
            <h2 className="text-white text-2xl sm:text-3xl font-bold leading-snug mb-3 max-w-sm">
              An easy way to send requests to all suppliers
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt.
            </p>
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div className="bg-white border border-gray-200 flex flex-col justify-center px-6 sm:px-8 py-8 md:flex-1">

          <h3 className="text-base font-semibold text-gray-800 mb-5">
            Send quote to suppliers
          </h3>

          <div className="flex flex-col gap-4">

            {/* Item name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                What item you need?
              </label>
              <input
                type="text"
                value={form.item}
                onChange={(e) => setForm({ ...form, item: e.target.value })}
                placeholder="Type item name"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 transition-colors placeholder-gray-400"
              />
            </div>

            {/* Details textarea */}
            <div>
              <textarea
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                placeholder="Type more details"
                rows={3}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 transition-colors placeholder-gray-400 resize-none"
              />
            </div>

            {/* Quantity + Unit */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  placeholder="0"
                  min={1}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 transition-colors placeholder-gray-400"
                />
              </div>
              <div className="w-28">
                <label className="block text-sm text-gray-600 mb-1">
                  Unit
                </label>
                <select
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 transition-colors bg-white"
                >
                  {["Pcs", "Kg", "Tons", "Boxes", "Meters", "Liters"].map(
                    (u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className={`w-full py-2.5 rounded text-sm font-semibold transition-all duration-200 ${
                sent
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {sent ? "✓ Inquiry sent!" : "Send inquiry"}
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}