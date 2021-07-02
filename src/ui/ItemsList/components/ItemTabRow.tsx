import React from 'react';
import {View, Text} from 'react-native';
import {formatDateString} from '../../../features';
import {images} from '../../../lib';
import {ItemRowStyles} from './ItemRowStyles';

type TProps = {
  title: string;
  description: string;
  iconName?: keyof typeof images;
  showIcon?: boolean;
  isDate?: boolean;
};

export const ItemTabRow: React.FC<TProps> = props => {
  const {title, description, isDate} = props;
  const renderTitle = (title: string) => {
    if (!title) return 'Не указано';
    if (isDate) {
      return formatDateString(title);
    }
    return title;
  };
  return (
    <View style={[ItemRowStyles.wrapper, {paddingHorizontal: 16}]}>
      <View style={ItemRowStyles.rightSideWrapper}>
        <Text style={[ItemRowStyles.description, {marginTop: 0}]}>
          {description}
        </Text>
        <Text style={[ItemRowStyles.title, {marginTop: 7}]}>
          {renderTitle(title)}
        </Text>
        <View style={ItemRowStyles.divider} />
      </View>
    </View>
  );
};
