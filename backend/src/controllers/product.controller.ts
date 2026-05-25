import {
  deleteProductService,
  getGroupedProductsService,
  getOneProductService,
  getProductService,
  updateProductService,
} from "./../services/product.service";
import { NextFunction, Request, Response } from "express";
import { postProductService } from "../services/product.service";
import { pool } from "../plugins/pg";

export const postProductController = async (
  req: Request<
    {},
    {},
    {
      title: string;
      price: number;
      description: string;
      count: number;
      category: string;
    }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const imagePage = req.file ? `${req.file.filename}` : "";
    const result = await postProductService({ ...body, image: imagePage });
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductController = async (
  req: Request<
    {},
    {},
    {},
    {
      search: string;
      minPrice: number;
      maxPrice: number;
      page: number;
      limit: number;
      category: string;
    }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getProductService(req.query);
    res.status(201).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const getOneProductController = async (
  req: Request<{
    id: string;
  }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const result = await getOneProductService(id);
    res.status(201).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProductController = async (
  req: Request<{
    id: string;
  }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteProductService(id);
    res.status(204).json({
      message: "success",
      deleted,
    });
  } catch (error) {
    next(error);
  }
};

interface IBody {
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
  count: number;
}
export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const body = req.body || {};
    const newImage = req.file?.filename;

    // 1. Получаем товар из БД
    const productResult = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id],
    );

    // 2. БЕЗОПАСНАЯ ПРОВЕРКА: если товар не найден, сразу выходим
    if (!productResult.rows || productResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Товар с таким ID не существует" });
    }

    const oldProduct = productResult.rows[0];

    // 3. Формируем данные только ПОСЛЕ того, как убедились, что oldProduct есть
    const updateData: IBody = {
      title: body.title || oldProduct.title,
      price: body.price ? Number(body.price) : Number(oldProduct.price),
      count: body.count ? Number(body.count) : Number(oldProduct.count),
      category: body.category || oldProduct.category,
      description: body.description || oldProduct.description,
      image: newImage || oldProduct.image,
    };

    const result = await updateProductService(updateData, id);

    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    console.error("КРИТИЧЕСКАЯ ОШИБКА:", error);
    next(error);
  }
};
export const getGroupedProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getGroupedProductsService();

    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
