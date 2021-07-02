import {StyleSheet, StatusBar} from 'react-native';
import {Colors, Margins, currentWidth} from '../../lib';

const sizeWindow = currentWidth * 0.66;

export const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff'
  },
  backIconWrapper: {
    position: 'absolute',
    top: Margins.mainPadding + StatusBar.currentHeight! + 40,
    right: Margins.mainPadding,
    width: 32,
    height: 32,
    borderRadius: 1000,
    opacity: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainText,
    zIndex: 100,
  },
  backIcon: {
    zIndex: 1000,
    position: 'absolute',
    top: Margins.mainPadding + StatusBar.currentHeight! + 50,
    right: Margins.mainPadding + 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  window: {
    width: sizeWindow,
    height: sizeWindow,
  },
  windowSmall: {
    width: 300,
    height: 300,
  },
  bottomTextWrapper: {
    width: 232,
    height: 38,
    borderRadius: 26,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 28,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.4,
  },
  bottomText: {
    lineHeight: 28,
    fontSize: 12,
    color: '#F4F4F4',
  },
  emptyCodes: {
    maxWidth: '100%',
    // height: '100%',
    flex: 1,
  },
  emptyText: {
    color: '#7A7D83',
    fontSize: 12,
    paddingLeft: 16,
  },
  downIcon: {
    width: 12,
    height: 7,
    marginRight: 16,
  },
  manualInput: {
    width: '100%',
    height: 30,
    borderWidth: 1,
  },
  manualInputWrapper: {
    opacity: 0,
    height: 0,
  },
});
