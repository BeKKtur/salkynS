"use client";
import Card from "@/entities/card/Card";
import scss from "./grouped.module.scss";
import { useGetGroupet } from "@/hooks/useGetGroupet";
import Link from "next/link";

export default function Grouped() {
  const { data: groupet } = useGetGroupet();
  const getCategoryTitle = (category: string) => {
    if (category === "ac") return "Кондиционер";
    if (category === "fridge") return "Холодильник";
    return "Категория";
  };

  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          {groupet?.map((group: any) => (
            <div key={group.category} className={scss.line}>
              <div className={scss.title}>
                <h1>{getCategoryTitle(group.category)}</h1>
                <Link href={`/category/${group.category}`}>Больше</Link>
              </div>

              <div className={scss.grid}>
                {group.products.map((product: any) => (
                  <Card key={product.id} {...product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
