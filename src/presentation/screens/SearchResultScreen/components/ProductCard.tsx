import React from 'react';
import {View, Image, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {Card, Text} from 'react-native-paper';

interface ProductCardProps {
  imageUrl: string;
  title: string;
  source: string;
  sourceLogo?: string;
  containerHeight?: number;
  imageHeight?: number;
  containerTop?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  source,
  sourceLogo,
  containerHeight = 200,
  imageHeight = 200,
  containerStyle,
}) => {
  return (
    <Card
      style={[styles.card, {height: containerHeight}, containerStyle]}
      mode="contained">
      <Image source={imageUrl} style={[styles.image, {height: imageHeight}]} />
      <Card.Content style={styles.content}>
        <View style={styles.sourceRow}>
          <Text style={styles.source}>{source}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1e1e1e',
    flex: 1,
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    paddingTop: 8,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  logo: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  source: {
    fontSize: 12,
    color: '#aaa',
  },
  title: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ProductCard;
