// import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";
// import { version } from "./package.json";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      istanbul({
        cypress: true,
        requireEnv: false,
      }),
    ],
    server: {
      port: 3000,
    },
    build: {
      sourcemap: "hidden",
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
