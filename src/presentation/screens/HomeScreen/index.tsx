import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SafeAreaViewCustom from 'src/presentation/components/atoms/SafeAreaViewCustom';
import colors from 'src/theme/colors';
import useHomeLogic from './hooks';
import {HOME_ENUM} from './types';
import TopElement from './components/TopElement';
import GoogleLogo from './components/GoogleLogo';
import SearchBar from './components/SearchBar';
import IconButtonRow from './components/IconButtonRow';
import InfoCardCarousel from './components/InfoCardCarousel';
import NewsCards from './components/NewsCards';
import {ActivityIndicator} from 'react-native-paper';

const HomeScreen = () => {
  const {state, callback} = useHomeLogic();
  const {isLoading, data, iconBtnData, infoCardsData, newsData} = state;
  const {onPressSearch, onPressMic, onPressCamera} = callback;

  const _renderItem = ({item}: {item: {key: HOME_ENUM}}) => {
    switch (item.key) {
      case HOME_ENUM.TOP_ELEMENT:
        return <TopElement />;
      case HOME_ENUM.GOOGLE_LOGO:
        return <GoogleLogo />;
      case HOME_ENUM.SEARCH_BAR:
        return (
          <SearchBar
            onPressSearch={onPressSearch}
            onPressMic={onPressMic}
            onPressCamera={onPressCamera}
          />
        );
      case HOME_ENUM.ICON_BUTTONS:
        return <IconButtonRow data={iconBtnData} />;
      case HOME_ENUM.INFO_CARDS:
        return <InfoCardCarousel data={infoCardsData} />;
      case HOME_ENUM.NEWS_CARDS:
        return <NewsCards data={newsData} />;
      default:
        return null;
    }
  };

  const _keyExtractor = (item: {key: HOME_ENUM}) => item.key.toString();

  if (isLoading) {
    return (
      <View style={styles.fullFlex}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaViewCustom>
      <View style={styles.fullFlex}>
        <FlatList
          data={data}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
          showsVerticalScrollIndicator={false}
          bounces
          stickyHeaderIndices={[2]}
        />
      </View>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
    backgroundColor: colors.defaultPrimary,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});

export default HomeScreen;
