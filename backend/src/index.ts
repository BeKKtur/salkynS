import dotenv from "dotenv";
// Инициализируем dotenv в самой первой строчке, до импорта createApi
dotenv.config();

import createApi from "./createApi";

const app = createApi();
// Забираем порт из .env, а если его там нет — оставляем дефолтный 5555
// Превращаем PORT в число с помощью Number()
const PORT = Number(process.env.PORT) || 5555;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});