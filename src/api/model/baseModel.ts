export interface BasicPageParams {
  current: number
  size: number
}

export interface BasicFetchResult<T> {
  total: number
  rows: T[]
}
