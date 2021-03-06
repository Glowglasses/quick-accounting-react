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
  const [currentRecord, setRecord] = useState<RecordItem>();
  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem('isEdit') || 'false')) {
      setRecord(JSON.parse(window.localStorage.getItem('currentRecord') || `{tagIds: [],note: '',category: '-',amount: '',createdAt: ''`));
    }
    setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'));
  }, []);
  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records));
    setRecords(records);
  }, records);

  const addRecord = (record: RecordItem) => {
    setRecords([...records, record]);
  };

  const updateRecord = (record: RecordItem) => {
    setRecords([...records.filter(item => record.createdAt !== item.createdAt), record]);
  };

  const deleteRecord = (createdAt: string) => {
    setRecords(records.filter(item => item.createdAt !== createdAt));
  };

  return {records, addRecord, currentRecord, updateRecord, deleteRecord};
};

export {useRecords};