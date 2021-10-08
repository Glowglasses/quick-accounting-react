import {Records} from '../hooks/useRecords';
import {CategoryType} from '../components/Category';
import dayjs from 'dayjs';

const getWeekData = (category: CategoryType) => {
  let records: Records = JSON.parse(window.localStorage.getItem('records') || '[]');
  const start = dayjs().startOf('week').add(1, 'day').toISOString();
  let amount = 0;
  let data: number[] = [];
  let date: string[] = [];
  let count = 0;
  while (count < 7) {
    date.push(dayjs(start).add(count, 'day').toISOString());
    count++;
  }
  count = 0;
  date.forEach((item, index) => {
    records.forEach(item1 => {
      if (dayjs(item1.createdAt).isSame(dayjs(item), 'day')) {
        if (item1.category === category) {
          amount += parseFloat(item1.amount);
        }
      }
    });
    data.push(amount);
    amount = 0;
    date[index] = dayjs(item).format('M月D日');
  });
  return [date, data];
};

const getMonthData = (category: CategoryType) => {
  let records: Records = JSON.parse(window.localStorage.getItem('records') || '[]');
  const start = dayjs().startOf('month').toISOString();
  const days = dayjs().daysInMonth();
  let amount = 0;
  let count = 0;
  let data: number[] = [];
  let date: string[] = [];
  while (count < days) {
    date.push(dayjs(start).add(count, 'day').toISOString());
    count++;
  }
  count = 0;
  date.forEach((item, index) => {
    records.forEach(item1 => {
      if (dayjs(item1.createdAt).isSame(dayjs(item), 'day')) {
        if (item1.category === category) {
          amount += parseFloat(item1.amount);
        }
      }
    });
    data.push(amount);
    amount = 0;
    date[index] = dayjs(item).format('M月D日');
  });
  return [date, data];
};

const getYearData = (category: CategoryType) => {
  let records: Records = JSON.parse(window.localStorage.getItem('records') || '[]');
  const date = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const data: number[] = [];
  let amount = 0;
  date.forEach((item, index) => {
    records.forEach(item1 => {
      if (dayjs(item1.createdAt).get('month') + 1 + '' === item) {
        if (item1.category === category) {
          amount += parseFloat(item1.amount);
        }
      }
    });
    data.push(amount);
    amount = 0;
    date[index] = item + '月';
  });
  return [date, data];
};

export {getMonthData, getWeekData, getYearData};