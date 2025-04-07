import Config from '../config';

enum Service {
  'SERVICE' = 'SERVICE',
}

const SERVICES = {
  SERVICE: Service.SERVICE,
};

const ENVIRONMENTS_BASE_URL_AND_HEADERS = {
  [SERVICES.SERVICE]: {
    baseUrl: Config.baseUrl.service,
    defaultHeaders: {},
  },
};

export {ENVIRONMENTS_BASE_URL_AND_HEADERS, Service, SERVICES};
