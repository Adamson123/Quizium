import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// const publicApi = "https://quizium.onrender.com";
// const localApi = "";
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3002",
                changeOrigin: true,
            },
        },
    },
});
