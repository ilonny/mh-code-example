import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../lib';
export const styles = StyleSheet.create({
  selectListRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9EAEB',
  },
  title: {
    fontWeight: 'bold',
    color: Colors.mainText,
    fontFamily: Fonts.defaultFont,
  },
  icon: {
    width: 16,
    height: 13,
  },
});
