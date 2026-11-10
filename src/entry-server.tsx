import { renderToString } from "react-dom/server";
import App from "./App";
import { DataProvider } from "./i18n";
import * as ko from "./data";
import * as en from "./data.en";

export const datasets = { ko, en };

export function render(lang: "ko" | "en"): string {
  const d = lang === "en" ? (en as typeof ko) : ko;
  return renderToString(
    <DataProvider value={d}>
      <App />
    </DataProvider>,
  );
}
