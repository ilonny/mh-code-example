import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ImageView} from '../../features';
import {images} from '../../lib';
import {styles} from './styles';

type TProps = {
  items: Array<any>;
  selectedItem: any;
  selectItem: (arg: any) => void;
};

export const ProductGroupSelect = (props: TProps) => {
  const {items = [], selectedItem, selectItem} = props;
  const {t} = useTranslation();
  const changedWarehouse = useCallback(
    warehouse => {
      selectItem(warehouse?.id ? warehouse : null);
      setSelectIsOpen(false);
    },
    [selectedItem],
  );
  const itemsToRender =
    items?.concat({
      product_group: t('NotChosen'),
    }) || [];
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setSelectIsOpen(!selectIsOpen)}>
        <View style={styles.selectedRow}>
          <Text style={styles.wareHouseName}>
            {selectedItem?.product_group || t('NotChosen')}
          </Text>
          <ImageView
            source={images.select_arrow}
            style={[
              styles.selectArrowIcon,
              {transform: [{rotate: selectIsOpen ? '180deg' : '0deg'}]},
            ]}
          />
        </View>
      </TouchableOpacity>
      {!!selectIsOpen && (
        <View style={styles.borderTop}>
          {itemsToRender?.map(warehouse => {
            return (
              <TouchableOpacity
                onPress={() => changedWarehouse(warehouse)}
                key={warehouse?.product_group}>
                <View style={styles.wareHouseRow}>
                  <Text style={styles.wareHouseName}>
                    {warehouse?.product_group}
                  </Text>
                  {selectedItem?.id == warehouse?.id && (
                    <ImageView
                      style={styles.selectedItemIcon}
                      source={images.selected_icon}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
