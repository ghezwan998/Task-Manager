// src/App.jsx
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

function App() {
  const getProfile = useAuthStore((s) => s.getProfile);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <Outlet />
    </div>
  );
}

export default App;
