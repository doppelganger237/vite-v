/**
 * 跟后端返回的用户信息一致
 */
interface UserInfo {
  id: number
  username: string
  avatar: string
  descript: string
  createTime: Date
}

/**
 * 登录用户信息,跟后端的LoginUser一致
 */
interface LoginUserInfo {
  user: UserInfo
  roles: Array<string>
}

/**
 * 前端存储LoginUser的信息,UserInfo的包装类 TODO
 */
interface LoginUser {
  token: string
  userInfo: Nullable<UserInfo>
  roles: Array<string>
  msgData: Array<IMessage>
}

/**
 * 登录参数
 */
interface LoginParams {
  username: string
  password: string
  rememberme: boolean
}

interface IMessage {
  id?: number
  fromId: number
  toId: number
  context: string
  createTime?: Object
}
