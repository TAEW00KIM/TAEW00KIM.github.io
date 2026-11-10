import { useOrder } from "./Projects";

// 핵심 수치 띠: stat이 있는 프로젝트 앞 3개
export function Numbers() {
  const { byId, order } = useOrder();
  const items = order.map((id) => byId.get(id)!).filter((p) => p.stat).slice(0, 3);
  if (items.length === 0) return null;
  return (
    <ul className="numbers">
      {items.map((p) => (
        <li key={p.id}>
          <span className="num-value">{p.stat!.value}</span>
          <span className="num-label">{p.stat!.label}</span>
          <a className="num-title" href={`#p-${p.id}`}>{p.title}</a>
        </li>
      ))}
    </ul>
  );
}
