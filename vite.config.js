/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import svgr from "vite-plugin-svgr";
import legacy from '@vitejs/plugin-legacy'
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      svgr(),
      legacy({
        targets: ['chrome >= 64', 'edge >= 79', 'safari >= 11.1', 'firefox >= 67'],
        modernPolyfills: true
      }),
      createHtmlPlugin({
        inject: {
          data: {
            profile: env.VITE_PROFILE,
          }
        }
      })
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: ['a.kdk.com'] // 로컬 한정, 호스트 파일 수정 후 안되는 경우가 있을 경우가 있으므로
    }
  }
})
