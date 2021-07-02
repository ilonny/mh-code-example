import React from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {ImageView} from '../../features';
import {images} from '../../lib';
import {styles} from './styles';
type TAction = {
  title: string;
  action: () => void;
};
type TProps = {
  isOpen: boolean;
  actionList: Array<TAction>;
  closeMenu: () => void;
};

export const HeaderMenu = (props: TProps) => {
  const {isOpen, closeMenu, actionList} = props;
  if (!isOpen) return null;
  return (
    <Pressable onPress={closeMenu} style={styles.wrapper}>
      <SafeAreaView style={styles.innerWrapper}>
        <View style={styles.contentWrapper}>
          {actionList?.map((action: TAction) => {
            return (
              <TouchableOpacity
                onPress={action.action}
                style={styles.itemRow}
                key={action.title}>
                <Text style={styles.itemRowTitle}>{action.title}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={closeMenu}
            style={styles.closeButton}
            activeOpacity={0.7}>
            <ImageView style={styles.closeIcon} source={images.close_icon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Pressable>
  );
};
