import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: "src/pages/*", dest: "src/pages" },
        { src: "src/components/*", dest: "src/components" },
      ],
    }),
  ],
});
