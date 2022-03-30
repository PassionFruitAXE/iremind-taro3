import request from "../utils/request";
/*
 * @Author: Luo Wei
 * @Date: 2022-03-26 16:26:29
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-03-26 16:28:36
 */
const routerURL = "/chart";

export function getChartData() {
  return request({
    method: "GET",
    url: `${routerURL}/getChartData`
  });
}
