import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {PageTitle, CustomInput, CustomButton} from '../../../ui';
import {CustomHeader} from '../../../features';
import {useNavigation, CommonActions, useRoute} from '@react-navigation/native';

export const AuthTemplate = (props: any) => {
  // console.log('AuthScreen props', props)
  const {t} = useTranslation();
  const {login, navigation} = props;
  const {
    route: {
      params: {server},
    },
  } = props;
  // console.log('server', server);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [loginValue, setLoginValue] = useState(
    __DEV__ ? 'info@initflow.com' : '',
  );
  const [passwordValue, setPasswordValue] = useState(__DEV__ ? 'test@com' : '');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loginValue && passwordValue) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [loginValue, passwordValue]);

  const navigateToMain = () => {
    //@ts-ignore
    navigation.dispatch(() => {
      // Remove the home route from the stack
      //@ts-ignore
      return CommonActions.reset({
        routes: [{name: 'HomeScreen'}],
        index: 0,
      });
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader backButton={true} />
      <PageTitle description={server?.keycloak_realm}>{t('login')}</PageTitle>
      <View style={{flex: 1, padding: 16}}>
        <View style={{height: 30}} />
        <CustomInput
          value={loginValue}
          onChangeText={text => setLoginValue(text)}
          placeholder={t('emailAddress')}
          autoCapitalize={'none'}
        />
        <View style={{height: 10}} />
        <CustomInput
          value={passwordValue}
          onChangeText={text => setPasswordValue(text)}
          placeholder={t('password')}
          secureTextEntry={true}
        />
        <View style={{height: 50}} />
        <View
          style={{
            flexWrap: 'wrap',
            alignSelf: 'center',
          }}>
          <CustomButton
            disabled={!formIsValid}
            text={t('loginButton')}
            wrapperStyle={
              {
                // alignSelf: 'center'
              }
            }
            loading={loading}
            onPress={() => {
              setLoading(true);
              login({
                loginValue,
                passwordValue,
                serverUrl: server?.keycloak_url,
                serverRealm: server?.keycloak_realm,
                callback: () => setLoading(false),
                navigateToMain,
              });
            }}
          />
        </View>
      </View>
      {/* <Text>Auth template</Text> */}
    </SafeAreaView>
  );
};
