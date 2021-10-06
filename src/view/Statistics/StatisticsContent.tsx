import styled from 'styled-components';
import React, {useEffect} from 'react';
import {useTags} from '../../hooks/useTags';
import generateRandomId from '../../lib/generateRandomId';
import {RecordItem, Records, useRecords} from '../../hooks/useRecords';
import {useHistory} from 'react-router-dom';
import {Dialog, Toast} from 'antd-mobile';

const Wrapper = styled.div`
  overflow: auto;
  width: 100%;

  .month {
    background-color: #efefef;
    line-height: 28px;
    height: 28px;
  }

  .detail {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    position: relative;
    user-select: none;

    > section:nth-child(1) {
      width: 50%;
      float: left;
    }

    > section:nth-child(2) {
      width: 50%;
      float: right;
      text-align: right;
      margin-right: 5px;
    }

    > section:nth-child(3) {
      font-size: 12px;
      position: absolute;
      bottom: -20px;
      left: 0;
    }
  }
`;

type Props = {
  currentMonthRecord: [string, Records][],
  onDelete: (value: string) => void
}
const StatisticsContent: React.FC<Props> = (props) => {
    const {findNameByIds} = useTags();
    const history = useHistory();
    let timer = -1;
    let isDelete = false;
    const edit = (record: RecordItem) => {
      window.localStorage.setItem('isEdit', 'true');
      window.localStorage.setItem('currentRecord', JSON.stringify(record));
      setTimeout(() => {
        history.push('/money');
      });
    };

    const longPress = (createAt: string) => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        isDelete = true;
        window.localStorage.removeItem('isEdit');
        window.localStorage.removeItem('currentRecord');
        Dialog.show({
          content: '是否删除？',
          closeOnAction: true,
          actions: [
            [
              {
                key: 'cancel',
                text: '取消',
              },
              {
                key: 'delete',
                text: '删除',
                bold: true,
                danger: true,
              },
            ],
          ],
          onAction: (action) => {
            if (action.key === 'delete') {
              props.onDelete(createAt);
            }else {
              isDelete = false;
            }
          }
        });
      }, 500);
    };

    const touchEnd = () => {
      if (!isDelete) {
        clearTimeout(timer);
      }
    };

    return (
      <Wrapper>
        {props.currentMonthRecord.length > 0 ? props.currentMonthRecord.map(item =>
          <React.Fragment key={generateRandomId(16)}>
            <div className="month" key={generateRandomId(16)}>{item[0]}</div>
            {item[1].map((record, index1) => <React.Fragment key={generateRandomId(16)}>
              <div className="detail" key={generateRandomId(16)} onClick={() => {edit(record);}}
                   onTouchStart={() => {longPress(record.createdAt);}}
                   onTouchEnd={touchEnd}>
                <section key={generateRandomId(16)}>{findNameByIds(record.tagIds).join('，')}</section>
                <section
                  key={generateRandomId(16)}>{record.category === '-' ? '-' + record.amount : '+' + record.amount}</section>
                <section key={generateRandomId(16)}>{record.note}</section>
              </div>
            </React.Fragment>)}
          </React.Fragment>
        ) : null}
      </Wrapper>
    );
  }
;
export {StatisticsContent} ;