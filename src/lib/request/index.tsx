import fetchToCurl from 'fetch-to-curl';
import {Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../lib';
export const createFormDataFromObj = (obj: Object) => {
  let data = new FormData();
  for (let key in obj) {
    //@ts-ignore
    data.append(key, obj[key]);
  }
  return data;
};

export const createUrlSearchParamsFromObj = (obj: Object) => {
  let str = '';
  for (let key in obj) {
    if (str != '') {
      str += '&';
    }
    //@ts-ignore
    str += key + '=' + encodeURIComponent(obj[key]);
  }
  return str;
};

export const generateCommonHeaders = (store: any) => {
  const access_token = store?.auth?.access_token;
  const companyId = store?.company?.currentCompany?.id;
  const warehouseId = store?.company?.currentWarehouse?.id;
  const productGroup = store?.company?.currentProductGroup?.product_group;
  let headers: any = {};
  if (access_token) {
    headers['X-Auth-Token'] = `Bearer ${access_token}`;
  }
  if (companyId) {
    headers['X-Company-Id'] = companyId;
  }
  if (warehouseId) {
    headers['X-Stock-Id'] = warehouseId;
  }
  if (productGroup) {
    headers['X-Product-Group'] = productGroup;
  }
  // console.log('common headers is', headers);
  return headers;
};

type RequestOptions = {
  url: string;
  body?: any;
  method?: string;
  headers?: {[key: string]: string};
  responseType?: string;
  customUrl?: boolean;
  callback?: Function;
};

export const request = async (options: RequestOptions) => {
  // console.log('request options is', options);
  let {
    url,
    body = null,
    method = 'GET',
    headers,
    responseType = 'json',
    customUrl = false,
    callback,
  } = options;
  let commonHeaders = generateCommonHeaders(store.getState());
  if (headers) {
    commonHeaders = {
      ...commonHeaders,
      ...headers,
    };
  }
  const requestConfig = {
    method,
    body,
    headers: commonHeaders,
  };
  //@ts-ignore
  let host = store?.getState()?.auth?.host;
  if (!host) {
    //@ts-ignore
    host = store
      ?.getState()
      ?.auth?.servers?.find(
        server => server.keycloak_realm == store?.getState()?.auth?.serverRealm,
      )?.host;
  }
  const fullUrl = customUrl ? url : `https://${host}${url}`;
  // console.log('fullUrl', fullUrl);
  let response: any;
  try {
    response = await fetch(fullUrl, requestConfig);
  } catch (e) {
    // Alert.alert('')
    // console.log('catch here', e);
    if (typeof callback === 'function') {
      callback();
    } else {
      Alert.alert('error with fetch data');
    }
  }
  const result = {
    response,
    ok: response.ok,
    status: response.status,
    data: null,
    parsedError: null,
  };
  // console.log('response', response);

  if (response.ok) {
    try {
      if (responseType === 'json') {
        result.data = await response.json();
      }
      if (responseType === 'text') {
        result.data = await response.text();
      }
      if (responseType === 'blob') {
        result.data = await response.blob();
      }
    } catch (e) {
      // console.log(e);
    }
  } else {
    let errorBody = null;

    try {
      errorBody = await response.json();
      Alert.alert(
        `${errorBody?.error} ${
          errorBody.error_description ? errorBody.error_description : ''
        }`,
      );
    } catch (e) {
      // console.log('e', e);
      errorBody = await response.text();
    }
    // console.log('errorBody', errorBody);
    result.data = errorBody;
    // result.parsedError = parseServerError(response, errorBody);
    // errorTracker.captureRequestError(result);
  }
  return result;
};

/*
    func - функция из редьюсера.
*/
export const useData = (params: any) => {
  const {func, selector} = params;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(func ? true : false);
  const data = useSelector(selector);
  const dispatch = useDispatch();
  const [endReached, setEndReached] = useState(false);
  // const [data, setData] = useState(useSelector(selector));
  let timeout: any;
  let hookAction = (hookActionParams: any = {}) => {
    const {page, reset} = hookActionParams;
    if (reset) {
      setEndReached(false);
    }
    // console.log('hookAction endReached??', endReached);
    if (func && !endReached) {
      setLoading(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch(
          func({
            callback: (callbackParams: any = {}) => {
              setTimeout(() => {
                setLoading(false);
              }, 100);
              if (callbackParams?.endReached) {
                setEndReached(true);
              }
            },
            page,
          }),
        );
      }, 300);
      setTimeout(() => {
        // на всякий случай уберем загрузку бесконечную мало ли ..
        setLoading(false);
      }, 5000);
    }
    return;
  };
  useEffect(() => {
    // console.log('func = ', func);
    hookAction();
  }, [func, selector]);
  return [data, loading, hookAction, error];
};
