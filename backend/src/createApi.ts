import express from "express";
import cors from "cors";
import productRouter from "./routes/product.route";
import { errorHandler } from "./middleware/errorHandler";
import authRouter from "./routes/auth.route";

const createApi = () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  );
  app.use(express.static("src/uploads"));
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/products", productRouter);
  app.use(errorHandler);
  return app;
};

export default createApi;
