import {connect} from 'react-redux';
import {mainReducer} from '../../features';
import {OnboardingTemplate} from './templates';

export const Onboarding = connect(
  state => ({
    //@ts-ignore
    //   main: state.main
    onboardingIsVisible: state.main.onboardingIsVisible,
  }),
  dispatch => ({
    //@ts-ignore
    setOnboardingIsVisible: (val: boolean) =>
      dispatch(mainReducer.setOnboardingIsVisible(val)),
  }),
)(OnboardingTemplate);
