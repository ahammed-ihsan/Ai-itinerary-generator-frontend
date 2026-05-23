import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);
      localStorage.setItem("token", res.token);
      navigate("/home");
    } catch (err) {
      alert("Register Failed");
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "420px" }}>
        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="form-control mb-3"
            placeholder="Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            required
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            required
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="btn btn-dark w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;