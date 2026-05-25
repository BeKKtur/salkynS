import { pool } from "../plugins/pg";
import { apiErrors } from "../utils/apiErrors";

interface IBody {
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
  count: number;
}

interface IQuery {
  search: string;
  minPrice: number;
  maxPrice: number;
  page: number;
  limit: number;
  category: string;
}

export const getProductService = async (query: IQuery) => {
  const page = query.page || 1;

  let values: any = [];
  let conditions: any = [];

  if (query.search) {
    values.push(`%${query.search}%`);
    conditions.push(`title ilike $${values.length}`);
  }
  if (query.maxPrice) {
    values.push(query.maxPrice);
    conditions.push(`price <= $${values.length}`);
  }
  if (query.minPrice) {
    values.push(query.minPrice);
    conditions.push(`price >= $${values.length}`);
  }

  if (query.category) {
    values.push(query.category);
    conditions.push(`category = $${values.length}`);
  }

  let whereCondition = "";
  if (conditions.length > 0) {
    whereCondition = `where ${conditions.join(" and ")}`;
  }
  const res = await pool.query(
    `
        select * from products
        ${whereCondition}
    `,
    values,
  );
  return res.rows;
};

export const getOneProductService = async (id: number) => {
  const res = await pool.query(
    `
        select * from products where id=$1
        `,
    [id],
  );
  if (!res.rows[0]) throw apiErrors.notFound("Product not found");

  return res.rows[0];
};

export const postProductService = async (body: IBody) => {
  const res = await pool.query(
    `
        insert into products
        (title,image,price,description,count,category)
        values ($1,$2,$3,$4,$5,$6)
        returning *
    `,
    [
      body.title,
      body.image,
      body.price,
      body.description,
      body.count,
      body.category,
    ],
  );
  return res.rows[0];
};
export const deleteProductService = async (id: number) => {
  const res = await pool.query(
    `
        delete from products where id=$1
        returning *
    `,
    [id],
  );
  if (!res.rows[0]) throw apiErrors.badRequest("id not found");
  return res.rows[0];
};
export const updateProductService = async (updateBody: IBody, id: number) => {
  // Используем COALESCE для всех полей, чтобы база оставляла старые данные,
  // если новые данные (updateBody) пустые или null.
  const res = await pool.query(
    `
    UPDATE products
    SET 
      title = COALESCE(NULLIF($1, ''), title),
      image = COALESCE(NULLIF($2, ''), image),
      price = COALESCE($3, price),
      description = COALESCE(NULLIF($4, ''), description),
      count = COALESCE($5, count),
      category = COALESCE(NULLIF($6, ''), category)
    WHERE id = $7
    RETURNING *
    `,
    [
      updateBody.title,
      updateBody.image,
      updateBody.price === 0 ? null : updateBody.price, // Если 0 - считаем, что не меняли
      updateBody.description,
      updateBody.count === 0 ? null : updateBody.count,
      updateBody.category,
      id,
    ],
  );

  return res.rows[0];
};
export const getGroupedProductsService = async () => {
  const res = await pool.query(`
    SELECT category,
    json_agg(
      json_build_object(
        'id', id,
        'title', title,
        'image', image,
        'price', price
      )
    ) as products
    FROM products
    GROUP BY category
  `);

  return res.rows;
};
