import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';

export default defineConfig(({ envMode }) => {
  return {
    source: {
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || ''),
      },
      entry: {
        background: './src/chrome-ext-core/background/index.ts',
        content: './src/chrome-ext-core/content/index.tsx',
        popup: './src/chrome-ext-core/popup/index.tsx',
        options: './src/chrome-ext-core/options/index.tsx',
      },
    },
    dev: {
      assetPrefix: true,
      hmr: false,
      liveReload: false,
      writeToDisk: true,
    },
    output: {
      distPath: {
        root: 'dist',
      },
      filenameHash: false,
      sourceMap: {
        js: envMode === 'production' ? false : 'cheap-module-source-map',
      },
      copy: {
        patterns: [
          {
            from: 'manifest.json',
            to: 'manifest.json',
          },
          {
            from: 'logo',
            to: 'logo',
          },
          {
            from: 'popup',
            to: 'popup',
          },
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
      pluginNodePolyfill(),
    ],
    tools: {
      rspack: {
        optimization: {
          splitChunks: false,
        },
        target: 'web',
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
    },
  };
});
