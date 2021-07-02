import React, {FC, memo} from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {CustomStatusBar} from '../../../../features';

interface IProps {}

const SelectServerOnBoardingComponents: FC<IProps> = () => {
  const {t} = useTranslation();
  return (
    <View>
      <CustomStatusBar />
      <Text style={styles.title}>{t('ChooseServer')}</Text>
      <View style={{position: 'relative'}}>
        <Text style={styles.description}>{t('ChooseServerDescription')}</Text>
      </View>
    </View>
  );
};

export default memo(SelectServerOnBoardingComponents);
