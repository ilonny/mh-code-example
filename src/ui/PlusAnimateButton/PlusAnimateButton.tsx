import React, {FC, memo} from 'react';
import {Animated, Pressable, ViewStyle} from 'react-native';
import styles from './styles';
import {ImageView} from '../../features';
import {images, Colors} from '../../lib';
import Pulse2 from '../../features/EmptyServers/components/Pulse2';

interface IProps {
  onPress: Function;
  styleProp?: ViewStyle | ViewStyle[];
  shadowRadius: Animated.Value;
  showPulse: boolean;
}

export const PlusAnimateButton: FC<IProps> = ({
  styleProp,
  onPress,
  shadowRadius,
  showPulse,
}) => (
  <Animated.View
    style={[styleProp, styles.mainWrapper, {shadowRadius: shadowRadius}]}>
    <Pressable onPress={() => onPress()} style={[styles.wrapper]}>
      <ImageView source={images.add_icon} style={styles.ImageView}></ImageView>
    </Pressable>
    {!!showPulse && (
      <Pulse2
        // style={styles.pulse}
        color={Colors.active}
        diameter={120}
      />
    )}
  </Animated.View>
);
