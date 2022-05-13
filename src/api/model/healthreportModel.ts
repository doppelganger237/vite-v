import type { BasicFetchResult } from './baseModel'

export interface HealthReportItem {
  id: number
  username: string
  createTime: string

}

export type HealthReportModel = BasicFetchResult<HealthReportItem>
