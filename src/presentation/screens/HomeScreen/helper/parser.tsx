import {HOME_ENUM} from '../types';
import colors from '../../../../theme/colors';
import locale from 'src/adapters/localeAdapter';
const ratanSir = require('../../../assets/images/ratanSir.jpeg');

export const HOME_DATA = [
  {
    key: HOME_ENUM.TOP_ELEMENT,
  },
  {
    key: HOME_ENUM.GOOGLE_LOGO,
  },
  {
    key: HOME_ENUM.SEARCH_BAR,
  },
  {
    key: HOME_ENUM.ICON_BUTTONS,
  },
  {
    key: HOME_ENUM.INFO_CARDS,
  },
  {
    key: HOME_ENUM.NEWS_CARDS,
  },
];

export const homeData = {
  icon_buttons: [
    {
      icon: 'image-search',
      backgroundColor: colors.yellowishBrown,
      iconColor: colors.yellow,
    },
    {
      icon: 'translate',
      backgroundColor: colors.darkNavy,
      iconColor: colors.lightBlue,
    },
    {
      icon: 'school-outline',
      backgroundColor: colors.greenish,
      iconColor: colors.lightGreen,
    },
    {
      icon: 'music-note',
      backgroundColor: colors.reddish,
      iconColor: colors.lightRed,
    },
  ],
  infoCardsData: [
    {
      id: '1',
      title: locale.GURUGRAM,
      value: '30°',
      iconName: 'weather-night',
      iconBgColor: colors.white,
    },
    {
      id: '2',
      title: `${locale.AIR_QUALITY} · 170`,
      value: locale.MODERATE,
      iconName: 'waves',
      iconBgColor: colors.yellowish,
    },
  ],
  newsData: [
    {
      id: '1',
      title: locale.RATAN_TATA_NEWS,
      imageUrl: ratanSir,
    },
    {
      id: '2',
      title: locale.RATAN_TATA_NEWS,
      imageUrl: ratanSir,
    },
    {
      id: '3',
      title: locale.RATAN_TATA_NEWS,
      imageUrl: ratanSir,
    },
  ],
};
