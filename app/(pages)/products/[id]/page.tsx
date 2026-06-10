// src/app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import { products } from "@/data/data";
import ProductGallery from "@/components/products/ProductGallery";
import ProductTabs from "@/components/products/ProductTabs";
import AddToCartButton from "@/components/products/AddToCartButton";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) notFound();

  // Related — same category, fallback to featured
  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const relatedProducts =
    related.length >= 3
      ? related.slice(0, 6)
      : products.filter((p) => p.featured && p.id !== product.id).slice(0, 6);

  const youMayLike = products
    .filter((p) => p.id !== product.id)
    .slice(0, 5);

  // Tiered pricing
  const tiers = [
    { range: "1–50 pcs",   price: product.price },
    { range: "50–100 pcs", price: Math.round(product.price * 0.92) },
    { range: "100+ pcs",   price: Math.round(product.price * 0.82) },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">

        {/* ── Mobile back button ── */}
        <Link
          href="/products"
          className="lg:hidden inline-flex items-center gap-1 text-blue-600 text-sm mb-3 hover:underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to products
        </Link>

        {/* ── Breadcrumb — desktop only ── */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm text-gray-500 mb-4 flex-wrap">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/products" className="hover:text-blue-600 transition-colors">{product.category}</Link>
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-800 font-medium truncate max-w-[240px]">{product.title}</span>
        </nav>

        {/* ── Main product card ── */}
        <div className="bg-white border border-gray-200 rounded p-3 sm:p-4 lg:p-6 mb-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

            {/* ── Gallery — order 1 always ── */}
            <div className="w-full lg:w-[340px] flex-shrink-0 order-1">
              <ProductGallery product={product} />
            </div>

            {/* ── Supplier card — order 2 on mobile, 3 on desktop ── */}
            <div className="order-2 lg:order-3 lg:w-[220px] flex-shrink-0 lg:sticky lg:top-4 lg:self-start">
              <div className="border border-gray-200 rounded p-4 mb-2">

                {/* Supplier info */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                  <div className="w-9 h-9 rounded bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm flex-shrink-0">
                    {product.brand.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-gray-400 leading-tight">Supplier</p>
                    <p className="text-sm font-semibold text-gray-800 leading-tight truncate">
                      {product.brand} Trading LLC
                    </p>
                  </div>
                </div>

                {/* Supplier meta */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>🇩🇪</span>
                    <span>Germany, Berlin</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Verified Seller</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span>Worldwide shipping</span>
                  </div>
                </div>

                {/* CTAs */}
                <AddToCartButton product={product} />

                <Link
                  href="#"
                  className="mt-2 block w-full text-center border border-blue-600 text-blue-600 text-sm font-medium py-2 rounded hover:bg-blue-50 transition-colors"
                >
                  Send inquiry
                </Link>
              </div>

              {/* Save + Share */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded py-2 hover:bg-gray-50 hover:text-red-500 hover:border-red-200 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                  Save
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded py-2 hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>

            {/* ── Product info — order 3 on mobile, 2 on desktop ── */}
            <div className="flex-1 min-w-0 order-3 lg:order-2">

              {/* In stock + stock warning */}
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  In stock
                </span>
                {product.stock < 10 && (
                  <span className="text-orange-500 text-xs font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                    Only {product.stock} left!
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 leading-snug">
                {product.title}
              </h1>

              {/* Rating row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-yellow-400" : "fill-gray-200"}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm font-semibold text-gray-700 ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-300">·</span>
                <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                <span className="text-gray-300">·</span>
                <span className="text-sm text-gray-500">{product.stock * 3} sold</span>
              </div>

              {/* Tiered pricing */}
              <div className="flex border border-gray-200 rounded overflow-hidden mb-4">
                {tiers.map((tier, i) => (
                  <div
                    key={i}
                    className={`flex-1 px-2 sm:px-3 py-2.5 text-center border-r border-gray-200 last:border-r-0 cursor-pointer transition-colors ${
                      i === 0 ? "bg-orange-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <p className={`text-sm sm:text-base font-bold ${i === 0 ? "text-orange-600" : "text-gray-900"}`}>
                      ${tier.price}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{tier.range}</p>
                  </div>
                ))}
              </div>

              {/* Specs */}
              <div className="space-y-2 mb-4">
                {[
                  { label: "Price",     value: "Negotiable" },
                  { label: "Category",  value: product.category },
                  { label: "Brand",     value: product.brand },
                  { label: "Condition", value: "Brand new" },
                  { label: "Shipping",  value: product.shipping ?? "Standard" },
                  { label: "Warranty",  value: "1 year full warranty" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <span className="text-gray-400 w-20 sm:w-24 flex-shrink-0">{label}:</span>
                    <span className="text-gray-800 font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* Feature list */}
              <ul className="space-y-2">
                {[
                  "Premium quality materials used",
                  product.description,
                  "Easy 30-day return policy",
                  "Customized logo and packaging available",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>

        {/* ── Tabs + You may like ── */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">

          {/* Tabs */}
          <div className="flex-1 min-w-0">
            <ProductTabs product={product} />
          </div>

          {/* You may like — desktop only ── */}
          <div className="hidden lg:block lg:w-[220px] flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                You may like
              </h3>
              <div className="space-y-3">
                {youMayLike.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="relative w-12 h-12 flex-shrink-0 bg-gray-50 rounded border border-gray-100 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        className="object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-700 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                        {p.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-semibold text-gray-900">${p.price}</span>
                        {p.oldPrice && (
                          <span className="text-[10px] text-gray-400 line-through">${p.oldPrice}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Related products ── */}
        {relatedProducts.length > 0 && (
          <div className="bg-white border border-gray-200 rounded p-4 sm:p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-800">Related products</h2>
              <Link href="/products" className="text-sm text-blue-600 hover:underline">
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group flex flex-col items-center text-center border border-gray-100 rounded p-3 hover:border-blue-200 hover:shadow-sm transition-all"
                >
                  <div className="relative w-full h-[70px] sm:h-[80px] mb-2">
                    <Image
                      src={p.image}
                      alt={p.title}
                      className="object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-1 leading-snug">
                    {p.title}
                  </p>
                  <p className="text-xs font-bold text-gray-900">
                    ${p.price}
                    {p.oldPrice && (
                      <span className="text-gray-400 font-normal line-through ml-1">
                        ${p.oldPrice}
                      </span>
                    )}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Super discount banner ── */}
        <div className="bg-blue-600 rounded p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
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
            className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors flex-shrink-0 whitespace-nowrap"
          >
            Shop now
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
}