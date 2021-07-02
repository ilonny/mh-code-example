import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ImageView} from '../../features';
import {images} from '../../lib';
import {styles} from './styles';

type TProps = {
  iconName: keyof typeof images;
  title: string;
  description?: string;
  onPress: () => void;
};

export const ModalBottomRow = (props: TProps) => {
  const {iconName, title, onPress, description} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <ImageView
          source={images[iconName]}
          style={styles.icon}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};
