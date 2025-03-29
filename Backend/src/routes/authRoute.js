import { Router } from "express";
import { authCallback } from "../controller/authController";

const router = Router();

router.post('/callback', authCallback);

export default router;