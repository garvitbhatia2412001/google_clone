import React from 'react';
import {StatusBar, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import colors from 'src/theme/colors';

interface Props {
  style?: StyleProp<ViewStyle>;
  statusBarBackgroundColor?: string;
  backgroundColor?: string;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  children: React.ReactNode[] | React.ReactNode;
}

const SafeAreaViewCustom: React.FC<Props> = ({
  style,
  statusBarBackgroundColor,
  statusBarStyle = 'light-content',
  backgroundColor,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor || colors.defaultPrimary}
      />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
          style,
          {
            backgroundColor: backgroundColor || colors.defaultPrimary,
          },
        ]}>
        {children}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultPrimary, // Use centralized color
  },
});

export default SafeAreaViewCustom;
