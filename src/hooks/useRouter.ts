import { useContext } from 'react';
import { __RouterContext as RouterContext } from 'react-router';

export default () => {
  return useContext(RouterContext);
};
