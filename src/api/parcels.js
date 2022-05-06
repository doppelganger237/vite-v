import request from "@/utils/request";
const base_url = "/parcels";

export function addParcel(data) {
  return request({
    url: base_url,
    method: "post",
    data: data,
  });
}

export function getParcel(parcelId) {
  return request({
    url: "/parcels/" + parcelId,
    method: "get",
  });
}

export function getParcelList(query) {
  return request({
    url: `/parcels?current=${query.current}&size=${query.size}`,
    method: "get",
  });
}

export function getHisParcels(query) {
  return request({
    url: `/parcels?current=${query.current}&size=${query.size}`,
    method: "get",
  });
}

export function deleteParcel(id) {
  return request({
    url: base_url + "/" + id,
    method: "delete",
  });
}
