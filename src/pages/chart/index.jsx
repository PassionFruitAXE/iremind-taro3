/*
 * @Author: Luo Wei
 * @Date: 2022-03-19 09:54:22
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-08 18:11:14
 */

import { View, Text } from '@tarojs/components';

import { useState, useMemo } from 'react';
import { useDidShow } from '@tarojs/taro';

import 'taro-ui/dist/style/components/progress.scss';
import 'taro-ui/dist/style/components/icon.scss';

import { chart } from '../../api';
import GaugeChart from '../../components/GaugeChart';

import './index.less';

const Chart = () => {
  const [chartData, setChartData] = useState(() => ({
    listLength: 0,
    focusTimes: 0,
    msg: ''
  }));

  const option = useMemo(
    () => ({
      title: [
        {
          text: '代办总数和专注次数',
          textStyle: {
            fontSize: 14
          }
        }
      ],
      color: '#5470c6',
      polar: {
        radius: [5, '80%']
      },
      angleAxis: {
        max:
          (Math.max(chartData.focusTimes, chartData.listLength) / 20 + 1) * 20,
        startAngle: 45
      },
      radiusAxis: {
        type: 'category',
        data: ['focus', 'all']
      },
      tooltip: {},
      series: {
        type: 'bar',
        data: [chartData.focusTimes, chartData.listLength],
        coordinateSystem: 'polar',
        label: {
          show: true,
          position: 'middle',
          formatter: '{b}: {c}'
        }
      }
    }),
    [chartData]
  );

  useDidShow(() => {
    (async () => {
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
        <GaugeChart option={option} />
      </View>
      <View>
        <Text className='text'>{chartData.msg}</Text>
      </View>
    </View>
  );
};

export default Chart;
