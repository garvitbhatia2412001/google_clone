import locale from 'src/adapters/localeAdapter';
import {Tabs} from '../types';

const shoppingImage = require('../../../assets/images/shopping.webp');

export const resultData = {
  [Tabs.ALL]: [
    {
      imageUrl: shoppingImage,
      title: locale.TRENDYOL_STRIPED_COTTON_TOP,
      source: locale.MYNTRA,
    },
    {
      imageUrl: shoppingImage,
      title: locale.ELEGANT_CASUAL_BLOUSE,
      source: locale.AMAZON,
    },
    {
      imageUrl: shoppingImage,
      title: locale.TRENDY_KNITWEAR,
      source: locale.H_AND_M,
    },
    {
      imageUrl: shoppingImage,
      title: locale.LAVENDER_LOUNGE_SET,
      source: locale.AJIO,
    },
  ],
  [Tabs.PRODUCTS]: [
    {
      imageUrl: shoppingImage,
      title: locale.CASUAL_COTTON_TEE,
      source: locale.FLIPKART,
    },
  ],
  [Tabs.VISUAL_MATCHES]: [
    {
      imageUrl: shoppingImage,
      title: locale.STRIPED_COTTON_TOP_LOOKALIKE,
      source: locale.AJIO,
    },
  ],
  [Tabs.ABOUT_THIS_IMAGE]: [
    {
      imageUrl: shoppingImage,
      title: locale.IMAGE_INFO_AND_COPYRIGHT,
      source: locale.GOOGLE,
    },
  ],
};
