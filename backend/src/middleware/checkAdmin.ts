import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Не авторизован" });

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret",
    ) as any;

    // Проверяем, является ли пользователь админом
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Доступ запрещен. Вы не админ" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Неверный токен" });
  }
};
