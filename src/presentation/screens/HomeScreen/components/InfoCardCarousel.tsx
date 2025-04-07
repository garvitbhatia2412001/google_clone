import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import InfoCard from './InfoCard';

interface InfoCardItem {
  id: string;
  title: string;
  value: string;
  iconName: string;
  iconBgColor: string;
}

interface Props {
  data: InfoCardItem[];
}

const InfoCardCarousel: React.FC<Props> = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({item}) => (
        <View style={styles.cardSpacing}>
          <InfoCard
            title={item.title}
            value={item.value}
            iconName={item.iconName}
            iconBgColor={item.iconBgColor}
          />
        </View>
      )}
    />
  );
};

export default InfoCardCarousel;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  cardSpacing: {
    marginRight: 10,
  },
});
