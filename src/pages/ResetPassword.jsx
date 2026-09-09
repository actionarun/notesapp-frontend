import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, { password });
      setMessage(data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Reset Password</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <input type="password" placeholder="New password" value={password}
          onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
