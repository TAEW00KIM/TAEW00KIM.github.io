import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { data, DataProvider } from "./i18n";
import "./styles.css";

document.documentElement.lang = data.ui.lang;
document.title = data.ui.docTitle;
document.querySelector('meta[name="description"]')?.setAttribute("content", data.ui.description);

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <DataProvider value={data}>
      <App />
    </DataProvider>
  </StrictMode>
);
// The build prerenders the page into #root; hydrate it when present.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
