import Nav from './Nav';
import styled from 'styled-components';
import {useEffect, useRef} from 'react';

type Props = {
  children: any
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > .main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 85%;
  }
`;

function Layout(props: Props) {
  const refDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (refDiv.current) {
      refDiv.current.style.height = document.documentElement.clientHeight + 'px';
    }
  }, []);
  return (
    <Wrapper ref={refDiv}>
      <main className="main">{props.children}</main>
      <Nav/>
    </Wrapper>
  );
}

export default Layout;