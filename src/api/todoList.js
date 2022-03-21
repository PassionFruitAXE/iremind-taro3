import request from "../utils/request";
/*
 * @Author: Luo Wei
 * @Date: 2022-03-20 17:22:25
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-03-21 10:08:47
 */

const routerURL = "/todoList";

export function addTodoList() {}

export function deleteTodoList() {}

export function alterList() {}

export function getTodoList() {
  return request({
    method: "GET",
    url: `${routerURL}/getTodoList`,
    headers: {
      "Content-Type": "application/json",
      name: "123"
    }
  });
}
