import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {SCREEN_NAMES} from 'src/constants/screenNames';
import colors from 'src/theme/colors';
import {getBottomTabRoutesMapping} from 'src/utilities/authUtils';
import {IS_IOS, screenWidth} from 'src/utilities/displayUtils';
import {TAB_ROUTES} from './constants';

const Tab = createBottomTabNavigator();

interface TabBarIconType {
  selectedIcon: React.ReactElement;
  deselectedIcon: React.ReactElement;
  focused: boolean;
}

const BottomTabNavigation = () => {
  const routes = useMemo(() => getBottomTabRoutesMapping(), []);

  const _renderTabBarIcon = ({
    selectedIcon,
    deselectedIcon,
    focused,
  }: TabBarIconType) => (
    <View style={styles.tabBarIconContainer}>
      {focused ? selectedIcon : deselectedIcon}
    </View>
  );

  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAMES.HOME_SCREEN}
      screenOptions={{
        tabBarItemStyle: {width: screenWidth / routes.length},
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabStyle,
        headerShown: false,
      }}>
      {routes?.map(routeName => (
        <Tab.Screen
          key={routeName}
          name={routeName}
          component={TAB_ROUTES[routeName].component}
          options={{
            tabBarLabel: '',
            tabBarStyle: styles.tabBarStyle,
            tabBarIcon: ({focused}) =>
              _renderTabBarIcon({
                selectedIcon: TAB_ROUTES[routeName].selectedIcon(
                  colors.flaskBlue,
                ),
                deselectedIcon: TAB_ROUTES[routeName].deselectedIcon(
                  colors.lightGray,
                ),
                focused,
              }),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  tabStyle: {
    height: 80,
  },
  tabBarStyle: {
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 16,
    backgroundColor: colors.defaultSecondary,
    elevation: 2,
    height: IS_IOS ? 90 : 80,
    paddingBottom: 0,
    paddingTop: IS_IOS ? 0 : 8,
  },
  tabBarIconContainer: {
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
