"use client";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { useGetGroupet } from "@/hooks/useGetGroupet";
import Card from "@/entities/card/Card";
import scss from "./favorites.module.scss";
import Link from "next/link"; // Обязательно импортируй это!

export default function Favorites() {
  const { favorites } = useFavoriteStore();
  const { data: groupet, isLoading } = useGetGroupet();

  const allProducts = groupet?.flatMap((group: any) => group.products) || [];
  const favoriteProducts = allProducts.filter((p: any) =>
    favorites.includes(p.id),
  );

  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <h1>Избранное</h1>

          {isLoading ? (
            <p>Загрузка...</p>
          ) : favoriteProducts.length > 0 ? (
            <div className={scss.grid}>
              {favoriteProducts.map((product: any) => (
                <Card key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className={scss.emptyState}>
              <p>В избранном пока пусто.</p>
              {/* Вот здесь твоя ссылка */}
              <Link href="/" className={scss.backLink}>
                На главную
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
