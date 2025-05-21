/// <reference types="vitest" />

import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { keycloakify } from 'keycloakify/vite-plugin';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2022'],
  },
  resolve: {
    mainFields: ['module'],
    dedupe: ['@angular/core', '@angular/common', '@angular/router', '@angular/cdk']
  },
  plugins: [
    angular(),
    keycloakify({
      themeName: 'siemens-theme', // Custom theme name
      accountThemeImplementation: 'none'
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules/']
      }
    }
  },
  optimizeDeps: {
    include: ['@angular/common', '@angular/core', '@angular/router', '@angular/cdk/overlay']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
  publicDir: 'public',
}));
