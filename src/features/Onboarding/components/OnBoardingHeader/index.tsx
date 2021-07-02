import React, {FC, memo} from 'react';
import {Image, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {Colors, images} from '../../../../lib';
import {ImageView} from '../../../../features';

interface IProps {
  currentPage: number;
}

const OnBoardingHeader: FC<IProps> = ({currentPage}) => {
  const {t} = useTranslation();
  return (
    <View>
      <Text style={styles.title}>MarkingHub</Text>
      <Text style={styles.describeText}>
        {currentPage === 0 ? t('OnboardingFirst') : t('OnboardingSecond')}
      </Text>
      {currentPage !== 0 ? (
        <Image source={images.onBoarding2} style={styles.onBoarding2} />
      ) : (
        <ImageView source={images.onBoarding1} style={styles.onBoarding1} />
      )}
    </View>
  );
};

export default memo(OnBoardingHeader);
