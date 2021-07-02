import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {AppCore} from '../../../core';
import {selectCurrentPageSideModal} from '../../../features';
import AppResource from '../../../core/AppResource';
export const useResource = (): AppResource => {
  const route = useRoute();
  const currentPage = useSelector(selectCurrentPageSideModal);
  //@ts-ignore
  let resourceTitle = route?.params?.resourceName;
  if (!resourceTitle) {
    resourceTitle = currentPage?.title;
  }
  const resource = AppCore?.resources?.find(
    (resource: AppResource) => resource.name === resourceTitle,
  );
  if (resource === undefined) {
    throw new Error(`Resource "${resourceTitle}" not found`);
  }
  return resource;
};
