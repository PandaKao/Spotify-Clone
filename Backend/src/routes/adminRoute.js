import { Router } from "express";
import { getAdmin } from "../controller/adminController"
import {protectRoute, requireAdmin} from "../middleware/authMiddleware";

const router = Router();

router.get('/', protectRoute,  requireAdmin, createSong);

export default router;