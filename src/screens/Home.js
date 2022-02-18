import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {Alert, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const INJECTED_JAVASCRIPT = `(function() {
  const tokenLocalStorage = window.localStorage.getItem('user_id');
  window.ReactNativeWebView.postMessage(tokenLocalStorage);
})();`;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };

  async updateToken(userId) {
    let fcmToken = await AsyncStorage.getItem('@schoolscom:fcmToken');

    let formdata = new FormData();
    formdata.append('user_id', userId);
    formdata.append('fcm_token', fcmToken);

    fetch('https://schoolscom.com/firebase-token', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(response => {
        console.log('response', response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const onMessage = payload => {
      var userId = payload.nativeEvent.data;
      if (userId != undefined) {
        this.updateToken(userId);
      }
    };
    return (
      <WebView
        domStorageEnabled={true}
        startInLoadingState={true}
        source={{uri: 'https://schoolscom.com/'}}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={onMessage}
        style={{height: 100}}
        decelerationRate="normal"
        scrollEnabled={true}
        useWebKit={true}
      />
    );
  }
}
