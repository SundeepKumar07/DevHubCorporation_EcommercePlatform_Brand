// src/components/ExtraServices.tsx
import Image from "next/image";
import { interiorProducts, electronicProducts } from "@/data/data";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Source from Industry Hubs",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
      </svg>
    ),
    bg: "from-blue-900/70 to-blue-700/50",
    image: electronicProducts[0]?.image,
  },
  {
    id: 2,
    title: "Customize Your Products",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    bg: "from-orange-900/70 to-orange-600/50",
    image: interiorProducts[0]?.image,
  },
  {
    id: 3,
    title: "Fast, reliable shipping by ocean or air",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
    bg: "from-teal-900/70 to-teal-600/50",
    image: electronicProducts[2]?.image,
  },
  {
    id: 4,
    title: "Product monitoring and inspection",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
      </svg>
    ),
    bg: "from-purple-900/70 to-purple-600/50",
    image: interiorProducts[2]?.image,
  },
];

export default function ExtraServices() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">

      {/* ── Section Header ── */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Our extra services
      </h2>

      {/* ── Service Cards Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href="#"
            className="relative rounded overflow-hidden h-[160px] sm:h-[180px] group cursor-pointer"
          >
            {/* Background Image */}
            {service.image && (
              <Image
                src={service.image}
                alt={service.title}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}

            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${service.bg} transition-opacity duration-200 group-hover:opacity-90`}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              {/* Title */}
              <p className="text-white text-sm font-semibold leading-snug max-w-[85%] drop-shadow">
                {service.title}
              </p>

              {/* Icon pill bottom-right */}
              <div className="flex justify-end">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
                  {service.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}