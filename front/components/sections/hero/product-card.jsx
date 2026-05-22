// components/ProductCard.jsx
import Image from "next/image";

export default function ProductCard({ product, isHit = false }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {isHit && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            HIT
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <h3
          className="font-bold text-lg mb-1 text-gray-800 truncate"
          title={product.name}
        >
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 grow">
          {product.desc}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-blue-600">
            {product.price}
          </span>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg text-sm">
            {isHit ? "Купить" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}
