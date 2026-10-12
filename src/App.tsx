import Header from "./components/Header";
import Entries from "./components/Entries";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { experience, resume, site } from "./data";

const tab = (id: string) => experience.tabs.find((t) => t.id === id);

export default function App() {
  const work = tab("work");
  const activity = tab("activity");
  const edu = tab("edu");
  const award = tab("award");
  return (
    <>
      <Header />
      <main>
        {work && <Entries id="work" title={work.label} items={work.items} />}
        <Projects />
        {activity && <Entries id="activity" title={activity.label} items={activity.items} />}
        {edu && <Entries id="edu" title={edu.label} items={edu.items} />}
        {award && <Entries id="award" title={award.label} items={award.items} />}
        <Skills />
      </main>
      <footer className="footer">
        <p>
          {site.footer} / <a href={site.resumePdf} download="김태우_이력서.pdf">{resume.pdfLabel}</a>
        </p>
      </footer>
    </>
  );
}
