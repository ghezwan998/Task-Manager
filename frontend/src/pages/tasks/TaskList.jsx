import { useState, useMemo } from "react";
import TaskCard from "../../components/TaskCard";

const TaskList = ({ tasks }) => {
  const [sortBy, setSortBy] = useState(""); 

  const sortedTasks = useMemo(() => {
    if (!tasks) return [];

    const tasksCopy = [...tasks];

    switch (sortBy) {
      case "title":
        return tasksCopy.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      case "status":
        return tasksCopy.sort((a, b) =>
          a.status.localeCompare(b.status)
        );
      case "type":
        return tasksCopy.sort((a, b) =>
          (a.type || "").localeCompare(b.type || "")
        );
      case "createdAt":
        return tasksCopy.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ); 
      default:
        return tasksCopy;
    }
  }, [tasks, sortBy]);

  if (!tasks || tasks.length === 0) {
    return <p className="text-muted">No tasks yet</p>;
  }

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <select
          className="form-select w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="title">Title (A-Z)</option>
          <option value="status">Status</option>
          <option value="type">Type</option>
          <option value="createdAt">Created Time</option>
        </select>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {sortedTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </>
  );
};

export default TaskList;
