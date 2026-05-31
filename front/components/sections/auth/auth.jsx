import { useState } from "react";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import useAuth from "@/components/hooks/useAuth";
import Image from "next/image";

// Иконки и изображения
import logoSrc from "../../media/photos/logo.png";
import userIcon from "../../media/icons/user-icon.png";

const montserrat = Montserrat({
  weight: ["400", "500", "600"],
  subsets: ["cyrillic", "latin"],
});

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const { login, register, isLoading, error, isAuthed } = useAuth();
  const router = useRouter();

  // Если уже авторизован — редирект на главную
  if (isAuthed) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    
    if (password.length < 3) {
      alert("Пароль должен быть не короче 3 символов");
      return;
    }
    
    const result = isLogin 
      ? await login(name, password)
      : await register(name, password);
    
    if (result?.success) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ${montserrat.className}`}>
      
      {/* Центрированный контейнер */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        
        {/* Логотип — по центру над формой */}
        <div 
          className="mb-6 cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <Image
            src={logoSrc}
            alt="GIDRATOP"
            width={200}
            height={65}
            className="object-contain transition-opacity group-hover:opacity-90"
            priority
          />
        </div>

        {/* Форма авторизации */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          
          {/* Переключатель */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                isLogin 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Вход
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                !isLogin 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Регистрация
            </button>
          </div>

          {/* Заголовок */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            {isLogin ? "С возвращением! 👋" : "Создать аккаунт ✨"}
          </h1>
          <p className="text-gray-500 text-center mb-6 text-sm">
            {isLogin 
              ? "Введите данные для входа в аккаунт" 
              : "Заполните форму для регистрации"}
          </p>

          {/* Ошибка */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Имя пользователя
              </label>
              <div className="relative">
                <Image
                  src={userIcon}
                  alt=""
                  width={18}
                  height={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-black"
                  placeholder="Введите имя"
                  required
                  minLength={3}
                  maxLength={50}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-black"
                placeholder="••••••••"
                required
                minLength={3}
                maxLength={72}
                disabled={isLoading}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Подтвердите пароль
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-black"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Загрузка...
                </span>
              ) : isLogin ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>

          {/* Доп. ссылки */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                {isLogin ? "Создать" : "Войти"}
              </button>
            </p>
          </div>
        </div>

        {/* Футер (опционально) */}
        <p className="mt-8 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} GIDRATOP. Все права защищены.
        </p>
        
      </div>
    </div>
  );
}