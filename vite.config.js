import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2015",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router", "pinia"],
          i18n: ["vue-i18n"],
        },
      },
    },
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
    __VUE_I18N_LOCALE__: JSON.stringify(process.env.VITE_I18N_LOCALE || "ko"),
    __VUE_I18N_FALLBACK_LOCALE__: JSON.stringify(
      process.env.VITE_I18N_FALLBACK_LOCALE || "ko"
    ),
  },
  server: {
    host: true,
  },
});
