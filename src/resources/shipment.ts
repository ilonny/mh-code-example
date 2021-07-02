import AppResource from '../core/AppResource';
import {formatDateString} from '../features';
export default new AppResource({
  name: 'Shipment',
  allowList: true,
  allowShow: true,
  menuConfig: {
    show: true,
    group: 'common',
    iconName: 'drawer_icon_7',
    title: 'Shipment',
  },
  apiConfig: {
    path: '/bp/processes/out_out',
    nameField: 'document_id',
    idField: 'document_id',
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
  showFields: {
    type: 'tabbed',
    items: [
      {
        label: 'Document',
        items: [
          {
            label: 'DocumentName',
            key: 'document_id',
          },
          {
            label: 'ID',
            key: 'document_id',
          },
          {
            label: 'DateCreated',
            key: 'created',
            type: 'dateTime',
          },
          {
            label: 'Status',
            key: 'status',
          },
          {
            label: 'ExternalID',
            key: 'external_id',
          },
          {
            label: 'ExternalStatus',
            key: 'external_status',
          },
        ],
      },
      {
        label: 'DocumentData',
        items: [
          {
            label: 'PrimaryDocumentNumber',
            key: 'data.document_num',
          },
          {
            label: 'PrimaryDocumentDate',
            key: 'data.document_date',
            type: 'dateTime',
          },
          {
            label: 'TINOfTheBeneficiary',
            key: 'data.receiver_inn',
          },
          {
            label: 'RecipientsName',
            key: 'data.receiver',
          },
          {
            label: 'SendersTIN',
            key: 'data.sender_inn',
          },
          {
            label: 'SendersName',
            key: 'data.sender',
          },
          {
            label: 'OwnersTIN',
            key: 'data.owner_inn',
          },
          {
            label: 'OwnersName',
            key: 'data.owner',
          },
          {
            label: 'TypeOfTurnover',
            key: 'data.turnover_type',
          },
          {
            label: 'DateOfShipmentOfGoods',
            key: 'data.transfer_date',
            type: 'dateTime',
          },
        ],
      },
      {
        label: 'DocumentPosition',
        type: 'currentDocumentScanned',
      },
    ],
  },
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
