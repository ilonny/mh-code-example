import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  CustomHeader,
  BottomModal,
  currentCompanySelector,
  CompanyLastDocuments,
  SideModal,
  selectCurrentPageSideModal,
  ResourceList,
} from '../../features';
import {PageTitle, HeaderLeftMenuButton} from '../../ui';
export const ResourceListScreen = (props: any) => {
  // console.log('ResourceListScreen props: ', props);
  const {t} = useTranslation();
  const [bottomModalIsOpen, setBottomModalIsOpen] = useState(false);
  const currentCompany = useSelector(currentCompanySelector);
  const [sideModalIsOpen, setSideModalIsOpen] = useState<boolean>(false);
  const currentPage = useSelector(selectCurrentPageSideModal);
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title={currentCompany?.name}
          rightButton
          rightButtonAction={() => setBottomModalIsOpen(true)}
          leftButton={
            <HeaderLeftMenuButton
              onPress={() => {
                setSideModalIsOpen(true);
              }}
            />
          }
        />
        <PageTitle>
          {t(currentPage?.subTitle) || t(currentPage?.title)}
        </PageTitle>
        <ResourceList />
        {/* <CompanyLastDocuments /> */}
      </SafeAreaView>
      <BottomModal
        isOpen={bottomModalIsOpen}
        closeModal={() => setBottomModalIsOpen(false)}
      />
      <SideModal
        isOpen={sideModalIsOpen}
        closeModal={() => setSideModalIsOpen(false)}
      />
    </>
  );
};
