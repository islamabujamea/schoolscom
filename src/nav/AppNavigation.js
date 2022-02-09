import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';

export default class AppNavigator extends Component {
  render() {
    const MainNavigatorNav = createAppContainer(
      createStackNavigator({
        SplashScreen: {
          screen: SplashScreen,
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
