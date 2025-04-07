const BASE_URL = {
  baseUrl: {
    service: '',
  },
};

const config = {
  baseUrl: {
    service: BASE_URL.baseUrl.service,
  },
  endpoints: {
    auth: '/auth',
    home: '/home',
    imageToText: '/imageToText',
    searchResults: '/searchResults',
  },
  asyncStorageKeys: {
    USER_KEY: 'user_key',
  },
};

export default config;
