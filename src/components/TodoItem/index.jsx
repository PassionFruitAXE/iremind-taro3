import { View, Text } from "@tarojs/components";

import "./index.less";

/*
 * @Author: Luo Wei
 * @Date: 2022-03-19 10:49:51
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-03-19 11:15:09
 */
const TodoItem = (props) => {
  const { title, time } = props.item;
  console.log(title, time);
  return (
    <View className='todo-item'>
      <Text>
        {title}
        {time}
      </Text>
    </View>
  );
};

export default TodoItem;
