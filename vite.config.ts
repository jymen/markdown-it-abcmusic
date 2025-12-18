import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  define: {
    __PKG_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MarkdownItAbcMusic',
      fileName: 'index',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['markdown-it', 'abcjs', 'jsdom'],
    },
  },
  plugins: [
    dts({
      entryRoot: 'src',
    }),
  ],
});
