import Image from "next/image";
import userIcon from "../../media/icons/user-icon.png";
import logoSrc from "../../media/photos/logo.png";

export function Header({ cartCount }) {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src={logoSrc}
              alt="GIDRATOP"
              width={150}
              height={50}
              className="object-contain"
              priority
            />
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              "Производители",
              "Гарантии",
              "Доставка",
              "Оплата",
              "Контакты",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 text-sm"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            <a
              href="/login"
              className="hidden sm:block text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Вход / Регистрация
            </a>
            <div className="relative cursor-pointer group">
              <Image
                src={userIcon}
                alt="Cart"
                width={28}
                height={28}
                className="group-hover:scale-110 transition-transform"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
