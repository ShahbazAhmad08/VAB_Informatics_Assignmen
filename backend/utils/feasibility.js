export const calculateFeasibility = (tasks, constraints = {}) => {
  const totalHours = tasks.reduce((sum, t) => sum + t.estimatedHours, 0);

  const teamSize = constraints.teamSize || 1;
  const hoursPerDay = constraints.hoursPerDay || 6;
  const days = constraints.deadlineDays || 10;

  const available = teamSize * hoursPerDay * days;

  return Math.min(1, available / totalHours);
};
