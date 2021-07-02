import React from 'react';
import {Text, View, ViewStyle} from 'react-native';
import {styles} from './styles';

type TProps = {
  children: string | string[];
  wrapperStyle?: ViewStyle;
  description?: string;
};

export const PageTitle: React.FC<TProps> = ({
  children,
  wrapperStyle = {},
  description,
}) => {
  return (
    <View style={wrapperStyle}>
      <Text style={styles.text}>{children}</Text>
      {!!description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};
