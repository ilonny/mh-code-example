//@ts-nocheck
import {client_secret as client_secret_env, API_URL as API_URL_ENV} from '@env';
import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
export const client_secret = client_secret_env;
export const API_URL = API_URL_ENV;
export const OS = Platform.OS;
export const currentHeight = Dimensions.get('screen').height;
export const currentWidth = Dimensions.get('screen').width;
export const StatusBarHeight = getStatusBarHeight();

export const urlPath = {
  cmList: '/cm/company/company?page=1&page_size=50',
  warehouseList: '/cm/stock/by_company/',
  productGroupList: '/cm/company/pg/',
  lastDocuments: '/bp/document/document/?page_size=30&is_process=true',
};
