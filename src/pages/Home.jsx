import Hero from "../components/Hero";
import XmbBackground from "../components/XmbBackground";

const Home = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)]">
      {/* Animated background */}
      <XmbBackground />

      {/* Page content */}
      <div className="relative z-10">
        <Hero />
      </div>
    </main>
  );
};

export default Home;
