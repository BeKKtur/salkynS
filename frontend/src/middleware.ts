import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Извлекаем токен и роль из куки (их будет устанавливать форма логина)
  const token = request.cookies.get("auth_token")?.value;
  const userRole = request.cookies.get("user_role")?.value;

  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");

  // 2. Если пользователь пытается зайти в админку, но данных нет или роль не "admin"
  if (isAdminPath) {
    if (!token || userRole !== "admin") {
      // Перенаправляем его на обычную главную страницу сайта витрины
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// 3. Указываем Next.js проверять только админские роуты
export const config = {
  matcher: ["/admin/:path*"],
};
