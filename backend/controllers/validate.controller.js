import { detectCycle } from "../utils/dependencyGraph.js";
import { calculateFeasibility } from "../utils/feasibility.js";

export const validateTasks = (req, res) => {
  const { tasks, constraints } = req.body || {};

  // Check if tasks or constraints are missing
  if (!tasks || !Array.isArray(tasks) || !constraints) {
    return res.status(400).json({
      valid: false,
      issues: [
        {
          type: "input",
          description: "Tasks or constraints are missing or invalid",
        },
      ],
      feasibilityScore: 0,
    });
  }

  const cycleResult = detectCycle(tasks);
  const feasibilityScore = calculateFeasibility(tasks, constraints);

  const issues = [];

  if (cycleResult.hasCycle) {
    issues.push({
      type: "dependency",
      description: "Circular dependency detected",
      cycle: cycleResult.cycle,
    });
  }

  if (feasibilityScore < 0.5) {
    issues.push({
      type: "timeline",
      description: "Timeline is unrealistic",
    });
  }

  res.json({
    valid: issues.length === 0,
    issues,
    feasibilityScore,
  });
};
