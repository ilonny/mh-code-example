import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  useResource,
  useResourceList,
  selectCurrentWareHouse,
  selectCurrentProductGroup,
  documentReducer,
} from '../../../features';
import {ItemsList, ItemRow} from '../../../ui';
let timeout: any;
export const ResourceList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentWarehouse = useSelector(selectCurrentWareHouse);
  const currentProductGroup = useSelector(selectCurrentProductGroup);
  const resource = useResource();
  const [items, loading, error, request, end] = useResourceList(resource);
  // console.log('ResourceList: resource', resource);
  // console.log('ResourceList: resList', items);
  // console.log('ResourceList: end', end);
  const [paginationPage, setPaginationPage] = useState(1);
  useEffect(() => {
    request({page: paginationPage});
  }, [paginationPage]);
  useEffect(() => {
    setPaginationPage(1);
  }, [currentWarehouse, currentProductGroup]);
  const renderItem = ({item}: any): React.ReactElement => {
    return <ItemRow title={item.name} description={item.description} />;
  };
  const keyExtractor = (item: any): string => item?.id?.toString();
  const onPressResource = (item: any) => {
    // if (resource?.name === 'MrkCodes') return false;
    dispatch(documentReducer.setCurrentDocument(item));
    let screenName: string = '';
    if (resource.config.allowShow) {
      screenName = 'ResourceShowScreen';
    }
    if (resource.config.allowEdit) {
      screenName = 'ResourceEditScreen';
    }
    if (screenName) {
      navigation.navigate(screenName, {resourceName: resource.name});
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ItemsList
        //@ts-ignore
        loading={loading}
        items={items}
        onPressItem={onPressResource}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        //@ts-ignore
        loading={loading}
        flatListProps={{
          contentContainerStyle: {paddingTop: 30},
          //@ts-ignore
          refreshing: loading,
          //@ts-ignore
          onRefresh: () => setPaginationPage(1),
          onEndReached: () => {
            if (end) return false;
            clearTimeout(timeout);
            setTimeout(() => {
              setPaginationPage(paginationPage => paginationPage + 1);
            }, 100);
          },
          onEndReachedThreshold: 0.1,
        }}
      />
    </SafeAreaView>
  );
};
