import { useState } from "react";

export default function TaskForm({ error, onAddTask }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (onAddTask(title)) {
      setTitle("");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="task-input">
        New task
      </label>
      <input
        id="task-input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
