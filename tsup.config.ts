import { defineConfig } from "tsup";
import fs from 'fs-extra';

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
  onSuccess: async () => {
    // Copiar estilos y assets después del build
    await fs.copy("src/styles", "dist/styles").catch(() => {});
    await fs.copy("src/assets", "dist/assets").catch(() => {});
  },
});
