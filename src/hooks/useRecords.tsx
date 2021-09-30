import {CategoryType} from '../components/Category';
import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';

export type RecordItem = {
  tagIds: number[]
  note: string
  category: CategoryType
  amount: string
  createdAt: string
}
export type Records = RecordItem[]
const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'));
  }, []);
  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records));
    setRecords(records);
  }, records);

  const addRecord = (record: RecordItem) => {
    console.log(record);
    setRecords([...records, record]);
  };
  return {records, addRecord};
};

export {useRecords};