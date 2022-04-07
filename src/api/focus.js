import request from "../utils/request";
/*
 * @Author: Luo Wei
 * @Date: 2022-04-05 22:01:53
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-07 22:48:29
 */
const baseURL = "/focus";

export function focusCountIncrement() {
  return request({
    method: "GET",
    url: `${baseURL}/timesIncrement`
  });
}
