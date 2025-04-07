import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import locale from 'src/adapters/localeAdapter';
import colors from 'src/theme/colors';
import {Tabs} from '../types';

const TABS = [
  Tabs.ALL,
  Tabs.PRODUCTS,
  Tabs.VISUAL_MATCHES,
  Tabs.ABOUT_THIS_IMAGE,
];

interface SearchHeaderWithTabsProps {
  searchText: string;
  selectedTab: string;
  onTabPress: (tab: string) => void;
  searchValue: string;
  onChangeSearch: (text: string) => void;
  goBack: () => void;
}

const SearchHeaderWithTabs: React.FC<SearchHeaderWithTabsProps> = ({
  searchText,
  selectedTab,
  onTabPress,
  searchValue,
  onChangeSearch,
  goBack,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={35}
          color={colors.icon_primary}
          onPress={goBack}
        />
        <Image
          source={{
            uri: 'https://i.imgur.com/WCzJDWz.png',
          }}
          style={styles.imagePreview}
        />
        <View pointerEvents="none" style={styles.input}>
          <TextInput
            placeholder={searchText}
            placeholderTextColor="#aaa"
            value={searchValue}
            onChangeText={onChangeSearch}
          />
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{locale.G}</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}>
        {TABS.map(tab => (
          <Pressable
            key={tab}
            onPress={() => onTabPress(tab)}
            style={styles.tab}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.tabTextSelected,
              ]}>
              {tab}
            </Text>
            {selectedTab === tab && <View style={styles.tabUnderline} />}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    marginVertical: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.searchCon,
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  googleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  imagePreview: {
    width: 28,
    height: 28,
    borderRadius: 6,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatarText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  tabContainer: {
    marginVertical: 12,
  },
  tab: {
    marginRight: 20,
    alignItems: 'center',
  },
  tabText: {
    color: '#aaa',
    fontSize: 14,
  },
  tabTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
  tabUnderline: {
    height: 2,
    backgroundColor: colors.white,
    marginTop: 4,
    width: '100%',
  },
});

export default SearchHeaderWithTabs;
