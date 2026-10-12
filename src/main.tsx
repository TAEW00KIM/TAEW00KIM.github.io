import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { data, DataProvider } from "./i18n";
import "./styles.css";

document.documentElement.lang = data.ui.lang;
document.title = data.ui.docTitle;
document.querySelector('meta[name="description"]')?.setAttribute("content", data.ui.description);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataProvider value={data}>
      <App />
    </DataProvider>
  </StrictMode>,
);
