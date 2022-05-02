import request from '@/utils/request'

export function getParcel(parcelId){
    return request({
        url: '/parcels/'+parcelId,
        method: 'get'
    })
    
}

export function getParcelList(query){
    return request({
        url: `/parcels?current=${query.current}&size=${query.size}`,
        method: 'get',
    })

}