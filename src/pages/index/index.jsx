/*
 * @Author: Luo Wei
 * @Date: 2022-03-19 09:54:22
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-03-21 17:20:13
 */

import { View, Picker, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { AtCalendar, AtButton, AtActionSheet, AtActionSheetItem, AtInput, AtList, AtListItem } from 'taro-ui';

import 'taro-ui/dist/style/components/calendar.scss'; // 按需引入
import 'taro-ui/dist/style/components/card.scss';
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";
import "taro-ui/dist/style/components/action-sheet.scss";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/list.scss"

import { todoList } from '../../api/index';

import './index.less';

const List = () => {
  const [myList, setMyList] = useState(()=>[]);
  const [isOpen, setIsOpen] = useState(()=>false);
  const [type, setType] = useState(()=>null);
  const [title, setTitle] = useState(()=>'');
  const [date, setDate] = useState(()=>(''));
  const [time, setTime] = useState(()=>'');
  const [currentTodoId, setCurrentTodoId] = useState(()=>null);

  const getMyList = async () => {
    try{
      const {data:{data:{list}}} = await todoList.getTodoList();
      setMyList(list);
    }catch(err){
      console.error(err);
    }
  }

  const addMyList = () => {
    try {
      todoList.addTodoList({ title, date, time });
    }catch(err){
      console.error(err);
    }
  }

  const alterMyList = () =>{
    try {
      todoList.alterTodoList({ title, date, time, currentTodoId });
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    getMyList();
  },[])

  return (
    <View className='at-row main-container'>
      <View className='at-col calendar'>
        <AtCalendar />
      </View>
      <View className='at-col todo-list'>
      <AtButton
        className='add-button'
        onClick={()=>{
          setType(()=>"新建代办")
          setIsOpen(()=>true);
        }}
        type='secondary'
        circle
      >
          +
      </AtButton>
        {myList.map(item => (
          <View
            onClick={()=>{
              setType(()=>"修改代办");
              setTitle(()=>item.title)
              setDate(()=>item.date);
              setTime(()=>item.time);
              setIsOpen(()=>true);
              setCurrentTodoId(()=>item.id);
            }}
            className='todo-item'
            key={item.id}
          >
            <Text className='todo-title'>{item.title}</Text>
            <Text className='todo-time'>{item.time}</Text>
          </View>
        ))}
      </View>
      <AtActionSheet
        isOpened={isOpen}
        onClose={()=>{
          setIsOpen(()=>false);
        }}
        title={`${type}`}
      >
        <AtActionSheetItem>
          <AtInput
            name='事件标题:'
            title='事件标题:'
            type='text'
            value={type==='新建代办'?'':title}
            className='text-right'
            onChange={e=>{setTitle(()=>e.detail.value)}}
          />
          <Picker mode='date' className='picker' onChange={e=>{setDate(()=>e.detail.value)}}>
            <AtList>
              <AtListItem title='请选择日期'  extraText={type==='新建代办'?'':date} />
            </AtList>
          </Picker>
          <Picker mode='time' className='picker' onChange={e=>{setTime(()=>e.detail.value)}}>
            <AtList>
              <AtListItem title='请选择时间' extraText={type==='新建代办'?'':time} />
            </AtList>
          </Picker>
        </AtActionSheetItem>
        <AtActionSheetItem>
          {type==='新建代办'?
            <AtButton onCLick={addMyList} type='secondary'>新建代办</AtButton>
            :
            <AtButton onClick={alterMyList} type='secondary'>修改代办</AtButton>}
        </AtActionSheetItem>
      </AtActionSheet>
    </View>
  );
};

export default List;
