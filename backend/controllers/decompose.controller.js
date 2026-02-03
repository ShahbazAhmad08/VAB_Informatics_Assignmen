import { decomposeText } from "../services/decompose.service.js";

export const decomposeProject = (req, res) => {
  const { description, constraints } = req.body || {};

  if (!description || typeof description !== "string") {
    return res.status(400).json({
      error: "Project description is missing or invalid",
      result: null,
    });
  }

  // Optional: if constraints are missing, set default empty object
  const safeConstraints = constraints || {};

  const result = decomposeText(description, safeConstraints);

  res.json(result);
};
