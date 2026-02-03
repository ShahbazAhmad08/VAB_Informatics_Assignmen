import { useState } from "react";

const API_BASE = "http://localhost:5000/api";

function App() {
  const [description, setDescription] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const callApi = async (endpoint, body) => {
    setLoading(true);
    setData(null);

    try {
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      alert("Backend error");
    }

    setLoading(false);
  };

  const handleDecompose = () => {
    callApi("decompose", {
      description,
      constraints: {
        maxTasks: 20,
        teamSize: 2,
        hoursPerDay: 6,
        deadlineDays: 14,
      },
    });
  };

  const handleClarify = () => {
    callApi("clarify", { description });
  };

  const handleValidate = () => {
    callApi("validate", {
      tasks: data?.tasks || [],
      constraints: {
        teamSize: 2,
        hoursPerDay: 6,
        deadlineDays: 14,
      },
    });
  };

  const criticalPath = getCriticalPath(data?.tasks || []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Task Decomposition Engine</h2>
      <textarea
        rows={5}
        style={{ width: "100%" }}
        placeholder="Enter project description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleDecompose}>Decompose</button>{" "}
      <button onClick={handleClarify}>Clarify</button>{" "}
      <button onClick={handleValidate} disabled={!data?.tasks}>
        Validate
      </button>
      {loading && <p>Processing...</p>}
      {/* 🔴 Conflicts */}
      {data?.conflicts?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ color: "red" }}>⚠ Conflicts</h3>
          {data.conflicts.map((c, i) => (
            <div
              key={i}
              style={{
                background: "#636363",
                padding: 10,
                marginBottom: 10,
                border: "1px solid red",
              }}
            >
              <strong>{c.description}</strong>
              <p>Suggestion: {c.suggestion}</p>
            </div>
          ))}
        </div>
      )}
      {/* 🧩 Tasks */}
      {data?.tasks?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>📋 Tasks</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {data.tasks.map((task, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>⏱ {task.estimatedHours} hrs</p>
                <p>📌 Priority: {task.priority}</p>
                <p>
                  🔗 Dependencies:{" "}
                  {task.dependencies.length > 0
                    ? task.dependencies.join(", ")
                    : "None"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* 🛣 Critical Path */}
      {criticalPath.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>🛣 Critical Path</h3>
          <p style={{ background: "#757171", padding: 10 }}>
            {criticalPath.join(" → ")}
          </p>
        </div>
      )}
      {/* ❓ Clarify */}
      {data?.questions && (
        <div style={{ marginTop: 20 }}>
          <h3>❓ Clarifying Questions</h3>
          <ul>
            {data.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}
      {/* 📊 Feasibility */}
      {data?.feasibilityScore !== undefined && (
        <p style={{ marginTop: 20 }}>
          <strong>Feasibility Score:</strong> {data.feasibilityScore}
        </p>
      )}
    </div>
  );
}

/* -----------------------
   Critical Path Logic
------------------------ */
function getCriticalPath(tasks) {
  if (!tasks || tasks.length === 0) return [];

  const map = {};
  tasks.forEach((t) => {
    map[t.title] = t.dependencies;
  });

  let longestPath = [];

  const dfs = (task, path) => {
    const newPath = [...path, task];
    if (!map[task] || map[task].length === 0) {
      if (newPath.length > longestPath.length) {
        longestPath = newPath;
      }
    } else {
      map[task].forEach((dep) => dfs(dep, newPath));
    }
  };

  tasks.forEach((t) => dfs(t.title, []));

  return longestPath.reverse();
}

export default App;
