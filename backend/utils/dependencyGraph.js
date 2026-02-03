export const detectCycle = (tasks) => {
  const graph = {};
  const visited = {};
  const stack = {};
  let cyclePath = [];

  // Build adjacency list
  tasks.forEach((task) => {
    graph[task.title] = task.dependencies || [];
  });

  const dfs = (node, path = []) => {
    if (stack[node]) {
      cyclePath = [...path, node];
      return true;
    }

    if (visited[node]) return false;

    visited[node] = true;
    stack[node] = true;

    for (let dep of graph[node]) {
      if (dfs(dep, [...path, node])) return true;
    }

    stack[node] = false;
    return false;
  };

  for (let node in graph) {
    if (dfs(node)) {
      return { hasCycle: true, cycle: cyclePath };
    }
  }

  return { hasCycle: false };
};
