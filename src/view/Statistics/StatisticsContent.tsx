import styled from 'styled-components';
import React from 'react';
import {useTags} from '../../hooks/useTags';
import generateRandomId from '../../lib/generateRandomId';
import {Records} from '../../hooks/useRecords';

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
  currentMonthRecord: [string, Records][]
}
const StatisticsContent: React.FC<Props> = (props) => {
    const {findNameByIds} = useTags();
    return (
      <Wrapper>
        {props.currentMonthRecord.length > 0 ? props.currentMonthRecord.map(item =>
          <React.Fragment key={generateRandomId(16)}>
            <div className="month" key={generateRandomId(16)}>{item[0]}</div>
            {item[1].map((record, index1) => <React.Fragment key={generateRandomId(16)}>
              <div className="detail" key={generateRandomId(16)}>
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
export
{
  StatisticsContent
}
  ;