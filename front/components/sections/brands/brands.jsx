// app/brands/page.jsx
"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

// Импортируй логотипы брендов
import villeroyBoch from "../../media/photos/brands/villeroy-boch.png";
import jacobDelafon from "../../media/photos/brands/jacob-delafon.png";
import hansgrohe from "../../media/photos/brands/hansgrohe.png";
import grohe from "../../media/photos/brands/grohe.png";
import capani from "../../media/photos/brands/capani.png";
import ampm from "../../media/photos/brands/am-pm.png";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["cyrillic", "latin"],
});

const brands = [
  { name: "Villeroy & Boch", image: villeroyBoch, country: "Германия" },
  { name: "Jacob Delafon", image: jacobDelafon, country: "Франция" },
  { name: "Hansgrohe", image: hansgrohe, country: "Германия" },
  { name: "GROHE", image: grohe, country: "Германия" },
  { name: "Capani", image: capani, country: "Италия" },
  { name: "AM-PM", image: ampm, country: "Германия" },
];

export function Brands() {
  return (
    <div className={`min-h-screen bg-slate-50 ${montserrat.className}`}>
      <Header cartCount={0} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Производители
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Официальные партнёры и сертифицированная продукция
        </p>

        {/* Сетка брендов */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className="w-32 h-20 relative mb-4">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all"
                  sizes="128px"
                />
              </div>
              <h3 className="font-semibold text-gray-800 text-center group-hover:text-blue-600 transition-colors">
                {brand.name}
              </h3>
              <span className="text-xs text-gray-500 mt-1">
                {brand.country}
              </span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
