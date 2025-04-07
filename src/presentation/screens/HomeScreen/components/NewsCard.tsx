import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';
import colors from 'src/theme/colors';

interface NewsCardProps {
  imageUrl: any;
  title: string;
}

const NewsCard: React.FC<NewsCardProps> = ({imageUrl, title}) => {
  return (
    <Card mode="contained" style={styles.card}>
      <Card.Cover source={imageUrl} style={styles.image} />
      <Card.Content>
        <Text variant="bodyMedium" style={styles.title}>
          {title}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    overflow: 'hidden',
    backgroundColor: colors.defaultSecondary,
  },
  image: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    color: colors.white,
    marginTop: 8,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
});
