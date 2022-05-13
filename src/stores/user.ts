import { getInfo, login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: (): LoginUser => ({
    token: getToken() ?? '',
    userInfo: null,
    roles: [],
    msgData: [],

  }),
  actions: {
    async login(params: LoginParams) {
      const res = await login(params)
      const token = res
      this.token = token
      setToken(this.token)
      return res
    },
    async getInfo() {
      const res = await getInfo()
      this.userInfo = res.user
      this.roles = res.roles
      return res
    },
    async logout() {
      this.$reset()
      removeToken()
    },
    addMsg(data: object) {
      this.msgData.push(data)
    },
  },
})
