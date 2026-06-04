import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "src/logic/header.ts",
        "src/logic/footer.ts",
        "src/logic/global.ts",
        "src/logic/bottom-nav.ts",
        "src/logic/home.ts",
        "src/logic/login.ts",
        "src/logic/splash-page.ts",
        "src/apiServices/**",
        "src/router.ts",
        "src/main.ts",
      ],
    },
  },
});
