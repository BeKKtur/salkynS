import { API } from "@/constant/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export const usePostProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["post"],
    mutationFn: async (body: FormData) => {
      const responce = await axios.post(`${API}/products`, body);
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
