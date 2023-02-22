import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    root: 'src',
    base: '/katuli4ka-evolving',
    server: {
        port: 3000,
        open: true,
    },
    build: {
        target: 'esnext',
        outDir: '../dist',
    },
});
