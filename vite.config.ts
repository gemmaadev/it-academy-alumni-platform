import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/",
  plugins: [
    viteStaticCopy({
      targets: [
        { src: "src/pages", dest: "" },
        { src: "src/components", dest: "" },
        { src: "src/styles", dest: "" },
      ],
    }),
  ],
});
