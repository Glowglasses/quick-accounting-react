import React, {useEffect, useRef, useState} from 'react';
import Layout from '../components/Layout';
import {Category, CategoryType} from '../components/Category';
import styled from 'styled-components';
import * as echarts from 'echarts';
import {getMonthData, getWeekData, getYearData} from '../lib/getChartData';
import dayjs from 'dayjs';

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
  margin-top: 100px;
  min-width: 300px;
  min-height: 300px;
`;

const MainWrapper = styled.div`
  width: 100vw;
  overflow: auto;
`;

function Chart() {
  const [selectDate, setSelectDate] = useState('周');
  const [category, setCategory] = useState<CategoryType>('-');
  const dateList = ['周', '月', '年'];
  const refMain = useRef<HTMLDivElement>(null);
  const refMainWrapper = useRef<HTMLDivElement>(null);
  const refChart = useRef<echarts.ECharts>();
  const select = (date: string) => {
    setSelectDate(date);
  };
  useEffect(() => {
    const chartDom = document.getElementById('main');
    if (chartDom) refChart.current = echarts.init(chartDom);
  }, []);
  useEffect(() => {
    if (refChart.current) {
      let array: (string[] | number[])[] = [[], []];
      switch (selectDate) {
        case '周':
          if (refMain.current) refMain.current.style.width = document.documentElement.clientWidth + 'px';
          refChart.current?.resize();
          array = getWeekData(category);
          break;
        case '月':
          if (refMain.current) refMain.current.style.width = document.documentElement.clientWidth * 4.5 + 'px';
          if (refMainWrapper.current) refMainWrapper.current.scrollLeft = document.documentElement.clientWidth / 2 * (dayjs().get('date') / 7) ;
          refChart.current?.resize();
          array = getMonthData(category);
          break;
        case '年':
          if (refMain.current) refMain.current.style.width = document.documentElement.clientWidth + 'px';
          refChart.current?.resize();
          array = getYearData(category);
          break;
      }
      const date = array[0];
      const data = array[1];
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
          data: date,
          axisTick: {alignWithLabel: true},
          axisLine: {lineStyle: {color: '#666'}},
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          symbol: 'circle',
          symbolSize: 11,
          type: 'line',
          itemStyle: {
            borderWidth: 1, color: '#666', borderColor: '#666'
          },
          data: data,
        }]
      };
      refChart.current.setOption(option);
    }
  }, [selectDate, category]);
  return (
    <Layout>
      <Category backgroundColor="white" onChange={categoryType => {setCategory(categoryType);}}/>
      <Wrapper>
        {dateList.map((date) => <div key={date} className={date === selectDate ? 'select' : ''}
                                     onClick={() => select(date)}>{date}</div>)}
      </Wrapper>
      <MainWrapper ref={refMainWrapper}>
        <Main ref={refMain} id="main"/>
      </MainWrapper>
    </Layout>
  );
}

export default Chart;