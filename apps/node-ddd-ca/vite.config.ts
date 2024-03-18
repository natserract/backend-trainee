import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [
      tsconfigPaths(),
      ...VitePluginNode({
        adapter: "koa",
        appPath: "./src/main.ts",
      }),
    ],
  };
});
