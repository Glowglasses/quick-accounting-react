import {Records} from 'hooks/useRecords';
import dayjs from 'dayjs';

const recordsByMonth = (records: Records) => {
  const hash: { [K: string]: { [K: string]: Records } } = {};
  records.forEach((item) => {
    const monthKey = dayjs(item.createdAt).format('YYYY年MM月');
    const dayKey = dayjs(item.createdAt).format('YYYY年MM月D日');
    if (!(monthKey in hash)) {
      hash[monthKey] = {};
    }
    if (!(dayKey in hash[monthKey])) {
      hash[monthKey][dayKey] = [];
    }
    hash[monthKey][dayKey].push(item);
  });
  return hash;
};

const descending = (hash: { [k: string]: Records }) => {
  if (!hash) return [];
  return Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) return 0;
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  });
};

export {recordsByMonth, descending};