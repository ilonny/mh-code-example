import {Alert} from 'react-native';
import {Dispatch, Action} from 'redux';
import {API_URL} from '../../lib';
import {menuList} from '../../features/SideModal/menuList';
const initialState = {
  currentPage: menuList[0],
};
export const sideModalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action?.currentPage,
      };
    default: {
      return state;
    }
  }
};
