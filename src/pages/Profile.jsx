import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      const fd = new FormData();
      fd.append("name", name);
      if (avatarFile) fd.append("avatar", avatarFile);
      const { data } = await api.put("/auth/me", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setUser(data.user);
      setMessage("Profile updated!");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit} className="note-form">
        <h2>My Profile</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        {user?.avatar && <img src={user.avatar} alt="avatar" className="avatar-preview" />}

        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email</label>
        <input value={user?.email} disabled />

        <label>Role</label>
        <input value={user?.role} disabled />

        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} />

        <button type="submit" className="btn-primary">Update Profile</button>
      </form>
    </div>
  );
}
