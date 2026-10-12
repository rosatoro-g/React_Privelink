import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],

      include: [
        "src/components/**/*.{js,jsx}",
        "src/data/**/*.{js,jsx}",
        "src/pages/**/*.{js,jsx}",
      ],

      exclude: [
        "src/test/**",
        "src/assets/**",
        "src/styles/**",
      ],
    },
  },
});