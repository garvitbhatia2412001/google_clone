import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { getRoutesMap } from "src/utilities/authUtils";
import { ROUTES } from "./constants";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {

  const routes = useMemo(() => {
    return getRoutesMap();
  }, []);  

  return (
    <Stack.Navigator>
      {routes?.map(routeName => (
        <Stack.Screen
          key={routeName}
          name={routeName}
          component={ROUTES[routeName].component}
          options={ROUTES[routeName].options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigation;
