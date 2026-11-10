import { useEffect, useState } from "react";
import { useData } from "../i18n";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  const { experience, resume, site, ui } = useData();
  const label = (id: string) => experience.tabs.find((t) => t.id === id)?.label;
  const links: [string, string | undefined][] = [
    ["work", label("work")],
    ["projects", ui.projectsTitle],
    ["activity", label("activity")],
    ["award", label("award")],
    ["skills", resume.title],
  ];
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = links.map(([id]) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    let raf = 0;
    let pinned: { id: string; y: number | null } | null = null;
    let settle = 0;
    const update = () => {
      raf = 0;
      if (pinned && (pinned.y === null || Math.abs(window.scrollY - pinned.y) < 40)) {
        setActive(pinned.id);
        return;
      }
      pinned = null;
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let cur: string | null = null;
      for (const e of els) if (e.getBoundingClientRect().top <= 120) cur = e.id;
      if (atEnd && els.length) cur = els[els.length - 1].id;
      setActive(cur);
    };
    const onScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        if (pinned && pinned.y === null) pinned.y = window.scrollY;
      }, 150);
      if (!raf) raf = requestAnimationFrame(update);
    };
    // A jump to a section near the page end cannot scroll it to the top, so remember the clicked target.
    const onHash = () => {
      const id = location.hash.slice(1);
      if (!els.some((e) => e.id === id)) return;
      // y stays null while smooth scrolling runs; it is fixed once scrolling stops.
      pinned = { id, y: null };
      setActive(id);
    };
    update();
    window.addEventListener("hashchange", onHash);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(settle);
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
      <nav className="topnav-m wrap" aria-label={ui.lang === "en" ? "Sections" : "섹션"}>
        {links.map(([id, text]) =>
          text ? (
            <a key={id} className={active === id ? "is-active" : undefined} href={`#${id}`} aria-current={active === id ? "true" : undefined}>{text}</a>
          ) : null,
        )}
      </nav>
    </div>
  );
}
