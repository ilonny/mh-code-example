import {StyleSheet} from 'react-native';
import {Fonts} from '../../lib';
export const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '90%',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  icon: {
    width: 18,
    height: 18,
  },
  iconWrapper: {
    width: 27,
    height: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  title: {
    fontFamily: Fonts.defaultFont,
    fontWeight: 'bold',
  },
});
