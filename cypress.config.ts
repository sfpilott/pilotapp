import { defineConfig } from "cypress";
import coverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      coverageTask(on, config);
      return config;
    },
  },
});
