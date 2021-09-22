import React, {useState} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  > div {
    font-size: 18px;
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
type Props = {
  value?: '-' | '+'
  home?: boolean
  background?: string
}
const Category: React.FC<Props> = (props) => {
  const categoryMap = {'-': '支出', '+': '收入'};
  const [categoryList] = useState<('+' | '-')[]>(['-', '+']);
  const [category, setCategory] = useState(props.value)
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
    </Wrapper>
  </>);
};

Category.defaultProps = {
  value: '-',
  home: true,
  background: '#d0d0d0'
};
export {Category};