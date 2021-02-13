import axios, { AxiosPromise, Method } from 'axios';

const baseURL = 'http://localhost:3000';
export interface Config {
  url: string;
  method?: Method;
  headers?: any;
  params?: any;
}

const defaultConfig = {
  url: '',
  method: 'GET'
};

export function request(config = defaultConfig as Config): AxiosPromise<any> {
  const install = axios.create({
    baseURL
  });
  install.interceptors.request.use(
    data => {
      return data;
    },
    err => err
  );
  install.interceptors.response.use(
    data => {
      return data;
    },
    err => {
      throw err;
    }
  );
  return install(config);
}
