import { useState } from "react";
import type { Project } from "../data";
import { useData } from "../i18n";

const num = (n: number) => String(n).padStart(2, "0");

function Figures({ images }: { images: NonNullable<Project["images"]> }) {
  return (
    <div className="figures">
      {images.map((im) => (
        <figure key={im.src}>
          <img src={im.src} width={im.width} height={im.height} alt={im.alt} loading="lazy" />
          <figcaption>{im.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

// 전후 막대: 바꾸기 전을 100으로 두고 바꾼 뒤를 비율로 그린다
function Bars({ bars }: { bars: NonNullable<Project["bars"]> }) {
  const fmt = (v: number, unit: string) => `${v.toLocaleString("en-US")}${unit}`;
  return (
    <div className="bars">
      {bars.map((b) => (
        <div className="bar" key={b.label}>
          <p className="bar-label">{b.label}</p>
          <div className="bar-row">
            <span className="bar-track"><span className="bar-fill is-before" style={{ width: "100%" }} /></span>
            <span className="bar-val mono">{fmt(b.before, b.unit)}</span>
          </div>
          <div className="bar-row">
            <span className="bar-track"><span className="bar-fill" style={{ width: `${Math.max((b.after / b.before) * 100, 0.8)}%` }} /></span>
            <span className="bar-val mono is-after">{fmt(b.after, b.unit)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Item({ p, n, showOrg }: { p: Project; n: number; showOrg: boolean }) {
  const { ui } = useData();
  const [open, setOpen] = useState(false);
  const panel = `proj-${p.id}`;
  const lines = [
    [ui.labelProblem, p.problem],
    [ui.labelSolution, p.solution],
    [ui.labelResult, p.result],
  ].filter((l): l is [string, string] => !!l[1]);
  return (
    <li className={open ? "project is-open" : "project"} id={`p-${p.id}`}>
      <div className="row-head">
        <h3 className="ptitle">
          <span className="pnum mono">{num(n)}</span>
          {p.title}
        </h3>
        <span className="date mono">{p.period}</span>
      </div>
      {showOrg && <p className="org">{p.org}</p>}
      {p.visual && p.images && <div className="pvisual"><Figures images={p.images} /></div>}
      {p.bars && <div className="pvisual"><Bars bars={p.bars} /></div>}
      {!p.visual && !p.bars && p.stat && (
        <p className="pstat">
          <span className="pstat-value">{p.stat.value}</span>
          <span className="pstat-label">{p.stat.label}</span>
        </p>
      )}
      {lines.length > 0 ? (
        <dl className="psr">
          {lines.map(([label, text]) => (
            <div key={label} className={label === ui.labelResult ? "is-result" : undefined}>
              <dt>{label}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="lead">{p.summary}</p>
      )}
      <button
        type="button"
        className="more"
        aria-expanded={open}
        aria-controls={panel}
        onClick={() => setOpen(!open)}
      >
        {open ? ui.less : ui.more}
        <span aria-hidden="true">{open ? " −" : " +"}</span>
      </button>
      <div id={panel} className="detail" hidden={!open}>
        <p className="stack">{p.tags.join(", ")}</p>
        {p.sections.map((s) => (
          <section key={s.heading}>
            <h4>{s.heading}</h4>
            {s.paras.map((t) => (
              <p key={t.slice(0, 24)}>{t}</p>
            ))}
          </section>
        ))}
        {p.images && !p.visual && <Figures images={p.images} />}
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
  // 화면에 나오는 순서대로 01, 02 ... 번호를 매긴다
  const order = groups.flatMap((g) => g.ids.filter((id) => byId.has(id)));
  const numOf = (id: string) => order.indexOf(id) + 1;
  return (
    <section className="section" aria-labelledby="proj-h">
      <h2 id="proj-h">{ui.projectsTitle}</h2>

      <nav className="glance" aria-label={ui.glanceTitle}>
        <p className="glance-title">{ui.glanceTitle}</p>
        <ol>
          {order.map((id) => {
            const p = byId.get(id)!;
            return (
              <li key={id}>
                <a href={`#p-${id}`}>
                  <span className="pnum mono">{num(numOf(id))}</span>
                  <span className="gtitle">{p.title}</span>
                  <span className="gkey">{p.key ?? p.metric ?? ""}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {groups.map((g) => (
        <div className="pgroup" key={g.name}>
          <p className="gname">
            {g.name}
            {g.note && <span className="gnote">{g.note}</span>}
          </p>
          <ul className="projects">
            {g.ids.map((id) => {
              const p = byId.get(id);
              return p ? <Item key={id} p={p} n={numOf(id)} showOrg={!!g.showOrg} /> : null;
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
