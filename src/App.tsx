import Header from "./components/Header";
import Entries from "./components/Entries";
import Projects, { Glance } from "./components/Projects";
import Skills from "./components/Skills";
import { useData } from "./i18n";

export default function App() {
  const { experience, resume, site, ui } = useData();
  const tab = (id: string) => experience.tabs.find((t) => t.id === id);
  const work = tab("work");
  const activity = tab("activity");
  const edu = tab("edu");
  const award = tab("award");
  return (
    <div className="layout">
      <aside className="side">
        <Header />
        <Glance side />
      </aside>
      <div className="content">
      <main>
        <Projects />
        {work && <Entries id="work" title={work.label} items={work.items} />}
        {activity && <Entries id="activity" title={activity.label} items={activity.items} />}
        {edu && <Entries id="edu" title={edu.label} items={edu.items} />}
        {award && <Entries id="award" title={award.label} items={award.items} />}
        <Skills />
      </main>
      <footer className="footer">
        <p>
          {site.footer} / <a href={site.resumePdf} download={ui.resumeFilename}>{resume.pdfLabel}</a>
        </p>
      </footer>
      </div>
    </div>
  );
}
