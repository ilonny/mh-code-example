import {StyleSheet} from 'react-native';
import {Fonts, Margins} from '../../lib';

export const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.defaultFont,
    fontSize: 28,
    paddingHorizontal: Margins.mainPadding,
  },
  description: {
    fontFamily: Fonts.defaultFont,
    fontSize: 14,
    paddingHorizontal: Margins.mainPadding,
    color: '#A7A8AC',
  },
});
