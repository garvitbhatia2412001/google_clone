import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Separator} from 'src/presentation/components/atoms/Separator';
import colors from 'src/theme/colors';

interface IProps {
  data: {
    icon: string;
    iconColor: string;
    backgroundColor: string;
  }[];
}

const IconButtonRow = (props: IProps) => {
  const {data} = props;
  return (
    <>
      <View style={styles.container}>
        {data.map((btn, index) => (
          <Pressable
            key={index}
            style={[styles.button, {backgroundColor: btn.backgroundColor}]}>
            <MaterialCommunityIcons
              name={btn.icon}
              size={24}
              color={btn.iconColor}
            />
          </Pressable>
        ))}
      </View>
      <Separator height={1} color={colors.defaultSecondary} />
    </>
  );
};

export default IconButtonRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
