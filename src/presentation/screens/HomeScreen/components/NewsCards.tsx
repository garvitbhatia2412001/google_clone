import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import NewsCard from './NewsCard';

interface NewsCardItem {
  id: string;
  title: string;
  imageUrl: string;
}

interface Props {
  data: NewsCardItem[];
}

const NewsCards: React.FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <NewsCard imageUrl={item.imageUrl} title={item.title} />
        )}
      />
    </View>
  );
};

export default NewsCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
