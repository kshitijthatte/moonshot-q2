import { Router } from "express";
import { getTrend } from "../controllers/trendController";

const router = Router();

router.get('/trend', getTrend);

export default router;
