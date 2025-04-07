import React from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import locale from 'src/adapters/localeAdapter';
import colors from 'src/theme/colors';

interface IProps {
  showSearchIcon?: boolean;
  containerStyle?: object;
  onPressChevron?: () => void;
  onPressSearch?: () => void;
  onPressMic: () => void;
  onPressCamera: () => void;
}

const SearchBar = (props: IProps) => {
  const {
    showSearchIcon = true,
    containerStyle,
    onPressChevron,
    onPressSearch,
    onPressCamera,
    onPressMic,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      {showSearchIcon ? (
        <MaterialCommunityIcons
          name="magnify"
          size={35}
          color={colors.icon_primary}
        />
      ) : (
        <MaterialCommunityIcons
          name="chevron-left"
          size={35}
          color={colors.icon_primary}
          onPress={onPressChevron}
        />
      )}
      <Pressable onPress={onPressSearch} style={styles.fullFlex}>
        <View pointerEvents="none">
          <TextInput
            placeholder={locale.SEARCH}
            placeholderTextColor={colors.icon_primary}
            style={styles.placeHolder}
          />
        </View>
      </Pressable>
      <MaterialCommunityIcons
        name="microphone"
        size={30}
        color={colors.icon_primary}
        style={styles.mr12}
        onPress={onPressMic}
      />
      <MaterialCommunityIcons
        name="camera-outline"
        size={30}
        color={colors.icon_primary}
        onPress={onPressCamera}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.defaultSecondary,
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 16,
  },
  fullFlex: {flex: 1},
  placeHolder: {marginLeft: 10, color: colors.white, fontSize: 24},
  mr12: {marginRight: 12},
});

export default SearchBar;
