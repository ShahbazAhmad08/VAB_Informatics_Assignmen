import { Router } from "express";
import { decomposeProject } from "../controllers/decompose.controller.js";
const router = Router();
// console.log("routes");
router.post("/decompose", decomposeProject);

export default router;
