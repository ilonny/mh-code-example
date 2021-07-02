import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation, CommonActions, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {ModalBottomRow} from '../../ui';
import {
  authReducer,
  companyReducer,
  selectCurrentWareHouse,
  selectWareHouseList,
} from '../../features';
import {styles} from './styles';

type TProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const BottomModal = (props: TProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const currentWarehouse = useSelector(selectCurrentWareHouse);
  const warehouseList = useSelector(selectWareHouseList);
  const navigateToLogin = () => {
    navigation?.dispatch(() => {
      //@ts-ignore
      return CommonActions.reset({
        routes: [{name: 'AuthStack'}],
        index: 0,
      });
    });
  };
  const {isOpen, closeModal} = props;
  return (
    <Modal
      isVisible={isOpen}
      backdropColor={'rgba(211, 212, 214, 0.7)'}
      style={styles.modal}
      onBackdropPress={() => {
        typeof closeModal === 'function' && closeModal();
      }}>
      <View style={styles.wrapper}>
        <View style={styles.line} />
        <ModalBottomRow
          iconName="modal_nav_2"
          title={t('appSettings')}
          onPress={() => {
            closeModal();
            navigation.navigate('SettingsScreen');
          }}
        />
        <ModalBottomRow
          iconName="modal_nav_1"
          title={t('Profile')}
          onPress={() => {
            closeModal();
          }}
        />
        {route?.name == 'CompanyScreen' && (
          <ModalBottomRow
            iconName="modal_nav_3"
            title={
              currentWarehouse?.name ? t('Warehouse') : t('ChooseWarehouse')
            }
            description={currentWarehouse?.name ? currentWarehouse?.name : null}
            onPress={() => {
              closeModal();
              navigation.navigate('SelectScreen', {
                items: warehouseList.concat({
                  id: null,
                  name: 'Не выбрано',
                  slug: null,
                }),
                selectedItem: currentWarehouse,
                onChange: (item: any) =>
                  dispatch(companyReducer.setCurrentWarehouse(item)),
                title: t('ChooseWarehouse'),
              });
            }}
          />
        )}
        {route?.name == 'CompanyScreen' && (
          <ModalBottomRow
            iconName="modal_nav_7"
            title={t('ToCompanyList')}
            onPress={() => {
              closeModal();
              navigation.navigate('HomeScreen');
            }}
          />
        )}
        <ModalBottomRow
          iconName="server"
          title={t('ToServerList')}
          onPress={() => {
            closeModal();
            navigation.navigate('AuthStack');
          }}
        />
        <ModalBottomRow
          iconName="modal_nav_8"
          title={t('Exit')}
          onPress={() => {
            closeModal();
            dispatch(authReducer.logout({callback: () => navigateToLogin()}));
          }}
        />
      </View>
    </Modal>
  );
};
