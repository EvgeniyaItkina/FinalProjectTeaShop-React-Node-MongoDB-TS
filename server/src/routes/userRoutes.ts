import { Router, Request, Response } from "express";
import { editUser, getUserData } from "../controllers/userController";
import {
  authenticateToken,
  RequestWithDecodedToken,
} from "../middlewares/usersMiddleware";

const router: Router = Router();

router.get("/user-data", authenticateToken, (req: Request, res: Response) => {
  getUserData(req as RequestWithDecodedToken, res);
});
router.post("/edit-data", authenticateToken, (req: Request, res: Response) => {
  editUser(req as RequestWithDecodedToken, res);
});

export default router;
