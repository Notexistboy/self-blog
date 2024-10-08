import { StatusCodes } from 'http-status-codes';
import { G, requestCreator } from '@siyuan0215/easier-axios-dsl';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const TIMEOUT = {
  DEFAULT: 3 * 60000,
  UPLOADING: 5 * 60000,
};
export const request = requestCreator({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: TIMEOUT.DEFAULT,
  withCredentials: true,
  requestInterceptors: [
    // eslint-disable-next-line
    (config: AxiosRequestConfig) => {
      return {
        ...config,
        timeout: TIMEOUT.UPLOADING,
        headers: {
          ...(config.headers as Record<string, string>),
          authorization: '1',
        },
      };
    },
    (error: typeof Error) => Promise.reject(error),
  ],
  responseInterceptors: [
    // eslint-disable-next-line
    (response: AxiosResponse) => {
      const { status } = response;

      if (status === StatusCodes.OK) {
        return response;
      }
      return Promise.reject(response);
    },
    (error: string) => {
      return Promise.reject(error);
    },
  ],
});

export const generatorAPIS = <T extends Record<string, string>>(apiConfig: T) => G<T>(request, apiConfig);
