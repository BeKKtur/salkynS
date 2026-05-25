// "use client";

// import { useEffect, useState } from "react";
// import scss from "./updateProduct.module.scss";
// import { useUpdateProduct } from "@/hooks/useUpdateProduct";

// type Props = {
//   product: {
//     id: number;
//     image?: string;
//     title?: string;
//     price?: number;
//     count?: number;
//     category?: string;
//     description?: string;
//   };
// };

// type FormType = {
//   id: number;
//   image: string;
//   imageFile: File | null;
//   title: string;
//   price: string;
//   count: string;
//   category: string;
//   description: string;
// };

// const safe = (v: any) => v ?? "";

// export default function UpdateProduct({ product }: Props) {
//   const { mutate, isPending } = useUpdateProduct();

//   const [form, setForm] = useState<FormType>({
//     id: 0,
//     image: "",
//     imageFile: null,
//     title: "",
//     price: "",
//     count: "",
//     category: "",
//     description: "",
//   });

//   // 💥 safe init (fix controlled/uncontrolled bug)
//   useEffect(() => {
//     if (!product) return;

//     setForm({
//       id: product.id,
//       image: safe(product.image),
//       imageFile: null,
//       title: safe(product.title),
//       price: String(product.price ?? ""),
//       count: String(product.count ?? ""),
//       category: safe(product.category),
//       description: safe(product.description),
//     });
//   }, [product]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;

//     setForm((prev) => ({
//       ...prev,
//       imageFile: file,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append("title", form.title);
//     formData.append("price", String(form.price));
//     formData.append("count", String(form.count));
//     formData.append("category", form.category);
//     formData.append("description", form.description);

//     if (form.imageFile) {
//       formData.append("image", form.imageFile);
//     }

//     mutate({
//       id: form.id,
//       body: formData,
//     });
//   };

//   return (
//     <div className={scss.container}>
//       <div className={scss.wrapper}>
//         {/* FORM */}
//         <form className={scss.mainContainer} onSubmit={handleSubmit}>
//           <input
//             name="title"
//             value={form.title || ""}
//             onChange={handleChange}
//             placeholder="Title"
//           />

//           <input
//             name="price"
//             value={form.price || ""}
//             onChange={handleChange}
//             type="number"
//             placeholder="Price"
//           />

//           <input
//             name="count"
//             value={form.count || ""}
//             onChange={handleChange}
//             type="number"
//             placeholder="Count"
//           />

//           <select
//             name="category"
//             value={form.category || ""}
//             onChange={handleChange}
//           >
//             <option value="">Category</option>
//             <option value="ac">AC</option>
//             <option value="fridge">Fridge</option>
//             <option value="tv">TV</option>
//           </select>

//           <textarea
//             name="description"
//             value={form.description || ""}
//             onChange={handleChange}
//             placeholder="Description"
//           />

//           {/* IMAGE UPLOAD */}
//           <div className={scss.imageBox}>
//             <p>Image</p>

//             {!form.imageFile && form.image && (
//               <img
//                 src={`http://localhost:5555/uploads/${form.image}`}
//                 alt="current"
//               />
//             )}

//             <input type="file" accept="image/*" onChange={handleFile} />
//           </div>

//           <button type="submit" disabled={isPending}>
//             {isPending ? "Updating..." : "Update Product"}
//           </button>
//         </form>

//         {/* PREVIEW */}
//         <div className={scss.preview}>
//           <p>Live Preview</p>

//           {form.imageFile ? (
//             <img src={URL.createObjectURL(form.imageFile)} />
//           ) : form.image ? (
//             <img src={`http://localhost:5555/uploads/${form.image}`} />
//           ) : (
//             <div className={scss.empty}>No image</div>
//           )}

//           <h3>{form.title || "Title"}</h3>
//           <span>{form.price || "0"} KGS</span>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import scss from "./updateProduct.module.scss";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";

type Props = {
  product: {
    id: number;
    image?: string;
    title?: string;
    price?: number;
    count?: number;
    category?: string;
    description?: string;
  };
};

type FormType = {
  id: number;
  image: string;
  imageFile: File | null;
  title: string;
  price: string;
  count: string;
  category: string;
  description: string;
};

const safe = (v: any) => v ?? "";

