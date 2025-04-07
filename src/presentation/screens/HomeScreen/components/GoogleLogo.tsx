import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import locale from 'src/adapters/localeAdapter';
import colors from 'src/theme/colors';

const GoogleLogo = () => {
  return <Text style={styles.logoText}>{locale.GOOGLE}</Text>;
};

const styles = StyleSheet.create({
  logoText: {
    fontSize: 45,
    textAlign: 'center',
    color: colors.white,
    marginBottom: 40,
    fontFamily: '',
    fontWeight: '400',
  },
});

export default GoogleLogo;
