import React from 'react';
import {View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSelector, useDispatch} from 'react-redux';
import {selectDatePickerOptions, datePickerReducer} from '../../features';

export const DatePicker = () => {
  const options = useSelector(selectDatePickerOptions);
  const dispatch = useDispatch();
  return (
    <DateTimePickerModal
      {...options}
      date={typeof options.date == 'object' ? options?.date : new Date()}
      onCancel={() => dispatch(datePickerReducer.closePicker())}
      onConfirm={
        options?.onConfirm
          ? () => options.onConfirm
          : () => dispatch(datePickerReducer.closePicker())
      }
    />
  );
};
