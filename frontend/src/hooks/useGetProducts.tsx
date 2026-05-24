import { API } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface IResponce {
  message: string;
  data: IData[];
}

interface IData {
  id: number;
  image: string;
  title: string;
  price: number;
  count: number;
  category: string;
  description: string;
}

export const useGetProducts = (category?: string) =>
  useQuery({
    queryKey: ["get", category],
    queryFn: async () => {
      const responce = await axios.get<IResponce>(`${API}/products`, {
        params: {
          category,
        },
      });
      return responce.data.data;
    },
  });
