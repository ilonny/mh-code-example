import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TouchableOpacity as TouchableOpacityHandler} from 'react-native-gesture-handler';
import {ImageView} from '../../features';
import {images} from '../../lib';
import {styles} from './styles';
type TProps = {
  active?: boolean;
  iconName: keyof typeof images;
  title: string;
  iconStyle?: any;
  onPress: () => void;
};

export const SideModalButton = (props: TProps) => {
  const {active, iconName, title, iconStyle = {}, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.wrapper,
          {backgroundColor: active ? '#FFD256' : '#fff'},
        ]}>
        <View style={styles.iconWrapper}>
          <ImageView
            source={images[iconName]}
            style={[styles.icon, iconStyle]}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
