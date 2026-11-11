import { useLayoutEffect, useRef, useState } from "react";
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
            <a className="figlink" href={im.src2x ?? im.src} target="_blank" rel="noopener">
              <img src={im.src} srcSet={im.src2x ? `${im.src} 1x, ${im.src2x} 2x` : undefined} width={im.width} height={im.height} alt={im.alt} loading="lazy" />
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

type ItemProps = { p: Project; n: number; showOrg: boolean; wide: boolean; right: boolean; open: boolean; onToggle: () => void };

// 자세히 보기: 누른 카드가 그 자리에서 행 전체 폭으로 넓어지고, 상세가 같은 카드 안에서 이어서 열린다.
// 카드의 번호와 제목이 곧 출처다. 열거나 닫아 카드 위치가 바뀌면 카드 위끝이 보이게 스크롤한다.
function Item({ p, n, showOrg, wide, right, open, onToggle }: ItemProps) {
  const { ui } = useData();
  const panel = `proj-${p.id}`;
  const ref = useRef<HTMLLIElement>(null);
  const before = useRef<number | null>(null);
  const toggle = () => {
    before.current = ref.current ? ref.current.getBoundingClientRect().top : null;
    onToggle();
  };
  useLayoutEffect(() => {
    const el = ref.current;
    const was = before.current;
    before.current = null;
    if (!el || was === null) return;
    const bar = document.querySelector(".topbar")?.getBoundingClientRect().bottom ?? 0;
    const top = el.getBoundingClientRect().top;
    const detail = open ? document.getElementById(panel)?.getBoundingClientRect().top ?? null : null;
    let to: number | null = null;
    if (Math.abs(top - was) > 2) {
      // 카드가 다른 줄로 옮겨졌다(오른쪽 카드를 펼치거나 접을 때): 카드 위끝을 상단 바 바로 아래로
      to = window.scrollY + top - bar - 16;
    } else if (detail !== null && detail > window.innerHeight - 160) {
      // 제자리에서 펼쳤지만 상세가 화면 아래에 있다: 상세 시작이 화면 가운데쯤 오게, 카드 위끝은 바 아래까지만
      let by = detail - window.innerHeight / 2;
      if (top > bar) by = Math.min(by, top - bar - 16);
      to = window.scrollY + by;
    }
    if (to === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, to), behavior: reduce ? "auto" : "smooth" });
  }, [open, panel]);
  const lines = [
    [ui.labelProblem, p.problem],
    [ui.labelSolution, p.solution],
    [ui.labelResult, p.result],
  ].filter((l): l is [string, string] => !!l[1]);
  return (
    <li ref={ref} className={`project${open ? " is-open" : ""}${wide ? " is-wide" : ""}${right ? " is-right" : ""}`} id={`p-${p.id}`}>
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
      <button type="button" className="more" aria-expanded={open} aria-controls={panel} onClick={toggle}>
        {open ? ui.less : ui.more}
        <span aria-hidden="true">{open ? " −" : " +"}</span>
      </button>
      <Detail p={p} open={open} />
    </li>
  );
}

// 자세히 보기 내용. 닫혀 있어도 DOM에 남긴다(JS 없이도 읽히게, 인쇄 때 펼침).
function Detail({ p, open }: { p: Project; open: boolean }) {
  return (
    <div id={`proj-${p.id}`} className="detail" hidden={!open}>
      {/* 넓은 화면: 왼쪽은 글, 오른쪽은 그 프로젝트의 화면, 기술, 링크 */}
      <div className="detail-in">
        <div className="detail-text">
          {p.sections.map((s) => (
            <section key={s.heading}>
              <h4>{s.heading}</h4>
              {s.paras.map((t) => (
                <p key={t.slice(0, 24)}>{t}</p>
              ))}
            </section>
          ))}
        </div>
        <div className="detail-side">
          {p.images && !p.visual && <Figures images={p.images} />}
          <p className="stack">{p.tags.join(", ")}</p>
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
      </div>
    </div>
  );
}

// 화면에 나오는 순서대로 01, 02 ... 번호를 매긴다
export function useOrder() {
  const { projects, projectGroups: groups } = useData();
  const byId = new Map(projects.map((p) => [p.id, p]));
  const order = groups.flatMap((g) => g.ids.filter((id) => byId.has(id)));
  return { byId, order, groups, numOf: (id: string) => order.indexOf(id) + 1 };
}

// 2열 격자에서 두 칸을 쓰는 카드: 시각 자료가 있는 카드, 펼친 카드, 짝 없이 혼자 남는 카드.
// 펼친 카드가 두 칸을 쓰면 짝이던 카드는 순서를 지킨 채 앞 줄이나 다음 줄로 옮겨 다시 짝을 짓는다.
function wides(ps: Project[], openIds: string[]): [Project, boolean][] {
  const full = ps.map((p) => !!(p.visual || p.bars) || openIds.includes(p.id));
  const wide = [...full];
  let run: number[] = [];
  const flush = () => {
    if (run.length % 2 === 1) wide[run[run.length - 1]] = true;
    run = [];
  };
  ps.forEach((_, i) => (full[i] ? flush() : run.push(i)));
  flush();
  return ps.map((p, i) => [p, wide[i]]);
}

// 2열에서 오른쪽 칸에 놓이는 카드(앞에 짝이 되는 왼쪽 카드가 있는 경우). 가운데 구분선을 이 카드 왼쪽에 긋는다.
function rights(ws: [Project, boolean][]): boolean[] {
  let col = 0;
  return ws.map(([, wide]) => {
    if (wide) {
      col = 0;
      return false;
    }
    const right = col === 1;
    col = right ? 0 : 1;
    return right;
  });
}

function Grid({ ps, showOrg, numOf }: { ps: Project[]; showOrg: boolean; numOf: (id: string) => number }) {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const toggle = (id: string) => setOpenIds((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  return (
    <ul className="projects">
      {(() => {
        const ws = wides(ps, openIds);
        const rs = rights(ws);
        return ws.map(([p, wide], i) => (
          <Item key={p.id} p={p} n={numOf(p.id)} showOrg={showOrg} wide={wide} right={rs[i]} open={openIds.includes(p.id)} onToggle={() => toggle(p.id)} />
        ));
      })()}
    </ul>
  );
}

export default function Projects() {
  const { ui } = useData();
  const { byId, groups, numOf } = useOrder();
  return (
    <section className="section" id="projects" aria-labelledby="proj-h">
      <h2 id="proj-h">{ui.projectsTitle}</h2>
      {groups.map((g) => (
        <div className="pgroup" key={g.name} id={g.id ? `g-${g.id}` : undefined}>
          <p className="gname">
            {g.name}
            {g.note && <span className="gnote">{g.note}</span>}
            <span className="grange mono">{range(g.ids.filter((id) => byId.has(id)).map(numOf))}</span>
          </p>
          {g.links && (
            <p className="glinks">
              {g.links.map((l, i) => (
                <span key={l.href}>
                  {i > 0 && " / "}
                  <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                </span>
              ))}
            </p>
          )}
          {g.about && (
            <div className="gabout">
              {g.about.map((t) => (
                <p key={t.slice(0, 24)}>{t}</p>
              ))}
            </div>
          )}
          <Grid ps={g.ids.filter((id) => byId.has(id)).map((id) => byId.get(id)!)} showOrg={!!g.showOrg} numOf={numOf} />
        </div>
      ))}
    </section>
  );
}
