import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const publicApi = "https://quizium.onrender.com";
const localApi = "http://localhost:3002";
export default defineConfig({
    plugins: [react()],
    // server: {
    //     proxy: {
    //         "/api": {
    //             target: publicApi,
    //             changeOrigin: true,
    //         },
    //     },
    // },
});
