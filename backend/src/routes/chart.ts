import { Router } from "express";
import { saveChart, getSharedChart } from "../controllers/chartController";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

router.post("/share-chart", authenticateToken, saveChart);

router.get("/shared-chart/:id", authenticateToken, getSharedChart);

export default router;
