// src/components/HomeOutdoor.tsx
import Image from "next/image";
import { interiorProducts } from "@/data/data";
import Link from "next/link";

export default function HomeOutdoor() {
  const displayed = interiorProducts.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="border border-gray-200 rounded bg-white overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* ── Left: Banner ── */}
          <div className="relative md:w-[220px] lg:w-[200px] flex-shrink-0 bg-amber-50 flex flex-col justify-between p-6 min-h-[160px] md:min-h-full">
            {/* Background image subtle */}
            <div className="absolute inset-0 opacity-20">
              <Image
                src={displayed[0].image}
                alt="Home and outdoor"
                className="object-cover"
              />
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-bold text-gray-800 leading-snug mb-1">
                Home and
              </h3>
              <h3 className="text-lg font-bold text-gray-800 leading-snug mb-4">
                outdoor
              </h3>
              <Link
                href="/products?category=Furniture"
                className="inline-flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Source now
                <span className="text-gray-400">→</span>
              </Link>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="hidden md:block w-px bg-gray-200 flex-shrink-0" />

          {/* ── Right: Product Grid ── */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 divide-x divide-y divide-gray-100">
            {displayed.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="flex flex-col items-start p-4 hover:bg-gray-50 transition-colors group"
              >
                {/* Image */}
                <div className="relative w-full h-[100px] sm:h-[110px] mb-3">
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Name */}
                <p className="text-sm text-gray-800 font-medium leading-snug line-clamp-2 mb-1">
                  {product.title}
                </p>

                {/* Price */}
                <p className="text-xs text-gray-500 mt-auto">
                  From{" "}
                  <span className="text-gray-800 font-semibold">
                    USD {product.price}
                  </span>
                </p>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}