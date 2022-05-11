import type { ElLoadingDirective } from 'element-plus'
import type { vShow } from 'vue'

declare interface UserData {
  id: number
  username: string
  avatar: string
  descript: string
  createTime: Date
}

interface LoginUser {
  token: string
  username: string
  avatar: string
  id: number
  roles: Array<string>
  msgData: Array<any>
}

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
