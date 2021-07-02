// @flow
import * as React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Animated as NativeAnimated,
} from 'react-native';
import Animated from 'react-native-reanimated';

import Story from './Story';

const {
  event,
  concat,
  abs,
  sub,
  sin,
  divide,
  multiply,
  greaterThan,
  cond,
} = Animated;
const {width} = Dimensions.get('window');
const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const ratio = Platform.OS === 'ios' ? 2 : 1.2;

export default class Stories extends React.PureComponent {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    x: new Animated.Value(0),
    two: new Animated.Value(300),
  };

  getStyle(index) {
    // console.log('getStyle', index);
    const {x} = this.state;
    const offset = index * width;

    const inputRange = [offset - width, offset + width];

    const translateX = x.interpolate({
      inputRange,
      outputRange: [width / ratio, -width / ratio],
      extrapolate: 'clamp',
    });
    const rotateY = x.interpolate({
      inputRange,
      outputRange: [angle, -angle],
      extrapolate: 'clamp',
    });

    const alpha = abs(rotateY);
    const gamma = sub(angle, alpha);
    const beta = sub(Math.PI, alpha, gamma);
    const w = sub(
      width / 2,
      multiply(width / 2, divide(sin(gamma), sin(beta))),
    );
    const translateX1 = cond(greaterThan(rotateY, 0), w, multiply(w, -1));

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        {perspective},
        {translateX},
        {rotateY: concat(rotateY, 'rad')},
        {translateX: translateX1},
      ],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      // console.log('this.myRef', this.myRef.current);
      // console.log('this.state.x', this.state.x);

      // this.myRef.current.scrollTo(200);
      // this.setState({x: new Animated.Value(200)})
      // NativeAnimated.timing(this.state.x, {
      //     toValue: 400,
      //     duration: 350,
      //     useNativeDriver: false
      // }).start()
      // this.myRef.current && this.myRef.current.scrollTo({x: 400, y: 0, animated: true });

      event(
        [
          {
            nativeEvent: {
              contentOffset: {x: 400},
            },
          },
        ],
        {useNativeDriver: true},
      );
    }, 1000);
  }

  getMaskStyle(index) {
    // console.log('getMaskStyle', index);
    const {x} = this.state;
    const offset = index * width;
    const inputRange = [offset - width, offset, offset + width];
    const opacity = x.interpolate({
      inputRange,
      outputRange: [0.75, 0, 0.75],
      extrapolate: 'clamp',
    });
    return {
      backgroundColor: 'black',
      ...StyleSheet.absoluteFillObject,
      opacity,
    };
  }

  render() {
    const {x} = this.state;
    const {stories} = this.props;
    return (
      <View style={styles.container}>
        {stories.map((story, i) => (
          <Animated.View style={this.getStyle(i)} key={story.id}>
            <Story {...{story}} viewProp={this.props.viewProp} />
            <Animated.View style={this.getMaskStyle(i)} />
          </Animated.View>
        ))}
        <Animated.ScrollView
          ref={this.myRef}
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width}
          contentContainerStyle={{width: width * stories.length}}
          onScroll={event(
            [
              {
                nativeEvent: {
                  contentOffset: {x},
                },
              },
            ],
            {useNativeDriver: true},
          )}
          decelerationRate={0.99}
          horizontal
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
