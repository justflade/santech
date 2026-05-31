// app/page.jsx
"use client";

import { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";

import ProductCard from "./product-card";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["cyrillic", "latin"],
});

import Image from "next/image";

// Promotions
import promotion1 from "../../media/photos/promotions/promotion1.jpg";
import promotion2 from "../../media/photos/promotions/promotion2.jpg";
import promotion3 from "../../media/photos/promotions/promotion3.jpg";

// Categories
import sinks from "../../media/photos/categories/sinks.png";
import toilets from "../../media/photos/categories/toilets.png";
import installationSystems from "../../media/photos/categories/installation-systems.png";
import bathtubs from "../../media/photos/categories/bathtubs.png";
import bathroomFurniture from "../../media/photos/categories/bathroom-furniture.png";
import showerEnclosures from "../../media/photos/categories/shower-enclosures.png";
import bathroomAccessories from "../../media/photos/categories/bathroom-accessories.png";

// Products
import product1 from "../../media/photos/products/product1.jpg";
import product2 from "../../media/photos/products/product2.jpg";
import product3 from "../../media/photos/products/product3.jpg";
import product4 from "../../media/photos/products/product4.jpg";
import product5 from "../../media/photos/products/product5.jpg";
import product6 from "../../media/photos/products/product6.jpg";
import product7 from "../../media/photos/products/product7.jpg";
import product8 from "../../media/photos/products/product8.jpg";
import product9 from "../../media/photos/products/product9.jpg";
import product10 from "../../media/photos/products/product10.jpg";
import product11 from "../../media/photos/products/product11.jpg";
import product12 from "../../media/photos/products/product12.jpg";
import product13 from "../../media/photos/products/product13.jpg";
import product14 from "../../media/photos/products/product14.jpg";
import product15 from "../../media/photos/products/product15.jpg";
import product16 from "../../media/photos/products/product16.jpg";

const PRODUCT_IMAGES = {
  1: product1,
  2: product2,
  3: product3,
  4: product4,
  5: product5,
  6: product6,
  7: product7,
  8: product8,
  9: product9,
  10: product10,
  11: product11,
  12: product12,
  13: product13,
  14: product14,
  15: product15,
  16: product16,
};

// Brands
import villeroyBoch from "../../media/photos/brands/villeroy-boch.png";
import jacobDelafon from "../../media/photos/brands/jacob-delafon.png";
import hansgrohe from "../../media/photos/brands/hansgrohe.png";
import grohe from "../../media/photos/brands/grohe.png";
import capani from "../../media/photos/brands/capani.png";
import ampm from "../../media/photos/brands/am-pm.png";

// Icons
import deliveryIcon from "../../media/icons/delivery-icon.svg";
import serviceIcon from "../../media/icons/service-icon.svg";
import assemblyIcon from "../../media/icons/assembly-icon.png";
import accessoriesIcon from "../../media/icons/accessories-icon.svg";
import guaranteeIcon from "../../media/icons/guarantee-icon.svg";
import discountIcon from "../../media/icons/discount-icon.svg";
import filterIcon from "../../media/icons/filter-icon.svg";
import searchIcon from "../../media/icons/search-icon.svg";
import cartIcon from "../../media/icons/cart-icon.svg";
import favoritesIcon from "../../media/icons/favorites-icon.svg";
import compareIcon from "../../media/icons/compare-icon.svg";

// Payment & Social

