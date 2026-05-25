import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

// Иконки платёжных систем (заглушки)
import visa from "../../media/icons/social/visa-icon.png";
import mastercard from "../../media/icons/social/mastercard-icon.png";
import mir from "../../media/icons/social/mir-icon.png";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["cyrillic", "latin"],
});

export function Payment() {
  const methods = [
    {
      title: "💳 Картой при доставке",
      desc: "Наличными или картой через терминал курьера",
      available: "По Санкт-Петербургу",
    },
    {
      title: "🏪 При самовывозе",
      desc: "Оплата в кассе пункта выдачи",
      available: "г. Санкт-Петербург, ул. Примерная, 1",
    },
    {
      title: "🌐 Онлайн на сайте",
      desc: "Visa, MasterCard, MIR через защищённый шлюз Сбербанка",
      available: "256-bit SSL шифрование",
    },
    {
      title: "🏦 Безналичный расчёт",
      desc: "Для юр. лиц и ИП с НДС/без НДС",
      available: "Счёт в течение 1 часа",
    },
    {
      title: "💸 Кредит / Рассрочка",
      desc: "Оформление через банки-партнёры",
      available: "Паспорт РФ",
    },
  ];

  return (
    <div className={`min-h-screen bg-slate-50 ${montserrat.className}`}>
      <Header cartCount={0} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Оплата
        </h1>

        {/* Способы оплаты */}
        <div className="space-y-4 mb-10">
          {methods.map((method, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {method.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{method.desc}</p>
              <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {method.available}
              </span>
            </div>
          ))}
        </div>

        {/* Платёжные системы */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <p className="text-gray-600 mb-4">Мы принимаем:</p>
          <div className="flex justify-center gap-4">
            {[visa, mastercard, mir].map((icon, idx) => (
              <div key={idx} className="w-16 h-10 relative">
                <Image
                  src={icon}
                  alt="Payment"
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Безопасность */}
        <div className="mt-6 bg-green-50 rounded-2xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            🔒 Безопасность платежей
          </h3>
          <p className="text-green-700 text-sm">
            Все платежи обрабатываются через защищённый шлюз ПАО Сбербанк.
            Данные карт не хранятся на наших серверах. Используется 256-битное
            SSL-шифрование.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
