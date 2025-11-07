/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
    const plugins = [react(), tsconfigPaths()];
    return plugins;
}

export default defineConfig({
    plugins: getPlugins(),

    server: {
        host: true,
        allowedHosts: ["seashell-app-umayw.ondigitalocean.app"],
    },
    preview: {
        host: true,
        port: 3000,
        allowedHosts: ["seashell-app-umayw.ondigitalocean.app"],
    },
});
