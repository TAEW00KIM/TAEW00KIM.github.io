import { useData } from "../i18n";

// 핵심 수치 띠: data의 highlights 3칸. 칸마다 그 수치가 나온 프로젝트나 묶음으로 링크한다.
export function Numbers() {
  const { highlights } = useData();
  if (highlights.length === 0) return null;
  return (
    <ul className="numbers">
      {highlights.map((h) => (
        <li key={h.value}>
          <span className="num-value">{h.value}</span>
          <span className="num-label">{h.label}</span>
          <a className="num-title" href={h.href}>{h.linkText}</a>
        </li>
      ))}
    </ul>
  );
}
