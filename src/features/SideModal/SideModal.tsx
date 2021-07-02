import React, {useCallback, memo} from 'react';
import Modal from 'react-native-modal';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import {
  currentCompanySelector,
  selectWareHouseList,
  selectCurrentWareHouse,
  companyReducer,
  selectCurrentPageSideModal,
  selectProductGroupList,
  selectCurrentProductGroup,
  selectSideModalMenuList,
} from '../../features';
import {SideModalHeader, SideModalButton} from '../../ui';
import {menuList} from './menuList';

type TProps = {
  isOpen: boolean;
  closeModal: () => void;
};
const SideModalWrapper = (props: TProps) => {
  const {isOpen, closeModal} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const currentCompany = useSelector(currentCompanySelector);
  const setCurrentProductGroup = (productGroup: any) =>
    dispatch(companyReducer.setCurrentProductGroup(productGroup));
  const currentPage = useSelector(selectCurrentPageSideModal);
  const productGroupList = useSelector(selectProductGroupList);
  const currentProductGroup = useSelector(selectCurrentProductGroup);
  const menuList = selectSideModalMenuList();
  // console.log('menuList is', menuList);
  const onPressMenuButton = (currentPageArg: any) => {
    // console.log('old current page', currentPage, currentPageArg);
    closeModal();
    if (currentPageArg?.title != currentPage?.title) {
      dispatch({
        type: 'SET_LAST_DOCUMENTS',
        lastDocuments: [],
      });
      dispatch({
        type: 'SET_CURRENT_PAGE',
        currentPage: currentPageArg,
      });
    }
  };
  return (
    <Modal
      isVisible={isOpen}
      backdropColor={'rgba(211, 212, 214, 0.7)'}
      style={styles.modal}
      onBackdropPress={() => closeModal()}
      swipeDirection={'left'}
      scrollHorizontal={true}
      onSwipeComplete={() => closeModal()}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      propagateSwipe={true}>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView style={{flex: 1}}>
          <SideModalHeader
            companyTitle={currentCompany?.name}
            productGroupList={productGroupList}
            currentProductGroup={currentProductGroup}
            setCurrentProductGroup={setCurrentProductGroup}
          />
          {menuList?.map(menu => {
            return (
              <SideModalButton
                key={menu?.title}
                active={currentPage?.title == menu?.title}
                //@ts-ignore
                iconName={menu.iconName}
                //@ts-ignore
                title={t(menu.title)}
                onPress={() => onPressMenuButton(menu)}
              />
            );
            // return menu?.isDivider ? (
            //   <View style={styles.divider} key={menu?.id} />
            // ) : (
            // );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export const SideModal = memo(SideModalWrapper);
