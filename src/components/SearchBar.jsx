export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search notes by title, subtitle, summary, content..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-bar"
    />
  );
}
