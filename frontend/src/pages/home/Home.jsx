import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useTasksStore } from "../../store/taskStore";
import TaskList from "../tasks/TaskList";
import AddTask from "../tasks/AddTask";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const tasks = useTasksStore((s) => s.tasks);
  const getTasks = useTasksStore((s) => s.getTasks);

  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome {user?.username}</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShowAddTask(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Task
        </button>
      </div>

      <TaskList tasks={tasks} />

      <AddTask
        show={showAddTask}
        onClose={() => setShowAddTask(false)}
      />
    </div>
  );
}
