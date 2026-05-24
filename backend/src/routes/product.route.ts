import { Router } from "express";
import {
  deleteProductController,
  getGroupedProductsController,
  getOneProductController,
  getProductController,
  postProductController,
  updateProductController,
} from "../controllers/product.controller";
import { uploadMiddlewares } from "../middleware/uploadMiddleware";
import { checkAdmin } from "../middleware/checkAdmin";

const router = Router();

router.get("/", getProductController);
router.get("/grouped", getGroupedProductsController);

router.post(
  "/",
  checkAdmin,
  uploadMiddlewares.single("image"),
  postProductController,
);
router.get("/:id", getOneProductController);
router.delete("/:id", checkAdmin, deleteProductController);
router.patch(
  "/:id",
  checkAdmin,
  uploadMiddlewares.single("image"),
  updateProductController,
);

export default router;
