import dotenv from "dotenv";
// Инициализируем dotenv в самой первой строчке, до импорта createApi
dotenv.config();

import createApi from "./createApi";

const app = createApi();
// Забираем порт из .env, а если его там нет — оставляем дефолтный 5555
const port = process.env.PORT || 5555;

console.log("1. Скрипт бэкенда успешно стартовал...");

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
