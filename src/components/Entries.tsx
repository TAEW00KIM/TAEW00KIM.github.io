import type { ExpItem } from "../data";
import { useData } from "../i18n";
import { useOrder } from "./Projects";

export default function Entries({ id, title, items }: { id: string; title: string; items: ExpItem[] }) {
  const { ui } = useData();
  const { byId, numOf } = useOrder();
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
              </div>
              {((it.tags && it.tags.length > 0) || (it.related && it.related.length > 0)) && (
                <div className="entry-side">
                  {it.tags && it.tags.length > 0 && <p className="stack">{it.tags.join(", ")}</p>}
                  {it.related && it.related.length > 0 && (
                    <div className="related">
                      <p className="rel-label">{ui.relatedProjects}</p>
                      <ul>
                        {it.related.map((rid) => (
                          <li key={rid}>
                            <a href={`#p-${rid}`}>
                              <span className="mono">{String(numOf(rid)).padStart(2, "0")}</span>
                              <span>{byId.get(rid)?.title ?? rid}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
