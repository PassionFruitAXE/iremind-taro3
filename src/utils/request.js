import Taro from "@tarojs/taro";
/*
 * @Author: Luo Wei
 * @Date: 2022-03-20 19:27:23
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-05 16:32:24
 */

const interceptor = function(chain) {
  const requestParams = chain.requestParams;
  const { method, data, url } = requestParams;
  console.log(`http ${method || "GET"} --> ${url} data: `, data);
  return chain.proceed(requestParams).then(res => {
    console.log(`http <-- ${url} result:`, res);
    if (res.data.code === 200) return res;
    else Taro.atMessage({ message: res.data.msg, type: "error" });
  });
};
Taro.addInterceptor(interceptor);

const baseURL = "http://127.0.0.1:8081";
const request = ({ method, url, data }) =>
  Taro.request({
    method,
    url: `${baseURL}${url}`,
    timeout: 2000,
    header: {
      "Content-Type": "application/json",
      Authorization: "LuoWei"
    },
    data
  });

export default request;
