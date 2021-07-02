import {AppCore} from '../../../core';
import AppResource from '../../../core/AppResource';
import {request} from '../../../lib';
export type RequestOptions = {
  data?: any;
  page?: any;
};

export enum RequestType {
  list,
  getOne,
  create,
  update,
  delete,
}

const resourceRequest = async (
  resource: AppResource,
  type: RequestType,
  options: RequestOptions,
) => {
  if (!resource.config.apiConfig || !resource.config.apiConfig.path) {
    // console.log('resourceRequest', {resource, type, options});
    throw new Error('Resource has no valid API config');
  }

  // Тут будет логика мапинга данных и запроса в апи. Пока тут просто моки

  // await asyncTimeout(1000);
  let {path, nameField, idField, descriptionField} = resource.config.apiConfig;
  if (type === RequestType.list) {
    const {page} = options;
    // console.log('resourceRequest page', page);
    if (page && page != 1) {
      path =
        path +
        `?page_size=30&limit=30&is_process=true&offset=${(page - 1) * 30}`;
    } else {
      path = path + `?page_size=30&limit=30&is_process=true`;
    }
    const lastDocumentsResponse: any = await request({url: path});
    // console.log('lastDocumentsResponse', lastDocumentsResponse);

    return {
      end: lastDocumentsResponse?.data?.next ? false : true,
      items: lastDocumentsResponse?.data?.results.map((el: any) => {
        let obj = el;
        if (nameField) {
          obj = {
            ...obj,
            name: el[nameField],
          };
        }
        if (idField) {
          obj = {
            ...obj,
            id: el[idField],
          };
        }
        if (descriptionField) {
          obj = {
            ...obj,
            description: descriptionField.maskFunction
              ? descriptionField.maskFunction(el[descriptionField.value])
              : el[descriptionField.value],
          };
        }
        return obj;
      }),
    };
  }

  if (type === RequestType.getOne) {
    if (!options.data.id) {
      throw new Error('Id not found');
    }
    return {
      id: options.data.id,
      name: `Test ${options.data.id} (${resource?.name})`,
    };
  }
};

export default resourceRequest;
