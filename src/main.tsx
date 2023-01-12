import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { VERSION_INFO } from "./config/version-info";

import "./index.css";

console.info("VERSION_INFO", VERSION_INFO);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
