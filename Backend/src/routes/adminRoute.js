import { Router } from "express";
import { checkAdmin, createSong, deleteSong, createAlbum, deleteAlbum } from "../controller/adminController.js";
import {protectRoute, requireAdmin} from "../middleware/authMiddleware.js";

const router = Router();

router.get('/check', protectRoute, checkAdmin);

router.use(protectRoute, requireAdmin);

router.post('/songs', createSong);
router.delete('/songs/:id', deleteSong);

router.post('/albums', createAlbum);
router.delete('albums/:id', deleteAlbum);

export default router;