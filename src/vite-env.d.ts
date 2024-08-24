/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string; // API KEY
  // tambahkan variabel lain yang Anda gunakan di sini
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
