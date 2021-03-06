import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import Icon from './Icon';
import {useRecords} from '../hooks/useRecords';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  padding-top: 10px;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;

  > div {
    font-size: 1.2em;
    text-align: center;
    padding: 0 5px;
    line-height: 1.5em;

    &.selected:after {
      content: "";
      display: block;
      outline: 1px solid black;
    }
  }
`;
const IconWrapper = styled.div`
  position: absolute;
  right: 8%;
`;

export type CategoryType = ('+' | '-')
type Props = {
  value?: CategoryType
  home?: boolean
  backgroundColor?: string
  onChange: (categoryType: CategoryType) => void
}
const Category: React.FC<Props> = (props) => {
  const categoryMap = {'-': '支出', '+': '收入'};
  const [categoryList] = useState<('+' | '-')[]>(['-', '+']);
  const [defaultCategory, setDefaultCategory] = useState(props.value);
  const {currentRecord} = useRecords();
  const history = useHistory();

  function click(c: ('+' | '-')) {
    setDefaultCategory(c);
    if (defaultCategory) props.onChange(c);
  }
  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem('isEdit') || 'false')) {
      if (currentRecord) {
        setDefaultCategory(currentRecord.category);
      }
    }
  }, [currentRecord]);

  const goHome = () => {
    history.push('/statistics');
    window.localStorage.removeItem('isEdit');
    window.localStorage.removeItem('currentRecord');
  };
  return (<>
    <Wrapper style={{background: props.backgroundColor}}>
      {categoryList.map(c =>
        <div key={c} className={defaultCategory === c ? 'selected' : ''} onClick={() => click(c)}>
          {categoryMap[c]}
        </div>
      )}
      {props.home ? <IconWrapper onClick={goHome}><Icon name="home"/></IconWrapper> : null}
    </Wrapper>
  </>);
};

Category.defaultProps = {
  value: '-',
  backgroundColor: '#d0d0d0'
};
export {Category};