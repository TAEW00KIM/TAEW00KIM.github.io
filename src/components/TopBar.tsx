import { useEffect, useState } from "react";
import { useData } from "../i18n";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  const { experience, resume, site, ui } = useData();
  const label = (id: string) => experience.tabs.find((t) => t.id === id)?.label;
  const links: [string, string | undefined][] = [
    ["projects", ui.projectsTitle],
    ["work", label("work")],
    ["activity", label("activity")],
    ["award", label("award")],
    ["skills", resume.title],
  ];
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = links.map(([id]) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id)));
        const first = els.find((e) => seen.has(e.id));
        setActive(first ? first.id : null);
      },
      { rootMargin: "-56px 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return (
    <div className="topbar">
      <div className="wrap topbar-in">
        <a className="brand" href="#top">{ui.lang === "en" ? site.nameEn : site.nameKo}</a>
        <nav className="topnav" aria-label={site.nameEn}>
          {links.map(([id, text]) =>
            text ? (
              <a key={id} className={active === id ? "navlink is-active" : "navlink"} href={`#${id}`} aria-current={active === id ? "true" : undefined}>{text}</a>
            ) : null,
          )}
          <a href={ui.langLinkHref} hrefLang={ui.lang === "en" ? "ko" : "en"}>{ui.langLinkLabel}</a>
          <ThemeToggle />
        </nav>
      </div>
    </div>
  );
}
