import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ImageView} from '../../features';
import {images} from '../../lib';
import {styles} from './styles';
type TProps = {
  iconName: keyof typeof images;
  onPress?: (args: any) => void;
  type: 'danger' | 'default';
};

export const SwipeButton: React.FC<TProps> = props => {
  // console.log('SwipeButton props', SwipeButton);
  const {iconName, onPress = () => {}, type} = props;
  const bgColors = {
    danger: '#FF474A',
    default: '#A7A8AC',
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, {backgroundColor: bgColors[type]}]}>
      <ImageView
        source={images[iconName]}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
