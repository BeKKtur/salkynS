"use client";
import { useParams } from "next/navigation";
import scss from "./categoryProduct.module.scss";
import { useGetProducts } from "@/hooks/useGetProducts";
import Card from "@/entities/card/Card";

export default function CategoryProduct() {
  const { category } = useParams();
  const categorySlug = String(category);
  const { data: products, isLoading } = useGetProducts(categorySlug);

  const getTitle = (slug: string) => {
    const map: Record<string, string> = {
      ac: "Кондиционеры",
      fridge: "Холодильники",
      tv: "Телевизоры",
    };
    return map[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  if (isLoading) return <div className={scss.loader}>Загрузка товаров...</div>;

  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <header className={scss.header}>
            <h1>{getTitle(categorySlug)}</h1>
            <p className={scss.count}>
              {products?.length || 0} товаров найдено
            </p>
          </header>

          {products?.length ? (
            <div className={scss.cards}>
              {products.map((item) => (
                <Card key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className={scss.empty}>В этой категории пока пусто.</div>
          )}
        </div>
      </div>
    </div>
  );
}
