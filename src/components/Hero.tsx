import { useData } from "../i18n";

export default function Hero() {
  const { hero, resume, site, ui } = useData();
  return (
    <header className="hero" id="top">
      <h1>{ui.lang === "en" ? site.nameEn : site.nameKo}</h1>
      <p className="hero-role">{site.role}</p>
      <p className="hero-school">{site.school}</p>
      <p className="hero-intro">{hero.tagline.join(" ")}</p>
      <p className="hero-links">
        <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={site.resumePdf} download={ui.resumeFilename}>{resume.pdfLabel}</a>
      </p>
    </header>
  );
}
