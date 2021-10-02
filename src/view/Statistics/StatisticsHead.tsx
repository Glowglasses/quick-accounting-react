import styled from 'styled-components';
import dayjs from 'dayjs';
import Icon from '../../components/Icon';
import React, {useEffect, useState} from 'react';
import {DatePicker} from 'antd-mobile';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #d0d0d0;
  > .date {
    font-size: 18px;
    display: flex;
    align-items: center;

    > .icon {
      font-size: 9px;
      padding-left: 5px;
    }
  }

  > .amount {
    > li:nth-child(1) {
      font-size: 22px;
    }

    > li:nth-child(2) {
      font-size: 12px;
    }

    text-align: center;
  }

  > .amountByType {
    width: 100%;
    display: flex;
    justify-content: space-around;

    > ul {
      text-align: center;
      width: 50%;

      &:nth-child(1) {
        border-right: 1px solid;

        > li:nth-child(1) {
          font-weight: bold;
        }

        > li:nth-child(2) {
          font-size: 12px;
        }
      }

      &:nth-child(2) {
        > li:nth-child(1) {
          font-weight: bold;
        }

        > li:nth-child(2) {
          font-size: 12px;
        }
      }
    }
  }
`;

type Props = {
  onChange: (value: string) => void;
}
const StatisticsHead: React.FC<Props> = (props) => {
  const [dateVisible, setDateVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY年MM月'));
  const [defaultDate, setDefaultDate] = useState(new Date());
  const selectDate = () => {
    setDefaultDate(new Date());
    setDateVisible(true);
  };
  useEffect(() => {
    if (currentMonth) {
      props.onChange(currentMonth);
    }
  }, [props,currentMonth]);
  return (
    <>
      <Wrapper>
        <div className="date" onClick={selectDate}>{currentMonth}<span className="icon"><Icon
          name="down"/></span></div>
        <ul className="amount">
          <li>0</li>
          <li>{dayjs().get('month')}月结余</li>
        </ul>
        <div className="amountByType">
          <ul>
            <li>0</li>
            <li>{dayjs().get('month')}月收入</li>
          </ul>
          <ul>
            <li>0</li>
            <li>{dayjs().get('month')}月支出</li>
          </ul>
        </div>
        <DatePicker
          visible={dateVisible}
          onClose={() => {
            setDateVisible(false);
          }}
          max={dayjs().endOf('year').toDate()}
          min={dayjs().startOf('year').toDate()}
          value={defaultDate}
          precision="month"
          onConfirm={value => {
            setCurrentMonth(dayjs(value).format('YYYY年MM月'));
          }}
        />
      </Wrapper>
    </>
  );
};

export {StatisticsHead};