import { API } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetGroupet = () =>
  useQuery({
    queryKey: ["grouped-products"],
    queryFn: async () => {
      const res = await axios.get(`${API}/products/grouped`);
      return res.data.data;
    },
  });
