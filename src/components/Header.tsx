import { useData } from "../i18n";

export default function Header() {
  const { hero, resume, site, ui } = useData();
  return (
    <header className="masthead">
      <h1>
        {ui.lang === "en" ? site.nameEn : site.nameKo}
        <span className="role">{site.role}</span>
      </h1>
      <p className="intro">{hero.tagline.join(" ")}</p>
      <p className="links">
        <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={site.web} target="_blank" rel="noopener noreferrer">{site.webLabel}</a>
        <a href={site.resumePdf} download={ui.resumeFilename}>{resume.pdfLabel}</a>
        <a href={ui.langLinkHref} hrefLang={ui.lang === "en" ? "ko" : "en"}>{ui.langLinkLabel}</a>
      </p>
    </header>
  );
}
