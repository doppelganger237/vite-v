import request from '@/utils/request'

export const login = (params: LoginParams) => request.post<string>('/login', params)

export const getInfo = () => request.get<LoginUserInfo>('/getInfo')

export function logout() {
  return request({
    url: '/logout',
    method: 'get',
  })
}

// 获取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get',
  })
}

export const getUserById = (id: number) => request.get<UserInfo>(`/users/${id}`)

