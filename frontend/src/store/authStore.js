// src/store/auth.store.js
import { create } from "zustand";
import api from "../api/api";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthReady: false,

  setAccessToken: (token) => set({ accessToken: token }),

  login: async (data) => {
    const res = await api.post("/auth/login", data);
    set({
      user: res.data.user,
      accessToken: res.data.accessToken,
      isAuthReady: true,
    });
  },

  getProfile: async () => {
    try {
      const res = await api.get("/auth/profile");
      set({
        user: res.data,
        isAuthReady: true,
      });
    } catch (err) {
      // ❗ DO NOT logout here unless refresh already failed
      set({ isAuthReady: true });
    }
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({
      user: null,
      accessToken: null,
      isAuthReady: true,
    });
  },
}));