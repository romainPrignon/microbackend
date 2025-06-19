import {defineConfig} from 'vite'
import { microBackend } from '../../plugins/vite-plugin-micro-backend'

export default defineConfig({
    plugins: [microBackend()],
    build: {
        minify: false,
        manifest: true,
        lib: {
            entry: 'src/main.ts',
            formats: ['es'],
            fileName: 'main',
        },
        rollupOptions: {
            input: 'src/main.ts',
            output: {
                dir: 'dist',
                // preserveModules: true, // force many chunks
                inlineDynamicImports: true, // force 0 chunk
            }
        },
        ssr: true // need to be on to preserve node buildin module
    },
    ssr: {
        target: 'node',
        noExternal: true // force to preserve node_modules
    }
})