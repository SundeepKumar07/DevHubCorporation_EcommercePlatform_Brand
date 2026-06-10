// src/components/SuppliersRegion.tsx
import Image from "next/image";
import { countries } from "@/data/data";
import Link from "next/link";

// Extend with extra regions not in data.ts using emoji flags
const extraRegions = [
  { id: 6,  name: "United Kingdom", flag: null, emoji: "🇬🇧", domain: "shopname.co.uk" },
  { id: 7,  name: "Australia",      flag: null, emoji: "🇦🇺", domain: "shopname.com.au" },
  { id: 8,  name: "Russia",         flag: null, emoji: "🇷🇺", domain: "shopname.ru" },
  { id: 9,  name: "UAE",            flag: null, emoji: "🇦🇪", domain: "shopname.ae" },
  { id: 10, name: "Denmark",        flag: null, emoji: "🇩🇰", domain: "shopname.dk" },
];

// Domain map for data.ts countries
const domainMap: Record<string, string> = {
  "United States": "shopname.com",
  Germany:         "shopname.de",
  France:          "shopname.fr",
  Italy:           "shopname.it",
  China:           "shopname.cn",
};

export default function SuppliersRegion() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">

      {/* ── Section Header ── */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Suppliers by region
      </h2>

      {/* ── Region Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3">

        {/* Countries from data.ts */}
        {countries.map((country) => (
          <Link
            key={country.id}
            href="#"
            className="flex items-center gap-3 bg-white border border-gray-200 rounded px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            {/* Flag image */}
            <div className="relative w-8 h-6 flex-shrink-0 rounded-sm overflow-hidden">
              <Image
                src={country.flag}
                alt={country.name}
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                {country.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {domainMap[country.name] ?? "shopname.com"}
              </p>
            </div>
          </Link>
        ))}

        {/* Extra regions with emoji flags */}
        {extraRegions.map((region) => (
          <Link
            key={region.id}
            href="#"
            className="flex items-center gap-3 bg-white border border-gray-200 rounded px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            {/* Emoji flag */}
            <div className="w-8 h-6 flex-shrink-0 flex items-center justify-center text-xl leading-none rounded-sm overflow-hidden">
              {region.emoji}
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                {region.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {region.domain}
              </p>
            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}