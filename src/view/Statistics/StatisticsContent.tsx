import styled from 'styled-components';
import {descending, recordsByMonth} from '../../lib/formatRecords';
import React from 'react';
import {useTags} from '../../hooks/useTags';

const Wrapper = styled.div`
  overflow: auto;

  ul > {
    .month {
      background-color: #efefef;
      line-height: 28px;
      height: 28px;
    }

    .detail {
      height: 38px;
      line-height: 38px;
      border-bottom: 1px solid #f5f5f5;
    }
  }
`;

type Props = {
  currentMonth: string
}
const StatisticsContent: React.FC<Props> = (props) => {
  const currentMonthRecord = descending(recordsByMonth()[props.currentMonth] || {});
  const {findNameByIds} = useTags();
  return (
    <Wrapper>
      <ul>
        {currentMonthRecord.map(item =>
          <>
            <li className="month">{item[0]}</li>
            {item[1].map((record) => <li className="detail">{findNameByIds(record.tagIds).join(',')}</li>)}
          </>
        )}
      </ul>
    </Wrapper>
  );
};
export {StatisticsContent};