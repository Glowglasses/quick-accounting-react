import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Icon from './Icon';

const Wrapper = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  > div {
    font-size: 1.2em;
    text-align: center;
    padding: 0 5px;
    line-height: 1.5em;
   &.selected:after{
     content: "";
     display: block;
     outline: 1px solid black;
   } 
  }
`;
const IconWrapper = styled.div`
  position: absolute;
  right: 8%;
`

type Props = {
  value?: '-' | '+'
  home?: boolean
  background?: string
}
const Category: React.FC<Props> = (props) => {
  const categoryMap = {'-': '支出', '+': '收入'};
  const [categoryList] = useState<('+' | '-')[]>(['-', '+']);
  const [category, setCategory] = useState(props.value)
  const history = useHistory()
  function click(c: ('+' | '-')){
    setCategory(c)
  }
  return (<>
    <Wrapper style={{background: props.background}}>
      {categoryList.map(c =>
        <div key={c} className={category === c ? 'selected' : ''} onClick={() => click(c)}>
          {categoryMap[c]}
        </div>
      )}
      {props.home? <IconWrapper onClick={() => {history.push('/statistics')}}><Icon name='home'/></IconWrapper>: null}
    </Wrapper>
  </>);
};

Category.defaultProps = {
  value: '-',
  home: true,
  background: '#d0d0d0'
};
export {Category};