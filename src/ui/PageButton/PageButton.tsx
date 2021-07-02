import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {ImageView} from '../../features';
import {images} from '../../lib';
import {styles} from './styles';
type TProps = {
  iconName: keyof typeof images;
  onPress: () => void;
};

export const PageButton: React.FC<TProps> = props => {
  const {iconName, onPress} = props;
  return (
    <Pressable style={[styles.wrapper]} onPress={onPress}>
      <ImageView source={images[iconName]} style={styles.iconStyle} />
    </Pressable>
  );
};
