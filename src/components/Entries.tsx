import type { ExpItem } from "../data";
import { useData } from "../i18n";
import { useOrder } from "./Projects";

export default function Entries({ id, title, items }: { id: string; title: string; items: ExpItem[] }) {
  const { ui } = useData();
  const { numOf } = useOrder();
  return (
    <section className="section" id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      <ul className="rows">
        {items.map((it) => (
          <li className="entry" key={it.title + it.period}>
            <div className="entry-grid">
              <span className="date mono">{it.period}</span>
              <div>
                <h3>{it.title}</h3>
                <p className="org">{it.org}</p>
                {it.bullets.length === 1 && <p className="summary">{it.bullets[0]}</p>}
                {it.bullets.length > 1 && (
                  <ul className="dash">
                    {it.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {it.related && it.related.length > 0 && (
                  <p className="related">
                    <span>{ui.relatedProjects}</span>
                    {it.related.map((rid, i) => (
                      <span className="rel-item" key={rid}>
                        <a href={`#p-${rid}`}>{String(numOf(rid)).padStart(2, "0")}</a>
                        {i < it.related!.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