export default function UpdateProduct({ product }: Props) {
  const { mutate, isPending } = useUpdateProduct();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [form, setForm] = useState<FormType>({
    id: 0,
    image: "",
    imageFile: null,
    title: "",
    price: "",
    count: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    if (!product) return;

    setForm({
      id: product.id,
      image: safe(product.image),
      imageFile: null,
      title: safe(product.title),
      price: String(product.price ?? ""),
      count: String(product.count ?? ""),
      category: safe(product.category),
      description: safe(product.description),
    });
  }, [product]);

  // Управление ссылками предпросмотра для предотвращения утечек памяти
  useEffect(() => {
    if (!form.imageFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(form.imageFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [form.imageFile]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, imageFile: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("count", form.count);
    formData.append("category", form.category);
    formData.append("description", form.description);

    if (form.imageFile) {
      formData.append("image", form.imageFile);
    }

    mutate({
      id: form.id,
      data: formData,
    });
  };

  const getCategoryLabel = (cat: string) => {
    if (cat === "ac") return "Кондиционер";
    if (cat === "fridge") return "Холодильник";
    if (cat === "tv") return "Телевизор";
    return "Техника";
  };

  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.wrapper}>
          {/* ФОРМА РЕДАКТИРОВАНИЯ */}
          <form className={scss.mainContainer} onSubmit={handleSubmit}>
            <div className={scss.formHeader}>
              <h2>Редактирование товара</h2>
              <p>Измените необходимые параметры карточки</p>
            </div>

            <div className={scss.inputGroup}>
              <label>Название оборудования</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Например: Сплит-система Salkyn"
              />
            </div>

            <div className={scss.rowGrid}>
              <div className={scss.inputGroup}>
                <label>Цена (KGS)</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                />
              </div>

              <div className={scss.inputGroup}>
                <label>Количество (шт)</label>
                <input
                  name="count"
                  value={form.count}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>

            <div className={scss.inputGroup}>
              <label>Категория</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Выберите категорию</option>
                <option value="ac">Кондиционер</option>
                <option value="fridge">Холодильник</option>
                <option value="tv">Телевизор</option>
              </select>
            </div>

            <div className={scss.inputGroup}>
              <label>Описание и спецификации</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Подробное описание товара..."
              />
            </div>

            {/* КАСТОМНЫЙ АПЛОАД КАРТИНКИ */}
            <div className={scss.inputGroup}>
              <label>Обновить фото витрины</label>
              <div className={scss.fileUploadZone}>
                <input
                  type="file"
                  id="update-file"
                  accept="image/*"
                  onChange={handleFile}
                  className={scss.hiddenInput}
                />
                <label htmlFor="update-file" className={scss.fileLabel}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>
                    {form.imageFile
                      ? form.imageFile.name
                      : "Загрузить новое изображение"}
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={scss.submitBtn}
              disabled={isPending}
            >
              {isPending ? "Сохранение..." : "Сохранить изменения"}
            </button>
          </form>

          {/* ЖИВОЙ ПРЕДПРОСМОТР КАРТОЧКИ */}
          <div className={scss.previewCard}>
            <div className={scss.previewHeader}>
              <h3>Предпросмотр изменений</h3>
              <span className={scss.liveBadge}>Live</span>
            </div>

            <div className={scss.productMockup}>
              <div className={scss.imageHolder}>
                {previewUrl ? (
                  <img src={previewUrl} alt="New Preview" />
                ) : form.image ? (
                  /* Исправлен порт на 7777 и убран дублирующийся префикс /uploads/ */
                  <img
                    src={`http://localhost:5555/${form.image}`}
                    alt="Current"
                  />
                ) : (
                  <div className={scss.emptyMock}>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
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
                    <span>Нет изображения</span>
                  </div>
                )}
              </div>

              <div className={scss.mockupContent}>
                <span className={scss.mockupCategory}>
                  {form.category
                    ? getCategoryLabel(form.category)
                    : "Категория"}
                </span>
                <h4 className={scss.mockupTitle}>
                  {form.title || "Название товара"}
                </h4>
                <p className={scss.mockupDescription}>
                  {form.description ||
                    "Здесь будет отображаться новое описание оборудования..."}
                </p>
                <div className={scss.mockupFooter}>
                  <div className={scss.priceBlock}>
                    <span className={scss.priceLabel}>Сумма:</span>
                    <span className={scss.priceValue}>
                      {form.price ? Number(form.price).toLocaleString() : "0"}{" "}
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