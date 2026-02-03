import express from "express";
import { clarifyProject } from "../controllers/clarify.controller.js";

const router = express.Router();

router.post("/clarify", clarifyProject);

export default router;
