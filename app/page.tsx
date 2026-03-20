import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import GitHubStats from "@/components/sections/GitHubStats";
import Contact from "@/components/sections/Contact";
import AskAditi from "@/components/ui/AskAditi";
import TerminalMode from "@/components/ui/TerminalMode";

export default function Home() {
  return (
    <>
      {/* Global polish layer */}
      <TerminalMode />

      <Navbar />

      <main id="main-content" className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubStats />
        <Contact />
      </main>

      <Footer />
      <AskAditi />
    </>
  );
}
