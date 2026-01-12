import { create } from "zustand";
import api from '../api/api';

export const useTasksStore = create((set) => ({
    tasks : null,
}))