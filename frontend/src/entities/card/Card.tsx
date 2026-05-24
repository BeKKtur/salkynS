"use client";

import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import scss from "./card.module.scss";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface IProduct {
  id: number;
  image: string;
  title: string;
  price: number;
}

export default function Card({ id, image, title, price }: IProduct) {
  const { mutate: deleteProduct } = useDeleteProduct();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const router = useRouter();

  return (
    <div className={scss.cardContainer}>
      <img src={`http://localhost:5555/${image}`} alt={title} />

      <div className={scss.content}>
        <div className={scss.text}>
          <h3>{title}</h3>
          <p>
            сумма <br />
            <span>{price}</span>
          </p>
        </div>

        <div className={scss.btns}>
          {isAdmin && (
            <>
              <button onClick={() => deleteProduct(id)} className={scss.delete}>
                Delete
              </button>

              <button
                className={scss.edit}
                onClick={() => router.push(`/admin/update/${id}`)}
              >
                Edit
              </button>
            </>
          )}

          <Link href={`/detail/${id}`} className={scss.detail}>
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
