import React from 'react';
import {FlatList, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ImageView} from '../../features';
import {images} from '../../lib';
import {styles} from './styles';

type TProps = {
  items: Array<any>;
  onChange: (arg: any) => void;
  selectedItem: any;
};

export const SelectList = (props: TProps) => {
  const navigation = useNavigation();
  const {items, selectedItem, onChange} = props;
  return (
    <FlatList
      data={items}
      keyExtractor={item => item?.id?.toString()}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              onChange(item);
              navigation.goBack();
            }}>
            <View style={styles.selectListRow}>
              <Text style={styles.title}>{item?.name}</Text>
              {item?.id == selectedItem?.id && (
                <ImageView style={styles.icon} source={images.selected_icon} />
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
