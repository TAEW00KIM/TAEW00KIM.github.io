import type { ExpItem } from "../data";

export default function Entries({ id, title, items }: { id: string; title: string; items: ExpItem[] }) {
  return (
    <section className="section" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      {items.map((it) => (
        <div className="entry" key={it.title + it.period}>
          <p className="date mono">{it.period}</p>
          <div className="body">
            <h3>{it.title}</h3>
            <p className="org">{it.org}</p>
            {it.bullets.length > 0 && (
              <ul className="dash">
                {it.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {it.tags && it.tags.length > 0 && <p className="stack">{it.tags.join(", ")}</p>}
          </div>
        </div>
      ))}
    </section>
  );
}
