//// filepath: /home/jsierra/projects/pictor-98/src/routes/apodRoutes.ts
import { Router } from "express";
import { fetchApodData } from "../controllers/apodController.js";

const router = Router();

router.get("/", fetchApodData);

export default router;
