import type { ExpItem } from "../data";

export default function Entries({ id, title, items }: { id: string; title: string; items: ExpItem[] }) {
  return (
    <section className="section" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      <ul className="rows">
        {items.map((it) => (
          <li className="entry" key={it.title + it.period}>
            <div className="entry-grid">
              <span className="date mono">{it.period}</span>
              <div>
                <h3>{it.title}</h3>
                <p className="org">{it.org}</p>
                {it.bullets.length > 0 && (
                  <ul className="dash">
                    {it.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
