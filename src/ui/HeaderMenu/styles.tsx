import {StyleSheet} from 'react-native';
import {Fonts} from '../../lib';
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(201, 201, 201, 0.8)',
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  innerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  contentWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    // paddingTop: 30,
    marginTop: 35,
    marginRight: 16,
    minWidth: 250,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
  closeIcon: {
    width: 15,
    height: 15,
  },
  itemRow: {
    padding: 10,
    paddingHorizontal: 20,
  },
  itemRowTitle: {
    fontFamily: Fonts.defaultFont,
  },
});
