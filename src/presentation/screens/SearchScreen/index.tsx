import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from 'src/theme/colors';
import locales from 'src/locales/en';
import useSearchLogic from './hooks';
import SearchBar from './components/SearchBar';

const SearchScreen = () => {
  const {state, callback} = useSearchLogic();
  const {recentSearches, searchValue} = state;
  const {
    onPressChevron,
    onPressMic,
    onPressCamera,
    setSearchValue,
    onPressDone,
  } = callback;
  return (
    <View style={styles.container}>
      <SearchBar
        showSearchIcon={false}
        containerStyle={styles.containerStyle}
        onPressMic={onPressMic}
        onPressCamera={onPressCamera}
        onPressChevron={onPressChevron}
        searchValue={searchValue}
        setSearchText={setSearchValue}
        onPressDone={onPressDone}
      />

      <View style={styles.header}>
        <Text style={styles.headerText}>{locales.RECENT_SEARCHES}</Text>
      </View>

      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({item}) => (
          <View style={styles.searchItem}>
            <Icon name="history" size={20} color={colors.gray} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: colors.defaultSecondary,
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 0,
    marginBottom: 16,
    marginTop: 16,
  },
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: colors.lightGrayText,
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerText: {
    color: '#ccc',
    fontSize: 16,
  },
  manageText: {
    color: '#2196F3',
    fontSize: 13,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: colors.darkGray,
    borderBottomWidth: 1,
  },
  itemText: {
    color: '#eee',
    marginLeft: 12,
    fontSize: 15,
  },
});
