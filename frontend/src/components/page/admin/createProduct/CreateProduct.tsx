// "use client";
// import { useForm } from "react-hook-form";
// import scss from "./createProduct.module.scss";
// import { usePostProducts } from "@/hooks/usePostProducts";

// interface IBody {
//   image: any;
//   title: string;
//   price: number;
//   count: number;
//   category: string;
//   description: string;
// }

// export default function CreateProduct() {
//   const { register, handleSubmit, reset } = useForm<IBody>();
//   const { mutate: createProduct } = usePostProducts();
//   const onSubmit = (data: IBody) => {
//     const formData = new FormData();

//     formData.append("title", data.title);
//     formData.append("price", String(data.price));
//     formData.append("count", String(data.count));
//     formData.append("category", data.category);
//     formData.append("description", data.description);

//     formData.append("image", data.image[0]);

//     createProduct(formData);

//     reset();
//   };
//   return (
//     <div className={scss.container}>
//       <div className="container">
//         <div className={scss.mainContainer}>
//           <h1>Create Product</h1>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <input
//               {...register("title", {
//                 required: true,
//               })}
//               type="text"
//               placeholder="Title"
//             />
//             <input
//               {...register("price", {
//                 required: true,
//                 valueAsNumber: true,
//               })}
//               type="text"
//               placeholder="Price"
//             />
//             <input
//               {...register("image", {
//                 required: true,
//               })}
//               type="file"
//               placeholder="Image"
//             />
//             <input
//               {...register("description", {
//                 required: true,
//               })}
//               type="text"
//               placeholder="Description"
//             />
//             <input
//               {...register("count", {
//                 required: true,
//               })}
//               type="text"
//               placeholder="count"
//             />
//             <select
//               {...register("category", {
//                 required: true,
//               })}
//             >
//               <option value="">Выберите категорию</option>

//               <option value="ac">Кондиционер</option>

//               <option value="fridge">Холодильник</option>

//               <option value="tv">Телевизор</option>
//             </select>
//             <button>Create</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import scss from "./createProduct.module.scss";
import { usePostProducts } from "@/hooks/usePostProducts";

interface IBody {
  image: any;
  title: string;
  price: number;
  count: number;
  category: string;
  description: string;
}

export default function CreateProduct() {
  const { register, handleSubmit, reset, watch } = useForm<IBody>();
  const { mutate: createProduct } = usePostProducts();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Наблюдаем за полями для Live Preview
  const watchFields = watch([
    "title",
    "price",
    "description",
    "image",
    "category",
  ]);

  // Генерируем ссылку для предпросмотра загруженного изображения
  useEffect(() => {
    if (watchFields[3] && watchFields[3].length > 0) {
      const file = watchFields[3][0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [watchFields[3]]);

  const onSubmit = (data: IBody) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", String(data.price));
    formData.append("count", String(data.count));
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);

    createProduct(formData);
    reset();
    setImagePreview(null);
  };

  // Хелпер для красивого отображения категории в превью
  const getCategoryName = (cat: string) => {
    if (cat === "ac") return "Кондиционер";
    if (cat === "fridge") return "Холодильник";
    if (cat === "tv") return "Телевизор";
    return "Категория";
  };

  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.dashboardLayout}>
          {/* Левая колонка: Форма создания */}
          <div className={scss.formCard}>
            <h2>Новый товар</h2>
            <p className={scss.subtitle}>
              Заполните параметры для добавления на витрину
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={scss.inputGroup}>
                <label>Название товара</label>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="Например: Сплит-система Salkyn Premium"
                />
              </div>

              <div className={scss.row}>
                <div className={scss.inputGroup}>
                  <label>Цена (KGS)</label>
                  <input
                    {...register("price", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Цена"
                  />
                </div>
                <div className={scss.inputGroup}>
                  <label>Количество (шт)</label>
                  <input
                    {...register("count", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Количество"
                  />
                </div>
              </div>

              <div className={scss.inputGroup}>
                <label>Категория оборудования</label>
                <select {...register("category", { required: true })}>
                  <option value="">Выберите категорию</option>
                  <option value="ac">Кондиционер</option>
                  <option value="fridge">Холодильник</option>
                  <option value="tv">Телевизор</option>
                </select>
              </div>

              {/* Кастомное поле загрузки изображений */}
              <div className={scss.inputGroup}>
                <label>Изображение товара</label>
                <div className={scss.fileUploadZone}>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    className={scss.hiddenFileInput}
                  />
                  <label htmlFor="file-upload" className={scss.fileLabel}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span>
                      {watchFields[3]?.[0]
                        ? watchFields[3][0].name
                        : "Выберите или перетащите фото"}
                    </span>
                  </label>
                </div>
              </div>

              <div className={scss.inputGroup}>
                <label>Описание и характеристики</label>
                <textarea
                  {...register("description", { required: true })}
                  placeholder="Опишите мощность, площадь охлаждения и другие ключевые параметры..."
                  rows={4}
                />
              </div>

              <button type="submit" className={scss.submitBtn}>
                Опубликовать товар
              </button>
            </form>
          </div>

          {/* Правая колонка: Интерактивный Live Preview */}
          <div className={scss.previewCard}>
            <div className={scss.previewHeader}>
              <h3>Предпросмотр на сайте</h3>
              <span className={scss.liveBadge}>Live</span>
            </div>

            <div className={scss.productMockup}>
              <div className={scss.imageHolder}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" />
                ) : (
                  <div className={scss.placeholderImg}>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>Изображение товара</span>
                  </div>
                )}
              </div>

              <div className={scss.mockupContent}>
                <span className={scss.mockupCategory}>
                  {watchFields[4]
                    ? getCategoryName(watchFields[4])
                    : "Категория"}
                </span>
                <h4 className={scss.mockupTitle}>
                  {watchFields[0] || "Название кондиционера или техники"}
                </h4>
                <p className={scss.mockupDescription}>
                  {watchFields[2] ||
                    "Здесь будет отображаться подробное описание технических параметров и преимуществ модели..."}
                </p>
                <div className={scss.mockupFooter}>
                  <div className={scss.priceBlock}>
                    <span className={scss.label}>Сумма:</span>
                    <span className={scss.value}>
                      {watchFields[1]
                        ? Number(watchFields[1]).toLocaleString()
                        : "0"}{" "}
                      KGS
                    </span>
                  </div>
                  <div className={scss.mockupBtn}>Подробнее</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}