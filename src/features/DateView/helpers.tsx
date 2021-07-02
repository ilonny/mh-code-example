import moment from 'moment';
import {dateTimeFormat} from './constants';
export const formatDateString = (
  date: string,
  format: string = dateTimeFormat,
): string => {
  return moment(date).format(format);
};
