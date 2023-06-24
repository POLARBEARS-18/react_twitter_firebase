/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_APIKEY: string
  readonly VITE_FIREBASE_DOMAIN: string
  readonly VITE_FIREBASE_DATABASE: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  // その他の環境変数...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
