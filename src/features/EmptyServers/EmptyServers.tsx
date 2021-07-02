import React, {FC, memo, useEffect, useState} from 'react';
import {Animated, Image, View} from 'react-native';
import styles from './styles';
import {ImageView} from '../../features';
import {
  images,
  currentHeight,
  currentWidth,
  OS,
  StatusBarHeight,
} from '../../lib';
import Dots from './components/Dots';
import SelectServerOnBoardingComponents from './components/SelectServerOnBoardingHeader';
// import { TNavigationProp } from "../../../utlils/types";
// import { log } from "../../../utlils/Log";
import {useNavigation} from '@react-navigation/native';

interface IProps {
  // navigation: any
}

export const EmptyServers: FC<IProps> = () => {
  const navigation = useNavigation();
  const [animationTop] = useState<Animated.Value>(
    new Animated.Value(136 + StatusBarHeight + (OS === 'ios' ? 0 : -20)),
  );
  const [animationLeft] = useState<Animated.Value>(
    new Animated.Value(~~(currentWidth / 2) + 20),
  );
  const [animationRadius] = useState<Animated.Value>(new Animated.Value(0));
  const [animationOpacity] = useState<Animated.Value>(new Animated.Value(1));
  const [showPulse, setShowPulse] = useState<boolean>(false);

  useEffect(() => {
    startAnimationLeft();
    setTimeout(() => {
      startAnimationTop();
    }, 750);
    setTimeout(() => {
      setShowPulse(true);
    }, 2300);

    setTimeout(() => {
      startAnimationRadius();
      startOpacityAnimation();
    }, 2500);
    setTimeout(() => {
      setShowPulse(false);
    }, 3500);
  }, []);

  const startAnimationLeft = () => {
    Animated.timing(animationLeft, {
      toValue: ~~(currentWidth / 2) + 25 + 115 - 3,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const startAnimationTop = () => {
    Animated.timing(animationTop, {
      toValue:
        ~~(currentHeight / 20) * 12 +
        35 +
        (146 + StatusBarHeight) +
        (currentHeight < 700 ? -35 : 20),
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };
  const startAnimationRadius = () => {
    Animated.timing(animationRadius, {
      toValue: 15,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const startOpacityAnimation = () => {
    Animated.timing(animationOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.wrapper}>
      <SelectServerOnBoardingComponents />
      <Dots
        onPress={() => {
          // log('navigation.navigate(\'CreateServer\')')
          navigation.navigate('CreateServerScreen');
        }}
        shadowRadius={animationRadius}
        showPulse={showPulse}
      />

      <Animated.View
        style={{
          top: animationTop,
          left: animationLeft,
          opacity: animationOpacity,
          ...styles.squareWrapper,
        }}>
        <Image source={images.square} style={{width: 31, height: 36}} />
      </Animated.View>

      <ImageView source={images.back_square} style={styles.back_square} />
    </View>
  );
};
