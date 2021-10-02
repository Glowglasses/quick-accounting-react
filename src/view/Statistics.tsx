import React, {useState} from 'react';
import Layout from '../components/Layout';
import {StatisticsHead} from './Statistics/StatisticsHead';
import {StatisticsContent} from './Statistics/StatisticsContent';
import dayjs from 'dayjs';


const Statistics = () => {
  const [currentMonth, setCurrentMonth] = useState<string>(dayjs().format('YYYY年MM月'));
  return (
    <Layout>
      <StatisticsHead onChange={(value) => {setCurrentMonth(value);}}/>
      <StatisticsContent currentMonth={currentMonth}/>
    </Layout>
  );
};
export default Statistics;