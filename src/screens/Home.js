import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  View,
  Text,
} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}} />
        <Text style={{fontSize: 35, textAlign: 'center'}}>{'Home Screen'}</Text>
      </ScrollView>
    );
  }
}
