import React from 'react';
import {Text, Pressable, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../lib';
import {styles} from './styles';
type TProps = {
  disabled: boolean;
  text: string;
  onPress: () => void;
  loading?: boolean;
  wrapperStyle?: ViewStyle;
  isGray?: boolean;
};

export const CustomButton: React.FC<TProps> = ({
  onPress = () => {},
  disabled = false,
  text = '',
  loading = false,
  wrapperStyle = {},
  isGray = false,
}) => {
  const {t} = useTranslation();
  return (
    <Pressable
      style={[
        styles.wrapper,
        {
          backgroundColor:
            disabled || isGray ? Colors.buttonDisabled : Colors.buttonActive,
        },
        wrapperStyle,
      ]}
      onPress={() => {
        if (disabled) return;
        onPress();
      }}>
      <Text
        style={[
          styles.buttonText,
          {color: disabled || isGray ? '#fff' : '#000'},
        ]}>
        {loading ? t('loading') : text}
      </Text>
    </Pressable>
  );
};
