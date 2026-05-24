import multer from "multer";
import { diskStorage } from "multer";
import path from "path";

const storage = diskStorage({
  destination: (_, __, cd) => {
    cd(null, "src/uploads");
  },
  filename: (_, file, cd) => {
    const ext = path.extname(file.originalname);
    cd(null, `${Date.now()}${ext}`);
  },
});

export const uploadMiddlewares = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});
