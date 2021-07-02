import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CustomHeader} from '../../features';
import {SelectList} from '../../ui';
export const SelectScreen = ({route}: any) => {
  const navigation = useNavigation();
  const {
    params: {items, onChange, selectedItem, title},
  } = route;
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader backButton title={title} />
      <SelectList
        items={items}
        onChange={onChange}
        selectedItem={selectedItem}
      />
    </SafeAreaView>
  );
};
