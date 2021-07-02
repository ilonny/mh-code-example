import {useCallback, useEffect, useState} from 'react';
import resourceRequest, {RequestType} from './resourceRequest';
import AppResource from '../../../core/AppResource';
export const useResourceList = (resource: AppResource) => {
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [end, setEnd] = useState<boolean>(false);
  const request = async (params?: any) => {
    // console.log('request', params);
    let page = 1;
    if (params && params.page) {
      page = params.page;
    }
    if (page === 1) {
      setItems([]);
    }
    setLoading(true);
    try {
      const data = await resourceRequest(resource, RequestType.list, {
        page: page ? page : 1,
      });
      // console.log('pre setitems 00 ', data);
      // console.log('pre setitems 0 ', items);
      // console.log('pre setitems', items.concat(data?.items));
      setItems(page === 1 ? data?.items : items.concat(data?.items));
      setLoading(false);
      setError(null);
      setEnd(!!data?.end);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  useEffect(() => {
    // console.log('resource hook fired');
    setItems([]);
    setTimeout(() => {
      request();
    }, 200);
  }, [resource]);

  return [items, loading, error, request, end];
};
