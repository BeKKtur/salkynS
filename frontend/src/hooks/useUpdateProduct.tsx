import { API } from "@/constant/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update"],

    mutationFn: async ({ id, body }: { id: number; body: FormData }) => {
      const res = await axios.patch(`${API}/products/${id}`, body);

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get"] });
      queryClient.invalidateQueries({ queryKey: ["grouped-products"] });
    },
  });
};
