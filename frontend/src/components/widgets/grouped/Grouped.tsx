"use client";
import Card from "@/entities/card/Card";
import CardSkeleton from "@/entities/card/CardSkeleton";
import scss from "./grouped.module.scss";
import { useGetGroupet } from "@/hooks/useGetGroupet";
import Link from "next/link";
import { motion } from "framer-motion"; // Добавь эту библиотеку (npm install framer-motion)

export default function Grouped() {
  const { data: groupet, isLoading } = useGetGroupet();

  // Обязательно возвращаем функцию заголовков
  const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
      ac: "Кондиционеры",
      fridge: "Холодильники",
      tv: "Телевизоры",
    };
    return titles[category] || "Другое";
  };

  if (isLoading) {
    return (
      <div className={scss.container}>
        <div className="container">
          <div className={scss.mainContainer}>
            {[1, 2].map((i) => (
              <section key={i} className={scss.section}>
                <div className={scss.skeletonTitle} />
                <div className={scss.grid}>
                  {[1, 2, 3, 4].map((j) => (
                    <CardSkeleton key={j} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={scss.container}
    >
      <div className="container">
        <div className={scss.mainContainer}>
          {groupet?.map((group: any) => (
            <section key={group.category} className={scss.section}>
              <div className={scss.header}>
                <h2>{getCategoryTitle(group.category)}</h2>
                <Link href={`/category/${group.category}`}>
                  Смотреть все <span>→</span>
                </Link>
              </div>

              <div className={scss.grid}>
                {group.products.map((product: any) => (
                  <Card key={product.id} {...product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
