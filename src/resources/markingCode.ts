import AppResource from '../core/AppResource';
import {formatDateString} from '../features';
export default new AppResource({
  name: 'MrkCodes',
  allowList: true,
  allowShow: true,
  menuConfig: {
    show: true,
    group: 'common',
    iconName: 'drawer_icon_3',
    title: 'MrkCodes',
  },
  apiConfig: {
    path: '/bp/code/code',
    nameField: 'cis',
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
  showFields: [
    {
      label: 'id',
      key: 'id',
    },
    {
      label: 'name',
      key: 'name',
    },
  ],
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
