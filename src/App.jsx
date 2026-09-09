import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import NoteForm from "./pages/NoteForm";
import NoteView from "./pages/NoteView";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/notes/new" element={<ProtectedRoute><NoteForm /></ProtectedRoute>} />
        <Route path="/notes/:id" element={<ProtectedRoute><NoteView /></ProtectedRoute>} />
        <Route path="/notes/:id/edit" element={<ProtectedRoute><NoteForm /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />

        <Route path="*" element={<p className="center-text">404 - Page not found</p>} />
      </Routes>
    </>
  );
}
