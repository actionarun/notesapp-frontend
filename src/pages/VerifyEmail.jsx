import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    api.get(`/auth/verify-email/${token}`)
      .then((res) => setMessage(res.data.message))
      .catch((err) => setMessage(err.response?.data?.message || "Verification failed"));
  }, [token]);

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Email Verification</h2>
        <p>{message}</p>
        <Link to="/login">Go to Login</Link>
      </div>
    </div>
  );
}
