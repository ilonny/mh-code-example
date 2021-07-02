import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../lib';
export const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.buttonDisabled,
    flex: 0,
    borderRadius: 100,
    minWidth: 164,
  },
  buttonText: {
    fontFamily: Fonts.defaultFont,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
