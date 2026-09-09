import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function NoteView() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    api.get(`/notes/${id}`).then(({ data }) => setNote(data.note));
  }, [id]);

  if (!note) return <p className="center-text">Loading...</p>;

  return (
    <div className="page-container">
      <div className="note-view">
        {note.image && <img src={note.image} alt={note.title} className="note-view-img" />}
        <h1>{note.title}</h1>
        {note.subtitle && <h3 className="note-subtitle">{note.subtitle}</h3>}
        {note.summary && <p className="note-summary-view"><strong>Summary:</strong> {note.summary}</p>}
        <div className="note-content-view">{note.content}</div>
        <p className="note-owner">By: {note.owner?.name}</p>
        <Link to={`/notes/${note._id}/edit`} className="btn-primary">Edit Note</Link>
      </div>
    </div>
  );
}
