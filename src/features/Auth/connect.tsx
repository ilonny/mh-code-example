import {connect} from 'react-redux';
import {AuthTemplate} from './templates';
import {authReducer, TLoginParams} from './reducer';
export const Auth = connect(
  state => ({
    //@ts-ignore
    //   main: state.main
    // onboardingIsVisible: state.onboardingReducer.onboardingIsVisible,
  }),
  dispatch => ({
    //@ts-ignore
    login: (params: TLoginParams) => dispatch(authReducer.login(params)),
  }),
)(AuthTemplate);
