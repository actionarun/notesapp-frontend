import { useState } from "react";
import api from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Forgot Password</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <input type="email" placeholder="Your account email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}
