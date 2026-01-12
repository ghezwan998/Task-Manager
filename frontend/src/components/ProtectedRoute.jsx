import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const { user, isAuthReady } = useAuthStore();

  if (!isAuthReady) return <p>Checking session...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}