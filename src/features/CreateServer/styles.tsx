import {StyleSheet} from 'react-native';
import {Margins} from '../../lib';
export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: Margins.mainPadding,
    paddingTop: 100,
  },
  buttonWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
});
