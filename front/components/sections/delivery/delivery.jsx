import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

// Иконки
import deliveryIcon from "../../media/icons/delivery-icon.svg";
import serviceIcon from "../../media/icons/service-icon.svg";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["cyrillic", "latin"],
});

export function Delivery() {
  return (
    <div className={`min-h-screen bg-slate-50 ${montserrat.className}`}>
      <Header cartCount={0} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Доставка
        </h1>

        {/* Тарифы */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Image src={deliveryIcon} alt="Delivery" width={32} height={32} />
              <h2 className="text-xl font-bold text-gray-800">По Санкт-Петербургу</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex justify-between">
                <span>Крупногабарит (1 место)</span>
                <span className="font-semibold">900 ₽</span>
              </li>
              <li className="flex justify-between">
                <span>Мелкогабарит (2 места)</span>
                <span className="font-semibold">700 ₽ + 50 ₽/км</span>
              </li>
              <li className="flex justify-between">
                <span>Мелкогабарит (3+ мест)</span>
                <span className="font-semibold">100 ₽ + 50 ₽/км</span>
              </li>
              <li className="pt-3 border-t border-gray-200 text-green-600 font-medium">
                🎁 Бесплатно при заказе от 10 000 ₽
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Image src={serviceIcon} alt="Service" width={32} height={32} />
              <h2 className="text-xl font-bold text-gray-800">По России</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>
                🚚 Доставка до ТК — <strong>бесплатно</strong>
              </li>
              <li>📦 Оплата доставки — при получении</li>
              <li>⏱️ Срок: 3–14 дней (зависит от региона)</li>
              <li className="pt-3 border-t border-gray-200">
                <a href="#" className="text-blue-600 hover:underline">
                  Рассчитать стоимость →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Правила */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Правила доставки
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Доставка в течение 1–2 рабочих дней по Санкт-Петербургу</li>
            <li>Время доставки согласовывается с клиентом</li>
            <li>Рабочие дни: 10:00–18:00</li>
            <li>
              При отсутствии клиента — повторная доставка по договорённости
            </li>
          </ul>
        </div>

        {/* Самовывоз */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            📍 Самовывоз
          </h3>
          <p className="text-blue-700">ул. Примерная, д. 1, г. Санкт-Петербург</p>
          <p className="text-sm text-blue-600 mt-1">
            Режим работы: Пн–Пт, 9:00–18:00
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
