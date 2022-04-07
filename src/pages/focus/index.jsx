/*
 * @Author: Luo Wei
 * @Date: 2022-03-19 09:54:22
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-07 22:46:03
 */

import { View, Image, Text } from '@tarojs/components';
import {
  AtButton,
  AtActionSheet,
  AtActionSheetItem,
  AtInputNumber
} from 'taro-ui';

import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/loading.scss';
import 'taro-ui/dist/style/components/action-sheet.scss';
import 'taro-ui/dist/style/components/input-number.scss';
import 'taro-ui/dist/style/components/icon.scss';

import { useState, useRef } from 'react';

import { focus } from '../../api/index';
import src from '../../resources/image/focus.jpg';

import './index.less';

const Focus = () => {
  const [isStart, setIsStart] = useState(() => false);
  const [count, setCount] = useState(() => 0);
  const [timeChoose, setTimeChoose] = useState(() => 0);
  const [isOpened, setIsOpened] = useState(() => false);

  const countRef = useRef();
  countRef.current = count;

  const countStart = () => {
    if (isStart) {
      return;
    }
    setCount(timeChoose);
    setIsStart(true);
    const timer = setInterval(() => {
      setCount(countRef.current - 1);
      if (countRef.current < 0) {
        setIsStart(false);
        setTimeChoose(0);
        focus.focusCountIncrement();
        clearInterval(timer);
      }
    }, 1000);
  };

  return (
    <View>
      <Image src={src} className='focus-image' />
      <View className='focus-button-group'>
        <AtButton
          className={timeChoose === 30 ? 'time-button check' : 'time-button'}
          type='secondary'
          onClick={() => {
            if (isStart) {
              return;
            }
            setTimeChoose(30);
          }}
        >
          30m
        </AtButton>
        <AtButton
          className={timeChoose === 60 ? 'time-button check' : 'time-button'}
          type='secondary'
          onClick={() => {
            if (isStart) {
              return;
            }
            setTimeChoose(60);
          }}
        >
          60m
        </AtButton>
        <AtButton
          className={timeChoose === 90 ? 'time-button check' : 'time-button'}
          type='secondary'
          onClick={() => {
            if (isStart) {
              return;
            }
            setTimeChoose(90);
          }}
        >
          90m
        </AtButton>
        <AtButton
          className={
            timeChoose !== 90 &&
            timeChoose !== 60 &&
            timeChoose !== 30 &&
            timeChoose !== 0
              ? 'time-button check'
              : 'time-button'
          }
          onClick={() => {
            if (isStart) {
              return;
            }
            setTimeChoose(0);
            setIsOpened(true);
          }}
          type='secondary'
        >
          {timeChoose !== 90 &&
          timeChoose !== 60 &&
          timeChoose !== 30 &&
          timeChoose !== 0
            ? `${timeChoose}m`
            : 'Set'}
        </AtButton>
        <AtButton
          className='start-button'
          type='secondary'
          onClick={countStart}
        >
          {isStart ? `${~~(count / 60)}:${count % 60}` : 'Start'}
        </AtButton>
      </View>
      <AtActionSheet
        title='自定义时间'
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <AtActionSheetItem>
          <AtInputNumber
            min={0}
            max={90}
            step={1}
            value={timeChoose}
            onChange={value => {
              setTimeChoose(value > 90 ? 90 : value);
            }}
          />
          <Text>&nbsp;&nbsp;&nbsp;{'min (<=90)'}</Text>
        </AtActionSheetItem>
      </AtActionSheet>
    </View>
  );
};

export default Focus;
