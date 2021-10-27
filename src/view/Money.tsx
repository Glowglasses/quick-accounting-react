import React, {useEffect, useRef, useState} from 'react';
import {Category} from 'components/Category';
import {Tags} from './Money/Tags';
import {NumberPad} from './Money/NumberPad';
import styled from 'styled-components';
import {RecordItem, useRecords} from '../hooks/useRecords';
import {Toast} from 'antd-mobile';
import {useHistory} from 'react-router-dom';
import dayjs from 'dayjs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Money() {
  let refDiv = useRef<HTMLDivElement>(null);
  const [tagsData, setTagsData] = useState<Pick<RecordItem, 'tagIds' | 'category'>>({tagIds: [], category: '-'});
  const [numberPadData, setNumPadData] = useState<Pick<RecordItem, 'note' | 'amount' | 'createdAt'>>({
    note: '',
    amount: '',
    createdAt: dayjs().toISOString()
  });
  const selectedIdsLength = useRef(0);
  const {addRecord, records, updateRecord} = useRecords();
  const count = useRef(0);
  const history = useHistory();
  useEffect(() => {
    if (refDiv.current) {
      refDiv.current.style.height = document.documentElement.clientHeight + 'px';
    }
  }, []);
  useEffect(() => {
    selectedIdsLength.current = tagsData.tagIds.length;
  }, [tagsData]);
  useEffect(() => {
    if (count.current > 0) {
      if (selectedIdsLength.current === 0) {
        Toast.show('请选择至少一个标签！！！');
        return;
      }
      if (JSON.parse(window.localStorage.getItem('isEdit') || 'false')) {
        updateRecord({...numberPadData, ...tagsData});
        selectedIdsLength.current = 0;
      } else {
        addRecord({...numberPadData, ...tagsData});
      }
    }
    count.current += 1;
  }, [numberPadData]);

  useEffect(() => {
    if (count.current > 1) {
      if (JSON.parse(window.localStorage.getItem('isEdit') || 'false')) {
        Toast.show('修改成功');
        window.localStorage.removeItem('isEdit');
        window.localStorage.removeItem('currentRecord');
      } else {
        Toast.show('添加成功');
      }
      history.push('/statistics');
    }
  }, [records]);
  return (
    <Wrapper ref={refDiv} className='money-wrapper'>
      <Category onChange={(value) => setTagsData({...tagsData, category: value})} home/>
      <Tags category={tagsData.category} onChange={(value) => setTagsData({...tagsData, tagIds: value})}/>
      <NumberPad onChange={(value) => {
        setNumPadData({...numberPadData, ...value});
      }}/>
    </Wrapper>
  );
}

export default Money;