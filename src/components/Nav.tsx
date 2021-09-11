import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Icon from './Icon';

const NavWrapper = styled.nav`
  line-height: 24px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);

  > ul {
    display: flex;
    > li {
      width: 33.3333333%;
      text-align: center;
      > a {
        display: flex;
        padding: 5px 0;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        user-select: none;
      }
    }
    .icon {
      width: 24px;
      height: 24px;
    }
  }
`;

function Nav() {
  return (
    <NavWrapper>
      <ul>
        <li>
          <Link to="/statistics">
            <Icon name="statistics"/>
            明细
          </Link>
        </li>
        <li>
          <Link to="/money">
            <Icon name="money"/>
            记账
          </Link>
        </li>
        <li>
          <Link to="/chart">
            <Icon name="chart"/>
            图表
          </Link>
        </li>
      </ul>
    </NavWrapper>
  );
}

export default Nav;