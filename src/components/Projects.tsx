import { useState } from "react";
import { projects, type Project } from "../data";

function Item({ p, n }: { p: Project; n: number }) {
  const [open, setOpen] = useState(false);
  const num = String(n).padStart(2, "0");
  const panel = `proj-${p.id}`;
  return (
    <li className="project">
      <div className="proj-head">
        <span className="num mono">{num}</span>
        <h3>
          <button
            type="button"
            className="toggle"
            aria-expanded={open}
            aria-controls={panel}
            onClick={() => setOpen(!open)}
          >
            {p.title}
            <span className="indicator" aria-hidden="true">{open ? "접기 −" : "펼치기 +"}</span>
          </button>
        </h3>
        <p className="meta">
          {p.org}
          {p.period && <span className="mono"> {p.period}</span>}
        </p>
      </div>
      <p className={p.metric ? "lead mono" : "lead"}>{p.metric ?? p.summary}</p>
      <p className="stack">{p.tags.join(", ")}</p>
      <div id={panel} className="detail" hidden={!open}>
        {p.metric && <p>{p.summary}</p>}
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
  return (
    <section className="section" aria-labelledby="proj-h">
      <h2 id="proj-h">프로젝트</h2>
      <ol className="projects">
        {projects.map((p, i) => (
          <Item key={p.id} p={p} n={i + 1} />
        ))}
      </ol>
    </section>
  );
}
