import AppResource from '../core/AppResource';

export default new AppResource({
  name: 'product',
  allowList: true,
  allowShow: true,
  menuConfig: {
    show: true,
    group: 'common',
  },
  apiConfig: {
    path: '/bp/product/product/',
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
});
