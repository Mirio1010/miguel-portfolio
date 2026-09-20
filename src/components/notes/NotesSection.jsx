import { useState } from "react";
import { notes } from "../../data/notes";
import NotebookCard from "./NotebookCard";
import NotebookViewer from "./NotebookViewer";
import "../../style/Notes.css";

export default function NotesSection() {
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  return (
    <section
      id="notes"
      aria-labelledby="notes-heading"
      className="notes-section mx-auto w-full max-w-[1600px] px-6 sm:px-12 lg:px-20"
    >
      <div className="border-t border-[var(--color-border)] py-28 sm:py-32 lg:py-40">
        <p className="mb-8 font-mono text-xs tracking-[0.18em] text-[var(--color-text-secondary)] uppercase">
          My Notes
        </p>
        <h2
          id="notes-heading"
          className="text-4xl font-normal tracking-[-0.04em] sm:text-5xl"
        >
          Notes from along the way.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
          I’ve always liked taking handwritten notes while learning. These are
          some of the notebooks I’ve kept along the way. Open one and flip
          through what I was studying.
        </p>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {notes.map((notebook, index) => (
            <NotebookCard
              key={notebook.id}
              notebook={notebook}
              index={index}
              onOpen={setSelectedNotebook}
            />
          ))}
        </div>
      </div>
      {selectedNotebook && (
        <NotebookViewer
          key={selectedNotebook.id}
          notebook={selectedNotebook}
          onClose={() => setSelectedNotebook(null)}
        />
      )}
    </section>
  );
}
