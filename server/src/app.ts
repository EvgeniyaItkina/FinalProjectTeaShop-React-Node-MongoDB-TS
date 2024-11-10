import express, { Application } from "express";
import "./config/enviroment";
import { connectMongoose } from "./config/database";
import authRoutes from "./routes/authRoutes"; // пример подключения маршрутов
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import { createAdmin } from "./tools/createAdmin";
import adminRoutes from "./routes/adminRoutes";
import { seedProducts } from "./tools/seedProducts";
import imagesRoute from "./routes/imagesRoute";
import { setupLogging } from "./middlewares/log/morgan_logger";
const app: Application = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectMongoose();
  await createAdmin();
  await seedProducts();
  console.log(`Example app listening on port ${PORT}`);
});

// morgan
setupLogging(app);

// Middleware для парсинга JSON
app.use(express.json({ limit: "10mb" }));

// Подключение к базе данных

// // Маршруты
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/", imagesRoute);
app.use(express.static("public"));