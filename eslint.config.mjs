import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    "**/.next/**",
    "out/**",
    "build/**",
    // The video portfolio is a separate project with its own eslint config.
    "george-video-portfolio/**",
  ]),
]);

export default eslintConfig;
