import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {
  ENVIRONMENTS_BASE_URL_AND_HEADERS,
  Service,
} from 'src/constants/apiServices';
import {ERROR_MESSAGES} from 'src/constants/messages';
export interface ResponseBody<T> {
  status: number;
  data: T;
  success: boolean;
  errorMessage?: string | undefined;
}

export default class ApiAdapter {
  private api: AxiosInstance;
  private ignoreTokenHeader: boolean = false;
  constructor() {
    this.api = axios.create();
    this.applyRequestInterceptor(this.api);
    this.applyResponseInterceptor(this.api);
  }

  protected getStatusCode(resp: AxiosResponse | AxiosError): number {
    let resultResp: AxiosResponse<any>;

    const failureResp = resp as AxiosError;

    if (failureResp?.status) {
      return failureResp?.status;
    } else if (failureResp?.request?.status) {
      return failureResp.request.status;
    } else {
      resultResp = resp as AxiosResponse;
      return resultResp?.status;
    }
  }

  protected handleResponse(resp: AxiosResponse) {
    const result = {
      data: resp?.data,
      status: resp?.status,
      success: true,
    };
    return result;
  }

  protected handleFailure(errResp: any) {
    const status = this.getStatusCode(errResp);
    const errorMessage =
      errResp?.data?.displayTitle ||
      errResp?.data?.message ||
      ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    return {
      data: null,
      status,
      success: false,
      errorMessage,
    };
  }

  // Helper function to generate cURL
  protected generateCurl(config: any): string {
    try {
      const method = config.method.toUpperCase();
      let url = config.url;

      // Add query parameters if available
      if (config.params) {
        const params = new URLSearchParams(config.params).toString();
        if (params) {
          url += `?${params}`;
        }
      }

      let curl = `curl -X ${method} '${url}'`;

      // Add headers
      if (config.headers) {
        Object.keys(config.headers).forEach(headerKey => {
          if (config.headers[headerKey]) {
            curl += ` -H '${headerKey}: ${config.headers[headerKey]}'`;
          }
        });
      }

      // Add data for POST/PUT requests
      if (config.data) {
        const dataString = JSON.stringify(config.data);
        curl += ` --data '${dataString}'`;
      }

      return curl;
    } catch (error) {
      return '';
    }
  }

  private async logoutUser(): Promise<void> {}

  private applyRequestInterceptor(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.request.use(async reqConfig => {
      return reqConfig;
    });
  }

  private applyResponseInterceptor(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.response.use(
      response => response,
      async (err: AxiosError) => {
        const error = err.response;
        if (error?.status === 401) {
          try {
            await this.logoutUser();
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  private async returnDefaultsByService({
    type,
    url,
    headers,
    params = {},
  }: {
    type: Service;
    url: string;
    headers: object;
    params?: object;
  }): Promise<{
    headersCombined: object;
    url: string;
    params: object;
  }> {
    const {defaultHeaders, baseUrl} = ENVIRONMENTS_BASE_URL_AND_HEADERS[type];

    let fullUrl = '';
    if (baseUrl) {
      fullUrl = (baseUrl + url).replace(/([^:]\/)\/+/g, '$1');
    }

    return {
      headersCombined: {
        headers: {
          ...defaultHeaders,
          ...headers,
        },
      },
      params: {...params},
      url: fullUrl,
    };
  }

  public async getRequest(
    service: Service,
    endpoint: string,
    queryParameters: object = {},
    headers: object = {},
    ignoreTokenHeader: boolean = false,
  ): Promise<any> {
    const {headersCombined, url, params} = await this.returnDefaultsByService({
      type: service,
      url: endpoint,
      headers,
      params: queryParameters,
    });

    this.ignoreTokenHeader = ignoreTokenHeader;

    try {
      const resp = await this.api.get(url, {...headersCombined, params});
      return this.handleResponse(resp);
    } catch (err) {
      return this.handleFailure(err);
    }
  }

  public async postRequest(
    service: Service,
    endpoint: string,
    payload?: object,
    headers: object = {},
    config: AxiosRequestConfig | null = null,
    ignoreTokenHeader: boolean = false,
  ): Promise<any> {
    const {headersCombined, url} = await this.returnDefaultsByService({
      type: service,
      url: endpoint,
      headers,
    });

    let requestConfig = {...headersCombined};
    if (config) {
      requestConfig = {...requestConfig, ...config};
    }

    this.ignoreTokenHeader = ignoreTokenHeader;

    try {
      const resp = await this.api.post(url, payload, requestConfig);
      return this.handleResponse(resp);
    } catch (err) {
      return this.handleFailure(err);
    }
  }

  public async putRequest(
    service: Service,
    endpoint: string,
    payload: object,
    headers: object = {},
    ignoreTokenHeader: boolean = false,
  ): Promise<any> {
    const {headersCombined, url} = await this.returnDefaultsByService({
      type: service,
      url: endpoint,
      headers,
    });

    this.ignoreTokenHeader = ignoreTokenHeader;

    try {
      const resp = await this.api.put(url, payload, headersCombined);
      return this.handleResponse(resp);
    } catch (err) {
      return this.handleFailure(err);
    }
  }

  public async deleteRequest(
    service: Service,
    endpoint: string,
    headers: object = {},
    ignoreTokenHeader: boolean = false,
  ): Promise<any> {
    const {headersCombined, url} = await this.returnDefaultsByService({
      type: service,
      url: endpoint,
      headers,
    });

    this.ignoreTokenHeader = ignoreTokenHeader;

    try {
      const resp = await this.api.delete(url, headersCombined);
      return this.handleResponse(resp);
    } catch (err) {
      return this.handleFailure(err);
    }
  }

  public async patchRequest(
    service: Service,
    endpoint: string,
    payload: object,
    headers: object = {},
    ignoreTokenHeader: boolean = false,
  ): Promise<any> {
    const {headersCombined, url} = await this.returnDefaultsByService({
      type: service,
      url: endpoint,
      headers,
    });

    this.ignoreTokenHeader = ignoreTokenHeader;

    try {
      const resp = await this.api.patch(url, payload, headersCombined);
      return this.handleResponse(resp);
    } catch (err) {
      return this.handleFailure(err);
    }
  }
}
