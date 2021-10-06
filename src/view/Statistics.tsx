import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import {StatisticsHead} from './Statistics/StatisticsHead';
import {StatisticsContent} from './Statistics/StatisticsContent';
import {Records, useRecords} from '../hooks/useRecords';
import dayjs from 'dayjs';
import {descending, recordsByMonth} from '../lib/formatRecords';


const Statistics = () => {
  const [currentMonth, setCurrentMonth] = useState<string>(dayjs().format('YYYY年MM月'));
  const {records, deleteRecord} = useRecords();
  const [currentMonthRecords, setCurrentMonthRecords] = useState<[string, Records][]>([]);
  useEffect(() => {
    setCurrentMonthRecords(descending(recordsByMonth(records)[currentMonth]));
  }, [currentMonth, records]);
  return (
    <Layout>
      <StatisticsHead onChange={(value) => {setCurrentMonth(value);}} currentMonthRecords={currentMonthRecords}/>
      <StatisticsContent currentMonthRecord={currentMonthRecords} onDelete={(value) => {deleteRecord(value);}}/>
    </Layout>
  );
};
export default Statistics;