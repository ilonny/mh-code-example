import {StyleSheet, ViewStyle} from 'react-native';
import {Colors} from '../../../../lib';

interface IStyles {
  wrapper: ViewStyle;
  dot: ViewStyle;
  dotVert: ViewStyle;
}

const styles: IStyles = {
  wrapper: {},
  dot: {
    width: 4,
    height: 2.5,
    backgroundColor: Colors.active,
    marginLeft: 20,
    position: 'absolute',
  },
  dotVert: {
    width: 2.5,
    height: 4,
    marginLeft: 20,
    backgroundColor: Colors.active,
    position: 'absolute',
  },
};

export default StyleSheet.create(styles);
