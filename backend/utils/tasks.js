let id = 1;

export const generateTasks = (text) => {
  const tasks = [];

  if (text.includes("auth")) {
    tasks.push({
      id: `task-${id++}`,
      title: "User Authentication",
      description: "Implement login and signup",
      estimatedHours: 6,
      priority: 1,
      dependencies: [],
      category: "backend",
      ambiguityFlags: [],
    });
  }

  if (text.includes("payment")) {
    tasks.push({
      id: `task-${id++}`,
      title: "Payment Integration",
      description: "Integrate payment gateway",
      estimatedHours: 8,
      priority: 2,
      dependencies: ["User Authentication"],
      category: "backend",
      ambiguityFlags: [],
    });
  }

  if (text.includes("mobile")) {
    tasks.push({
      id: `task-${id++}`,
      title: "Responsive Design",
      description: "Ensure mobile-first layout",
      estimatedHours: 4,
      priority: 2,
      dependencies: [],
      category: "frontend",
      ambiguityFlags: [],
    });
  }

  return tasks;
};
