import About from "../components/About";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import XmbBackground from "../components/XmbBackground";
import Navbar from "../components/Navbar";
import NotesSection from "../components/notes/NotesSection";

const Home = () => {
  return (
    <main className="relative min-h-screen bg-[var(--color-background)]">
      <XmbBackground />

      <Navbar />

      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <NotesSection />
        <Contact />
      </div>
    </main>
  );
};

export default Home;
