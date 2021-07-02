import React from 'react';
import {View, Text} from 'react-native';
import {ImageView} from '../../../features';
import {images} from '../../../lib';
import {ItemRowStyles} from './ItemRowStyles';

type TProps = {
  title: string;
  description: string;
  iconName?: keyof typeof images;
  showIcon?: boolean;
};

export const ItemRow: React.FC<TProps> = props => {
  const {title, description, iconName, showIcon = true} = props;
  return (
    <View style={ItemRowStyles.wrapper}>
      {showIcon ? (
        <View style={ItemRowStyles.iconStyleWrapper}>
          {!!iconName && (
            <ImageView
              source={images[iconName]}
              style={ItemRowStyles.iconStyle}
              resizeMode={'contain'}
            />
          )}
        </View>
      ) : (
        <View style={{marginRight: 16}} />
      )}
      <View style={ItemRowStyles.rightSideWrapper}>
        <Text style={ItemRowStyles.title}>{title}</Text>
        <Text style={ItemRowStyles.description}>{description}</Text>
        <View style={ItemRowStyles.divider} />
      </View>
    </View>
  );
};
