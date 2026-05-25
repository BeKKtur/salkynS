import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Сначала вытаскиваем токен, если есть заголовок
    const token = authHeader?.split(" ")[1];

    // 2. Если токена нет, выбрасываем ошибку (TypeScript поймет, что дальше токен есть)
    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    // 3. Теперь TypeScript знает, что token — это точно string
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret",
    ) as any;

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Доступ запрещен. Вы не админ" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Неверный токен" });
  }
};