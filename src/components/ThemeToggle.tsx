import { useEffect, useState } from "react";
import { useData } from "../i18n";

type Mode = "light" | "dark";

const systemMode = (): Mode =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const currentMode = (): Mode => {
  const a = document.documentElement.getAttribute("data-theme");
  return a === "dark" || a === "light" ? a : systemMode();
};

// 첫 렌더는 브라우저 상태와 무관하게 고정(서버 렌더와 같게), 마운트 뒤에 현재 모드를 읽는다
export default function ThemeToggle() {
  const { ui } = useData();
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    setMode(currentMode());
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!document.documentElement.hasAttribute("data-theme")) setMode(systemMode());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Mode = (mode ?? currentMode()) === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#111111" : "#fcfcfb");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* 저장 실패는 무시 */
    }
    setMode(next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      data-pending={mode === null ? "" : undefined}
      suppressHydrationWarning
    >
      {mode === "dark" ? ui.themeToLight : ui.themeToDark}
    </button>
  );
}
