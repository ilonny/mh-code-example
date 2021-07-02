import React from 'react';
import {StyleSheet} from 'react-native';
import {Fonts, Colors} from '../../lib';
export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 20,
    // backgroundColor: 'red',
  },
  title: {
    fontFamily: Fonts.defaultFont,
    color: Colors.mainText,
    // fontSize: 18
  },
  description: {
    fontFamily: Fonts.defaultFont,
    color: '#7A7D83',
    // fontSize: 18
  },
});
