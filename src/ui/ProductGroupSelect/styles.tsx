import {StyleSheet} from 'react-native';
import {Fonts} from '../../lib';
export const styles = StyleSheet.create({
  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E9EAEB',
    width: '100%',
  },
  selectArrowIcon: {
    width: 8,
    height: 4,
    marginLeft: 10,
  },
  wareHouseName: {
    fontFamily: Fonts.defaultFont,
  },
  wareHouseRow: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#E9EAEB',
  },
  selectedItemIcon: {
    width: 16,
    height: 13,
  },
});
