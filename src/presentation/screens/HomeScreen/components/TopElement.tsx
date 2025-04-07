import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'src/theme/colors';
import {Text} from 'react-native-paper';
import locale from 'src/adapters/localeAdapter';

const TopElement = () => {
  return (
    <View style={styles.container}>
      <Icon name="flask-outline" size={35} color={colors.flaskBlue} />
      <View style={styles.nameContainer}>
        <Text style={styles.text}>{locale.G}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  nameContainer: {
    backgroundColor: colors.green,
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: colors.white, fontWeight: '400', fontSize: 24},
});

export default TopElement;
