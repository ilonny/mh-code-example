import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {CustomHeader, LanguageSelector} from '../../features';
import '../../localization';
import {useTranslation} from 'react-i18next';
export const SettingsScreen = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader backButton title={t('settings')} />
      <LanguageSelector />
    </SafeAreaView>
  );
};
