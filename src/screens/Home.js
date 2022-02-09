import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

export default class Home extends Component {
  render() {
    return (
      <WebView
        domStorageEnabled={true}
        startInLoadingState={true}
        source={{uri: 'https://schoolscom.com/'}}
        style={{height: 100}}
        decelerationRate="normal"
        scrollEnabled={true}
        useWebKit={true}
      />
    );
  }
}
