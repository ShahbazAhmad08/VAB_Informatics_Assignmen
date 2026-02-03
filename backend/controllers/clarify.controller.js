import { generateQuestions } from "../utils/clarify.js";

export const clarifyProject = (req, res) => {
  const { description } = req.body || {};

  if (!description || typeof description !== "string") {
    return res.status(400).json({
      error: "Project description is missing or invalid",
      questions: [],
    });
  }

  const questions = generateQuestions(description.toLowerCase());

  res.json({ questions });
};
