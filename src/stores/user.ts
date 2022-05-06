import { getInfo, login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken(),
      username: '',
      // TODO
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
      id: 0,
      roles: [],
    }
  },
  actions: {
    async login(userInfo: { username: string; password: string; rememberme: boolean }) {
      const username = userInfo.username.trim()
      const password = userInfo.password

      const res = await login(username, password)
      const { token } = res
      this.token = token
      setToken(this.token)
      return res

      // // BUG
      // return new Promise((resolve, reject) => {
      //   login(username, password)
      //     .then((res) => {
      //       this.token = res.data;
      //       setToken(this.token);
      //       resolve(res);
      //     })
      //     .catch((error) => {
      //       reject(error);
      //     });
      // });
    },
    async getInfo() {
      const res = await getInfo()
      const { user, roles } = res

      this.username = user.username
      this.id = user.id

      if (roles && roles.length > 0)
        this.roles = roles

      return res
    },
    async logout() {
      // TODO
      // await logout();
      this.$reset()
      removeToken()
    },
  },
})
