import AppResource from '../../core/AppResource';

export default new AppResource({
  name: 'aggregationDocument',
  allowList: true,
  allowCreate: true,
  allowEdit: true,
  allowShow: true,
  menuConfig: {
    show: true,
    group: 'documents',
  },
  apiConfig: {
    path: '/bp/processes/agregation/',
  },
  schema: {
    properties: {
      name: {
        type: 'string',
      },
    },
  },
  listFields: ['id', 'name'],
  createFields: ['name'],
  editFields: ['id', 'name'],
  showFields: ['id', 'name'],
  itemActions: [
    {
      name: 'send',
      handler: record => {
        return {
          notification: {
            type: 'success',
            message: 'Document sent',
          },
        };
      },
    },
  ],
});
