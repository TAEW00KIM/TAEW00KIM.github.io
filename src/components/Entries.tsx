import type { ExpItem } from "../data";

export default function Entries({ id, title, items }: { id: string; title: string; items: ExpItem[] }) {
  return (
    <section className="section" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      <ul className="rows">
        {items.map((it) => (
          <li className="entry" key={it.title + it.period}>
            <div className="row-head">
              <h3>{it.title}</h3>
              <span className="date mono">{it.period}</span>
            </div>
            <p className="org">{it.org}</p>
            {it.bullets.length > 0 && (
              <ul className="dash">
                {it.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
