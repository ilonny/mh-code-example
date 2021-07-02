import fetchToCurl from 'fetch-to-curl';
import {Dispatch} from 'redux';
import {modalReducer} from '../../features';
import {
  API_URL,
  createFormDataFromObj,
  createUrlSearchParamsFromObj,
  generateCommonHeaders,
} from '../../lib';
type TInitialState = {
  currentDocument: any;
};
const initialState: TInitialState = {
  currentDocument: null,
};

export const documentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CURRENT_DOCUMENT': {
      return {
        ...state,
        currentDocument: action.currentDocument,
      };
    }
    case 'ADD_SCANNED_CODES': {
      let scanned = [];
      let cDocument = {...state.currentDocument};
      if (!cDocument?.scanned?.length) {
        cDocument.scanned = [];
      }
      cDocument.scanned = cDocument.scanned?.concat(action.codes);
      return {
        ...state,
        currentDocument: {...cDocument},
      };
    }
    default: {
      return state;
    }
  }
};

documentReducer.setCurrentDocument = (currentDocument: any) => (
  dispatch: Dispatch,
  getState: () => void,
) => {
  dispatch({
    type: 'SET_CURRENT_DOCUMENT',
    currentDocument,
  });
};

documentReducer.addScannedCodes = (codes: Array<string>) => (
  dispatch: Dispatch,
  getState: () => void,
) => {
  dispatch({
    type: 'ADD_SCANNED_CODES',
    codes,
  });
};

documentReducer.sendDocument = (document?: any) => async (
  dispatch: any,
  getState: () => void,
) => {
  const store = getState();
  //@ts-ignore
  const {serverRealm, serverUrl} = store?.auth;
  //@ts-ignore
  const {currentDocument} = store?.document;
  const {document_id, scanned = []} = currentDocument;
  const headers = generateCommonHeaders(getState());
  dispatch(
    modalReducer.openModal({
      content: 'Отправка документа',
    }),
  );

  for (let uit_code of scanned) {
    let matchedCode = uit_code?.match(/^01(\d{14})21(.{7,})$/);
    if (Array.isArray(matchedCode)) {
      uit_code = matchedCode[0];
    }
    // let body = createFormDataFromObj({
    //   data: { uit_code },
    // });
    let body = JSON.stringify({
      data: {uit_code},
    });
    // console.log('url is 0', `${API_URL}/bp/processes/out_out/${document_id}/children/create`);
    let codeRes = await fetch(
      `${API_URL}/bp/processes/out_out/${document_id}/children/create/`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body,
      },
    );
    codeRes = await codeRes.json();
    // console.log('codeRes', codeRes, uit_code);
  }
  // console.log('url is ', `${API_URL}/bp/processes/out_out/${document_id}/execute/`);
  fetch(`${API_URL}/bp/processes/out_out/${document_id}/execute/`, {
    method: 'POST',
    headers,
  })
    .then(res => res.json())
    .then(res => {
      // console.log('out_out res', res);
      dispatch(
        modalReducer.openModal({
          content:
            (res.detail ? res.detail : '') +
            (res.error ? ' ' + res.error : '') +
            (res.message ? ' ' + res.message : ''),
        }),
      );
      // dispatch(modalReducer.closeModal())
    });
};
