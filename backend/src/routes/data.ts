import { Router } from "express";
import { getData, getRawData } from "../controllers/dataController";

const router = Router();

router.get('/raw-data', getRawData);

router.get("/data", getData);

export default router;
