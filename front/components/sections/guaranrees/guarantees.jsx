import { Montserrat } from "next/font/google";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["cyrillic", "latin"],
});

export default function Guarantees() {
  return (
    <div className={`min-h-screen bg-slate-50 ${montserrat.className}`}>
      <Header cartCount={0} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Гарантии и возврат
        </h1>

        {/* Контент */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Гарантия на товары
            </h2>
            <p className="text-gray-600 mb-4">
              Гарантия на товары действует в соответствии с законом РФ «О защите прав потребителей».
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-sm text-blue-800">
                <strong>ОБРАТИТЕ ВНИМАНИЕ!</strong> При обнаружении брака — немедленно свяжитесь с нами.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Если товар ненадлежащего качества, вы вправе:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Потребовать замены на товар этой же марки</li>
              <li>Потребовать замены на аналогичный товар другой марки с перерасчётом цены</li>
              <li>Потребовать соразмерного уменьшения покупной цены</li>
              <li>Потребовать безвозмездного устранения недостатков</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Возврат товара надлежащего качества
            </h3>
            <p className="text-gray-600 mb-3">
              Осуществляется в течение <strong>14 дней</strong> с момента покупки при соблюдении условий:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Товар не был в употреблении</li>
              <li>Сохранены ярлыки, этикетки, упаковка</li>
              <li>Сохранён товарный вид</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Документы для возврата
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Документ, подтверждающий покупку (чек, квитанция)</li>
              <li>Паспорт РФ</li>
              <li>Гарантийный талон (при наличии)</li>
            </ul>
          </section>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              <strong>Адрес приёма:{" "}</strong>г. Санкт-Петербург, пр-кт. Непосида, д.39
            </p>
            <p className="text-gray-600">
              <strong>Режим работы:</strong> Пн–Пт, 9:00–18:00
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}