import React from 'react';
import {TextInput, View, TextInputProps} from 'react-native';
import {styles} from './styles';
interface TProps extends TextInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
}

export const CustomInput: React.FC<TProps> = props => {
  return (
    <View>
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#A7A8AC"
      />
    </View>
  );
};
