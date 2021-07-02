import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    borderRadius: 100,
    bottom: 30,
    right: 30,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: '#fff',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
