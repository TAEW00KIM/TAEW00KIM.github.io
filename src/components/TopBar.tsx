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
    let raf = 0;
    const update = () => {
      raf = 0;
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let cur: string | null = null;
      for (const e of els) if (e.getBoundingClientRect().top <= 120) cur = e.id;
      if (atEnd && els.length) cur = els[els.length - 1].id;
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
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
