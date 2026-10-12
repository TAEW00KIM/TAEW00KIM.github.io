import { useData } from "../i18n";

export default function Skills() {
  const { resume } = useData();
  return (
    <section className="section" aria-labelledby="skills-h">
      <h2 id="skills-h">{resume.title}</h2>
      <dl className="skills">
        {resume.skills.map((g) => (
          <div key={g.group}>
            <dt>{g.group}</dt>
            <dd>{g.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
