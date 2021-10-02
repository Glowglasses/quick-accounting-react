import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
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
        &.selected{
          color: red;
          > .icon{
            fill: red;
          }
        }
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
          <NavLink to="/statistics" activeClassName="selected">
            <Icon name="statistics"/>
            明细
          </NavLink>
        </li>
        <li>
          <NavLink to="/money" activeClassName="selected">
            <Icon name="money"/>
            记账
          </NavLink>
        </li>
        <li>
          <NavLink to="/chart" activeClassName="selected">
            <Icon name="chart"/>
            图表
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  );
}

export default Nav;