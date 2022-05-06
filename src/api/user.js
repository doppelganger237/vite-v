import request from "@/utils/request";

export function login(username, password) {
  const data = {
    username,
    password,
  };
  return request({
    url: `/login`,
    method: "post",
    data: data,
  });
}

export function getInfo() {
  return request({
    url: "/getInfo",
    method: "get",
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "get",
  });
}

// 获取路由
export const getRouters = () => {
  return request({
    url: "/getRouters",
    method: "get",
  });
};

export function getById(id) {
  return request({
    url: `/users/${id}`,
    method: "get",
  });
}
