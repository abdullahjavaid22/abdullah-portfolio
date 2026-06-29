import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import QuoteSection from "../components/quotesection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <QuoteSection />
      <Footer />
    </main>
  );
}