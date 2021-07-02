import {Dispatch} from 'redux';
const initialState = {
  isOpen: false,
  title: '',
  content: '',
  buttons: [],
};
export const modalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'MODAL_OPEN':
      return {
        ...state,
        isOpen: true,
        content: action?.content,
        title: action?.title,
        buttons: action?.buttons,
      };
    case 'MODAL_CLOSE':
      return {
        ...state,
        isOpen: false,
      };
    default: {
      return state;
    }
  }
};

modalReducer.openModal = (params: any) => (
  dispatch: Dispatch,
  getState: () => void,
) => {
  const {content, title, buttons} = params;
  dispatch({
    type: 'MODAL_OPEN',
    content,
    title,
    buttons,
  });
};

modalReducer.closeModal = () => (dispatch: Dispatch, getState: () => void) => {
  dispatch({
    type: 'MODAL_CLOSE',
  });
};
