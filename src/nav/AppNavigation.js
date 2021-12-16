import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from '../screens/SplashScreen';
import IntroductionScreen from '../screens/IntroductionScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import SignUpForm from '../screens/SignUpForm';
import SignInForm from '../screens/SignInForm';
import ForgetPassword from '../screens/ForgetPassword';
import Verification from '../screens/Verification';
import ResetPassword from '../screens/ResetPassword';
import ResetPasswordDone from '../screens/ResetPasswordDone';
import Home from '../screens/Home';

export default class AppNavigator extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    return true; // Do nothing when back button is pressed
  };
  render() {
    const MainNavigatorNav = createAppContainer(
      createStackNavigator({
        SplashScreen: {
          screen: SplashScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
        IntroductionScreen: {
          screen: IntroductionScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
        SignIn: {
          screen: SignIn,
          navigationOptions: {
            headerShown: false,
          },
        },
        SignUp: {
          screen: SignUp,
          navigationOptions: {
            headerShown: false,
          },
        },
        SignUpForm: {
          screen: SignUpForm,
          navigationOptions: {
            headerShown: false,
          },
        },
        SignInForm: {
          screen: SignInForm,
          navigationOptions: {
            headerShown: false,
          },
        },
        ForgetPassword: {
          screen: ForgetPassword,
          navigationOptions: {
            headerShown: false,
          },
        },
        Verification: {
          screen: Verification,
          navigationOptions: {
            headerShown: false,
          },
        },
        ResetPassword: {
          screen: ResetPassword,
          navigationOptions: {
            headerShown: false,
          },
        },
        ResetPasswordDone: {
          screen: ResetPasswordDone,
          navigationOptions: {
            headerShown: false,
          },
        },
        Home: {
          screen: Home,
          navigationOptions: {
            headerShown: false,
          },
        },
      }),
    );

    return <MainNavigatorNav />;
  }
}
