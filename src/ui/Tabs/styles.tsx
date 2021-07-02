import {StyleSheet} from 'react-native';
import {Fonts} from '../../lib';
export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#A7A8AC',
  },
  tabActive: {
    borderBottomColor: '#FFD256',
    borderBottomWidth: 2,
  },
  tabText: {
    fontFamily: Fonts.defaultFont,
    color: '#A7A8AC',
  },
  tabTextActive: {
    color: '#000',
  },
});
