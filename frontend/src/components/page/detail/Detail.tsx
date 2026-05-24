// "use client";
// import { useGetOneProduct } from "@/hooks/useGetOneProduct";
// import scss from "./details.module.scss";
// import { useParams } from "next/navigation";

// export default function Details() {
//   const params = useParams();

//   const id = Number(params.id);
//   const { data: oneProduct, isLoading, error } = useGetOneProduct(id);
//   if (isLoading) return <div>Loading...</div>;
//   if (!oneProduct) return <div>Not found</div>;
//   if (error) return <div>Error</div>;

//   return (
//     <div className={scss.container}>
//       <div className="container">
//         <div className={scss.mainContainer}>
//           <img src={`http://localhost:5555/${oneProduct.image}`} alt="photo"/>
//           <div className={scss.text}>
//             <h3>{oneProduct.title}</h3>
//             <p className={scss.price}>сумма: {oneProduct.price} KGS</p>
//             <div className={scss.line}></div>
//             <p className={scss.description}>{oneProduct.description}</p>
//             <p></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useGetOneProduct } from "@/hooks/useGetOneProduct";
import scss from "./details.module.scss";
import { useParams } from "next/navigation";

export default function Details() {
  const params = useParams();
  const id = Number(params.id);
  const { data: oneProduct, isLoading, error } = useGetOneProduct(id);

  // Красивое состояние загрузки (Скелетон)
  if (isLoading) {
    return (
      <div className={scss.container}>
        <div className="container">
          <div className={`${scss.mainContainer} ${scss.skeleton}`}>
            <div className={scss.skeletonImg}></div>
            <div className={scss.skeletonText}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !oneProduct) {
    return (
      <div className={scss.errorContainer}>
        <h3>Продукт не найден</h3>
        <a href="/" className={scss.backBtn}>
          На главную
        </a>
      </div>
    );
  }

  // Динамическая ссылка для WhatsApp заказа
  const whatsappMessage = encodeURIComponent(
    `Здравствуйте! Меня интересует кондиционер "${oneProduct.title}". Подскажите, пожалуйста, по поводу наличия и установки.`,
  );

  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          {/* Блок изображения */}
          <div className={scss.imageWrapper}>
            {/* Меняем порт на 7777, так как мы его перенастроили */}
            <img
              src={`http://localhost:5555/${oneProduct.image}`}
              alt={oneProduct.title}
            />
          </div>

          {/* Блок контента */}
          <div className={scss.textBlock}>
            <span className={scss.badge}>В наличии / Монтаж бесплатно</span>
            <h1>{oneProduct.title}</h1>

            <div className={scss.priceRow}>
              <span className={scss.priceLabel}>Цена:</span>
              <p className={scss.price}>
                {oneProduct.price.toLocaleString()} KGS
              </p>
            </div>

            <div className={scss.line}></div>

            <div className={scss.infoSection}>
              <h4>Описание товара</h4>
              <p className={scss.description}>{oneProduct.description}</p>
            </div>

            {/* Иконки преимуществ */}
            <div className={scss.featuresGrid}>
              <div className={scss.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Официальная гарантия</span>
              </div>
              <div className={scss.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                <span>Быстрая доставка</span>
              </div>
            </div>

            <div className={scss.actionButtons}>
              <a
                href={`https://wa.me/996552320914?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className={scss.orderBtn}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.64-1.03-5.122-2.903-6.994-1.872-1.874-4.353-2.906-6.992-2.906-5.45 0-9.887 4.436-9.89 9.888-.001 2.214.6 4.35 1.748 6.198l-.999 3.648 3.755-.985z" />
                </svg>
                <span>Заказать в WhatsApp</span>
              </a>

              <a href="tel:+996552320914" className={scss.phoneBtn}>
                Позвонить
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}