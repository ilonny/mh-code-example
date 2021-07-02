import * as React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Auth} from '../features/Auth';
import {OnboardingScreen} from './OnboardingScreen';
import {ChooseServerScreen} from './ChooseServerScreen';
import {CreateServerScreen} from './CreateServerScreen';
import {CameraScreen} from './CameraScreen';
import {HomeScreen} from './HomeScreen';
import {CompanyScreen} from './CompanyScreen';
import {SelectScreen} from './SelectScreen';
import {DocumentScreen} from './DocumentScreen';
import {SettingsScreen} from './SettingsScreen';
import {ResourceListScreen} from './ResourceListScreen';
import {ResourceShowScreen} from './ResourceShowScreen';

const Stack = createStackNavigator();

export const AuthStack = (props: any) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'ChooseServerScreen'}>
      <Stack.Screen name="ChooseServerScreen" component={ChooseServerScreen} />
      <Stack.Screen name="CreateServerScreen" component={CreateServerScreen} />
      <Stack.Screen name="AuthScreen" component={Auth} />
    </Stack.Navigator>
  );
};

export const CompanyStack = (props: any) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'ResourceListScreen'}>
      <Stack.Screen name="ResourceListScreen" component={ResourceListScreen} />
      <Stack.Screen name="ResourceShowScreen" component={ResourceShowScreen} />
    </Stack.Navigator>
  );
};

export const StackNavigatorTemplate = (props: any) => {
  // console.log('StackNavigatorTemplate', props);
  const {onboardingIsVisible, access_token} = props;
  let initialScreen = 'HomeScreen';
  // console.log('access_token', access_token)
  if (!access_token) {
    initialScreen = 'AuthStack';
  }
  if (!onboardingIsVisible) {
    initialScreen = 'OnboardingScreen';
  }
  // console.log('initialScreen', initialScreen);
  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialScreen}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="CompanyStack" component={CompanyStack} />
        <Stack.Screen name="DocumentScreen" component={DocumentScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="SelectScreen" component={SelectScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </>
  );
};

// export const StackNavigator = StackNavigatorTemplate
export const StackNavigator = connect(
  state => ({
    //@ts-ignore
    main: state.main,
    //@ts-ignore
    auth: state.auth,
    //@ts-ignore
    onboardingIsVisible: state?.main?.onboardingIsVisible,
    //@ts-ignore
    access_token: state?.auth?.access_token,
  }),
  dispatch => ({}),
)(StackNavigatorTemplate);
