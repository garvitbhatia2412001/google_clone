import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ProductCard from './components/ProductCard';
import SearchHeaderWithTabs from './components/SearchHeaderWithTabs';
import useSearchResultLogic from './hooks';
import colors from 'src/theme/colors';

interface IProps {
  route: any;
}

const SearchResultScreen = (props: IProps) => {
  const {searchText} = props.route.params;
  const {state, callback} = useSearchResultLogic(searchText);
  const {data, selectedTab, searchValue} = state;
  const {setSearchValue, setSelectedTab, goBack} = callback;

  const _renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: {imageUrl: any; title: string; source: string};
      index: number;
    }) => {
      const isEvenIndex = index % 2 === 0;
      return (
        <ProductCard
          imageUrl={item.imageUrl}
          title={item.title}
          source={item.source}
          containerStyle={isEvenIndex && styles.mr8}
          containerHeight={isEvenIndex ? 300 : 330}
          imageHeight={isEvenIndex ? 220 : 250}
        />
      );
    },
    [],
  );

  return (
    <View style={styles.container}>
      <SearchHeaderWithTabs
        selectedTab={selectedTab}
        onTabPress={setSelectedTab}
        searchValue={searchValue}
        onChangeSearch={setSearchValue}
        goBack={goBack}
        searchText={searchText}
      />
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => `${selectedTab}-${index}`}
        renderItem={_renderItem}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mr8: {
    marginRight: 12,
  },
});

export default SearchResultScreen;
