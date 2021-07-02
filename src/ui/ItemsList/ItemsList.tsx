import React from 'react';
import {
  View,
  Text,
  FlatList,
  FlatListProps,
  ListViewProps,
  ScrollViewProps,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ItemRow} from './components';
import {SwipeButton} from '../../ui';
//@ts-ignore
import Swipeable from 'react-native-swipeable';
//@ts-ignore
type TProps = {
  items: Array<any>;
  flatListProps?: FlatListProps<any> | ListViewProps | ScrollViewProps;
  rightButtons?: Array<any>;
  onPressItem?: (arg?: any) => void;
  renderItem?: ListRenderItem<any>;
  keyExtractor?: (arg: any) => string;
  loading?: boolean;
  swipeableOptions?: any;
  itemTitle?: (arg: any) => string;
  itemDescription?: (arg: any) => string;
  itemIconName?: string;
  // rightButtons?: Array<React.ReactElement>
};

export const ItemsList: React.FC<TProps> = (props: TProps) => {
  let {
    items,
    flatListProps = {},
    rightButtons = [],
    onPressItem,
    renderItem,
    keyExtractor = (arg: any) => arg?.id,
    loading = false,
    swipeableOptions,
    itemTitle = () => '',
    itemDescription = () => '',
    itemIconName,
  } = props;
  // console.log('ItemsList props', props);
  const {t} = useTranslation();
  const _renderItem = ({item}: any) => {
    let row;
    if (renderItem) {
      //@ts-ignore
      row = renderItem({item});
    } else {
      row = (
        <ItemRow
          title={itemTitle(item)}
          description={itemDescription(item)}
          iconName="server"
        />
      );
    }
    if (onPressItem) {
      row = (
        <TouchableOpacity onPress={() => onPressItem && onPressItem(item)}>
          {row}
        </TouchableOpacity>
      );
    }
    if (swipeableOptions) {
      row = (
        <Swipeable
          {...swipeableOptions}
          rightButtons={swipeableOptions?.rightButtons?.map((btnObj: any) => {
            let Comp = btnObj?.component;
            return Comp ? (
              <Comp onPress={() => btnObj?.onPress(item)} />
            ) : (
              <SwipeButton
                onPress={() => btnObj?.onPress(item)}
                iconName={btnObj?.iconName}
                type={btnObj?.type}
              />
            );
          })}>
          {row}
        </Swipeable>
      );
    }
    return row;
  };
  // console.log('loading??', loading);
  // console.log('items?.length', items?.length);
  if (loading && !items?.length) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <FlatList
      data={items}
      renderItem={_renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={
        <Text
          style={{
            padding: 20,
            textAlign: 'center',
            color: 'rgb(176, 176, 176)',
          }}>
          {t('DataNotFound')}
        </Text>
      }
      {...flatListProps}
    />
  );
};
