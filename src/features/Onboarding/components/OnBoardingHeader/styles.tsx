import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
// import {colors} from "../../../assets/Colors";
// import {Fonts} from "../../../assets/styles/Fonts";
// import {currentWidth} from "../../../utlils/GlobalVars";
import {Colors, Margins, OS, Fonts, currentWidth} from '../../../../lib';

interface IStyles {
  wrapper: ViewStyle;
  title: TextStyle;
  describeText: TextStyle;
  onBoarding1: ImageStyle;
  onBoarding2: ImageStyle;
}

const styles: IStyles = {
  wrapper: {},
  title: {
    fontSize: 26,
    lineHeight: 40,
    color: Colors.mainText,
    textAlign: 'center',
    marginTop: 19,
    // fontFamily: Fonts.defaultFont,
  },
  describeText: {
    fontFamily: Fonts.defaultFont,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 16,
    color: Colors.mainText,
  },
  onBoarding1: {
    width: currentWidth * 0.75,
    height: currentWidth * 0.75 * 1.06,
    alignSelf: 'center',
    marginTop: 15,
  },
  onBoarding2: {
    // backgroundColor: 'red',
    // marginHorizontal: -16,
    // paddingHorizontal: -16,
    width: currentWidth * 0.9, // currentWidth * 0.85,
    height: currentWidth * 0.75 * 1.06, // (currentWidth * 0.75) * 1.06,
    alignSelf: 'center',
    marginTop: 15,
  },
};

export default StyleSheet.create(styles);
