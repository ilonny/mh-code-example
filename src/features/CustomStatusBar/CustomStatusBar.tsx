import React, {FC} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Colors} from '../../lib';

interface Props {
  bgcColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
}

export const CustomStatusBar: FC<Props> = ({
  bgcColor = Colors.mainBackground,
  barStyle = 'dark-content',
}) => (
  <>
    <SafeAreaView style={{backgroundColor: bgcColor}} />
    <StatusBar translucent backgroundColor={bgcColor} barStyle={barStyle} />
  </>
);

// export default React.memo(CustomStatusBar);
