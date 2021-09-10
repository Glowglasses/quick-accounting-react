import Nav from './Nav';
import styled from 'styled-components';

type Props = {
  children: any
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`
const Main = styled.div`
  flex-grow: 1;
`
function Layout(props: Props) {
  return (
    <Wrapper>
      <Main>{props.children}</Main>
      <Nav/>
    </Wrapper>
  );
}

export default Layout;