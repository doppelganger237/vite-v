import { login } from "@/api/user";

import { defineStore } from "pinia";

import { getToken, setToken, removeToken } from "@/utils/auth";
import { getInfo } from "../api/user";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: getToken(),
      username: "",
      roles: [],
    };
  },
  actions: {
    async login(userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;

      const res = await login(username, password);
      this.token = res.data;
      setToken(this.token);
      return res;

      // // BUG
      // return new Promise((resolve, reject) => {
      //   login(username, password)
      //     .then((res) => {
      //       this.token = res.data;
      //       setToken(this.token);
      //       resolve(res);
      //     })
      //     .catch((error) => {
      //       reject(error);
      //     });
      // });
    },
    async getInfo() {
      const res = await getInfo();

      const { user, roles } = res.data;
      this.username = user.username;

      if (roles && roles.length > 0) {
        this.roles = roles;
      }

      return res;
    },
    async logout() {
      // TODO
      // await logout();
      this.token = "";
      this.roles = [];
      removeToken();
    },
  },
});
