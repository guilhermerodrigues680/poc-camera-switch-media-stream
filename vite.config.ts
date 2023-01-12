import react from "@vitejs/plugin-react";
import fs from "node:fs";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // https://vitejs.dev/config/#environment-variables
    // https://stackoverflow.com/questions/67194082/how-can-i-display-the-current-app-version-from-package-json-to-the-user-using-vi
    __APP_ENV_NAME__: JSON.stringify(process.env.npm_package_name),
    __APP_ENV_VERSION__: JSON.stringify(process.env.npm_package_version),
  },

  plugins: [react()],

  server: {
    // Como o uso da camera depende um ambiente seguro,
    // para desenvolvimento é necessário gerar certificados
    // locais e configurar o vite para usá-los.
    // https://vitejs.dev/config/server-options.html#server-https
    https: {
      key: fs.readFileSync("local-cert/key.pem"),
      cert: fs.readFileSync("local-cert/cert.pem"),
    },
    host: "0.0.0.0",
  },
});
