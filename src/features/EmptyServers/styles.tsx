import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors, currentWidth} from '../../lib';

interface IStyles {
  wrapper: ViewStyle;

  back_square: ImageStyle;
  squareWrapper: ViewStyle;
}

const styles: IStyles = {
  wrapper: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    justifyContent: 'space-between',
    position: 'relative',
  },

  back_square: {
    width: ~~(currentWidth / 1.25),
    height: ~~(currentWidth / 1.25),
  },
  squareWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 101,
  },
};

export default StyleSheet.create(styles);
