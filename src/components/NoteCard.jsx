import { Link } from "react-router-dom";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="note-card">
      {note.image && <img src={note.image} alt={note.title} className="note-img" />}
      <div className="note-body">
        <h3>{note.title}</h3>
        {note.subtitle && <p className="note-subtitle">{note.subtitle}</p>}
        {note.summary && <p className="note-summary">{note.summary}</p>}
        {note.owner?.name && <p className="note-owner">By: {note.owner.name}</p>}
        <div className="note-actions">
          <Link to={`/notes/${note._id}`} className="btn-small">View</Link>
          <Link to={`/notes/${note._id}/edit`} className="btn-small">Edit</Link>
          <button onClick={() => onDelete(note._id)} className="btn-small btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}
