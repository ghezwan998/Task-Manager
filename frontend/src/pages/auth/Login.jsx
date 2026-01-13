import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="row justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <form className="border rounded p-4 shadow" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login</h2>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100 mb-3">
            Login
          </button>

          <p className="text-center mb-0">
            No account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
