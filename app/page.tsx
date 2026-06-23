import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MetricsGrid from "@/components/MetricsGrid";
import Section from "@/components/Section";
import Personal from "@/components/Personal";
import ProblemSolver from "@/components/ProblemSolver";
import DiagnoseScenario from "@/components/DiagnoseScenario";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

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

      <Section
        id="diagnose"
        tag="// TRY IT YOURSELF"
        title="Think you can"
        highlight="run this account?"
      >
        <p className="text-[var(--ink-soft)] text-[15px] mb-8 max-w-xl">
          Here&apos;s a real scenario from my playbook. You make the calls — I&apos;ll
          tell you how it would&apos;ve actually played out.
        </p>
        <DiagnoseScenario />
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
      <ChatWidget />
    </>
  );
}

