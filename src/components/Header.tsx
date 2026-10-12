import { hero, resume, site } from "../data";

export default function Header() {
  return (
    <header className="masthead">
      <h1>
        {site.nameKo}
        <span className="role">{site.role}</span>
      </h1>
      <p className="intro">{hero.tagline.join(" ")}</p>
      <p className="links">
        <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={site.web} target="_blank" rel="noopener noreferrer">{site.webLabel}</a>
        <a href={site.resumePdf} download="김태우_이력서.pdf">{resume.pdfLabel}</a>
      </p>
    </header>
  );
}
