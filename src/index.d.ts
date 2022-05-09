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
