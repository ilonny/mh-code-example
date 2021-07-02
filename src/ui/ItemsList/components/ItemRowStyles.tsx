import {StyleSheet} from 'react-native';
import {Margins, Fonts, Colors} from '../../../lib';
export const ItemRowStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconStyleWrapper: {
    marginHorizontal: Margins.mainPadding,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: '#E9EAEB',
  },
  iconStyle: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 17,
    fontFamily: Fonts.defaultFont,
  },
  description: {
    fontFamily: Fonts.defaultFont,
    color: Colors.buttonDisabled,
    marginTop: 7,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E9EAEB',
    marginTop: 13,
    marginBottom: 10,
  },
  rightSideWrapper: {
    flex: 1,
  },
});
