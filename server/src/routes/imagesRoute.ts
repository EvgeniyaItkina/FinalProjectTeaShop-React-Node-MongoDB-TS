
import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";
const imagesDir = path.join(process.cwd(), "public/images");
const defaultImagePath = path.join(
    process.cwd(),
    "public/images",
    "default.png"
);

const router: Router = Router();
router.get("/images/:imageName", (req: Request, res: Response) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(imagesDir, imageName);

    // Check if the image exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If the image does not exist, send the default image
            res.sendFile(defaultImagePath);
        } else {
            // If the image exists, send it
            res.sendFile(imagePath);
        }
    });
});
export default router;
/*  */