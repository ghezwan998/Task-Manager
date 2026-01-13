import { create } from "zustand";
import api from "../api/api";

export const useTasksStore = create((set, get) => ({
  tasks: [],

  getTasks: async () => {
    const res = await api.get("/task/");
    set({ tasks: res.data });
  },

  addTask: async (data) => {
    const res = await api.post("/task/", data);
    set({
      tasks: [...get().tasks, res.data.task],
    });
  },

  updateTask: async (taskId, data) => {
    const res = await api.patch(`/task/${taskId}`, data);

    set({
      tasks: get().tasks.map((task) => (task._id === taskId ? res.data : task)),
    });
  },

  updateTaskStatus: async (taskId, status) => {
    const res = await api.patch(`/task/${taskId}/status`, { status });

    set({
      tasks: get().tasks.map((task) => (task._id === taskId ? res.data : task)),
    });
  },

  deleteTask: async (taskId) => {
    await api.delete(`/task/${taskId}`);

    set({
      tasks: get().tasks.filter((task) => task._id !== taskId),
    });
  },
}));
