import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import StackNavigation from './StackNavigation';
import {SCREEN_NAMES} from 'src/constants/screenNames';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const screenOptions = {headerShown: false, gestureEnabled: false};

const AppNavigation = React.memo(() => {
  const screens = useMemo(
    () => (
      <Stack.Screen
        name={SCREEN_NAMES.APP}
        component={StackNavigation}
        options={screenOptions}
      />
    ),
    [],
  );

  return (
    <SafeAreaProvider>
      <Stack.Navigator>{screens}</Stack.Navigator>
    </SafeAreaProvider>
  );
});

export default AppNavigation;
