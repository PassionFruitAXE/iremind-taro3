/*
 * @Author: Luo Wei
 * @Date: 2022-03-19 09:54:22
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-03-30 20:36:43
 */

import { View, Text } from '@tarojs/components';

import { useState } from 'react';
import { useDidShow } from '@tarojs/taro';

import 'taro-ui/dist/style/components/progress.scss';
import 'taro-ui/dist/style/components/icon.scss';

import { chart } from '../../api';
import UserChart from '../../components/UserChart';

import './index.less';

const Chart = () => {
  const [chartData, setChartData] = useState(() => ({
    controlTime: 0,
    listNumber: 0,
    focusTime: 0,
    msg: '请永远相信\n美好的事情即将发生!'
  }));

  // controlTime listNumber focusTime msg

  useDidShow(() => {
    (async () => {
      console.log(1);
      try {
        const {
          data: {
            data: { myChartData }
          }
        } = await chart.getChartData();
        setChartData(() => myChartData);
      } catch (err) {
        console.error(err);
      }
    })();
  });

  return (
    <View className='main-container'>
      <View className='main-chart'>
        <UserChart />
      </View>
      <View>
        <Text className='text'>{chartData.msg}</Text>
      </View>
    </View>
  );
};

export default Chart;
