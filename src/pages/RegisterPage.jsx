import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleRegisterSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting...");
        setError("");
        setTimeout(() => {
          navigate("/login"); // Redirect to login after successful registration
        }, 2000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Registration error: " + error.message);
    }
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-3">
        <FaUserPlus size={32} />
        <h2>Register</h2>
      </div>
      <form onSubmit={handleRegisterSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>

        {error && <div className="text-danger">{error}</div>}
        {success && <div className="text-success">{success}</div>}

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
