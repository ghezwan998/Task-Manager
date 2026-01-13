import React, { useState } from "react";
import { useTasksStore } from "../store/taskStore";
import EditTask from "../pages/tasks/EditTask";

const TaskCard = ({ task }) => {
  const updateTask = useTasksStore((s) => s.updateTask);
  const updateTaskStatus = useTasksStore((s) => s.updateTaskStatus);
  const deleteTask = useTasksStore((s) => s.deleteTask);

  const isCompleted = task.status === "completed";
  const [showEdit, setShowEdit] = useState(false);

  const handleToggleStatus = () => {
    updateTaskStatus(task._id, isCompleted ? "incompleted" : "completed");
  };

  const handleEdit = () => {
    setShowEdit(true);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task._id);
    }
  };

  return (
    <div className="col">
      <div
        className={`card h-100 shadow-sm position-relative ${
          isCompleted ? "border-success" : ""
        }`}
      >
        {/* Dropdown toggle */}
        <div className="position-absolute top-0 end-0 m-2">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-light border rounded-circle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots-vertical"></i>
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" onClick={handleEdit}>
                  <i className="bi bi-pencil me-2"></i>
                  Edit
                </button>
              </li>

              <li>
                <button className="dropdown-item" onClick={handleToggleStatus}>
                  <i
                    className={`bi me-2 ${
                      isCompleted ? "bi-x-circle" : "bi-check-circle"
                    }`}
                  ></i>
                  {isCompleted ? "Mark Incomplete" : "Mark Complete"}
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleDelete}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Card body */}
        <div className="card-body">
          <h5
            className={`card-title ${
              isCompleted ? "text-decoration-line-through text-muted" : ""
            }`}
          >
            {task.title}
          </h5>

          {task.description && (
            <p className="card-text text-muted">{task.description}</p>
          )}

          <div className="mb-2">
            {task.type && (
              <span className="badge bg-secondary me-2 text-capitalize">
                {task.type}
              </span>
            )}

            <span
              className={`badge ${
                isCompleted ? "bg-success" : "bg-warning text-dark"
              }`}
            >
              {task.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer bg-transparent border-top-0 text-end">
          <small className="text-muted">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </small>
        </div>
      </div>
      <EditTask
        task={task}
        show={showEdit}
        onClose={() => setShowEdit(false)}
      />
    </div>
  );
};

export default TaskCard;
