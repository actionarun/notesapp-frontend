import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p className="center-text">Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p className="center-text">Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/dashboard" />;
  return children;
};
