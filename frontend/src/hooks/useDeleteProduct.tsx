"use client";

import { API } from "@/constant/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface IProduct {
  id: number;
  image: string;
  title: string;
  price: number;
  count: number;
  category: string;
  description: string;
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete"],
    mutationFn: async (id: number) => {
      const responce = await axios.delete<IProduct>(`${API}/products/${id}`);
      return responce.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get"],
      });
      queryClient.invalidateQueries({
        queryKey: ["grouped-products"],
      });
    },
  });
};
