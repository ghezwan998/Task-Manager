// src/pages/home/Home.jsx
import { useAuthStore } from "../../store/authStore";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div>
      <h2>Welcome {user?.email}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
