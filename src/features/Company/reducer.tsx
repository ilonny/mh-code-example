// import {request} from '../rest';
// import {SET_CONNECTION_SETTINGS} from './actions';
import {Alert} from 'react-native';
import {Dispatch} from 'redux';
import {generateCommonHeaders, request, urlPath, API_URL} from '../../lib';
const initialState = {
  list: [],
  currentCompany: null,
  currentWarehouse: null,
  lastDocuments: [],
  warehouseList: [],
  currentProductGroup: null,
  productGroupList: [],
};
export const companyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_COMPANY_LIST':
      return {
        ...state,
        list: action?.list,
      };
    case 'SET_CURRENT_COMPANY':
      return {
        ...state,
        currentCompany: action?.company,
      };
    case 'SET_LAST_DOCUMENTS':
      return {
        ...state,
        lastDocuments: action?.lastDocuments,
      };
    case 'SET_WAREHOUSE_LIST':
      return {
        ...state,
        warehouseList: action?.warehouseList,
      };
    case 'SET_CURRENT_WAREHOUSE':
      return {
        ...state,
        currentWarehouse: action?.currentWarehouse,
      };
    case 'SET_PRODUCTGROUP_LIST':
      return {
        ...state,
        productGroupList: action?.productGroupList,
      };
    case 'SET_CURRENT_PRODUCTGROUP':
      return {
        ...state,
        currentProductGroup: action?.currentProductGroup,
      };
    case 'SET_SERVERS': {
      return {
        ...initialState,
      };
    }
    case 'SET_AUTH_INFO': {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};

companyReducer.getCompanyList = (params: any) => async (
  dispatch: Dispatch,
  getState: () => void,
) => {
  const {callback} = params;
  const response = await request({
    url: urlPath.cmList,
  });
  if (response.ok) {
    dispatch({
      type: 'SET_COMPANY_LIST',
      //@ts-ignore
      list: response?.data?.results,
    });
  }
  typeof callback === 'function' && callback();
};

companyReducer.setCurrentCompany = (company: any) => async (
  dispatch: Dispatch,
  getState: () => void,
) => {
  dispatch({type: 'SET_CURRENT_COMPANY', company});
  //get warehouseList
  const wareHouseListResponse = await request({
    url: urlPath.warehouseList,
  });
  // console.log('wareHouseListResponse', wareHouseListResponse);
  if (wareHouseListResponse.ok) {
    dispatch({
      type: 'SET_WAREHOUSE_LIST',
      //@ts-ignore
      warehouseList: wareHouseListResponse?.data,
    });
  }
  //get pgList
  const productGroupListResponse = await request({
    url: urlPath.productGroupList,
  });
  if (productGroupListResponse.ok) {
    dispatch({
      type: 'SET_PRODUCTGROUP_LIST',
      //@ts-ignore
      productGroupList: productGroupListResponse?.data?.results,
    });
  }
};

companyReducer.setCurrentWarehouse = (warehouse: any) => (
  dispatch: Dispatch,
) => {
  dispatch({type: 'SET_CURRENT_WAREHOUSE', currentWarehouse: warehouse});
};

companyReducer.setCurrentProductGroup = (productGroup: any) => (
  dispatch: Dispatch,
) => {
  dispatch({
    type: 'SET_CURRENT_PRODUCTGROUP',
    currentProductGroup: productGroup,
  });
};

companyReducer.getLastDocuments = (params: any) => async (
  dispatch: Dispatch,
  getState: () => void,
) => {
  const {callback, page} = params;
  const store = getState();
  let url = urlPath.lastDocuments;
  //@ts-ignore
  let currentPageSidebar = store?.sideModal?.currentPage;
  url = `${currentPageSidebar?.lastDocumentsUrl}` || url;
  let loadedDocs = [];
  if (page && page != 1) {
    url = url + `&offset=${(page - 1) * 30}`;
    //@ts-ignore
    loadedDocs = store?.company?.lastDocuments || [];
  }
  // console.log('url==', url);
  const lastDocumentsResponse = await request({url});
  dispatch({
    type: 'SET_LAST_DOCUMENTS',
    //@ts-ignore
    lastDocuments:
      //@ts-ignore
      loadedDocs.concat(lastDocumentsResponse?.data?.results) || [],
  });
  typeof callback === 'function' &&
    //@ts-ignore
    callback({endReached: !Boolean(lastDocumentsResponse?.data?.next)});
};
