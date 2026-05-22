import Image from "next/image";
import vkIcon from "../../media/icons/social/vk-icon.png";
import instagramIcon from "../../media/icons/social/instagram-icon.png";
import facebookIcon from "../../media/icons/social/facebook-icon.png";
import visaIcon from "../../media/icons/social/visa-icon.png";
import mastercardIcon from "../../media/icons/social/mastercard-icon.png";
import mirIcon from "../../media/icons/social/mir-icon.png";
import logoSrc from "../../media/photos/logo.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            {/* Логотип: здесь invert нужен, если логотип черный */}
            <Image
              src={logoSrc}
              alt="GIDRATOP"
              width={150}
              height={50}
              className="mb-4 object-contain brightness-0 invert opacity-90" 
            />
            
            <p className="text-sm mb-4 font-medium text-gray-400">Мы в социальных сетях</p>
            <div className="flex gap-3 mb-8">
              {[vkIcon, instagramIcon, facebookIcon].map((icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors group overflow-hidden"
                >
                  <Image
                    src={icon}
                    alt="social"
                    width={25}
                    height={25}
                    // Убрали brightness-0 invert. 
                    // Если иконки черные на прозрачном фоне, добавь класс 'invert'
                    // Если иконки цветные, оставь как есть.
                    className="object-contain group-hover:brightness-120 transition-all" 
                  />
                </a>
              ))}
            </div>

            <p className="text-sm mb-3 font-medium text-gray-400">Мы принимаем</p>
            <div className="flex gap-3 items-center">
              {[visaIcon, mastercardIcon, mirIcon].map((icon, idx) => (
                <div key={idx} className="bg-white rounded p-1 w-12 h-8 flex items-center justify-center">
                  <Image
                    src={icon}
                    alt="payment"
                    width={40}
                    height={25}
                    className="object-contain max-h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Остальная часть футера без изменений */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Покупателю</h3>
            <ul className="space-y-3 text-sm">
              {["Доставка", "Оплата", "Гарантии и возврат", "Производители", "Статьи"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Компаниям</h3>
            <ul className="space-y-3 text-sm">
              {["О нас", "Контакты", "Соглашение", "Конфиденциальность"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-white font-semibold text-lg">8 (800) 880-00-00</li>
              <li>
                <a href="mailto:zakaz@gidratop.ru" className="hover:text-blue-400 transition-colors">
                  zakaz@gidratop.ru
                </a>
              </li>
              <li className="text-gray-400">
                г. Санкт-Петербург,<br />
                пр-кт. Непосида, д.39
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Подписка</h3>
            <p className="text-sm mb-4 text-gray-400">Акции и новости</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Ваш e-mail"
                className="px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-500 transition-colors"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20">
                Подписаться
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 GIDRATOP. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}