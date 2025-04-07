import {ROUTES, TAB_ROUTES} from 'src/navigation/constants';

export const getRoutesMap = () =>
  Object.keys(ROUTES).map(routeName => routeName);

export const getBottomTabRoutesMapping = () =>
  Object.keys(TAB_ROUTES).map(routeName => routeName);
