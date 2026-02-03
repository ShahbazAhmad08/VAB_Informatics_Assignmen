export const generateQuestions = (text) => {
  const questions = [];

  if (text.includes("fast")) {
    questions.push("What does fast mean in terms of performance or delivery?");
  }

  if (text.includes("premium")) {
    questions.push("What does premium mean for design or features?");
  }

  if (!text.includes("user")) {
    questions.push("Who are the target users?");
  }

  if (text.includes("payment")) {
    questions.push("Which payment gateway should be used?");
  }

  if (!text.includes("deadline")) {
    questions.push("Is there a specific deadline for this project?");
  }

  return questions;
};
