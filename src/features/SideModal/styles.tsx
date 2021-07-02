import {StyleSheet} from 'react-native';
import {currentWidth} from '../../lib';
export const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    maxWidth: currentWidth - 80,
  },
  divider: {
    marginVertical: 10,
    width: '100%',
    height: 1,
    backgroundColor: '#E9EAEB',
  },
});
