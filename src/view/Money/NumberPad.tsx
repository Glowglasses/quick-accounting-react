import React, {ChangeEvent, useRef, useState} from 'react';
import {NumberPadWrapper} from 'components/NumberPadWrapper';
import {updateAccount, formatDecimal} from 'lib/updateAccount';
import {DatePicker} from 'antd-mobile';
import dayjs from 'dayjs';

type Props = {
  onChange: ({note, amount}: { note: string, amount: string, createdAt: string }) => void,
}
const NumberPad: React.FC<Props> = (props) => {
  console.log(dayjs().toISOString());
  const [amount, setAmount] = useState('0');
  const [dateVisible, setDateVisible] = useState(false);
  const [isComputer, setIsComputer] = useState(false);
  const [note, setNote] = useState('');
  const [today, setToday] = useState(new Date());
  const [selectDate, setSelectDate] = useState(dayjs().toISOString());
  const maxDate = dayjs().endOf('year').toDate();
  const minDate = dayjs().startOf('year').toDate();
  const refDate = useRef<HTMLButtonElement>(null);
  const clickNumberPad = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    (e.target as HTMLButtonElement).setAttribute('style', 'animation: clickAnimation 0.1s;');
    const newValue = updateAccount({dom: (e.target as HTMLButtonElement), accountValue: amount});
    setAmount(newValue);
    if (RegExp(/[+\-×÷]/).test(newValue.slice(1, -1))) {
      setIsComputer(true);
    } else {
      setIsComputer(false);
    }
    setTimeout(() => {
      (e.target as HTMLButtonElement).removeAttribute('style');
    }, 100);
  };

  const computerAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newValue = updateAccount({isComputer: true, accountValue: amount});
    setAmount(newValue);
    setIsComputer(false);
  };

  const commit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    let format = '';
    if ('+-×÷'.indexOf(amount.charAt(amount.length - 1)) >= 0) {
      format = formatDecimal(parseFloat(amount.substring(0, amount.length - 1))) + '';
    } else {
      format = formatDecimal(parseFloat(amount)) + '';
    }
    props.onChange({note: note, amount: format, createdAt: dayjs(selectDate).toISOString()});
  };

  const openDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDateVisible(true);
    e.stopPropagation();
  };

  const inputNote = (e: ChangeEvent) => {
    setNote((e.target as HTMLInputElement).value);
  };
  const selectedDate = (value: Date) => {
    // 日历每次点击都为当天
    setToday(new Date());
    if (refDate && refDate.current) {
      if (dayjs().isSame(value, 'day')) {
        refDate.current.textContent = '今天';
      } else {
        refDate.current.textContent = dayjs(value).format('YYYY-M-D');
      }
      setSelectDate(dayjs(value).toISOString());
    }
  };
  return (
    <NumberPadWrapper>
      <div className="inputs">
        <label className="note">
          <span>备注：</span><input type="text" value={note} onChange={inputNote}/>
        </label>
        <label className="amount">
          <span>金额：</span><input type="text" onFocus={(e) => {e.target.blur();}} value={amount}
                                 onChange={() => {}}/>
        </label>
      </div>
      <div className="buttons" onClick={(e) => {clickNumberPad(e);}}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>+</button>
        <button>清除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>-</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>×</button>
        {isComputer ? <button className="ok" onClick={computerAccount}>=</button> :
          <button className="ok" onClick={commit}>完成</button>}
        <button>0</button>
        <button>.</button>
        <button onClick={openDate} ref={refDate}>
          今天
        </button>
        <button>÷</button>
      </div>
      <DatePicker
        visible={dateVisible}
        onClose={() => {
          setDateVisible(false);
        }}
        value={today}
        max={maxDate}
        min={minDate}
        onConfirm={selectedDate}
        onSelect={selectedDate}
      />
    </NumberPadWrapper>
  );
};

export {NumberPad};