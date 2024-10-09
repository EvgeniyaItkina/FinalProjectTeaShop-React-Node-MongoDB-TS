import { Router } from "express";
import { getAllProducts } from "../controllers/productController";

const router: Router = Router();
router.get("/all-product", getAllProducts);

export default router;