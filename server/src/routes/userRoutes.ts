import { Router, Request, Response } from "express";
import {
  setQuantityItemToBasket,
  editUser,
  getMeData,
  addFavorite,
} from "../controllers/userController";
import {
  authenticateToken,
  RequestWithDecodedToken,
} from "../middlewares/usersMiddleware";

const router: Router = Router();

router.get("/me", authenticateToken, (req: Request, res: Response) => {
  getMeData(req as RequestWithDecodedToken, res);
});
router.post("/edit-data", authenticateToken, (req: Request, res: Response) => {
  editUser(req as RequestWithDecodedToken, res);
});
router.post(
  "/set-item-quantity-to-basket",
  authenticateToken,
  (req: Request, res: Response) => {
    setQuantityItemToBasket(req as RequestWithDecodedToken, res);
  }
);

router.post(
  "/set-user-favorite-products",
  authenticateToken,
  (req: Request, res: Response) => {
    addFavorite(req as RequestWithDecodedToken, res);
  }
);

export default router;