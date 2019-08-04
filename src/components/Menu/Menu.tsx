import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primary, background, secondaryBackground } from '../../utils/colors';
import Profile from './Profile';
import { secondFont, primFont } from '../../utils/fonts';
import Icon from '../../elements/Icon';

const StyledNavigation = styled.nav`
  position: fixed;
  z-index: 5;
  top: 0;
  height: 100%;
  width: 400px;
  background-color: ${primary};
`;

const LinkList = styled.ul`
  margin-top: 50px;
  padding: 0;
  margin-left: 50px;
  li,
  a {
    color: ${secondaryBackground};
  }
  li {
    margin-bottom: 20px;
    opacity: 0.6;
    font-family: ${secondFont};
    font-size: 16px;
    font-weight: 400;
    :hover {
      opacity: 1;
    }
    ::after {
      content: '';
      left: 0;
      margin-top: 42px;
      margin-left: 30px;
      width: calc(100% - 60px);
      height: 1px;
      position: absolute;
      opacity: 0.3;
      background-color: ${secondaryBackground};
    }
  }
`;

const Menu = (props: any) => {
  const { pathname } = props.location;
  const itemIconProps = {
    size: 30,
    style: {
      position: 'relative',
      top: '0.25em'
    },
    color: background
  };
  return (
    <>
      <StyledNavigation>
        <Profile />
        <LinkList>
          <li>
            <Icon name='profile' {...itemIconProps} /> profile
          </li>
          <li>
            <Icon name='profile' {...itemIconProps} /> stats
          </li>
          <li>
            <Icon name='profile' {...itemIconProps} />
            {pathname === '/config' ? (
              <Link to='/'>back to app</Link>
            ) : (
              <Link to='/config'>config</Link>
            )}
          </li>
          <li>
            <Icon name='profile' {...itemIconProps} /> logout
          </li>
        </LinkList>
      </StyledNavigation>
    </>
  );
};

export default Menu;
