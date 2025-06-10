// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // Si trabajas en entornos como WSL o Docker, usar polling puede ayudar
    watch: {
      usePolling: true
    },
    // Opciones específicas para HMR
    hmr: {
      // Activa un overlay que muestra errores en el navegador
      overlay: true
      // Puedes especificar otras opciones, como el host, si es necesario
    }
  }
});
