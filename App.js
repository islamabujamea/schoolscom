import 'react-native-gesture-handler';
import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigation from './src/nav/AppNavigation';

export default class App extends Component {
  getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('@schoolscom:fcmToken');
    console.log('fcm app', fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('@schoolscom:fcmToken', fcmToken);
      }
    }
  };

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  };

  componentDidMount() {
    this.checkPermission();
  }
  render() {
    return <AppNavigation />;
  }
}
