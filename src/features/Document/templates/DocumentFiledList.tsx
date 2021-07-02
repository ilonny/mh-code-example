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

type TProps = {
  listData: Array<ResourceField>;
};
export const DocumentFiledList: FC<TProps> = ({listData}) => {
  const dispatch = useDispatch();
  const currentDocument = useSelector(selectCurrentDocument);
  const {t} = useTranslation();
  //@ts-ignore
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{paddingTop: 30, paddingBottom: 30}}>
        {listData?.map((el: any) => {
          const val = el.key
            ? el.key
                .split('.')
                .reduce((a: any, b: any) => a[b], currentDocument)
            : el.value;
          const isDate = el?.type === 'dateTime';
          let row = (
            <ItemTabRow title={val} description={t(el.label)} isDate={isDate} />
          );
          if (isDate) {
            row = (
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    datePickerReducer.setOptions({
                      isVisible: true,
                      mode: 'date',
                      date: moment(val).toDate(),
                    }),
                  );
                }}>
                {row}
              </TouchableOpacity>
            );
          }
          return <View key={el.key ? el?.label : el.value}>{row}</View>;
        })}
      </ScrollView>
    </View>
  );
};
