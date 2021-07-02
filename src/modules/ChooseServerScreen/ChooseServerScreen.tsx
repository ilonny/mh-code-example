import React from 'react';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {PageTitle, PageButton, ItemsList} from '../../ui';
import {
  selectServers,
  EmptyServers,
  modalReducer,
  authReducer,
} from '../../features';
//@ts-ignore
import Swipeable from 'react-native-swipeable';

export const ChooseServerScreen = () => {
  const {t} = useTranslation();
  const servers = useSelector(selectServers);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // console.log('servers', servers);
  const rightButtons = [
    {
      iconName: 'trash_icon',
      type: 'danger',
      onPress: (server: any) => {
        // console.log('onpress button');
        dispatch(
          modalReducer.openModal({
            content: `${t('ConfirmDelete')}${server?.keycloak_realm}?`,
            buttons: [
              {
                type: 'cancel',
                title: t('cancel'),
                onPress: () => dispatch(modalReducer.closeModal()),
              },
              {
                type: 'confirm',
                title: t('ConfirmDeleteButton'),
                onPress: () => {
                  dispatch(authReducer.deleteServer(server));
                  dispatch(modalReducer.closeModal());
                },
              },
            ],
          }),
        );
      },
    },
  ];
  const onPressServer = (server: any) => {
    // console.log('onPressServer called', server);
    if (!server.refresh_token) {
      navigation.navigate('AuthScreen', {
        server,
      });
      return;
    }
    // console.log('authReducer.refresh fired');
    dispatch(
      authReducer.refresh(
        server.refresh_token,
        () => navigation.navigate('AuthScreen'),
        () => {
          // console.log('refresh callback fired');
        },
        server?.keycloak_url,
        server?.keycloak_realm,
        () => {
          // console.log('chosenServerCallbackSuccess');
          navigation.navigate('HomeScreen');
        },
        server?.host,
      ),
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {servers?.length ? (
        <SafeAreaView style={{flex: 1}}>
          <PageTitle>{t('serverList')}</PageTitle>
          <ItemsList
            itemTitle={(server: any) => server?.keycloak_realm}
            itemDescription={(server: any) => `URL: ${server?.keycloak_url}`}
            itemIconName="server"
            keyExtractor={item => item?.keycloak_realm}
            items={servers}
            flatListProps={{
              contentContainerStyle: {
                paddingTop: 30,
              },
            }}
            onPressItem={onPressServer}
            swipeableOptions={{
              rightButtons,
            }}
          />
          <PageButton
            iconName={'add_icon'}
            onPress={() => navigation.navigate('CreateServerScreen')}
          />
        </SafeAreaView>
      ) : (
        <EmptyServers />
      )}
    </View>
  );
};
