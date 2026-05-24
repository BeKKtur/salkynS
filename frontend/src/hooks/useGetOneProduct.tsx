"use client";
import { API } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetOneProduct = (id: number | undefined) =>
  useQuery({
    queryKey: ["get one", id],
    queryFn: async () => {
      const responce = await axios.get(`${API}/products/${id}`);
      return responce.data.data;
    },
    enabled: !!id,
  });
