import { environment as defaultEnvironment } from './environment.defaults';

export const environment = {
  ...defaultEnvironment,
  production: true,
  serverUrl: 'http://localhost:8080/catalogue/'
};
