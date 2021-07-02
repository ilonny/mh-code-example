import {Dispatch} from 'redux';

const initialState = {
  isVisible: false,
};

export const datePickerReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'SET_DATEPICKER_OPTIONS': {
      return {
        ...state,
        ...action?.options,
      };
    }
    default:
      return state;
  }
};

datePickerReducer.setOptions = (options: any) => (
  dispatch: Dispatch,
  getState: () => void,
) => {
  dispatch({type: 'SET_DATEPICKER_OPTIONS', options});
};

datePickerReducer.closePicker = () => (dispatch: any, getState: () => void) => {
  dispatch({
    type: 'SET_DATEPICKER_OPTIONS',
    options: {
      isVisible: false,
    },
  });
};
