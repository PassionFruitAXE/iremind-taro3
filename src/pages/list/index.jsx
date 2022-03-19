/*
 * @Author: Luo Wei
 * @Date: 2022-03-19 09:54:22
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-03-19 10:54:16
 */

import { View } from "@tarojs/components";
import { AtCalendar } from "taro-ui";

import "taro-ui/dist/style/components/calendar.scss"; // 按需引入
import "taro-ui/dist/style/components/card.scss";

import TodoItem from "../../components/TodoItem";
import "./index.less";

const List = () => {
  // 请求来的数据
  const todoList = [
    {
      id: "1",
      title: "我要写代码",
      time: "2022-3-19",
    },
  ];

  return (
    <View className="at-row main-container">
      <View className="at-col calendar">
        <AtCalendar />
      </View>
      <View className="at-col todo-list">
        {todoList.map((item) => (
          <TodoItem item={item} key={item.id} />
        ))}
      </View>
    </View>
  );
};

export default List;
