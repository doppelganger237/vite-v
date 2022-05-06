import request from '@/utils/request'
const base_url = '/parcels'

export function addParcel(data: any) {
  return request({
    url: base_url,
    method: 'post',
    data,
  })
}

export function getParcel(parcelId: number) {
  return request({
    url: `/parcels/${parcelId}`,
    method: 'get',
  })
}

export function getParcelList(query: { current: number; size: number }) {
  return request({
    url: `/parcels?current=${query.current}&size=${query.size}`,
    method: 'get',
  })
}

export function getHisParcels(query: { current: number; size: number }) {
  return request({
    url: `/parcels?current=${query.current}&size=${query.size}`,
    method: 'get',
  })
}

export function deleteParcel(id: number) {
  return request({
    url: `${base_url}/${id}`,
    method: 'delete',
  })
}
