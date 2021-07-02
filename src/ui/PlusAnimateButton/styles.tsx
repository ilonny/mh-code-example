import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import {MainStyles, Margins, Colors} from '../../lib';

interface IStyles {
  mainWrapper: ViewStyle;
  wrapper: ViewStyle;
  ImageView: ImageStyle;
  shadow: ViewStyle;
  pulse: ViewStyle;
}

const styles: IStyles = {
  mainWrapper: {
    // position: "absolute",
    // bottom: Margins.mainPadding * 4,
    // right: Margins.mainPadding,
    zIndex: 1000,
    // right: currentWidth - (~~(currentWidth / 2) + 115) - (Margins.mainPadding * 2) - Margins.mainPadding * 2 - 9,

    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    width: 70,
    height: 70,
    borderRadius: 1000,

    // shadowColor:  Colors.active,
    // shadowOffset: {
    //     width: 0,
    //     height: 0,
    // },
    // shadowOpacity: 1,
    // // shadowRadius:15,
    // elevation: 12,
  },
  wrapper: {
    ...MainStyles.navButton,
    backgroundColor: Colors.active,
    // zIndex: 100,
    position: 'relative',
    zIndex: 1000,
  },
  ImageView: {
    width: 20,
    height: 20,
  },
  shadow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 1000,
    backgroundColor: Colors.active,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    bottom: 45,
    zIndex: 1,
  },
};

export default StyleSheet.create(styles);
