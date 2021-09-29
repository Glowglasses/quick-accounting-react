import React, {useEffect, useRef, useState} from 'react';
import {Category, CategoryType} from 'components/Category';
import {Tags} from './Money/Tags';
import {NumberPad} from './Money/NumberPad';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Money() {
  let refDiv = useRef<HTMLDivElement>(null);
  const [category,setCategory] = useState<CategoryType>('-')
  useEffect(() => {
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    if (refDiv.current) {
      refDiv.current.style.height = document.documentElement.clientHeight + 'px';
    }
  }, []);
  return (
    <Wrapper ref={refDiv}>
      <Category onChange={(value) => setCategory(value)}/>
      <Tags category={category}/>
      <NumberPad/>
    </Wrapper>
  );
}

export default Money;