import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'src/theme/colors';

interface InfoCardProps {
  title: string;
  value: string;
  iconName: string;
  iconBgColor?: string;
  containerStyle?: ViewStyle;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  iconName,
  iconBgColor = colors.yellowish,
  containerStyle = {},
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.value}>{value}</Text>
        <View style={[styles.iconCircle, {backgroundColor: iconBgColor}]}>
          <MaterialCommunityIcons
            name={iconName}
            size={20}
            color={colors.black}
          />
        </View>
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.defaultPrimary,
    borderRadius: 12,
    padding: 12,
    width: 170,
    height: 90,
    justifyContent: 'space-between',
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  title: {
    color: colors.lightGray,
    fontSize: 14,
    marginBottom: 6,
  },
  value: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCircle: {
    borderRadius: 50,
    padding: 6,
  },
});
