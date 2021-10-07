import React, {useEffect, useRef, useState} from 'react';
import Layout from '../components/Layout';
import {Category} from '../components/Category';
import styled from 'styled-components';
import * as echarts from 'echarts';

const Wrapper = styled.nav`
  display: flex;

  > div {
    width: 33.3333%;
    line-height: 1.5em;
    font-size: 1.2em;
    text-align: center;

    &:nth-child(1) {
      border: 2px solid black;
    }

    &:nth-child(2) {
      border-top: 2px solid black;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
    }

    &:nth-child(3) {
      border-top: 2px solid black;
      border-right: 2px solid black;
      border-bottom: 2px solid black;
    }
  }

  > .select {
    color: white;
    background-color: black;
  }
`;

const Main = styled.main`
  border: 1px solid red;
  margin-top: 50px;
  min-width: 300px;
  min-height: 300px;
`;

function Chart() {
  const [selectDate, setSelectDate] = useState('周');
  const dateList = ['周', '月', '年'];
  const refMain = useRef<HTMLDivElement>(null);
  const select = (date: string) => {
    setSelectDate(date);
  };
  console.log(refMain.current);
  useEffect(() => {
    const chartDom = document.getElementById('main');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        grid: {
          left: 0,
          right: 0,
        },
        title: {
          text: '本' + selectDate
        },
        tooltip: {
          show: true,
          triggerOn: 'click',
          position: 'top',
          formatter: '{c}'
        },
        xAxis: {
          type: 'category',
          data: ['10月1日','10月1日','10月1日','10月1日','10月1日','10月1日','10月1日'],
          axisTick: {alignWithLabel: true},
          axisLine: {lineStyle: {color: '#666'}},
          axisLabel:{
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          symbol: 'circle',
          symbolSize: 12,
          type: 'line',
          itemStyle: {
            borderWidth: 1, color: '#666', borderColor: '#666'
          },
          data: [0,2,3,4,5,6,7],
        }]
      };

      myChart.setOption(option);
    }
  }, [selectDate]);
  return (
    <Layout>
      <Category backgroundColor="white" onChange={(categoryType => {console.log(categoryType);})}/>
      <Wrapper>
        {dateList.map((date) => <div key={date} className={date === selectDate ? 'select' : ''}
                                     onClick={() => select(date)}>{date}</div>)}
      </Wrapper>
      <Main ref={refMain} id="main"/>
    </Layout>
  );
}

export default Chart;