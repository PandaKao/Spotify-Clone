import { Router } from "express";
import {getAllSongs, getFeaturedSongs, getTopSongs, getTrendingSongs} from "../controller/songController";
import {protectRoute, requireAdmin} from "../middleware/authMiddleware";

const router = Router();

router.get('/', protectRoute, requireAdmin, getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/made-for-you', getTopSongs);

export default router;