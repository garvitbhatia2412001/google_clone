import { useCallback } from "react";
import {
  useNavigation,
  useFocusEffect,
  NavigationProp,
  StackActions,
  DrawerActions
} from "@react-navigation/native";

export const useAppNavigation = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  // Navigate to a different screen
  const navigate = useCallback(
    (screenName: string, params?: object) => {
      navigation.navigate(screenName as any, params as any);
    },
    [navigation]
  );

  // Go back to the previous screen
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Replace the current screen with a new one
  const replace = useCallback(
    (screenName: string, params?: object) => {
      navigation.dispatch(
        StackActions.replace(screenName as never, params as never)
      );
    },
    [navigation]
  );

  // Reset the navigation stack to a new state
  const reset = useCallback(
    (routes: Array<{ name: string; params?: object }>, index = 0) => {
      navigation.reset({
        index,
        routes: routes.map(route => ({
          name: route.name as never,
          params: route.params
        }))
      });
    },
    [navigation]
  );

  // Push a new screen onto the stack
  const push = useCallback(
    (screenName: string, params?: object) => {
      navigation.dispatch(
        StackActions.push(screenName as never, params as never)
      );
    },
    [navigation]
  );

  // Pop the current screen off the stack
  const pop = useCallback(
    (count = 1) => {
      navigation.dispatch(StackActions.pop(count));
    },
    [navigation]
  );

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const closeDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }, [navigation]);

  const toggleDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }, [navigation]);

  // Pop to the top screen of the stack
  const popToTop = useCallback(() => {
    navigation.dispatch(StackActions.popToTop());
  }, [navigation]);

  // Run a function when the screen is focused
  const onFocus = (
    callback: () => void,
    deps: any = [],
    cleanup?: () => void
  ) => {
    useFocusEffect(
      useCallback(() => {
        callback();

        return () => {
          if (cleanup) {
            cleanup();
          }
        };
      }, deps)
    );
  };

  // Set params for the current screen
  const setParams = useCallback(
    (params: object) => {
      navigation.setParams(params);
    },
    [navigation]
  );

  // Get the current route's params
  const getParams = useCallback(() => {
    return navigation.getState().routes[navigation.getState().index].params;
  }, [navigation]);

  const getState = useCallback(() => {
    return navigation.getState();
  }, [navigation]);

  return {
    navigate,
    goBack,
    replace,
    reset,
    push,
    pop,
    popToTop,
    onFocus,
    setParams,
    getParams,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    getState
  };
};
