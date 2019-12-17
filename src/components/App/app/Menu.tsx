import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTransition } from 'react-spring';
import { createStructuredSelector } from 'reselect';
import { ReduxState } from '../../../duck/store';
import { signOutStart } from '../../../duck/users/userActions';
import { selectCurrentUser } from '../../../duck/users/userSelectors';
import useRouter from '../../../hooks/useRouter';
import { background } from '../../../utils/colors';
import Icon from '../../Icon/Icon';
import { LinkList, StyledNavigation } from './Menu.styles';
import MenuLink from './menu/MenuLink';
import ProfileInfo from './menu/ProfileInfo';
import { selectIsMenuVisible } from '../../../duck/menu/menuSelectors';

interface Selectors {
  isMenuVisible: boolean;
  user: any;
}

const menuSelectors = createStructuredSelector<ReduxState, Selectors>({
  user: selectCurrentUser,
  isMenuVisible: selectIsMenuVisible
});

const Menu: FC = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { user, isMenuVisible } = useSelector(menuSelectors);

  useEffect(() => {
    if (!user) {
      router.history.push('/login');
    }
  }, [user]);

  const itemIconProps = {
    size: 30,
    style: {
      marginRight: '10px',
      position: 'relative',
      top: '0.25em'
    },
    color: background
  };

  const transitions = useTransition(isMenuVisible, null, {
    from: {
      transform: 'translateX(-500px)'
    },
    enter: {
      transform: 'translateX(0)'
    },
    leave: { transform: 'translateX(-500px)' }
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <StyledNavigation key={key} style={props}>
              <ProfileInfo user={user} />
              <LinkList>
                <li>
                  <MenuLink path='/account' iconName='profile'>
                    account
                  </MenuLink>
                </li>
                <li>
                  <MenuLink path='/stats' iconName='stats2'>
                    stats
                  </MenuLink>
                </li>
                <li>
                  <MenuLink path='/config' iconName='config'>
                    config
                  </MenuLink>
                </li>
                {user ? (
                  <li onClick={() => dispatch(signOutStart())}>
                    <Icon name='logout' {...itemIconProps} />
                    logout
                  </li>
                ) : (
                  <li>
                    <Icon name='profile' {...itemIconProps} />
                    <Link to='/login'>login</Link>
                  </li>
                )}
              </LinkList>
            </StyledNavigation>
          )
      )}
    </>
  );
};

export default Menu;
