import React, {FC, memo} from 'react';
import {Animated, View} from 'react-native';
import styles from './styles';
import {
  currentHeight,
  currentWidth,
  OS,
  StatusBarHeight,
  Margins,
} from '../../../../lib';
import {PlusAnimateButton} from '../../../../ui';

const MarginTop = 146 + StatusBarHeight + (OS === 'ios' ? 0 : -20);
const MarginLeft = ~~(currentWidth / 2) + Margins.mainPadding;
const MaxAmountHeight =
  currentHeight > 800 ? ~~(currentHeight / 20) : ~~(currentHeight / 23);
const dotsHor: number[] = [];
for (let i = 0; i < 10; i++) {
  dotsHor.push(i);
}
const dotsVert: number[] = [];
for (let i = 0; i < MaxAmountHeight; i++) {
  dotsVert.push(i);
}

interface IProps {
  onPress: Function;
  shadowRadius: Animated.Value;
  showPulse: boolean;
}

const Dots: FC<IProps> = ({onPress, shadowRadius, showPulse}) => {
  return (
    <>
      {dotsHor.map(item => (
        <View
          key={item}
          style={[
            styles.dot,
            {
              top: 4 + MarginTop,
              left: MarginLeft + item * 10,
            },
          ]}
        />
      ))}
      <View
        style={[
          styles.dot,
          {
            width: 5,
            borderRadius: 20,
            top: 4 + MarginTop + 2,
            left: MarginLeft + 10 * 10,
            transform: [
              // { rotateX: '45deg'},
              {rotateZ: '0.45rad'},
            ],
          },
        ]}
      />
      <View
        style={[
          styles.dot,
          {
            width: 5,
            borderRadius: 20,
            top: 4 + MarginTop + 8,
            left: MarginLeft + 11 * 10,
            transform: [
              // { rotateX: '45deg'},
              {rotateZ: '0.80rad'},
            ],
          },
        ]}
      />
      <View
        style={[
          styles.dot,
          {
            width: 5,
            borderRadius: 212,
            top: 4 + MarginTop + 20,
            left: MarginLeft + 11 * 10 + 3,
            transform: [
              // { rotateX: '45deg'},
              {rotateZ: '1.35rad'},
            ],
          },
        ]}
      />
      {dotsVert.map(item => (
        <View
          key={item + 20}
          style={[
            styles.dotVert,
            {
              top: item * 12 + 35 + MarginTop,
              left: MarginLeft + 115,
            },
          ]}
        />
      ))}

      <PlusAnimateButton
        onPress={onPress}
        shadowRadius={shadowRadius}
        showPulse={showPulse}
        styleProp={{
          position: 'absolute',
          top: MaxAmountHeight * 12 + 35 + MarginTop,
          left: MarginLeft + 115 - 14,
        }}
      />
    </>
  );
};

export default memo(Dots);
