import {ImageStyle, StatusBar, TextStyle, ViewStyle} from 'react-native';

export const Fonts = {
  defaultFont: 'Manrope-Regular',
  bold: 'Manrope-Bold',
  medium: 'Manrope-Medium',
};

export const Colors = {
  mainBackground: '#FFF',
  mainText: '#222630',
  secondText: '#A7A8AC',
  active: '#FFD256',
  warning: '#FF474A',
  border: '#E9EAEB',
  buttonDisabled: '#A7A8AC',
  buttonActive: '#FFD256',
};

export const Margins = {
  mainPadding: 16,
};

interface IMainStyles {
  authTitle: TextStyle;
  back_icon: ImageStyle;
  contentTitle: TextStyle;
  mainWrapper: ViewStyle;
  navButton: ViewStyle;
}

export const MainStyles: IMainStyles = {
  authTitle: {
    color: Colors.mainText,
    fontSize: 32,
    lineHeight: 40,
  },
  back_icon: {
    width: 16,
    height: 16,
    marginTop: 24,
  },
  contentTitle: {
    fontSize: 20,
    lineHeight: 27,
    color: Colors.mainText,
    marginTop: 22,
    marginBottom: 16,
    fontWeight: 'normal',
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    paddingHorizontal: Margins.mainPadding,
    marginTop: StatusBar.currentHeight,
  },
  navButton: {
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    backgroundColor: Colors.mainBackground,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
};
