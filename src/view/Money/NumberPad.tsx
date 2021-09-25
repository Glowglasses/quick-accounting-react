import React, {useState} from 'react';
import {NumberPadWrapper} from 'components/NumberPadWrapper';
import {updateAccount} from '../../lib/updateAccount';

const NumberPad: React.FC = () => {
  const [accountValue,setAccountValue] = useState('0')

  const clickNumberPad = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    const newValue = updateAccount(e.target as HTMLButtonElement, accountValue)
    setAccountValue(newValue)
  }

  const commit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    console.log('提交')
  }
  return (
    <NumberPadWrapper>
      <div className='inputs'>
        <label className="note">
          <span>备注：</span><input type="text"/>
        </label>
        <label className="amount">
          <span>金额：</span><input type="text" onFocus={(e) => {e.target.blur()}} value={accountValue} onChange={() => {}}/>
        </label>
      </div>
      <div className='buttons' onClick={(e) => {clickNumberPad(e)}}>
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
        <button className='ok' onClick={commit}>完成</button>
        <button>0</button>
        <button>.</button>
        <button>今天</button>
        <button>÷</button>
      </div>
    </NumberPadWrapper>
  );
};

export {NumberPad};