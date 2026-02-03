import { Router } from "express";
const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running successfully",
  });
});

export default router;
