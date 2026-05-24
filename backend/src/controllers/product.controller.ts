import {
  deleteProductService,
  getGroupedProductsService,
  getOneProductService,
  getProductService,
  updateProductService,
} from "./../services/product.service";
import { NextFunction, Request, Response } from "express";
import { postProductService } from "../services/product.service";

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
export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const image = req.file?.filename;

    const result = await updateProductService(
      {
        ...req.body,
        image,
      },
      id,
    );

    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
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
