import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTasks(data);
      setError("");
    } catch {
      setError("Error fetching tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!input) return;

    try {
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: input }),
      });

      setInput("");
      fetchTasks();
    } catch {
      setError("Error adding task");
    }
  };

  const toggleTask = async (id) => {
    await fetch(`${API}/${id}`, { method: "PATCH" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <div className="main-container">
      <h2>Task Manager</h2>

      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong
                style={{
                  textDecoration: task.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {task.title}
              </strong>{" "}
              [{task.completed ? "✔" : "✖"}]
              <br />
              <small>
                Created:{" "}
                {new Date(task.createdAt).toLocaleString()}
              </small>
            </div>

            <button onClick={() => toggleTask(task.id)}>
              Complete
            </button>
            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;