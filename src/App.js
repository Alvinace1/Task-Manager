import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const clearAll = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1>Task Manager 🚀</h1>

      <div className="input-section">
        <input
  value={task}
  onChange={(e) => setTask(e.target.value)}
  onKeyPress={(e) => {
    if (e.key === "Enter") addTask();
  }}
  placeholder="Enter task"
/>
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filter-section">
  <button
    onClick={() => setFilter("all")}
    className={filter === "all" ? "active-filter" : ""}
  >
    All
  </button>
  <button
    onClick={() => setFilter("completed")}
    className={filter === "completed" ? "active-filter" : ""}
  >
    Completed
  </button>
  <button
    onClick={() => setFilter("pending")}
    className={filter === "pending" ? "active-filter" : ""}
  >
    Pending
  </button>
  <button onClick={clearAll} className="clear-btn">
    Clear All
  </button>
</div>

      <ul>
        {filteredTasks.map((t, i) => (
          <li key={i}>
            <span
              onClick={() => toggleTask(i)}
              className={t.completed ? "completed" : ""}
            >
              {t.text}
            </span>
            <button onClick={() => deleteTask(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;