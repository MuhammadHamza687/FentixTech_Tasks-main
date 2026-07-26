import { useState } from "react";

export default function TaskItem({ task, onDelete, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);

  function handleSave(event) {
    event.preventDefault();

    if (onUpdate(task.id, draftTitle)) {
      setIsEditing(false);
    }
  }

  function handleCancel() {
    setDraftTitle(task.title);
    setIsEditing(false);
  }

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span aria-hidden="true"></span>
      </label>

      {isEditing ? (
        <form className="edit-form" onSubmit={handleSave}>
          <input
            type="text"
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            autoFocus
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>{task.title}</p>
          <div className="task-actions">
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button type="button" className="delete-btn" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
