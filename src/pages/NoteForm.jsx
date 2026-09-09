import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function NoteForm() {
  const { id } = useParams(); // if present -> edit mode
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", subtitle: "", summary: "", content: "" });
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      api.get(`/notes/${id}`).then(({ data }) => {
        const n = data.note;
        setForm({ title: n.title, subtitle: n.subtitle, summary: n.summary, content: n.content });
        setExistingImage(n.image);
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("subtitle", form.subtitle);
      fd.append("summary", form.summary);
      fd.append("content", form.content);
      if (imageFile) fd.append("image", imageFile);

      if (isEdit) {
        await api.put(`/notes/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await api.post("/notes", fd, { headers: { "Content-Type": "multipart/form-data" } });
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save note");
    }
  };

  if (loading) return <p className="center-text">Loading...</p>;

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit} className="note-form">
        <h2>{isEdit ? "Edit Note" : "New Note"}</h2>
        {error && <p className="error">{error}</p>}

        <label>Title</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />

        <label>Subtitle</label>
        <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />

        <label>Summary</label>
        <textarea rows={2} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />

        <label>Content (Method)</label>
        <textarea rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />

        <label>Image</label>
        {existingImage && <img src={existingImage} alt="current" className="preview-img" />}
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

        <button type="submit" className="btn-primary">{isEdit ? "Update" : "Create"} Note</button>
      </form>
    </div>
  );
}
