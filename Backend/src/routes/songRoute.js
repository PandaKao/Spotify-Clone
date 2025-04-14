import { Router } from "express";
import {getAllSongs, getFeaturedSongs, getTopSongs} from "../controller/songController.js";
import {protectRoute, requireAdmin} from "../middleware/authMiddleware.js";

const router = Router();

router.get('/', protectRoute, requireAdmin, getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/made-for-you', getTopSongs);

export default router;