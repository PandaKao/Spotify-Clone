import { Router } from "express";
import { checkAdmin, createSong, deleteSong, createAlbum, deleteAlbum } from "../controller/adminController";
import {protectRoute, requireAdmin} from "../middleware/authMiddleware";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get('/check', checkAdmin);

router.post('/songs', createSong);
router.delete('/songs/:id', deleteSong);

router.post('/albums', createAlbum);
router.delete('albums/:id', deleteAlbum);

export default router;