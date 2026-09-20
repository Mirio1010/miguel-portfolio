import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import NotebookPage, { PageWindowContext } from "./NotebookPage";
import { bookSize, pageWindow } from "./pageWindow";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// Range requests avoid downloading the entire file when the storage host supports
// them. Disabling streaming is required for disableAutoFetch to take effect.
const pdfOptions = { disableAutoFetch: true, disableStream: true };

function FlipBook({ total, current, onPage, size, onReady }) {
  const bookRef = useRef(null);
  const [startPage] = useState(current);
  const pages = useMemo(
    () =>
      Array.from({ length: total }, (_, index) => (
        <NotebookPage key={index} index={index} />
      )),
    [total],
  );
  useEffect(() => {
    const handle = bookRef.current;
    return () => {
      const book = handle?.pageFlip();
      onReady(null);
      // React removes the portal first; page-flip then releases its listeners/DOM.
      if (book) queueMicrotask(() => book.destroy());
    };
  }, [onReady]);

  return (
    <HTMLFlipBook
      ref={bookRef}
      width={size.width}
      height={size.height}
      size="fixed"
      usePortrait={size.spread === 1}
      autoSize={false}
      startPage={startPage}
      showCover={false}
      mobileScrollSupport={false}
      useMouseEvents
      showPageCorners={false}
      maxShadowOpacity={0.24}
      flippingTime={
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 500
      }
      onInit={(event) => {
        onReady(bookRef.current.pageFlip());
        onPage(event.data.page);
      }}
      onFlip={(event) => onPage(event.data)}
    >
      {pages}
    </HTMLFlipBook>
  );
}

export default function NotebookReader({ pdfUrl }) {
  const [documentInfo, setDocumentInfo] = useState(null);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const stageRef = useRef(null);
  const controller = useRef(null);
  const active = useRef(true);
  const ready = useCallback((book) => {
    controller.current = book;
  }, []);

  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBounds({ width: Math.floor(width), height: Math.floor(height) });
    });
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  const size = bookSize(
    bounds.width,
    bounds.height,
    documentInfo?.ratio || 0.77,
  );
  const total = documentInfo?.total || 0;
  const windowPages = pageWindow(current, total, size.spread);
  const navigate = useCallback((direction) => {
    const book = controller.current;
    if (!book || book.getState() !== "read") return;
    if (direction < 0) book.flipPrev();
    else book.flipNext();
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        navigate(event.key === "ArrowLeft" ? -1 : 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const load = async (pdf) => {
    try {
      const first = await pdf.getPage(1);
      const viewport = first.getViewport({ scale: 1 });
      if (active.current)
        setDocumentInfo({
          total: pdf.numPages,
          ratio: viewport.width / viewport.height,
        });
    } catch {
      if (active.current) setError(true);
    }
  };

  return (
    <div className="reader-body">
      <div ref={stageRef} className="reader-stage">
        {error ? (
          <div className="reader-message" role="alert">
            <p>
              This notebook couldn’t load. Check your connection and try again.
            </p>
            <button
              type="button"
              className="reader-button"
              onClick={() => {
                setDocumentInfo(null);
                setCurrent(0);
                setError(false);
                setAttempt((value) => value + 1);
              }}
            >
              Try again
            </button>
          </div>
        ) : (
          <Document
            key={attempt}
            file={pdfUrl}
            options={pdfOptions}
            suspense={false}
            onLoadSuccess={load}
            onLoadError={() => setError(true)}
            onSourceError={() => setError(true)}
            onPassword={() => setError(true)}
            loading={
              <p className="reader-message" role="status">
                Loading notebook…
              </p>
            }
            error={
              <p className="reader-message" role="alert">
                This notebook couldn’t load.
              </p>
            }
          >
            {documentInfo && bounds.width > 0 && bounds.height > 0 && (
              <PageWindowContext.Provider
                value={{
                  ...windowPages,
                  width: size.width,
                  height: size.height,
                }}
              >
                <div
                  className={`reader-book ${size.spread === 2 ? "reader-book-spread" : ""}`}
                  style={{
                    width: size.width * size.spread,
                    height: size.height,
                  }}
                >
                  <FlipBook
                    key={`${size.width}-${size.height}-${size.spread}`}
                    total={total}
                    current={current}
                    onPage={setCurrent}
                    size={size}
                    onReady={ready}
                  />
                </div>
              </PageWindowContext.Provider>
            )}
          </Document>
        )}
      </div>
      <footer className="reader-footer">
        <div className="reader-controls">
          <button
            type="button"
            className="reader-button"
            aria-label="Previous page"
            disabled={!total || error || windowPages.first === 0}
            onClick={() => navigate(-1)}
          >
            ← <span>Previous</span>
          </button>
          <p className="reader-count" aria-live="polite" aria-atomic="true">
            {total && !error
              ? `Page${windowPages.last > windowPages.first ? "s" : ""} ${windowPages.first + 1}${windowPages.last > windowPages.first ? `–${windowPages.last + 1}` : ""} / ${total}`
              : "— / —"}
          </p>
          <button
            type="button"
            className="reader-button"
            aria-label="Next page"
            disabled={!total || error || windowPages.last >= total - 1}
            onClick={() => navigate(1)}
          >
            <span>Next</span> →
          </button>
        </div>
        <p className="reader-hint">
          Swipe or use ← → to turn pages · Esc to close
        </p>
        <a
          className="reader-original"
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open original PDF ↗
        </a>
      </footer>
    </div>
  );
}
