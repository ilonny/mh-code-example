import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import '../../localization';
import {useTranslation} from 'react-i18next';
import {
  selectServerRealm,
  CustomHeader,
  CompanyList,
  BottomModal,
} from '../../features';
import {useData} from '../../lib';
import {PageTitle} from '../../ui';

export const HomeScreen = () => {
  const {t} = useTranslation();
  const [serverRealm] = useData({
    selector: selectServerRealm,
  });
  const [bottomModalIsOpen, setBottomModalIsOpen] = useState(false);
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title={serverRealm}
          rightButton
          rightButtonAction={() => setBottomModalIsOpen(true)}
        />
        <PageTitle>{t('companies')}</PageTitle>
        <CompanyList />
      </SafeAreaView>
      <BottomModal
        isOpen={bottomModalIsOpen}
        closeModal={() => setBottomModalIsOpen(false)}
      />
    </>
  );
};
