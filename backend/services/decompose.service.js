import { detectConflicts } from "../utils/conflicts.js";
import { generateTasks } from "../utils/tasks.js";
import { calculateFeasibility } from "../utils/feasibility.js";

export const decomposeText = (description, constraints = {}) => {
  const text = description.toLowerCase();

  const tasks = generateTasks(text);
  const conflicts = detectConflicts(text);
  const feasibilityScore = calculateFeasibility(tasks, constraints);

  return {
    tasks,
    conflicts,
    feasibilityScore,
    warnings: feasibilityScore < 0.5 ? ["Timeline may be unrealistic"] : [],
  };
};
