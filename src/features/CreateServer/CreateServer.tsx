import React, {useState} from 'react';
import {View, Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {PageTitle, CustomInput, CustomButton, PageButton} from '../../ui';
import {authReducer} from '../../features';
import {styles} from './styles';
export const CreateServer = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const createServer = (value: string | undefined) => {
    setLoading(true);
    dispatch(
      authReducer.createServer({
        href: value || inputValue,
        callback: (result: boolean) => {
          // console.log('callback', result);
          setLoading(false);
          if (typeof result === 'undefined') {
            Alert.alert(t('CreateServerError'));
          }
          if (result) {
            navigation.goBack();
          }
        },
      }),
    );
  };
  return (
    <>
      <>
        <PageTitle>{t('createServer')}</PageTitle>
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <View style={styles.wrapper}>
            <CustomInput
              placeholder={t('addressServer')}
              onChangeText={(text: string) => setInputValue(text)}
              value={inputValue}
              autoCapitalize={'none'}
            />
            <View style={styles.buttonWrapper}>
              <CustomButton
                text={t('create')}
                disabled={!Boolean(inputValue) || loading}
                //@ts-ignore
                onPress={() => createServer()}
                loading={loading}
              />
            </View>
            <PageButton
              iconName={'barcode_icon'}
              onPress={() => {
                navigation.navigate('CameraScreen', {
                  onBarcodeRead: (value: any) => {
                    // console.log('onBarcodeRead fired', value);
                    value = value?.data;
                    // navigation.goBack();
                    let valueJson;
                    let hostValue: any;
                    try {
                      valueJson = JSON.parse(value);
                    } catch (e) {}
                    if (valueJson && valueJson?.host) {
                      hostValue = valueJson?.host;
                    }
                    if (hostValue) {
                      // console.log('host value is', hostValue);
                      navigation.navigate('CreateServerScreen');
                      setTimeout(() => {
                        setInputValue(hostValue);
                        createServer(hostValue);
                      }, 500);
                    } else {
                      // console.log('no host value');
                    }
                  },
                  isScanServer: true,
                });
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </>
    </>
  );
};
