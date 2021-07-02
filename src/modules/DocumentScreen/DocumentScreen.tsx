import React, {useState, useCallback, useRef} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
//@ts-ignore
import ActionSheet from 'react-native-actionsheet';
import {
  CustomHeader,
  DocumentTabs,
  selectCurrentDocument,
  documentReducer,
} from '../../features';
import {HeaderMenu, PageButton} from '../../ui';

export const DocumentScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentDocument = useSelector(selectCurrentDocument);
  const [headerMenuOpened, setHeaderMenuOpened] = useState(false);
  const closeHeaderMenu = useCallback(() => setHeaderMenuOpened(false), []);
  const openHeaderMenu = useCallback(() => setHeaderMenuOpened(true), []);
  const actionSheetRef = useRef(null);
  const navigateToCamera = useCallback(isTsd => {
    navigation.navigate('CameraScreen', {
      onBarcodeRead: null,
      isDocument: true,
      isTsd,
    });
  }, []);
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          backButton
          title={currentDocument?.document_id}
          rightButton
          rightButtonAction={openHeaderMenu}
        />
        <DocumentTabs />
        <PageButton
          iconName={'barcode_icon'}
          onPress={() => {
            // console.log('actionSheetRef', actionSheetRef);
            //@ts-ignore
            actionSheetRef?.current?.show();
          }}
        />
      </SafeAreaView>
      <HeaderMenu
        isOpen={headerMenuOpened}
        actionList={[
          {
            title: t('Send'),
            action: () => {
              dispatch(documentReducer.sendDocument());
            },
          },
        ]}
        closeMenu={closeHeaderMenu}
      />
      <ActionSheet
        ref={actionSheetRef}
        title={'Which one do you like ?'}
        options={[t('Camera'), t('Scanner'), t('Cancel')]}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index: number) => {
          if (index === 2) return;
          navigateToCamera(Boolean(index));
        }}
      />
    </>
  );
};
