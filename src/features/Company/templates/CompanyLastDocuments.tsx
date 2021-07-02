import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  companyReducer,
  companyLastDocumentsSelector,
  selectCurrentPageSideModal,
  selectCurrentWareHouse,
  selectCurrentProductGroup,
  documentReducer,
  formatDateString,
} from '../../../features';
import {useData} from '../../../lib';
import {ItemsList, ItemRow} from '../../../ui';

const renderItemsMap: any = {
  Main: {
    renderItem: ({item}: any): React.ReactElement => {
      return (
        <ItemRow
          title={item?.document_id}
          description={formatDateString(item?.created)}
        />
      );
    },
    keyExtractor: (item: any) => item?.document_id?.toString(),
  },
  Items: {
    renderItem: ({item}: any): React.ReactElement => {
      return (
        <ItemRow
          title={item?.name}
          description={formatDateString(item?.created)}
        />
      );
    },
    keyExtractor: (item: any) => item?.id?.toString(),
  },
  Shipment: {
    renderItem: ({item}: any): React.ReactElement => {
      return (
        <ItemRow
          title={item?.document_id}
          description={formatDateString(item?.created)}
          iconName={(() => {
            if (item?.status == 'failed') {
              return 'warning';
            }
            if (item?.status == 'completed') {
              return 'check_mark';
            }
          })()}
        />
      );
    },
    keyExtractor: (item: any) => item?.document_id?.toString(),
  },
  MrkCodes: {
    renderItem: ({item}: any): React.ReactElement => {
      return (
        <ItemRow
          title={item?.code}
          description={formatDateString(item?.created)}
        />
      );
    },
    keyExtractor: (item: any) => item?.document_id?.toString(),
  },
  default: {
    renderItem: ({item}: any): React.ReactElement => {
      return (
        <ItemRow
          title={item?.document_id}
          description={formatDateString(item?.created)}
        />
      );
    },
    keyExtractor: (item: any) => item?.document_id?.toString(),
  },
};
let timeout: any;
export const CompanyLastDocuments = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [paginationPage, setPaginationPage] = useState(1);
  const [localLoading, setLocalLoading] = useState(false);
  const currentPage = useSelector(selectCurrentPageSideModal);
  const currentWarehouse = useSelector(selectCurrentWareHouse);
  const currentProductGroup = useSelector(selectCurrentProductGroup);
  // console.log('CompanyLastDocuments currentPage: ', currentPage);

  const [lastDocuments, loading, hookAction] = useData({
    selector: companyLastDocumentsSelector,
    func: companyReducer.getLastDocuments,
  });
  useEffect(() => {
    setPaginationPage(1);
    typeof hookAction == 'function' && hookAction({reset: true});
  }, [currentPage, currentWarehouse, currentProductGroup]);
  useEffect(() => {
    // console.log('currentPage hook', currentPage);
    setLocalLoading(true);
    setTimeout(() => {
      setLocalLoading(false);
    }, 700);
  }, [currentPage]);
  useEffect(() => {
    typeof hookAction == 'function' && hookAction({page: paginationPage});
  }, [paginationPage]);

  // console.log('lastDocuments', lastDocuments);
  //@ts-ignore
  if (!lastDocuments?.length) {
    return null;
  }
  // console.log('CompanyLastDocuments loading: ', loading);
  // console.log('CompanyLastDocuments localLoading: ', localLoading);
  if (localLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ItemsList
      //@ts-ignore
      loading={loading}
      //@ts-ignore
      items={lastDocuments}
      onPressItem={item => {
        if (currentPage?.title != 'MrkCodes') {
          dispatch(documentReducer.setCurrentDocument(item));
          navigation.navigate('DocumentScreen');
        }
      }}
      //@ts-ignore
      renderItem={
        renderItemsMap[currentPage?.title]
          ? renderItemsMap[currentPage?.title]?.renderItem
          : renderItemsMap['default']?.renderItem
      }
      //@ts-ignore
      keyExtractor={
        renderItemsMap[currentPage?.title]
          ? renderItemsMap[currentPage?.title]?.keyExtractor
          : renderItemsMap['default']?.keyExtractor
      }
      //@ts-ignore
      // loading={loading}
      flatListProps={{
        contentContainerStyle: {paddingTop: 30},
        //@ts-ignore
        refreshing: loading,
        //@ts-ignore
        onRefresh: () => hookAction(),
        onEndReached: () => {
          clearTimeout(timeout);
          setTimeout(() => {
            // console.log('onEndReached')
            setPaginationPage(paginationPage => paginationPage + 1);
          }, 100);
        },
        onEndReachedThreshold: 0.1,
      }}
    />
  );
};
