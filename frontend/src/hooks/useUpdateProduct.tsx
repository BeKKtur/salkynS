import { API } from "@/constant/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// ВАЖНО: Используйте именно 'data', так как именно его ждёт ваш mutationFn
export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: FormData }) => {
      const token = localStorage.getItem("accessToken");
      
      const response = await axios.patch(`${API}/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};