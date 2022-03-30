/*
 * @Author: Luo Wei
 * @Date: 2022-03-19 09:54:22
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-03-30 21:35:20
 */

import { View, Image } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/loading.scss';

import { useState, useRef } from 'react';

import src from '../../resources/image/focus.jpg';

import './index.less';

const Focus = () => {
  const [isStart, setIsStart] = useState(() => false);
  const [count, setCount] = useState(() => 10);

  const countRef = useRef();
  countRef.current = count;

  const timeCheck = time => () => setCount(time);

  const countStart = () => {
    setIsStart(() => true);
    const timer = setInterval(() => {
      setCount(countRef.current - 1);
      if (countRef.current < 0) {
        setIsStart(() => false);
        clearInterval(timer);
      }
    }, 1000);
  };

  return (
    <View>
      <Image src={src} className='focus-image' />
      <View className='focus-button-group'>
        <AtButton
          className='time-button'
          type='secondary'
          onClick={timeCheck(30*60)}
        >
          30m
        </AtButton>
        <AtButton
          className='time-button'
          type='secondary'
          onClick={timeCheck(60*60)}
        >
          60m
        </AtButton>
        <AtButton
          className='time-button'
          type='secondary'
          onClick={timeCheck(90*60)}
        >
          90m
        </AtButton>
        <AtButton className='time-button' type='secondary'>
          Set
        </AtButton>
        <AtButton
          className='start-button'
          type='secondary'
          onClick={countStart}
        >
          {isStart ? `${~~(count/60)}:${count%60}` : 'Start'}
        </AtButton>
      </View>
    </View>
  );
};

export default Focus;
