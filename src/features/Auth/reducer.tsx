// import {request} from '../rest';
// import {SET_CONNECTION_SETTINGS} from './actions';
import {Alert} from 'react-native';
import {Dispatch} from 'redux';
import {createUrlSearchParamsFromObj, client_secret, request} from '../../lib';
const initialState = {
  accessToken: null,
  servers: [],
  currentServer: null,
};
export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_SERVER':
      return {
        ...state,
        servers: state?.servers?.concat(action.server),
      };
    case 'DELETE_SERVER':
      return {
        ...state,
        servers: state?.servers?.filter(
          (s: any) => s?.keycloak_url !== action.server?.keycloak_url,
        ),
      };
    case 'SET_AUTH_INFO':
      return {
        ...state,
        ...action.info,
      };
    case 'SET_SERVERS':
      return {
        ...state,
        servers: [...action.servers],
      };
    default: {
      return state;
    }
  }
};

authReducer.createServer = (params: {
  href: string;
  callback?: (result: boolean) => void;
}) => async (dispatch: Dispatch<any>, getState: Function) => {
  const {href, callback = () => {}} = params;
  const url = `https://${href}/passport/config/`;
  const {servers} = getState()?.auth;
  const createServerResponse = await request({url, customUrl: true, callback});
  const res: any = createServerResponse?.data;
  // if (false) {
  //@ts-ignore
  if (servers?.find((el: any) => el?.keycloak_url == res?.keycloak_url)) {
    Alert.alert('Сервер уже был добавлен ранее');
    callback(false);
  } else {
    dispatch({
      type: 'ADD_SERVER',
      server: {...res, host: href},
    });
    callback(true);
  }
};

authReducer.deleteServer = (server: any) => (
  dispatch: Dispatch,
  getState: () => void,
) => {
  dispatch({
    type: 'DELETE_SERVER',
    server,
  });
};
export type TLoginParams = {
  loginValue: string;
  passwordValue: string;
  serverUrl: string;
  serverRealm: string;
  callback: () => void;
  navigateToMain: any;
};
authReducer.login = (params: TLoginParams) => async (
  dispatch: Dispatch,
  getState: () => any,
) => {
  const {
    loginValue,
    passwordValue,
    serverUrl,
    serverRealm,
    callback,
    navigateToMain,
  } = params;
  const loginUrl = `${serverUrl}realms/${serverRealm}/protocol/openid-connect/token`;
  const reqParams = {
    grant_type: 'password',
    client_id: 'mobile-client',
    username: loginValue,
    password: passwordValue,
    uri: loginUrl,
    client_secret,
  };
  let body = createUrlSearchParamsFromObj(reqParams);
  const loginResponse = await request({
    url: loginUrl,
    customUrl: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  const {data}: any = loginResponse;
  const serverList: Array<any> = getState()?.auth?.servers;
  const currentServerIndex: any = serverList?.findIndex(
    server => server?.keycloak_realm == serverRealm,
  );
  const serverWithData = {
    ...serverList[currentServerIndex],
    ...data,
  };
  serverList[currentServerIndex] = serverWithData;
  // console.log('loginUrl', loginUrl);
  // console.log('serverList: ', serverList);
  // console.log('currentServer: ', currentServerIndex);
  // console.log('serverWithData: ', serverWithData);

  callback();
  if (loginResponse.ok) {
    dispatch({
      type: 'SET_AUTH_INFO',
      info: {
        ...data,
        serverUrl,
        serverRealm,
        host: serverList[currentServerIndex]?.host,
      },
    });
    dispatch({
      type: 'SET_SERVERS',
      servers: [...serverList],
    });
    navigateToMain();
  } else {
    Alert.alert(data?.error, data?.error_description);
    return;
  }
};

authReducer.refresh = (
  refreshToken: string,
  navigateToLogin: () => void,
  callback: () => void,
  serverUrl?: string,
  serverRealm?: string,
  chosenServerCallbackSuccess?: () => void,
  host?: string,
) => async (dispatch: Dispatch, getState: () => any) => {
  let params = {
    grant_type: 'refresh_token',
    client_id: 'mobile-client',
    refresh_token: refreshToken,
    client_secret,
  };
  if (!serverRealm) {
    serverRealm = getState()?.auth?.serverRealm;
  }
  if (!serverUrl) {
    serverUrl = getState()?.auth?.serverUrl;
  }
  let paramsString = createUrlSearchParamsFromObj(params);
  const loginUrl = `${serverUrl}realms/${serverRealm}/protocol/openid-connect/token`;
  // console.log('authReducer.refresh', params);
  const refreshResponse = await request({
    url: loginUrl,
    customUrl: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: paramsString,
  });
  const {data}: any = refreshResponse;
  if (refreshResponse.ok) {
    dispatch({
      type: 'SET_AUTH_INFO',
      info: {
        ...data,
        serverRealm,
        serverUrl,
        host,
      },
    });
    if (typeof chosenServerCallbackSuccess === 'function')
      chosenServerCallbackSuccess();
  } else {
    Alert.alert('Ошибка авторизации. Пожалуйста, войдите с систему еще раз.');
    setTimeout(() => {
      navigateToLogin();
    }, 500);
  }
  callback();
};

authReducer.logout = (params: any) => async (
  dispatch: Dispatch,
  getState: () => any,
) => {
  const {callback} = params;
  //@ts-ignore
  let auth = getState().auth;
  const {refresh_token, serverUrl, serverRealm} = auth;
  let reqParams = {
    client_id: 'mobile-client',
    refresh_token,
    client_secret,
  };
  let paramsString = createUrlSearchParamsFromObj(reqParams);
  const logoutUrl = `${serverUrl}realms/${serverRealm}/protocol/openid-connect/logout`;
  await request({
    url: logoutUrl,
    customUrl: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: paramsString,
  });
  dispatch({
    type: 'SET_AUTH_INFO',
    info: {
      ...auth,
      accessToken: '',
      access_token: '',
      refresh_token: '',
    },
  });
  const serverList: Array<any> = getState()?.auth?.servers;
  const currentServerIndex: any = serverList?.findIndex(
    server => server?.keycloak_realm == serverRealm,
  );
  const serverWithData = {
    ...serverList[currentServerIndex],
    accessToken: '',
    access_token: '',
    refresh_token: '',
  };
  serverList[currentServerIndex] = serverWithData;
  dispatch({
    type: 'SET_SERVERS',
    servers: [...serverList],
  });
  callback();
};
