import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // сайт лежит в корне домена botcarplates.site
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // сюда Vite будет складывать готовый сайт для GitHub Pages
    outDir: "docs",
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
