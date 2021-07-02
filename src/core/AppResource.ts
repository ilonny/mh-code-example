import React from 'react';
import {images} from '../lib';
export type AppResourceConfigApi = {
  /** поле name из API */
  nameField?: string;
  /** Базовый URL в API */
  path: string;
  /** Используется для преобразования разных полей идентификатора в API к единому полю. По-умолчанию id */
  idField?: string;
  /** Используется для преобразования разных полей описания в API к единому полю. */
  descriptionField: {
    value: string;
    maskFunction?: (value: string) => string;
  };
  /** Маппинг входящих данных */
  mappingInput?: {
    /** Вызвывается до общих преоборазований */
    itemBefore?: (data: any) => any;
    /** Вызвывается после общих преоборазований */
    itemAfter?: (data: any) => any;
  };
  /** Маппинг исходящих данных */
  mappingOutput?: {
    /** Вызвывается до общих преоборазований */
    itemBefore?: (data: any) => any;
    /** Вызвывается после общих преоборазований */
    itemAfter?: (data: any) => any;
  };
};

export type AppResourceConfigSchemaPropertyType =
  | 'string'
  | 'boolean'
  | 'number'
  | 'date'
  | 'time'
  | 'dateTime'
  | 'select'
  | 'currentDocumentScanned';

export type AppResourceConfigSchemaProperty = {
  /** Тип поля. Используется для общего маппинга в API и отображении подходящего поля и инупта */
  type?: AppResourceConfigSchemaPropertyType;
  /** Если true, то поле можно менять только при создании записи */
  readOnly?: boolean;
  /** Параметры валидации */
  validation?: {
    /** Обязательное поле */
    required?: boolean;
  };
  /** Дополнительные опции для поля или инпута */
  options?: {
    [key: string]: any;
  };
  /** Кастомная компонента для рендиринга поля */
  componentField?: React.ElementType;
  /** Кастомная компонента для рендиринга инпута */
  componentInput?: React.ElementType;
};

export type AppResourceConfigSchema = {
  properties: {
    [name: string]: AppResourceConfigSchemaProperty;
  };
};

export type AppResourceActionReturnType = {
  /** Если нужно показать уведомление */
  notification?: {
    type: 'success' | 'error' | 'warning';
    message: string;
  };
  /** TODO: Если нужно сдлеать редирект на другой экран. Либо возвращать конфиг для редиректа, либо делать редирект прямо к хендлере */
};

export type AppResourceAction = {
  /** Название экшена для отображения */
  name: string;
  /** Последовательность для отображения */
  order?: number;
  /** Обработчика экшена */
  handler?: (
    record: any,
  ) => AppResourceActionReturnType | Promise<AppResourceActionReturnType>;
};

export type AppResourceUIItem =
  | string
  | (AppResourceConfigSchemaProperty & {
      /** Название поля в модели */
      name: 'string';
    });

export type ResourceField = {
  key: string;
  //лейбл отображения поля из справочника переводов.
  label: string;
  type?: AppResourceConfigSchemaPropertyType;
};
export type AppResourceUIShowItem =
  | Array<ResourceField>
  | {
      type: string;
      items?: Array<{
        label: string;
        type?: string;
        items?: Array<ResourceField>;
      }>;
    };

export type AppResourceConfig = {
  /** Идентификатор ресурса */
  name: string;
  /** Информация для запросов в API */
  apiConfig?: AppResourceConfigApi;
  /** Используется для преобразования элемента в строку (заголовок) */
  itemToString?: (data: any) => string;
  /** Атрибутивный состав ресурса. Используется для отображения в UI и основного маппинга в API */
  schema?: AppResourceConfigSchema;

  /** Доступен функционал отображения списка */
  allowList?: boolean;
  /** Доступен функционал создагния */
  allowCreate?: boolean;
  /** Доступен функционал редактирования */
  allowEdit?: boolean;
  /** Доступен функционал просмотра */
  allowShow?: boolean;
  /** Доступен функционал удаления */
  allowDelete?: boolean;

  /** Настройки отображения в меню */
  menuConfig?: {
    /** Отображать данный ресурс в меню */
    show?: boolean;
    /** Группа для отображения в меню */
    group?: string;
    /** Иконка отображаемая в боковом меню */
    iconName: keyof typeof images;
    /** Заголовок для отображения в боковом меню из словаря переводов */
    title: string;
  };

  /** Набор действий для одного элемента */
  itemActions?: AppResourceAction[];

  /** Набор общих действий для списка */
  listActions?: AppResourceAction[];

  /** Набор полей для экрана создания */
  createFields?: AppResourceUIItem[];
  /** Набор полей для экрана редактирования */
  editFields?: AppResourceUIItem[];
  /** Набор полей для экрана списка */
  listFields: AppResourceUIItem[];
  /** Набор полей для экрана просмотра */
  showFields?: AppResourceUIShowItem;
};

class AppResource {
  name: string;
  config: AppResourceConfig;

  constructor(config: AppResourceConfig) {
    this.name = config.name;
    this.config = config;
  }
}

export default AppResource;
