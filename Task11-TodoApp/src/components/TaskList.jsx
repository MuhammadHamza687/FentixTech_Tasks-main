import TaskItem from "./TaskItem.jsx";

const emptyMessages = {
  all: "No tasks yet. Add your first task above.",
  pending: "No pending tasks. Nice work.",
  completed: "No completed tasks yet."
};

export default function TaskList({ filter, tasks, onDelete, onToggle, onUpdate }) {
  if (tasks.length === 0) {
    return <p className="empty-state">{emptyMessages[filter]}</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
