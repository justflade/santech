// hooks/useAuth.js
import { useEffect, useState, useCallback } from "react";

const API_URL = "http://127.0.0.1:8000/api";

export default function useAuth() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Проверка токена — простая функция, не хук
  const checkToken = async (tokenToCheck) => {
    if (!tokenToCheck) return false;
    try {
      const res = await fetch(`${API_URL}/check-token`, {
        headers: {
          "Authorization": `Bearer ${tokenToCheck}`,
        },
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  // Инициализация: читаем из localStorage и сразу валидируем на бэкенде
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("username");
      
      if (storedToken && storedUser) {
        const isValid = await checkToken(storedToken);
        
        if (isValid) {
          setToken(storedToken);
          setUser({ name: storedUser });
        } else {
          // Токен сгнил — чистим всё
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          setError("Сессия истекла");
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Логин
  const login = useCallback(async (name, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || data.detail || "Ошибка авторизации");
      }

      const { access_token } = data.data;
      
      localStorage.setItem("token", access_token);
      localStorage.setItem("username", name);
      
      setToken(access_token);
      setUser({ name });
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Регистрация
  const register = useCallback(async (name, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || data.detail || "Ошибка регистрации");
      }

      const { access_token } = data.data;
      
      localStorage.setItem("token", access_token);
      localStorage.setItem("username", name);
      
      setToken(access_token);
      setUser({ name });
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Логаут
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  return {
    user,
    token,
    isAuthed: !!token,
    isLoading,
    error,
    login,
    register,
    logout,
    checkToken: (t) => checkToken(t || token), // можно вызвать вручную с другим токеном
  };
}