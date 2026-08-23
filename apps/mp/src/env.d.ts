/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MP_APPID: string
  readonly VITE_API_BASE: string
  readonly VITE_MP_DATA_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}
