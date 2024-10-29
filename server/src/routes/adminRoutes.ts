import { Router } from "express";
import { authenticateToken } from "../middlewares/usersMiddleware";
import { adminRole } from "../middlewares/adminMiddleware";
import {
  deleteUser,
  getUsers,
  createProduct,
  deleteProduct,
  editProduct,
  setUserRole,
} from "../controllers/adminController";

const router: Router = Router();
router.post("/create-product", authenticateToken, adminRole, createProduct);
router.put("/edit-product", authenticateToken, adminRole, editProduct);
router.delete("/delete-product", authenticateToken, adminRole, deleteProduct);
router.delete("/delete-user", authenticateToken, adminRole, deleteUser);
router.get("/get-users", authenticateToken, adminRole, getUsers);
router.patch("/set-user-role", authenticateToken, adminRole, setUserRole);

export default router;