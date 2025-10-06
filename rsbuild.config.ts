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
        content: './src/content/index.tsx',
        popup: './src/ui/popup/index.tsx',
        options: './src/ui/options/index.tsx',
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
