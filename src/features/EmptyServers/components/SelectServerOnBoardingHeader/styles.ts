import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Margins, currentWidth} from '../../../../lib';

interface IStyles {
  wrapper: ViewStyle;
  title: TextStyle;
  description: TextStyle;
}

const styles: IStyles = {
  wrapper: {},
  title: {
    lineHeight: 40,
    fontSize: 32,
    marginTop: 56,
    marginLeft: Margins.mainPadding,
  },
  description: {
    lineHeight: 22,
    fontSize: 14,
    marginLeft: Margins.mainPadding,
    width: ~~(currentWidth / 2),
    marginTop: 24,
    // backgroundColor: 'red',
  },
};

export default StyleSheet.create(styles);
