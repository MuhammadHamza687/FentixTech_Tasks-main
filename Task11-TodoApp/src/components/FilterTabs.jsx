const filterLabels = {
  all: "All",
  pending: "Pending",
  completed: "Completed"
};

export default function FilterTabs({ activeFilter, counts, filters, onChange }) {
  const countByFilter = {
    all: counts.total,
    pending: counts.pending,
    completed: counts.completed
  };

  return (
    <div className="filter-tabs" role="tablist" aria-label="Task filters">
      {filters.map((filter) => (
        <button
          className={filter === activeFilter ? "active" : ""}
          key={filter}
          type="button"
          role="tab"
          aria-selected={filter === activeFilter}
          onClick={() => onChange(filter)}
        >
          {filterLabels[filter]}
          <span>{countByFilter[filter]}</span>
        </button>
      ))}
    </div>
  );
}
