import {AppCore} from '../../core';
//@ts-ignore
export const selectCurrentPageSideModal = state =>
  state?.sideModal?.currentPage;
export const selectSideModalMenuList = () =>
  AppCore.resources.map(resource => ({
    ...resource?.config?.menuConfig,
    ...resource?.config?.apiConfig,
  }));
