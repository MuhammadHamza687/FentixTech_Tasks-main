import { useEffect, useMemo, useState } from "react";
import FilterTabs from "./components/FilterTabs.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskStats from "./components/TaskStats.jsx";

const STORAGE_KEY = "task11_todos";
const FILTERS = ["all", "pending", "completed"];

function createTask(title) {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function loadStoredTasks() {
  try {
    const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(storedTasks) ? storedTasks : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadStoredTasks);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [filter, tasks]);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;

    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed
    };
  }, [tasks]);

  function handleAddTask(title) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please write a task before adding it.");
      return false;
    }

    setTasks((currentTasks) => [createTask(trimmedTitle), ...currentTasks]);
    setError("");
    setFilter("all");
    return true;
  }

  function handleToggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDeleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  function handleUpdateTask(taskId, title) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Updated task cannot be empty.");
      return false;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, title: trimmedTitle } : task
      )
    );
    setError("");
    return true;
  }

  function handleClearCompleted() {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed));
  }

  return (
    <main className="app-shell">
      <section className="todo-app" aria-labelledby="todo-title">
        <header className="app-header">
          <p className="eyebrow">Task 11</p>
          <h1 id="todo-title">React To-Do List</h1>
          <p>
            Add tasks, mark them complete, edit details, filter your list, and keep
            everything saved in local storage.
          </p>
        </header>

        <TaskForm onAddTask={handleAddTask} error={error} />

        <TaskStats stats={stats} />

        <div className="toolbar">
          <FilterTabs
            filters={FILTERS}
            activeFilter={filter}
            counts={stats}
            onChange={setFilter}
          />
          <button
            className="clear-btn"
            type="button"
            onClick={handleClearCompleted}
            disabled={stats.completed === 0}
          >
            Clear completed
          </button>
        </div>

        <TaskList
          filter={filter}
          tasks={visibleTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      </section>
    </main>
  );
}
