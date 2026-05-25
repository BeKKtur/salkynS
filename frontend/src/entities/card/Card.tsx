// "use client";
// import { useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useDeleteProduct } from "@/hooks/useDeleteProduct";
// import scss from "./card.module.scss";
// import Link from "next/link";

// interface IProduct {
//   id: number;
//   image: string;
//   title: string;
//   price: number;
//   count: number;
//   category: string;
//   description: string;
// }

// export default function Card({ id, image, title, price }: IProduct) {
//   const { mutate: deleteProduct } = useDeleteProduct();
//   const [isConfirming, setIsConfirming] = useState(false);

//   // ДОБАВЬТЕ ЭТИ СТРОКИ:
//   const pathname = usePathname();
//   const router = useRouter();
//   const isAdmin = pathname.startsWith("/admin");

//   const handleDelete = () => {
//     if (isConfirming) {
//       deleteProduct(id);
//     } else {
//       setIsConfirming(true);
//     }
//   };

//   return (
//     <div className={scss.cardContainer}>
//       <div className={scss.imageWrapper}>
//         <img src={`http://localhost:5555/${image}`} alt={title} />
//       </div>

//       <div className={scss.content}>
//         <h3 title={title}>{title}</h3>
//         <p className={scss.price}>
//           {price.toLocaleString()} <span>KGS</span>
//         </p>
//       </div>

//       <div className={scss.actions}>
//         {isAdmin && (
//           <>
//             <button
//               onClick={handleDelete}
//               className={isConfirming ? scss.confirmBtn : scss.deleteBtn}
//             >
//               {isConfirming ? (
//                 "Да, удалить?"
//               ) : (
//                 <svg
//                   viewBox="0 0 24 24"
//                   width="16"
//                   height="16"
//                   stroke="currentColor"
//                   fill="none"
//                   strokeWidth="2"
//                 >
//                   <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//                 </svg>
//               )}
//             </button>

//             {isConfirming && (
//               <button
//                 onClick={() => setIsConfirming(false)}
//                 className={scss.cancelBtn}
//               >
//                 Нет
//               </button>
//             )}

//             {!isConfirming && (
//               <button
//                 className={scss.editBtn}
//                 onClick={() => router.push(`/admin/update/${id}`)}
//               >
//                 <svg
//                   viewBox="0 0 24 24"
//                   width="16"
//                   height="16"
//                   stroke="currentColor"
//                   fill="none"
//                   strokeWidth="2"
//                 >
//                   <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                   <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//                 </svg>
//               </button>
//             )}
//           </>
//         )}
//         {!isConfirming && (
//           <Link href={`/detail/${id}`} className={scss.detailBtn}>
//             Подробнее
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import scss from "./card.module.scss";
import Link from "next/link";

interface IProduct {
  id: number;
  image: string;
  title: string;
  price: number;
  count: number;
  category: string;
  description: string;
}

export default function Card({ id, image, title, price }: IProduct) {
  const { mutate: deleteProduct } = useDeleteProduct();
  const [isConfirming, setIsConfirming] = useState(false);

  // Zustand: Избранное
  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorite = favorites.includes(id);

  // Навигация и Админка
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith("/admin");

  const handleDelete = () => {
    if (isConfirming) {
      deleteProduct(id);
    } else {
      setIsConfirming(true);
    }
  };

  return (
    <div className={scss.cardContainer}>
      <div className={scss.imageWrapper}>
        <img src={`http://localhost:5555/${image}`} alt={title} />

        {/* Кнопка избранного */}
        <button
          onClick={() => toggleFavorite(id)}
          className={scss.heartBtn}
          aria-label="Добавить в избранное"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isFavorite ? "#ef4444" : "none"}
            stroke={isFavorite ? "#ef4444" : "currentColor"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className={scss.content}>
        <h3 title={title}>{title}</h3>
        <p className={scss.price}>
          {price.toLocaleString()} <span>KGS</span>
        </p>
      </div>

      <div className={scss.actions}>
        {isAdmin && (
          <>
            <button
              onClick={handleDelete}
              className={isConfirming ? scss.confirmBtn : scss.deleteBtn}
            >
              {isConfirming ? (
                "Да, удалить?"
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              )}
            </button>
            {isConfirming && (
              <button
                onClick={() => setIsConfirming(false)}
                className={scss.cancelBtn}
              >
                Нет
              </button>
            )}
            {!isConfirming && (
              <button
                className={scss.editBtn}
                onClick={() => router.push(`/admin/update/${id}`)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            )}
          </>
        )}
        {!isConfirming && (
          <Link href={`/detail/${id}`} className={scss.detailBtn}>
            Подробнее
          </Link>
        )}
      </div>
    </div>
  );
}
