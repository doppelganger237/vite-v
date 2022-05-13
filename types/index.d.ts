import type { ElLoadingDirective } from 'element-plus'
import type { vShow } from 'vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Component: (props: { is: Component | string }) => void
  }

  export interface ComponentCustomProperties {
    vShow: typeof vShow
    vLoading: typeof ElLoadingDirective
  }
}

export { }
