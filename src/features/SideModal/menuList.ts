import {API_URL} from '../../lib';
export const menuList = [
  {
    id: 1,
    iconName: 'drawer_icon_1',
    title: 'Main',
    subTitle: 'LastDocuments',
    lastDocumentsUrl: `/bp/document/document?page_size=30&is_process=true`,
  },
  {
    id: 2,
    iconName: 'drawer_icon_2',
    title: 'Items',
    lastDocumentsUrl: `/bp/product/products?page_size=30&is_process=true`,
  },
  {id: 3, isDivider: true},
  {
    id: 4,
    iconName: 'drawer_icon_3',
    title: 'MrkCodes',
    lastDocumentsUrl: `/bp/code/code?page_size=30&is_process=true`,
  },
  {
    id: 5,
    iconName: 'drawer_icon_4',
    title: 'IssueOrders',
    iconStyle: {width: 26, height: 25},
  },
  {
    id: 6,
    iconName: 'drawer_icon_5',
    title: 'PuttingIntoCirculation',
    iconStyle: {width: 26, height: 25},
  },
  {
    id: 7,
    iconName: 'drawer_icon_6',
    title: 'Remarking',
    iconStyle: {width: 26, height: 25},
  },
  {
    id: 8,
    isDivider: true,
  },
  {
    id: 9,
    iconName: 'drawer_icon_7',
    title: 'Shipment',
    iconStyle: {width: 20, height: 15},
    lastDocumentsUrl: `/bp/processes/out_out?page_size=30&is_process=true`,
  },
  {
    id: 10,
    iconName: 'drawer_icon_8',
    title: 'CancelShipment',
    iconStyle: {width: 20, height: 15},
  },
];
