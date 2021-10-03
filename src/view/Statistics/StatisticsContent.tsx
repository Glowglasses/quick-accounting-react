import styled from 'styled-components';
import {descending, recordsByMonth} from '../../lib/formatRecords';
import React from 'react';
import {useTags} from '../../hooks/useTags';
import generateRandomId from '../../lib/generateRandomId';

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
            <React.Fragment key={generateRandomId(16)}>
              <li className="month" key={generateRandomId(16)}>{item[0]}</li>
              {item[1].map((record, index1) => <li className="detail"
                                                   key={generateRandomId(16)}>{findNameByIds(record.tagIds).join('，')}</li>)}
            </React.Fragment>
          )}
        </ul>
      </Wrapper>
    );
  }
;
export
{
  StatisticsContent
}
  ;