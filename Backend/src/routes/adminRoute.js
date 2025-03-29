import { Router } from "express";
import { getAdmin } from "../controller/adminController"

const router = Router();

router.get('/', getAdmin);

export default router;