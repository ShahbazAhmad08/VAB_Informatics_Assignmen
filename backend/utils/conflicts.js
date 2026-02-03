export const detectConflicts = (text) => {
  const conflicts = [];

  if (text.includes("simple") && text.includes("premium")) {
    conflicts.push({
      type: "contradiction",
      description: "Simple conflicts with premium",
      suggestion: "Use clean UI with minimal features",
    });
  }

  if (text.includes("fast") && text.includes("low budget")) {
    conflicts.push({
      type: "risk",
      description: "Fast delivery with low budget",
      suggestion: "Reduce scope or extend timeline",
    });
  }

  return conflicts;
};
