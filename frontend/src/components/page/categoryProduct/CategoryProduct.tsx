"use client";
import { useParams } from "next/navigation";
import scss from "./categoryProduct.module.scss";
import { useGetProducts } from "@/hooks/useGetProducts";
import Card from "@/entities/card/Card";

export default function CategoryProduct() {
  const params = useParams();

  const category = String(params.category);

  const { data: products } = useGetProducts(category);
  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <h1>{category}</h1>
          <div className={scss.cards}>
            {products?.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
