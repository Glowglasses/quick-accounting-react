import React, {useState} from 'react';
import Layout from '../components/Layout';
import {StatisticsHead} from './Statistics/StatisticsHead';
import {StatisticsContent} from './Statistics/StatisticsContent';
import {Records} from '../hooks/useRecords';


const Statistics = () => {
  const [currentMonthRecords,setCurrentMonthRecords] = useState<[string,Records][]>([])
  return (
    <Layout>
      <StatisticsHead onChange={(value) => {setCurrentMonthRecords(value);}}/>
      <StatisticsContent currentMonthRecord={currentMonthRecords}/>
    </Layout>
  );
};
export default Statistics;