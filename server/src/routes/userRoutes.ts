import { Router, Request, Response } from "express";
import {
  addItemToBasket,
  editUser,
  getMeData,
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
  "/add-item-to-basket",
  authenticateToken,
  (req: Request, res: Response) => {
    addItemToBasket(req as RequestWithDecodedToken, res);
  }
);

export default router;