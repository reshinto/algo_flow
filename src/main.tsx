/**
 * Application entry point.
 * Imports the algorithm barrel to trigger all self-registrations before
 * React renders, ensuring the registry is fully populated at first paint.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Side-effect import: every algorithm module self-registers with the registry.
import "@/algorithms";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
