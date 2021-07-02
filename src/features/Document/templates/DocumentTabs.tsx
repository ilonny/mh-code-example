import moment from 'moment';
import React, {useState, FC} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  selectCurrentDocument,
  selectDocumentScannedCodes,
  datePickerReducer,
} from '../../../features';
import {Tabs, ItemTabRow} from '../../../ui';
import {ResourceField} from '../../../core/AppResource';
import {DocumentFiledList} from '../templates';

type TProps = {
  items: Array<{
    label: string;
    items: Array<ResourceField>;
  }>;
};
export const DocumentTabs: FC<TProps> = ({items}) => {
  const dispatch = useDispatch();
  const currentDocument = useSelector(selectCurrentDocument);
  const scanned = useSelector(selectDocumentScannedCodes);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const {t} = useTranslation();
  console.log('DocumentTabs items', items);
  console.log('items[activeTabIndex]', items[activeTabIndex]);
  let listData = items[activeTabIndex]?.items;
  console.log('listData', listData);
  //@ts-ignore
  if (items[activeTabIndex]?.type === 'currentDocumentScanned') {
    listData = scanned.map((s: string) => {
      return {
        label: 'UIT',
        value: s,
        readOnly: true,
      };
    });
    console.log('listData', listData);
  }
  return (
    <View style={{flex: 1}}>
      <Tabs
        activeIndex={activeTabIndex}
        changeIndex={setActiveTabIndex}
        tabs={items.map(el => t(el.label))}
      />
      <DocumentFiledList listData={listData} />
    </View>
  );
};
