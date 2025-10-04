import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig(({ envMode }) => {
  return {
    source: {
      entry: {
        background: './src/background/index.ts',
        content: './src/content/index.ts',
        popup: './src/ui/popup/index.tsx',
        options: './src/ui/options/index.tsx'
      }
    },
    dev: {
      assetPrefix: true,
      hmr: false, // Disable HMR for Chrome extensions
      liveReload: false, // Disable live reload for Chrome extensions
      writeToDisk: true, // Write files to disk for Chrome extension loading
    },
    output: {
      distPath: {
        root: 'dist',
      },
      filenameHash: false, // Disable filename hashing for Chrome extensions
      sourceMap: {
        js: envMode === 'production' ? false : 'cheap-module-source-map',
      },
      copy: {
        patterns: [
          // Copy manifest.json to dist
          {
            from: 'manifest.json',
            to: 'manifest.json',
          },
          // Copy logo files
          {
            from: 'logo',
            to: 'logo',
          },
          // Copy popup HTML and CSS
          {
            from: 'popup',
            to: 'popup',
          },
          // Copy settings HTML and CSS
          {
            from: 'settings',
            to: 'settings',
          },
        ],
      },
    },
    server: {
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    plugins: [
      pluginTypeCheck(),
      pluginReact(),
      pluginSass(),
      pluginSvgr({
        mixedImport: true,
      }),
    ],
    tools: {
      rspack: {
        // Chrome extension specific optimizations
        optimization: {
          splitChunks: false, // Don't split chunks for Chrome extensions
        },
        target: 'web', // Target web environment
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
    },
  };
});