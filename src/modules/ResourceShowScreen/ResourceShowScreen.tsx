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
  DocumentFiledList,
  selectCurrentDocument,
  documentReducer,
  useResource,
} from '../../features';
import {HeaderMenu, PageButton} from '../../ui';

export const ResourceShowScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentDocument = useSelector(selectCurrentDocument);
  const {
    config: {showFields},
  } = useResource();
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
  console.log('ResourceShowScreen resource: ', showFields);
  let content: any;
  if (Array.isArray(showFields)) {
    content = <DocumentFiledList listData={showFields} />;
  } else {
    switch (showFields && showFields.type) {
      case 'tabbed': {
        content = (
          //@ts-ignore
          <DocumentTabs items={showFields.items} />
        );
        break;
      }
    }
  }
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          backButton
          title={currentDocument?.document_id}
          rightButton
          rightButtonAction={openHeaderMenu}
        />
        {content}
        {/* <DocumentTabs /> */}
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
