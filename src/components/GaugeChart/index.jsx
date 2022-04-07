import { useEffect, useRef } from 'react';
import { View } from '@tarojs/components';
import { EChart } from 'echarts-taro3-react';
import './index.less';

const PolarBarChart = props => {

  const refPolarBarChart = useRef();

  useEffect(() => {
    refPolarBarChart.current.refresh(props.option);
  })

  return (
    <View className='line-chart'>
      <EChart ref={refPolarBarChart} canvasId='polar-bar' />
    </View>
  );
}

export default PolarBarChart;
