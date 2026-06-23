import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MetricsGrid from "@/components/MetricsGrid";
import Section from "@/components/Section";
import Personal from "@/components/Personal";
import ProblemSolver from "@/components/ProblemSolver";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />

      <section id="profile" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <MetricsGrid />
        </div>
      </section>

      <Section
        id="personal"
        tag="// OFF THE CLOCK"
        title="Get to know me"
        highlight="outside work."
      >
        <p className="text-[var(--ink-soft)] text-[15px] mb-8 max-w-xl">
          Click a card for the full story.
        </p>
        <Personal />
      </Section>

      <Section
        id="approach"
        tag="// HOW I WORK"
        title="Client's got a problem?"
        highlight="Here's my move."
      >
        <p className="text-[var(--ink-soft)] text-[15px] mb-8 max-w-xl">
          Click through the steps — this is the actual sequence I run when an
          account hits a snag, from the first signal to closing the loop.
        </p>
        <ProblemSolver />
      </Section>

      <Section id="experience" tag="// WHERE IT HAPPENED" title="Experience">
        <Experience />
      </Section>

      <Section
        id="words"
        tag="// IN THEIR WORDS"
        title="Said about me,"
        highlight="not by me."
      >
        <Testimonials />
      </Section>

      <Section id="skills" tag="// CAPABILITIES" title="Both sides of the table">
        <Skills />
      </Section>

      <Section id="education" tag="// FOUNDATION" title="Education">
        <Education />
      </Section>

      <Footer />
    </>
  );
}

