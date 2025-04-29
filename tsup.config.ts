import { defineConfig } from "tsup";
import path from "node:path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "es2020",
  splitting: false,
  shims: false,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.alias = {
      ...(options.alias || {}),
      three: path.resolve("node_modules/three"), // No uses __dirname, Vite y tsup asumen raíz
    };
  },
});
