import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/notes", { params: { search, page, limit: 8 } });
      setNotes(data.notes);
      setPages(data.pages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchNotes, 400); // debounce search
    return () => clearTimeout(timer);
  }, [search, page]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this note?")) return;
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h2>My Notes</h2>
        <Link to="/notes/new" className="btn-primary">+ New Note</Link>
      </div>

      <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />

      {loading ? (
        <p className="center-text">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="center-text">No notes found. Create one!</p>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
          <span>Page {page} of {pages}</span>
          <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
