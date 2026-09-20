// Replace each pdfUrl with a public HTTPS PDF URL when the notebooks are ready.
// The existing resume is ONLY a local development preview, never a published notebook.
const developmentPreview = import.meta.env.DEV
  ? "/Miguel_Software_Developer_Resume.pdf"
  : "";

export const notes = [
  {
    id: "html&css",
    title: "HTML & CSS",
    description: "Page structure, styling, layouts, and responsive web design.",
    category: "Web foundations",
    pdfUrl:
      "https://aynidalwoaobbckkifly.supabase.co/storage/v1/object/public/portfolio-notes/HTML_CSS_notes.pdf",
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Variables, functions, the DOM, and asynchronous programming.",
    category: "Javascript fundamentals",
    pdfUrl:
      "https://aynidalwoaobbckkifly.supabase.co/storage/v1/object/public/portfolio-notes/JavaScript_notes.pdf",
  },
  {
    id: "react",
    title: "React",
    description:
      "Components, props, state, hooks, forms, context, reducers, and performance fundamentals.",
    category: "Frontend development",
    pdfUrl:
      "https://7gzqpnjsobpgngcp.public.blob.vercel-storage.com/React_notes.pdf",
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms (Java)",
    description:
      "Core data structures, algorithms, problem-solving techniques, and complexity analysis.",
    category: "Computer science fundamentals",
    pdfUrl:
      "https://7gzqpnjsobpgngcp.public.blob.vercel-storage.com/DSA_notes.pdf",
  },
];

// Optional year and pageCount fields appear on covers. The reader always uses
// the actual PDF page count. Descriptions above are starter copy to personalize.
