import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";
import { version } from "./package.json";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const is_sourcemap_disabled =
    mode === "development" || !env.SENTRY_AUTH_TOKEN;

  return {
    plugins: [
      react(),
      istanbul({
        cypress: true,
        requireEnv: false,
      }),
      sentryVitePlugin({
        disable: is_sourcemap_disabled,
        release: {
          name: version,
        },
        authToken: env.SENTRY_AUTH_TOKEN,
        org: "arealai",
        project: "example-ci-project",
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
