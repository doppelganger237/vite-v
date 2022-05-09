// TODO 完善
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import cache from '@/plugins/cache'

export interface IResponse<T = any> {
  code: number
  data: T
  msg: string
}

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000, // request timeout
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken)
      config.headers.Authorization = `Bearer ${getToken()}` // 让每个请求携带自定义token 请根据实际情况自行修改

    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const userStore = useUserStore()
    // console.log(response);
    // 解析后端封装数据
    const { code, data, msg } = response.data
    // 前后端定义好的代码
    if (code !== 200) {
      if (code === 401) {
        ElMessageBox.confirm('登录状态已失效，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          userStore.logout().then(() => {
            location.reload()
          })
        })
      }
      ElMessage.error(msg)

      return Promise.reject(new Error(msg))
    }

    return Promise.resolve(data)
  },
  (error) => {
    let { message } = error
    if (message === 'Network Error')
      message = '后端接口连接异常'

    else if (message.includes('timeout'))
      message = '系统接口请求超时'

    else if (message.includes('Request failed with status code'))
      message = `系统接口${message.substr(message.length - 3)}异常`

    ElMessage.error(message)
    return Promise.reject(error)
  },
)

export default service
