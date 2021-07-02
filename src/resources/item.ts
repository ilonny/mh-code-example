import AppResource from '../core/AppResource';
import {formatDateString} from '../features';
export default new AppResource({
  name: 'Items',
  allowList: true,
  allowShow: true,
  menuConfig: {
    show: true,
    group: 'common',
    iconName: 'drawer_icon_2',
    title: 'Items',
  },
  apiConfig: {
    path: '/bp/product/products',
    descriptionField: {
      value: 'created',
      maskFunction: formatDateString,
    },
  },
  schema: {
    properties: {
      name: {
        type: 'string',
      },
    },
  },
  listFields: ['id', 'name'],
  showFields: ['id', 'name'],
  itemActions: [
    {
      name: 'refresh',
      handler: record => {
        return {
          notification: {
            type: 'success',
            message: 'Refresh success',
          },
        };
      },
    },
  ],
});
