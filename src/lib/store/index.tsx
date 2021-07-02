import {combineReducers, createStore, applyMiddleware} from 'redux';
//@ts-ignore
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {
  mainReducer,
  authReducer,
  modalReducer,
  companyReducer,
  sideModalReducer,
  documentReducer,
  datePickerReducer,
} from '../../features';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
const persistConfig = {
  key: 'main',
  storage: AsyncStorage,
  blacklist: ['modal', 'sideModal'],
};

const rootReducer = combineReducers({
  main: persistReducer({...persistConfig, key: 'main'}, mainReducer),
  auth: persistReducer({...persistConfig, key: 'auth'}, authReducer),
  modal: persistReducer({...persistConfig, key: 'modal'}, modalReducer),
  company: persistReducer({...persistConfig, key: 'company'}, companyReducer),
  sideModal: persistReducer(
    {...persistConfig, key: 'sideModal'},
    sideModalReducer,
  ),
  document: persistReducer(
    {...persistConfig, key: 'document'},
    documentReducer,
  ),
  datePicker: persistReducer(
    {...persistConfig, key: 'datePicker'},
    datePickerReducer,
  ),
});

let enhacers: any;
//@ts-ignore
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  enhacers = applyMiddleware(thunk, createLogger({collapsed: true}));
} else {
  enhacers = applyMiddleware(thunk);
}

function configureStore() {
  const store = createStore(rootReducer, undefined, enhacers);
  return store;
}

export const store = configureStore();
export const persistor = persistStore(store);
