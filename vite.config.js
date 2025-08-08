import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Tip: if plugin not installed, vite/react handles JSX by default in Vite 5
export default defineConfig({
  plugins: [react()]
});
