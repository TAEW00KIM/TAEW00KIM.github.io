import { useState } from "react";
import type { Project } from "../data";
import { useData } from "../i18n";

const num = (n: number) => String(n).padStart(2, "0");
const range = (ns: number[]) => (ns.length > 1 ? `${num(ns[0])}~${num(ns[ns.length - 1])}` : ns.length ? num(ns[0]) : "");

// zoom: wide screenshots link to the full-size file so small screens can open them at full size
function Figures({ images, zoom = false }: { images: NonNullable<Project["images"]>; zoom?: boolean }) {
  const { ui } = useData();
  return (
    <div className="figures">
      {images.map((im) => (
        <figure key={im.src}>
          {zoom ? (
            <a className="figlink" href={im.src} target="_blank" rel="noopener">
              <img src={im.src} width={im.width} height={im.height} alt={im.alt} loading="lazy" />
            </a>
          ) : (
            <img src={im.src} width={im.width} height={im.height} alt={im.alt} loading="lazy" />
          )}
          <figcaption>
            {im.caption}
            {im.live && (
              <>
                {" "}
                <a className="figlive" href={im.live} target="_blank" rel="noopener noreferrer">
                  {ui.liveLink}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </>
            )}
          </figcaption>
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

function Item({ p, n, showOrg, wide }: { p: Project; n: number; showOrg: boolean; wide: boolean }) {
  const { ui } = useData();
  const [open, setOpen] = useState(false);
  const panel = `proj-${p.id}`;
  const lines = [
    [ui.labelProblem, p.problem],
    [ui.labelSolution, p.solution],
    [ui.labelResult, p.result],
  ].filter((l): l is [string, string] => !!l[1]);
  return (
    <li className={`project${open ? " is-open" : ""}${wide ? " is-wide" : ""}`} id={`p-${p.id}`}>
      <div className="pmeta mono">
        <span>{num(n)}</span>
        <span>{p.period}</span>
      </div>
      <h3 className="ptitle">{p.title}</h3>
      {(p.key ?? p.metric) && <p className="pkey">{p.key ?? p.metric}</p>}
      {showOrg && <p className="org">{p.org}</p>}
      {p.visual && p.images && <div className="pvisual"><Figures images={p.images} zoom /></div>}
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

// 화면에 나오는 순서대로 01, 02 ... 번호를 매긴다
export function useOrder() {
  const { projects, projectGroups: groups } = useData();
  const byId = new Map(projects.map((p) => [p.id, p]));
  const order = groups.flatMap((g) => g.ids.filter((id) => byId.has(id)));
  return { byId, order, groups, numOf: (id: string) => order.indexOf(id) + 1 };
}

// 2열 격자에서 시각 자료가 있는 항목은 두 칸을 쓰고, 혼자 남는 마지막 칸도 두 칸으로 채운다
function wides(ps: Project[]): [Project, boolean][] {
  let col = 0;
  return ps.map((p, i) => {
    let wide = !!(p.visual || p.bars);
    if (!wide && col === 0 && i === ps.length - 1) wide = true;
    if (wide) {
      col = 0;
    } else {
      col = (col + 1) % 2;
    }
    return [p, wide];
  });
}

export default function Projects() {
  const { ui } = useData();
  const { byId, groups, numOf } = useOrder();
  return (
    <section className="section" id="projects" aria-labelledby="proj-h">
      <h2 id="proj-h">{ui.projectsTitle}</h2>
      {groups.map((g) => (
        <div className="pgroup" key={g.name}>
          <p className="gname">
            {g.name}
            {g.note && <span className="gnote">{g.note}</span>}
            <span className="grange mono">{range(g.ids.filter((id) => byId.has(id)).map(numOf))}</span>
          </p>
          {g.about && (
            <div className="gabout">
              {g.about.map((t) => (
                <p key={t.slice(0, 24)}>{t}</p>
              ))}
            </div>
          )}
          <ul className="projects">
            {wides(g.ids.filter((id) => byId.has(id)).map((id) => byId.get(id)!)).map(([p, wide]) => (
              <Item key={p.id} p={p} n={numOf(p.id)} showOrg={!!g.showOrg} wide={wide} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
