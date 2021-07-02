import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ImageView} from '../../features';
import {images} from '../../lib';
import {styles} from './styles';
type TProps = {
  onPress: (arg: any) => void;
};
export const HeaderLeftMenuButton: React.FC<TProps> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <ImageView source={images.menu} style={styles.icon} />
    </TouchableOpacity>
  );
};
