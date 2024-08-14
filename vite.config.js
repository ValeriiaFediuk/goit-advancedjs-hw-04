import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    base: '/goit-advancedjs-hw-04/',
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name]-[hash].js', 
        },
      },
      outDir: '../dist',
      emptyOutDir: true, 
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
    ],
    server: {
      fs: {
        allow: [
          // Дозволяємо доступ до директорії проекту
          '/Users/mac/Desktop/projects/goit-advancedjs-hw-04',
          // Додаємо шлях до node_modules
          '/Users/mac/Desktop/projects/goit-advancedjs-hw-04/node_modules',
        ],
      },
    },
  };
});
