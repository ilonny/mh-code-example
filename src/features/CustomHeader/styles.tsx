import {StyleSheet} from 'react-native';
import {Margins, Fonts} from '../../lib';
export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Margins.mainPadding,
  },
  backButtonWrapper: {
    // padding: 16,
    width: '100%',
    height: '100%',
    // backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    marginLeft: -Margins.mainPadding * 2,
  },
  rightButtonWrapper: {
    // padding: 16,
    marginRight: -Margins.mainPadding * 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    // backgroundColor: 'blue',
    // backgroundColor: 'red'
  },
  backIcon: {
    width: 16,
    height: 16,
  },
  buttonWrapper: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  titleWrapper: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  title: {
    fontWeight: 'bold',
    fontFamily: Fonts.defaultFont,
    textAlign: 'center',
  },
});
