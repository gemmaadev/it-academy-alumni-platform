import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/",
  plugins: [
    viteStaticCopy({
      targets: [
        { src: "src/pages/*", dest: "src/pages" },
        { src: "src/components/*", dest: "src/components" },
        { src: "src/styles/*", dest: "src/styles" },
      ],
    }),
  ],
});
