import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/table", component: "table" },
  ],
  npmClient: 'pnpm',
  proxy:{
    '/api': {
      'target': 'http://localhost:8080/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    }
  },
  plugins: [
      '@umijs/plugins/dist/valtio'
  ],
  valtio:{}
});