import { useData } from "../i18n";

export default function Hero() {
  const { hero, resume, site, ui } = useData();
  return (
    <header className="hero" id="top">
      <div className="hero-id">
        <h1>{ui.lang === "en" ? site.nameEn : site.nameKo}</h1>
        <p className="hero-role">{site.role}</p>
        <p className="hero-school">{site.school}</p>
      </div>
      <div className="hero-about">
        <p className="hero-intro">
          {/* tagline 한 항목(문장이나 절)마다 새 줄에서 시작한다. 이어 붙이면 원문 그대로다. */}
          {hero.tagline.map((s, i) => (
            <span key={i}>{i > 0 && " "}{s}</span>
          ))}
        </p>
        <p className="hero-links">
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.resumePdf} download={ui.resumeFilename}>{resume.pdfLabel}</a>
        </p>
      </div>
    </header>
  );
}
