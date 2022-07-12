import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_URL } from 'env';
import { stringify } from 'query-string';
import { store } from 'reducers';
import { ProfileState, signOut } from 'reducers/profile';
import { openNotification } from 'reducers/notification';
import { camelizeKeys } from 'humps';

const beforeRequest = (config: AxiosRequestConfig) => {
  const { isLoggedIn, token }: ProfileState = store.getState().profile;
  if (isLoggedIn) {
    Object.assign(config.headers as any, { Authorization: `Bearer ${token}` });
  }

  if (config.data instanceof FormData) {
    Object.assign(config.headers as any, { 'Content-Type': 'multipart/form-data' });
  }
  return config;
};

const onError = async (error: AxiosError) => {
  const { response } = error;
  if (response) {
    const { status, data } = response as any;
    if (status === 401) {
      store.dispatch(signOut());
    } else {
      const { message } = data;
      store.dispatch(openNotification({ message, variant: 'error' }));
      return Promise.reject(message);
    }
  }
  return Promise.reject(error);
};
const client = axios.create({ baseURL: API_URL });
client.defaults.paramsSerializer = (params) =>
  stringify(
    Object.keys(params)
      .filter((key) => String(params[key]).trim())
      .reduce((trim, key) => ({ ...trim, [key]: params[key] }), {}),
  );

client.interceptors.request.use(beforeRequest);
client.interceptors.response.use(({ data }) => data, onError);

client.defaults.transformResponse = [...(axios.defaults.transformResponse as []), (data) => camelizeKeys(data)];

export { client };
