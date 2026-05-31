import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, User, LogIn } from "lucide-react"; // npm install lucide-react
import useAuth from "@/components/hooks/useAuth";

import logoSrc from "../../media/photos/logo.png";

export function Header() {
  const router = useRouter();
  const { user, isAuthed, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => router.push("/")}
          >
            <Image
              src={logoSrc}
              alt="GIDRATOP"
              width={140}
              height={45}
              className="object-contain transition-opacity group-hover:opacity-90"
              priority
            />
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { name: "Производители", href: "/brands" },
              { name: "Гарантии", href: "/guarantees" },
              { name: "Доставка", href: "/delivery" },
              { name: "Оплата", href: "/payment" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg font-medium transition-all duration-200 text-sm"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center">
            {isAuthed ? (
              <div className="flex items-center space-x-3">
                <span className="hidden sm:block text-gray-700 font-medium text-sm">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 hover:text-red-600 hover:border-red-300 hover:bg-red-50 rounded-lg font-medium transition-all duration-200 text-sm group"
                  title="Выйти"
                >
                  <LogOut
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="hidden sm:inline">Выйти</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/auth")}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-all duration-200 text-sm shadow-sm hover:shadow group"
              >
                <LogIn
                  size={18}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
                <span>Войти</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
