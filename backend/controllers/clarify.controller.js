import { generateQuestions } from "../utils/clarify.js";

export const clarifyProject = (req, res) => {
  const { description } = req.body;

  const questions = generateQuestions(description.toLowerCase());

  res.json({ questions });
};
