import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    strictPort: true,
    allowedHosts: [
      'b0601570-f1f6-439a-b0a5-26ffbc899ee6-00-2q6de2lom1c1c.picard.replit.dev'
    ]
  },
});
