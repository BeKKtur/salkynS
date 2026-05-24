"use client";
import Card from "@/entities/card/Card";
import scss from "./products.module.scss";
import { useGetProducts } from "@/hooks/useGetProducts";

export default function Products() {
  const { data: products } = useGetProducts();
  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          {products?.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
