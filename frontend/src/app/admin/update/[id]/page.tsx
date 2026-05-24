"use client";

import UpdateProduct from "@/components/page/updateProduct/UpdateProduct";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "@/constant/api";

export default function Page() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`${API}/products/${id}`);
      return res.data.data; // 💥 FIX HERE
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;

  return <UpdateProduct product={data} />;
}
