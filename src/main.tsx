import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const VERSION_INFO = {
  appMode: import.meta.env.MODE,
  appIsRunningProd: import.meta.env.PROD,
  appIsRunningProdText: import.meta.env.PROD ? "PROD" : "DEV",
  // @ts-ignore
  appName: __APP_ENV_NAME__ as string,
  // @ts-ignore
  appVersion: __APP_ENV_VERSION__ as string,
};

console.info("VERSION_INFO", VERSION_INFO);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
