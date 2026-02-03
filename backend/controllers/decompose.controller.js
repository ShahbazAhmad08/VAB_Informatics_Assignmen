import { decomposeText } from "../services/decompose.service.js";

export const decomposeProject = (req, res) => {
  const { description, constraints } = req.body;

  const result = decomposeText(description, constraints);

  res.json(result);
};