export function Hero() {
  const [promoIndex, setPromoIndex] = useState(0);
  const [cartCount, setCartCount] = useState(1);
  const [wasClicked, setWasClicked] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const promotions = [
    {
      title: "Летняя распродажа",
      subtitle: "АКСЕССУАРЫ -15%",
      image: promotion1,
    },
    {
      title: "Hansgrohe",
      subtitle: "Немецкое качество по доступным ценам",
      image: promotion2,
    },
    {
      title: "5% скидка",
      subtitle: "На все комплекты сантехники",
      image: promotion3,
    },
  ];

  const categories = [
    { name: "Раковины", image: sinks },
    { name: "Унитазы", image: toilets },
    { name: "Системы инсталляции", image: installationSystems },
    { name: "Ванны", image: bathtubs },
    { name: "Мебель для ванных", image: bathroomFurniture },
    { name: "Душевые ограждения", image: showerEnclosures },
    { name: "Аксессуары", image: bathroomAccessories },
  ];

  const brands = [
    { name: "Villeroy & Boch", image: villeroyBoch },
    { name: "Jacob Delafon", image: jacobDelafon },
    { name: "Hansgrohe", image: hansgrohe },
    { name: "GROHE", image: grohe },
    { name: "Capani", image: capani },
    { name: "AM-PM", image: ampm },
  ];

  const advantages = [
    {
      icon: deliveryIcon,
      title: "Быстрая доставка",
      desc: "Доставим в удобное время",
    },
    {
      icon: serviceIcon,
      title: "Поддержка 24/7",
      desc: "Поможем на всех этапах",
    },
    { icon: assemblyIcon, title: "Самовывоз", desc: "Заберите из офиса" },
    {
      icon: accessoriesIcon,
      title: "Большой выбор",
      desc: "Более 10 000 товаров",
    },
    {
      icon: guaranteeIcon,
      title: "Гарантия качества",
      desc: "Только сертифицированная продукция",
    },
    { icon: discountIcon, title: "Скидки", desc: "Постоянным клиентам" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!wasClicked) {
        setPromoIndex((prev) => (prev + 1) % promotions.length);
      }
      setWasClicked(false);
    }, 5000);
    return () => clearInterval(timer);
  }, [promotions.length, wasClicked]);

  const nextPromo = () => {
    setPromoIndex((prev) => (prev + 1) % promotions.length);
    setWasClicked(true);
  };

  const prevPromo = () => {
    setPromoIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
    setWasClicked(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        // Мёржим: данные с бэка + картинка из локального маппинга по ID
        const merged = data.data.map((p) => ({
          id: p.id,
          name: p.name,
          desc: p.description, // бэк отдаёт "description"
          price: `${p.price.toLocaleString("ru-RU")} ₽`, // 10000 → "10 000 ₽"
          image: PRODUCT_IMAGES[p.id] || product1, // фоллбэк, если вдруг нет
        }));
        setProducts(merged);
      } catch (err) {
        console.error("Products fetch error:", err);
        // ⚠️ Фоллбэк на хардкод при ошибке (чтобы демка не ломалась)
        setProducts(hardcodedProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div
      className={`min-h-screen bg-linear-to-br from-slate-50 to-blue-50 select-none ${montserrat.className}`}
    >
      {/* Header */}
      <Header cartCount={cartCount} />

      {/* Catalog Bar */}
      <section className="bg-white border-b border-gray-200 py-4 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
              <Image src={filterIcon} alt="Filter" width={20} height={20} />
              <span className="font-semibold cursor-pointer">
                Каталог товаров
              </span>
            </button>

            <div className="flex-1 max-w-2xl relative text-gray-800">
              <input
                type="text"
                placeholder="Поиск товаров и брендов..."
                // Добавил min-w-0 и truncate
                className="w-full min-w-0 pl-4 pr-12 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors truncate"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2 rounded-md transition-colors">
                <Image
                  src={searchIcon}
                  alt="Search"
                  width={18}
                  height={18}
                  className="text-white"
                />
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <div className="flex flex-col justify-center items-center">
                <p className="text-xs text-gray-500">Мы на связи:</p>
                <p className="font-bold text-gray-900 select-text">
                  8-800-000-00-00
                </p>
              </div>
              {[
                { icon: favoritesIcon, label: "Избранное" },
                { icon: compareIcon, label: "Сравнение" },
                { icon: cartIcon, label: "Корзина" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={24}
                    height={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs mt-1">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Hero Slider */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10 bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Акции и предложения
            </h2>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${promoIndex * 100}%)` }}
                >
                  {promotions.map((promo, idx) => (
                    <div key={idx} className="w-full shrink-0">
                      <div className="relative h-100 md:h-125">
                        <Image
                          src={promo.image}
                          alt={promo.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 90vw"
                          className="object-cover"
                          priority={idx === 0}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                          <h3 className="text-3xl md:text-5xl font-bold mb-3">
                            {promo.title}
                          </h3>
                          <p className="text-xl md:text-2xl text-gray-200">
                            {promo.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevPromo}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextPromo}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {promotions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPromoIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === promoIndex ? "w-8 bg-blue-600" : "w-2 bg-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
              Популярные категории
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((cat, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl shadow-lg aspect-square mb-3">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="30vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <h3 className="text-center font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
              Хиты продаж
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading
                ? // === Skeleton-заглушки пока грузимся ===
                  [...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                    >
                      <div className="aspect-square bg-gray-200" />
                      <div className="p-5 space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="flex justify-between">
                          <div className="h-6 bg-gray-200 rounded w-20" />
                          <div className="h-9 bg-gray-200 rounded w-20" />
                        </div>
                      </div>
                    </div>
                  ))
                : // === Реальные товары ===
                  products.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="100vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          HIT
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2 text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {product.desc}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-600">
                            {product.price}
                          </span>
                          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                            Купить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-600 to-cyan-600 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Мы помогаем найти лучшее решение для вашей ванной
                </h2>
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">2K+</div>
                    <div className="text-blue-100">довольных клиентов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">30+</div>
                    <div className="text-blue-100">брендов</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {advantages.map((adv, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors"
                  >
                    <Image
                      src={adv.icon}
                      alt={adv.title}
                      width={40}
                      height={40}
                      className="mb-3"
                    />
                    <h3 className="font-bold mb-2">{adv.title}</h3>
                    <p className="text-sm text-blue-100">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* More Products Sections */}
        {["Товары со скидкой", "Новинки недели", "Рекомендуем купить"].map(
          (title, sectionIdx) => (
            <section
              key={title}
              className="py-12 px-4 sm:px-6 lg:px-8 bg-white"
            >
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
                  {title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products
                    .slice(sectionIdx * 4 + 4, sectionIdx * 4 + 8)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isHit={false}
                      />
                    ))}
                </div>
              </div>
            </section>
          ),
        )}

        {/* Brands */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
              Популярные бренды
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {brands.map((brand, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={120}
                    height={60}
                    className="object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
