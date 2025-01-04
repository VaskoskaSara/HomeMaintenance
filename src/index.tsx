import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./app-config/AppWrapper";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.css";

const root = createRoot(document.getElementById("root")!); // createRoot(container!) if you use TypeScript

root.render(
  <StrictMode>
        <AppWrapper />
  </StrictMode>
);

reportWebVitals(console.log);
