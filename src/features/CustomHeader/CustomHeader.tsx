import React, {FC} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ImageView} from '../../features';
import {images} from '../../lib';
import {styles} from './styles';

type TProps = {
  backButton?: boolean;
  title?: any;
  rightButton?: boolean;
  rightButtonAction?: (e: any) => void;
  leftButton?: Element;
};

export const CustomHeader: React.FC<TProps> = ({
  backButton = false,
  title = '',
  rightButton = false,
  rightButtonAction = () => {},
  leftButton,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.buttonWrapper}>
        {backButton && (
          <Pressable
            style={styles.backButtonWrapper}
            onPress={() => navigation.goBack()}>
            <ImageView source={images.back_icon} style={styles.backIcon} />
          </Pressable>
        )}
        {leftButton}
      </View>
      <View style={styles.titleWrapper}>
        {!!title && <Text style={styles.title}>{title}</Text>}
      </View>
      <View style={styles.buttonWrapper}>
        {rightButton && (
          <Pressable
            style={styles.rightButtonWrapper}
            onPress={rightButtonAction}>
            <ImageView source={images.more} style={styles.backIcon} />
          </Pressable>
        )}
      </View>
    </View>
  );
};
