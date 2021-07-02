import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ImageView} from '../../features';
import {images} from '../../lib';
import {styles} from './styles';
import {ProductGroupSelect} from '../../ui';
type TProps = {
  companyTitle: string;
  productGroupList: Array<any>;
  currentProductGroup: null | Object;
  setCurrentProductGroup: (arg: any) => void;
};

export const SideModalHeader = (props: TProps) => {
  const {
    companyTitle,
    productGroupList,
    currentProductGroup,
    setCurrentProductGroup,
  } = props;
  return (
    <>
      <View style={styles.wrapper}>
        <ImageView
          style={styles.companyAvatar}
          source={images.company_avatar}
        />
        <View style={styles.rightWrapper}>
          <Text style={styles.companyTitle} numberOfLines={1}>
            {companyTitle}
          </Text>
          <ProductGroupSelect
            items={productGroupList}
            selectedItem={currentProductGroup}
            selectItem={setCurrentProductGroup}
          />
        </View>
      </View>
      <View style={styles.divider} />
    </>
  );
};
