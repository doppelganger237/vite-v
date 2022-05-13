import type { HealthReportModel } from './model/healthreportModel'
import type { BasicFetchResult, BasicPageParams } from './model/baseModel'
import request from '@/utils/request'

const base_url = '/healthreports'

export const getAllReports = (query: BasicPageParams) => request.get<BasicFetchResult<HealthReportModel>>(`${base_url}/all?current=${query.current}&size=${query.size}`)

export function healthReport() {
  return request({
    url: `${base_url}`,
    method: 'post',
  })
}

export function hasReported() {
  return request({
    url: `${base_url}/hasReported`,
    method: 'get',
  })
}

export function getReports() {
  return request({
    url: `${base_url}`,
    method: 'get',
  })
}

export const deleteReport = (id: number) => request.delete(`${base_url}/${id}`)
