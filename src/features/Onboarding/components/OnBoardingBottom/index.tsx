import React, {FC, memo, RefObject} from 'react';
import {Animated, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Colors, images} from '../../../../lib';
import {ImageView} from '../../../../features';

interface IProps {
  circleRef: RefObject<AnimatedCircularProgress>;
  onPressNext: Function;
}

const OnBoardingBottom: FC<IProps> = ({circleRef, onPressNext}) => {
  const {t} = useTranslation();
  const circle = (
    <View style={styles.circle}>
      <ImageView
        source={images.onBoardingArrow}
        style={{width: 9.5, height: 16}}
        tintColorProp={Colors.mainText}
      />
    </View>
  );

  return (
    <View style={[styles.wrapper]}>
      <Pressable onPress={() => onPressNext()}>
        <AnimatedCircularProgress
          ref={circleRef}
          size={68}
          width={4}
          fill={0}
          rotation={0}
          tintColor={Colors.active}
          backgroundColor={'#F4F4F4'}
          padding={0}
          style={styles.circleWrapper}
          // renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
          children={() => circle}
        />
      </Pressable>
      <Pressable onPress={() => onPressNext()}>
        <Text style={styles.bottomText}>{t('Skip')}</Text>
      </Pressable>
    </View>
  );
};

export default memo(OnBoardingBottom);
