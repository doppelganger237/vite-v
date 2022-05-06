import request from "@/utils/request";

const base_url = "/healthreports";

console.log(import.meta);
export function getAllReports(query: { current: number; size: number; }) {
  return request({
    url: `${base_url}/all?current=${query.current}&size=${query.size}`,
    method: "get",
  });
}

export function healthReport() {
  return request({
    url: `${base_url}`,
    method: "post",
  });
}

export function hasReported() {
  return request({
    url: `${base_url}/hasReported`,
    method: "get",
  });
}

export function getReports() {
  return request({
    url: `${base_url}`,
    method: "get",
  });
}
