import { API } from "@/constant/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// export const usePostProducts = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["post"],
//     mutationFn: async (body: FormData) => {
//       // Достаем токен из хранилища (имя ключа может быть другим, проверь свое)
//       const token = localStorage.getItem("token");

//       const response = await axios.post(`${API}/products`, body, {
//         headers: {
//           // Если ты используешь JWT, стандарт — Bearer токен
//           Authorization: `Bearer ${token}`,
//           // Content-Type НЕ НУЖНО указывать вручную,
//           // axios сам выставит его для FormData
//         },
//       });
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["get"] });
//       queryClient.invalidateQueries({ queryKey: ["grouped-products"] });
//     },
//   });
// };
export const usePostProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["post"],
    mutationFn: async (body: FormData) => {
      const token = localStorage.getItem("accessToken");

      // Добавь эту строку, чтобы увидеть в консоли браузера:
      console.log("Отправляю токен:", token);

      const response = await axios.post(`${API}/products`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get"] });
      queryClient.invalidateQueries({ queryKey: ["grouped-products"] });
    },
  });
};
