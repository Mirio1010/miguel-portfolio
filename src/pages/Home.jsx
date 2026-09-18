import About from "../components/About";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import XmbBackground from "../components/XmbBackground";

const Home = () => {
  return (
    <main className="relative min-h-screen bg-[var(--color-background)]">
      <XmbBackground />

      <div className="relative z-10">
        <Hero />
        <About />
        <Projects/>
        <Contact/>
      </div>
    </main>
  );
};

export default Home;
