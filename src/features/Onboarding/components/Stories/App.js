import React from 'react';
import {StatusBar, View} from 'react-native';
// Two implementations of the story components.
// One using linear interpolation which doesn't make it a perfect cube and one with setNativeProps
import {Stories, Stories2, Stories3} from './components';

const stories = [
  {
    id: '0',
    user: 'derek.russel',
  },
  {
    id: '1',
    user: 'derek.russel',
  },
];

export default class StoriesView extends React.Component {
  state = {
    ready: false,
  };

  async componentDidMount() {
    // await Promise.all(stories.map(story => Promise.all([
    //   Asset.loadAsync(story.source),
    //   Asset.loadAsync(story.avatar),
    // ])));
    this.setState({ready: true});
  }

  render() {
    const {ready} = this.state;
    if (!ready) {
      return <View />;
    }
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <Stories2
          {...{stories}}
          viewProp={this.props.viewProp}
          viewPropSecond={this.props.viewPropSecond}
          OnBoardingPressNext={this.props.OnBoardingPressNext}
        />
      </React.Fragment>
    );
  }
}
