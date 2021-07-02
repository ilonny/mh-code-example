// import {request} from '../rest';
// import {SET_CONNECTION_SETTINGS} from './actions';
const initialState = {
  main: {},
  onboardingIsVisible: false,
};
export const mainReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_ONBOARDING_IS_VISIBLE': {
      return {
        ...state,
        onboardingIsVisible: action.val,
      };
    }
    default: {
      return state;
    }
  }
};

mainReducer.setOnboardingIsVisible = (val: boolean) => (dispatch: any) => {
  dispatch({
    type: 'SET_ONBOARDING_IS_VISIBLE',
    val,
  });
};
// mainReducer.getMenuCategories = (dispatch) => request({
//     method: 'GET',
//     url: 'get-categories',
// }).then((response) => {
//     dispatch({ type: SET_MENU_CATEGORIES, categories: response })
// })
