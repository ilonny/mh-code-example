export const companyListSelector = (state: any) => state?.company?.list || [];
export const currentCompanySelector = (state: any) =>
  state?.company?.currentCompany || null;
export const companyLastDocumentsSelector = (state: any) =>
  state?.company?.lastDocuments?.filter((el: any) => Boolean(el)) || [];
export const selectCurrentWareHouse = (state: any) =>
  state?.company?.currentWarehouse || null;
export const selectWareHouseList = (state: any) =>
  state?.company?.warehouseList || [];
export const selectCurrentProductGroup = (state: any) =>
  state?.company?.currentProductGroup;
export const selectProductGroupList = (state: any) =>
  state?.company?.productGroupList || [];
