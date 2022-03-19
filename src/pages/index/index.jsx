import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";

const Index = () => {
  useEffect(() => {
    setTimeout(() => {
      Taro.navigateTo({ url: "/pages/list/index" });
    });
  });

  return (
    <View>
      <Text>欢迎使用IRemind!</Text>
    </View>
  );
};
export default Index;
