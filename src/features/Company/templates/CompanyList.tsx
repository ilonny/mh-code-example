import React, {useEffect} from 'react';
import {TouchableOpacity, ListRenderItem} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  companyReducer,
  companyListSelector,
  currentHostSelector,
} from '../../../features';
import {useData} from '../../../lib';
import {ItemsList, ItemRow} from '../../../ui';
export const CompanyList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [companyList, loading, hookAction] = useData({
    selector: companyListSelector,
    func: companyReducer.getCompanyList,
  });
  const currentHost = useSelector(currentHostSelector);
  // console.log('companyList currentHost', currentHost);
  useEffect(() => {
    //@ts-ignore
    hookAction();
    // console.log('reload company list');
  }, [currentHost]);

  const renderItem = ({item}: any): React.ReactElement => {
    // console.log('renderItem', item);
    return <ItemRow title={item?.name} description={`${item?.description}`} />;
  };
  const keyExtractor = (item: any) => item.id.toString();

  return (
    <ItemsList
      //@ts-ignore
      items={companyList}
      onPressItem={item => {
        dispatch(companyReducer.setCurrentCompany(item));
        navigation.navigate('CompanyStack');
      }}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      //@ts-ignore
      // loading={loading}
      flatListProps={{
        contentContainerStyle: {paddingTop: 30},
        //@ts-ignore
        refreshing: loading,
        //@ts-ignore
        onRefresh: () => hookAction(),
      }}
    />
  );
};
