import { useState } from "react";
import type { Project } from "../data";
import { useData } from "../i18n";

function Item({ p, showOrg }: { p: Project; showOrg: boolean }) {
  const [open, setOpen] = useState(false);
  const panel = `proj-${p.id}`;
  return (
    <li className={open ? "project is-open" : "project"}>
      <h3>
      <button
        type="button"
        className="toggle"
        aria-expanded={open}
        aria-controls={panel}
        onClick={() => setOpen(!open)}
      >
        <span className="row-head">
          <span className="ptitle">{p.title}</span>
          <span className="date mono">{p.period}</span>
        </span>
        <span className="row-sub">
          {showOrg && <span className="org">{p.org}</span>}
          <span className="lead">{p.summary}</span>
          {p.metric && <span className="lead metric mono">{p.metric}</span>}
        </span>
        <span className="indicator" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      </h3>
      <div id={panel} className="detail" hidden={!open}>
        <p className="stack">{p.tags.join(", ")}</p>
        <ul className="dash">
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        {p.sections.map((s) => (
          <section key={s.heading}>
            <h4>{s.heading}</h4>
            {s.paras.map((t) => (
              <p key={t.slice(0, 24)}>{t}</p>
            ))}
          </section>
        ))}
        {p.images && (
          <div className="figures">
            {p.images.map((im) => (
              <figure key={im.src}>
                <img src={im.src} width={im.width} height={im.height} alt={im.alt} loading="lazy" />
                <figcaption>{im.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
        {p.links && (
          <p className="plinks">
            {p.links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && " / "}
                <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
              </span>
            ))}
          </p>
        )}
      </div>
    </li>
  );
}

export default function Projects() {
  const { projects, projectGroups: groups, ui } = useData();
  const byId = new Map(projects.map((p) => [p.id, p]));
  return (
    <section className="section" aria-labelledby="proj-h">
      <h2 id="proj-h">{ui.projectsTitle}</h2>
      {groups.map((g) => (
        <div className="pgroup" key={g.name}>
          <p className="gname">
            {g.name}
            {g.note && <span className="gnote">{g.note}</span>}
          </p>
          <ul className="projects">
            {g.ids.map((id) => {
              const p = byId.get(id);
              return p ? <Item key={id} p={p} showOrg={!!g.showOrg} /> : null;
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
