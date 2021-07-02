import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text} from 'react-native';
import {useNavigation, CommonActions, useRoute} from '@react-navigation/native';
import {authReducer} from '../../../features';
export const CheckAuth = (props: any) => {
  // console.log('CheckAuth props', props);
  // const navigation = props?.navigationRef?.current;
  const {callback, navIsReady} = props;
  const navigateToLogin = () => {
    setTimeout(() => {
      let routeName = props?.navigationRef?.current?.getCurrentRoute()?.name;
      if (
        routeName != 'ChooseServerScreen' &&
        routeName != 'OnboardingScreen'
      ) {
        props?.navigationRef?.current?.dispatch(() => {
          // @ts-ignore
          return CommonActions.reset({
            routes: [{name: 'AuthStack'}],
            index: 0,
          });
        });
      }
    }, 1);
  };
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  //@ts-ignore
  const refreshToken = useSelector(state => state?.auth?.refresh_token);
  // const accessToken = useSelector((state) => state?.auth?.access_token);
  useEffect(() => {
    // console.log('refreshToken', refreshToken, navIsReady);
    if (!navIsReady) return;
    if (refreshToken) {
      dispatch(authReducer.refresh(refreshToken, navigateToLogin, callback));
    } else {
      callback();
      navigateToLogin();
      // setTimeout(() => {
      // }, 1);
    }
  }, [navIsReady]);
  return <></>;
};
