import {StyleSheet, ViewStyle} from 'react-native';
import {currentHeight, OS, Margins} from '../../../lib';

interface IStyles {
  wrapper: ViewStyle;
}

const styles: IStyles = {
  wrapper: {
    justifyContent: 'space-between',
    height: currentHeight,
    marginHorizontal: Margins.mainPadding,
    paddingTop: OS === 'ios' ? 16 : 0,
  },
};

export default StyleSheet.create(styles);
