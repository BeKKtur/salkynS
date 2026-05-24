import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authRouter = Router();

// Создаем базовый массив с главным админом из .env
const allowedAdmins = [
  { login: process.env.ADMIN_LOGIN, password: process.env.ADMIN_PASSWORD },
];

// Если в .env прописаны дополнительные менеджеры, парсим их и добавляем в массив
if (process.env.ALLOWED_MANAGERS) {
  const managersArray = process.env.ALLOWED_MANAGERS.split(","); // Разделяем по запятым

  managersArray.forEach((managerStr) => {
    const [login, password] = managerStr.split(":"); // Разделяем логин и пароль по двоеточию
    if (login && password) {
      allowedAdmins.push({ login, password });
    }
  });
}

// ДАЛЬШЕ ИДЕТ ТВОЙ ДЕФОЛТНЫЙ ПОСТ-ЗАПРОС БЕЗ ИЗМЕНЕНИЙ
authRouter.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  const isMatch = allowedAdmins.some(
    (admin) => admin.login === username && admin.password === password,
  );

  if (isMatch) {
    const token = jwt.sign(
      { role: "admin", user: username },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "24h" },
    );

    return res.json({ success: true, token, role: "admin" });
  }

  return res
    .status(401)
    .json({ success: false, message: "Неверный логин или пароль" });
});

export default authRouter;
