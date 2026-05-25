"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import scss from "./login.module.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5555/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 1. Сохраняем токен в localStorage (для хука usePostProducts)
        localStorage.setItem("accessToken", data.token);

        // 2. Сохраняем в куки (для middleware.ts)
        document.cookie = `auth_token=${data.token}; path=/; max-age=86400; SameSite=Strict`;
        document.cookie = `user_role=${data.role}; path=/; max-age=86400; SameSite=Strict`;

        // 3. Перенаправляем
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Неверный логин или пароль");
      }
    } catch (err) {
      setError("Не удалось связаться с сервером бэкенда");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <form onSubmit={handleLogin} className={scss.formCard}>
            <h2>SALKYN AC</h2>
            <p className={scss.subtitle}>Вход в панель администратора</p>

            {error && <div className={scss.errorBlock}>{error}</div>}

            <div className={scss.inputGroup}>
              <label>ЛОГИН</label>
              <input
                type="text"
                placeholder="Введите логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className={scss.inputGroup}>
              <label>ПАРОЛЬ</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading} className={scss.loginBtn}>
              {loading ? "Вход..." : "Войти в систему"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
