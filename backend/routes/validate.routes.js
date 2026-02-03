import express from "express";
import { validateTasks } from "../controllers/validate.controller.js";

const router = express.Router();

router.post("/validate", validateTasks);

export default router;
