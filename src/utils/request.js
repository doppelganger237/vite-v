// TODO 完善
import axios from "axios";
import { ElMessage } from "element-plus";

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  (response) => {
    //console.log(response);
    // 解析后端封装数据
    const res = response.data;
    const code = res.code;
    const msg = res.msg;

    if (code !== 200) {
      if (code === 401) {
        ElMessageBox.confirm("登录状态已失效，请重新登录", "提示", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      ElMessage.error(msg);

      return Promise.reject(new Error(msg));
    }

    return Promise.resolve(res);
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage.error(message);
    return Promise.reject(error);
  }
);

export default service;
