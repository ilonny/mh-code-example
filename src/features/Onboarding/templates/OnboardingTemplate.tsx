import React, {FC, useEffect, useRef, useState} from 'react';
import {Easing, View} from 'react-native';
import OnBoardingBottom from '../components/OnBoardingBottom';
import OnBoardingHeader from '../components/OnBoardingHeader';
import StoriesView from '../components/Stories/App';
import {CustomStatusBar} from '../../../features';
import styles from './styles';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useNavigation, CommonActions, useRoute} from '@react-navigation/native';

export const animationTiming = 5000;
let PressNext: boolean = false;
let completedStories = 0;

interface IProps {
  setOnboardingIsVisible: (val: boolean) => void;
  onboardingIsVisible: boolean;
}

export const OnboardingTemplate: FC<IProps> = ({
  setOnboardingIsVisible,
  onboardingIsVisible,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [OnBoardingPressNext, setOnBoardingPressNext] = useState<boolean>(
    false,
  );
  const circle = useRef<AnimatedCircularProgress>(null);
  const circleSecond = useRef<AnimatedCircularProgress>(null);
  const navigateToAuth = () => {
    navigation.navigate('AuthStack');
    navigation.dispatch(state => {
      // Remove the home route from the stack
      const routes = state.routes.filter(r => r.name !== 'OnboardingScreen');
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  };

  useEffect(() => {
    setTimeout(() => {
      circle.current!?.animate(100, animationTiming, Easing.linear);
      setTimeout(() => {
        if (!PressNext) {
          circleSecond.current!?.animate(100, animationTiming, Easing.linear);
          setTimeout(() => {
            // console.log('timeout navigate 1', navigation, completedStories);
            if (completedStories === 0) {
              completedStories = 1;
            }
            navigation.navigate('AuthStack');
            setOnboardingIsVisible(true);
            navigateToAuth();
          }, animationTiming);
        }
      }, animationTiming + 400);
    }, 1);
  }, []);

  const onPressNext = () => {
    completedStories = completedStories + 1;
    if (!!PressNext) {
      setOnboardingIsVisible(true);
      navigateToAuth();
    }
    setOnBoardingPressNext(true);
    PressNext = true;
    setTimeout(() => {
      circleSecond.current!?.animate(100, animationTiming, Easing.linear);
      setTimeout(() => {
        // console.log('timeout navigate 2', navigation, route, onboardingIsVisible, completedStories);
        setOnboardingIsVisible(true);
        if (completedStories < 2) {
          navigateToAuth();
        }
      }, animationTiming);
    }, 400);
  };

  const contentPage = (
    <View style={styles.wrapper}>
      <OnBoardingHeader currentPage={0} />
      <OnBoardingBottom circleRef={circle} onPressNext={() => onPressNext()} />
    </View>
  );
  const contentPageSecond = (
    <View style={styles.wrapper}>
      <OnBoardingHeader currentPage={1} />
      <OnBoardingBottom
        circleRef={circleSecond}
        onPressNext={() => onPressNext()}
      />
    </View>
  );

  return (
    <>
      <CustomStatusBar />
      <StoriesView
        viewProp={contentPage}
        viewPropSecond={contentPageSecond}
        OnBoardingPressNext={OnBoardingPressNext}
      />
    </>
  );
};
// export default inject("NavigatorStore")(observer(OnBoarding))
