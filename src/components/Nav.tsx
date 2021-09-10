import styled from 'styled-components';
import {Link} from 'react-router-dom';

const NavWrapper = styled.nav`
  line-height: 24px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);

  > ul {
    display: flex;

    > li {
      width: 33.3333333%;
      text-align: center;
      padding: 20px 0;
    }
  }
`;

function Nav() {
  return (
    <NavWrapper>
      <ul>
        <li>
          <Link to="/statistics">明细</Link>
        </li>
        <li>
          <Link to="/money">记账</Link>
        </li>
        <li>
          <Link to="/chart">图表</Link>
        </li>
      </ul>
    </NavWrapper>
  );
}

export default Nav;