import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Page } from "react-pdf";

// Context updates page contents without replacing page-flip's DOM shells.
// eslint-disable-next-line react-refresh/only-export-components
export const PageWindowContext = createContext(null);

function PageCanvas({ number, width, height }) {
  const [ratio, setRatio] = useState(null);
  const pageRef = useRef(null);
  useEffect(
    () => () => {
      pageRef.current?.cleanup();
    },
    [],
  );
  return (
    <Page
      pageNumber={number}
      suspense={false}
      width={ratio ? Math.min(width, height * ratio) : width}
      devicePixelRatio={Math.min(window.devicePixelRatio || 1, 1.5)}
      renderTextLayer={false}
      renderAnnotationLayer={false}
      onLoadSuccess={(page) => {
        pageRef.current = page;
        const viewport = page.getViewport({ scale: 1 });
        setRatio(viewport.width / viewport.height);
      }}
      loading={<span className="page-message">Loading page {number}…</span>}
      error={
        <span className="page-message" role="alert">
          Page {number} couldn’t load. Try reopening the notebook.
        </span>
      }
    />
  );
}

const NotebookPage = forwardRef(function NotebookPage({ index }, ref) {
  const { from, to, first, last, width, height } =
    useContext(PageWindowContext);
  return (
    <div
      ref={ref}
      className="notebook-page"
      aria-hidden={index < first || index > last}
    >
      <div
        className="notebook-page-content"
        role="img"
        aria-label={`Notebook page ${index + 1}`}
      >
        {index >= from && index <= to && (
          <PageCanvas number={index + 1} width={width} height={height} />
        )}
      </div>
    </div>
  );
});
export default NotebookPage;
