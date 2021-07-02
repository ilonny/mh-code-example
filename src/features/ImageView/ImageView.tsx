import React from 'react';
import {ImageStyle, TouchableOpacity, ViewStyle} from 'react-native';
import FastImage, {ResizeMode} from 'react-native-fast-image';
import {images} from '../../lib';

interface Props {
  source: Object | string;
  style: ImageStyle | ImageStyle[] | ViewStyle | ViewStyle[];
  href?: boolean;
  tintColorProp?: string;
  onPress?: Function;
  resizeMode?: ResizeMode;
}

export const ImageView: React.FC<Props> = ({
  source = '',
  style,
  href = false,
  tintColorProp = undefined,
  onPress,
  resizeMode = 'cover',
}) => {
  const imageComponent = (
    //@ts-ignore
    <FastImage
      style={style}
      source={
        !href
          ? source
          : {
              uri: source?.toString(),
            }
      }
      tintColor={tintColorProp}
      resizeMode={resizeMode}
      // resizeMode={FastImage.resizeMode[resizeMode]}
      // onLoad={this.setSize}
    />
  );

  return !onPress ? (
    <>{imageComponent}</>
  ) : (
    <TouchableOpacity onPress={() => onPress()}>
      {imageComponent}
    </TouchableOpacity>
  );
};
