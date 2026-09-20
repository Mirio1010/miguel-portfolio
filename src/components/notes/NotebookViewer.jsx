import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Neither PDF.js, its worker, nor any PDF is loaded until a notebook opens.
const NotebookReader = lazy(() => import("./NotebookReader"));

class ReaderBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p className="reader-message" role="alert">
        The reader could not start. Close it and try again, or refresh the page.
      </p>
    ) : (
      this.props.children
    );
  }
}

export default function NotebookViewer({ notebook, onClose }) {
  const dialogRef = useRef(null);
  const [closing, setClosing] = useState(false);
  const close = () => setClosing(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(
      onClose,
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 140,
    );
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`notebook-dialog${closing ? " is-closing" : ""}`}
      aria-labelledby="notebook-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <header className="reader-header">
        <div>
          <p className="notebook-category">
            The notebooks / {notebook.category}
          </p>
          <h2 id="notebook-title">{notebook.title}</h2>
        </div>
        <button
          type="button"
          className="reader-button"
          onClick={close}
          autoFocus
          aria-label="Close notebook"
        >
          Close <span aria-hidden="true">×</span>
        </button>
      </header>
      {notebook.pdfUrl === "/Miguel_Software_Developer_Resume.pdf" && (
        <p className="reader-preview">
          Development preview · showing the existing resume until this notebook
          is added.
        </p>
      )}
      {notebook.pdfUrl?.trim() ? (
        <ReaderBoundary>
          <Suspense
            fallback={
              <p className="reader-message" role="status">
                Opening notebook…
              </p>
            }
          >
            <NotebookReader pdfUrl={notebook.pdfUrl} />
          </Suspense>
        </ReaderBoundary>
      ) : (
        <p className="reader-message" role="status">
          This notebook isn’t available yet. Check back soon.
        </p>
      )}
    </dialog>,
    document.body,
  );
}
