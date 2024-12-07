import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
const service = axios.create({
  baseURL: "/api", //基础地址

  timeout: 10000,
}); //创建一个新的axios实例
//成功返回1,失败返回2
service.interceptors.response.use(
  (config) => {
    //注入token
    // store.getters.token=>放进请求头
    if (store.getters.token) {
      config.headers.Authorization = "Bearer ${store.getters.token}";
    }
    return config;
  },
  (error) => {
    //失败执行promise
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    //成功执行promise
    //axios默认加了一层data
    const { success, message, data } = response.data;
    if (success) {
      return data;
    } else {
      Message({ type: "error", message });

      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    //失败执行promise
    Message({ type: "error", message: error.message });
    return Promise.reject(error);
  }
);
export default service;
