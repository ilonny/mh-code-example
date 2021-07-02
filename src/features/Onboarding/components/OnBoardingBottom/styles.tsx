import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors, Margins, OS, Fonts} from '../../../../lib';
// import {colors} from "../../../assets/Colors";
// import { Margins} from "../../../assets/styles/MainStyles";
// import {OS} from "../../../utlils/GlobalVars";
// import {Fonts} from "../../../assets/styles/Fonts";

interface IStyles {
  wrapper: ViewStyle;
  circleWrapper: ViewStyle;
  circle: ViewStyle;
  bottomText: TextStyle;
}

const styles: IStyles = {
  wrapper: {
    marginBottom: 32,
  },
  circleWrapper: {
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    backgroundColor: Colors.active,
    borderRadius: 1000,
  },
  bottomText: {
    fontFamily: Fonts.medium,
    // fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginTop: 33,
    marginBottom: OS === 'android' ? 23 : Margins.mainPadding * 4,
  },
};

export default StyleSheet.create(styles);
