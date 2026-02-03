import express from "express";
import cors from "cors";
import decomposeRoutes from "./routes/decompose.routes.js";
import validateRoutes from "./routes/validate.routes.js";
import clarifyRoutes from "./routes/clarify.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api", decomposeRoutes);
app.use("/api", validateRoutes);
app.use("/api", clarifyRoutes);

export default app;
