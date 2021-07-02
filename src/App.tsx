import React, {useRef, useState, useEffect} from 'react';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
LogBox.ignoreLogs([
  'Animated',
  'Non-serializable',
  'Warning: componentWillMount',
]);
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {StackNavigator} from './modules';
import {store, persistor} from './lib';
import {CheckAuth, DatePicker} from './features';
import {initialize, AppCore} from './core';
import // SafeAreaView,
'react-native';
import {SystemModal} from './features';
const App = () => {
  useEffect(() => {
    // console.log('app run SplashScreen.hide();');
    SplashScreen.hide();
    initialize();
  }, []);
  const navigationRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [navIsReady, setNavIsReady] = useState(false);
  // console.log('app state', loading);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            setNavIsReady(true);
          }}>
          {!loading && <StackNavigator />}
          <SystemModal />
          <CheckAuth
            navigationRef={navigationRef}
            callback={() => setLoading(false)}
            navIsReady={navIsReady}
          />
          <DatePicker />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
