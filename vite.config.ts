import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
    const plugins = [react(), tsconfigPaths()];
    return plugins;
}

export default defineConfig({
    plugins: getPlugins(),

    build: {
        outDir: "dist/static",
    },

    server: {
        host: true,
        allowedHosts: ["seashell-app-umayw.ondigitalocean.app"],
    },

    // ✅ 告诉 vite preview 去 dist/static 找 index.html
    preview: {
        host: true,
        port: 3000,
        allowedHosts: ["seashell-app-umayw.ondigitalocean.app"],
        open: false,
        // 指定预览目录
        // 注意：vite v5 以后这里是 `preview.root`
        // 若你版本较旧，可用 `previewDir`
        previewDir: "dist/static"
    },
});
