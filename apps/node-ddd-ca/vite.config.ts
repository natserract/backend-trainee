import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePluginNode } from "vite-plugin-node";
// import babel from "vite-plugin-babel";
// import { esbuildDecorators } from "@anatine/esbuild-decorators";

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
