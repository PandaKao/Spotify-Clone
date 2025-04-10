import { Router } from "express";
import {protectRoute} from "../middleware/authMiddleware";
import {getAllUsers} from "../controller/userController";

const router = Router();

router.get('/', protectRoute, getAllUsers);

export default router;