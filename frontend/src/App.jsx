import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

function App() {
  const getProfile = useAuthStore((s) => s.getProfile);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="navbar navbar-light bg-light fixed-top shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h4 mb-0">Task Manager</h1>

          {user && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="container" style={{ paddingTop: "80px" }}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
