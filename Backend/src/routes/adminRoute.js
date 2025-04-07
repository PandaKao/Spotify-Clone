import { Router } from "express";
import { createSong } from "../controller/adminController"
import {protectRoute, requireAdmin} from "../middleware/authMiddleware";

const router = Router();

router.post('/songs', protectRoute,  requireAdmin, createSong);

export default router;