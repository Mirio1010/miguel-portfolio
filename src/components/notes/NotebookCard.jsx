export default function NotebookCard({ notebook, index, onOpen }) {
  return (
    <button
      className="notebook-card"
      type="button"
      onClick={() => onOpen(notebook)}
      aria-label={`Open ${notebook.title} notebook`}
    >
      <span className="notebook-meta">
        <span>{notebook.year}</span>
      </span>
      <span className="notebook-cover-title">{notebook.title}</span>
      <span className="notebook-description">{notebook.description}</span>
      <span className="notebook-open">
        <span>
          Open Notebook <span aria-hidden="true">↗</span>
        </span>
        <span>{notebook.pageCount ? `${notebook.pageCount} pages` : ""}</span>
      </span>
    </button>
  );
}
