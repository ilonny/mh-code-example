import {StyleSheet} from 'react-native';
import {Fonts, currentWidth} from '../../lib';
export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    width: '100%',
  },
  companyAvatar: {
    width: 56,
    height: 56,
  },
  rightWrapper: {
    marginLeft: 20,
    paddingTop: 7,
    // backgroundColor: 'red',
    width: currentWidth - 195,
  },
  companyTitle: {
    fontWeight: 'bold',
    fontFamily: Fonts.defaultFont,
    maxWidth: 230,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E9EAEB',
    marginTop: 10,
    marginBottom: 20,
  },
});
