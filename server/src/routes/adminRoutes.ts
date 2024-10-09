import { Router, Request, Response } from "express";
import { authenticateToken } from "../middlewares/usersMiddleware";
import { adminRole } from "../middlewares/adminMiddleware";

const router: Router = Router();
router.post("/new-product", authenticateToken, adminRole, (req: Request, res: Response) => {
    
  });

export default router;
