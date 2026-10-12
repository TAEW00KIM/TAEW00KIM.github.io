import { hero, resume, site } from "../data";

export default function Header() {
  return (
    <header className="masthead">
      <div className="masthead-text">
        <h1>{site.nameKo}</h1>
        <p className="role">{site.role}</p>
        <p className="intro">{hero.tagline.join(" ")}</p>
        <p className="links">
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>{" / "}
          <a href={`mailto:${site.email}`}>이메일</a>{" / "}
          <a href={site.web} target="_blank" rel="noopener noreferrer">{site.webLabel}</a>{" / "}
          <a href={site.resumePdf} download="김태우_이력서.pdf">{resume.pdfLabel}</a>
        </p>
      </div>
      <img className="photo" src={site.photo} width={120} height={120} alt="김태우" />
    </header>
  );
}
